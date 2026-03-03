/**
 * ThủTụcJP — Excel Fill Engine
 * 
 * Strategy: Fetch official Excel from ISA → find cells by label matching → fill → download.
 * This is resilient to ISA moving cells around (as long as labels stay similar).
 */
import * as XLSX from 'xlsx'

// ===== Types =====

interface FieldMapping {
  // Label to search for in the sheet (Japanese)
  searchLabel: string | string[]
  // Where the value cell is relative to the label cell
  // 'right' = same row, first empty cell to the right
  // 'below' = next row, same column
  // 'right+N' = N cells to the right
  offset: 'right' | 'below' | 'right+1' | 'right+2' | 'right+3'
  // For date fields: split into year/month/day cells
  isDate?: boolean
  // Labels for Y/M/D cells (search near the date label)
  dateYearLabel?: string
  dateMonthLabel?: string
  dateDayLabel?: string
}

interface FormConfig {
  // ISA source URLs (try in order, first success wins)
  templateUrls: string[]
  // Proxy through our server to avoid CORS
  useProxy?: boolean
  // Which sheet to fill (0-indexed, or search by name)
  sheetIndex?: number
  sheetNameContains?: string
  // Field mappings: our field ID → how to find the cell
  fields: Record<string, FieldMapping>
  // Direct value mappings (select/radio → Japanese text)
  valueMap?: Record<string, Record<string, string>>
}

// ===== Cell Finder =====

function findCellByLabel(
  ws: XLSX.WorkSheet,
  labels: string[],
  maxRow = 100,
  maxCol = 60
): { r: number; c: number } | null {
  for (let r = 0; r <= maxRow; r++) {
    for (let c = 0; c <= maxCol; c++) {
      const addr = XLSX.utils.encode_cell({ r, c })
      const cell = ws[addr]
      if (cell && typeof cell.v === 'string') {
        const text = cell.v.replace(/\s+/g, '').trim()
        for (const label of labels) {
          const searchText = label.replace(/\s+/g, '').trim()
          if (text.includes(searchText)) {
            return { r, c }
          }
        }
      }
    }
  }
  return null
}

function getOffsetCell(
  base: { r: number; c: number },
  offset: string
): { r: number; c: number } {
  switch (offset) {
    case 'right': return { r: base.r, c: base.c + 1 }
    case 'right+1': return { r: base.r, c: base.c + 1 }
    case 'right+2': return { r: base.r, c: base.c + 2 }
    case 'right+3': return { r: base.r, c: base.c + 3 }
    case 'below': return { r: base.r + 1, c: base.c }
    default: return { r: base.r, c: base.c + 1 }
  }
}

function writeCell(ws: XLSX.WorkSheet, r: number, c: number, value: string) {
  const addr = XLSX.utils.encode_cell({ r, c })
  ws[addr] = { t: 's', v: value }
  // Expand sheet range if needed
  const range = XLSX.utils.decode_range(ws['!ref'] || 'A1')
  if (r > range.e.r) range.e.r = r
  if (c > range.e.c) range.e.c = c
  ws['!ref'] = XLSX.utils.encode_range(range)
}

function findDateCells(
  ws: XLSX.WorkSheet,
  baseRow: number,
  baseCol: number
): { year: { r: number; c: number }; month: { r: number; c: number }; day: { r: number; c: number } } | null {
  // Search for 年/月/日 labels near the base position
  const searchRange = 15 // columns to search
  let yearCell = null, monthCell = null, dayCell = null

  for (let c = baseCol; c <= baseCol + searchRange; c++) {
    for (let rOff = -1; rOff <= 1; rOff++) {
      const addr = XLSX.utils.encode_cell({ r: baseRow + rOff, c })
      const cell = ws[addr]
      if (cell && typeof cell.v === 'string') {
        const v = cell.v.trim()
        if (v === '年' || v === 'Year') yearCell = { r: baseRow + rOff, c }
        if (v === '月' || v === 'Month') monthCell = { r: baseRow + rOff, c }
        if (v === '日' || v === 'Day') dayCell = { r: baseRow + rOff, c }
      }
    }
  }

  if (yearCell && monthCell && dayCell) {
    return { year: yearCell, month: monthCell, day: dayCell }
  }
  return null
}

// ===== Form Configurations =====

const commonValueMap: Record<string, Record<string, string>> = {
  gender: { male: '男', female: '女' },
  marital_status: { married: '有', single: '無' },
  current_status: {
    engineer: '技術・人文知識・国際業務',
    student: '留学',
    family: '家族滞在',
    spouse: '日本人の配偶者等',
    specified_skilled: '特定技能',
    business_manager: '経営・管理',
    designated: '特定活動',
    permanent: '永住者',
    long_term: '定住者',
    trainee: '技能実習',
  },
  new_status: {
    engineer: '技術・人文知識・国際業務',
    spouse: '日本人の配偶者等',
    family: '家族滞在',
    specified_skilled: '特定技能',
    business_manager: '経営・管理',
    designated: '特定活動',
    long_term: '定住者',
  },
  desired_period: { '5year': '5年', '3year': '3年', '1year': '1年' },
}

// Visa change & extension share the same ISA form (別記第三十号様式)
const visaFormFields: Record<string, FieldMapping> = {
  nationality: {
    searchLabel: ['国　籍・地　域', '国籍・地域', 'Nationality'],
    offset: 'below',
  },
  dob: {
    searchLabel: ['生年月日', 'Date of birth'],
    offset: 'right',
    isDate: true,
  },
  name_kanji: {
    searchLabel: ['氏　名', '氏名'],
    offset: 'below',
  },
  name_romaji: {
    searchLabel: ['Family name'],
    offset: 'below',
  },
  gender: {
    searchLabel: ['性　別', '性別', 'Sex'],
    offset: 'right',
  },
  marital_status: {
    searchLabel: ['配偶者の有無', 'Marital status'],
    offset: 'right',
  },
  job_description: {
    searchLabel: ['職　業', '職業', 'Occupation'],
    offset: 'below',
  },
  address: {
    searchLabel: ['住居地', 'Address in Japan'],
    offset: 'below',
  },
  phone: {
    searchLabel: ['電話番号', 'Telephone'],
    offset: 'right',
  },
  passport_no: {
    searchLabel: ['番　号', 'Number'],
    offset: 'below',
  },
  passport_expiry: {
    searchLabel: ['有効期限', 'Date of expiration'],
    offset: 'right',
    isDate: true,
  },
  current_status: {
    searchLabel: ['現に有する在留資格', 'Status of residence'],
    offset: 'below',
  },
  expiry_date: {
    searchLabel: ['在留期間の満了日', 'Date of expiration'],
    offset: 'right',
    isDate: true,
  },
  residence_card_no: {
    searchLabel: ['在留カード番号', 'Residence card number'],
    offset: 'below',
  },
}

const formConfigs: Record<string, FormConfig> = {
  'visa-change': {
    templateUrls: [
      '/forms/visa-change.xlsx',
      'https://www.moj.go.jp/isa/content/930004065.xlsx',
    ],
    sheetIndex: 0,
    fields: {
      ...visaFormFields,
      new_status: {
        searchLabel: ['希望する在留資格', 'Desired status'],
        offset: 'below',
      },
      reason: {
        searchLabel: ['変更の理由', 'Reason for change'],
        offset: 'below',
      },
    },
    valueMap: commonValueMap,
  },
  'visa-extension': {
    templateUrls: [
      '/forms/visa-extension.xlsx',
      'https://www.moj.go.jp/isa/content/930004065.xlsx',
    ],
    sheetIndex: 0,
    fields: {
      ...visaFormFields,
      desired_period: {
        searchLabel: ['在留期間', 'Period of stay'],
        offset: 'below',
      },
    },
    valueMap: commonValueMap,
  },
}

// ===== Public API =====

export function hasExcelFill(formId: string): boolean {
  return formId in formConfigs
}

export async function fillAndDownloadExcel(
  formId: string,
  data: Record<string, string>
): Promise<{ success: boolean; warnings: string[] }> {
  const config = formConfigs[formId]
  if (!config) return { success: false, warnings: ['Form không hỗ trợ xuất Excel'] }

  const warnings: string[] = []

  // 1. Fetch template (try URLs in order)
  let buffer: ArrayBuffer | null = null
  for (const url of config.templateUrls) {
    try {
      const res = await fetch(url)
      if (res.ok) {
        const buf = await res.arrayBuffer()
        // Verify it's actually an xlsx (not HTML error page)
        const arr = new Uint8Array(buf)
        if (arr[0] === 0x50 && arr[1] === 0x4B) { // PK zip header
          buffer = buf
          break
        }
      }
    } catch { /* try next */ }
  }

  if (!buffer) {
    return { success: false, warnings: ['Không tải được template từ ISA. Vui lòng thử lại sau.'] }
  }

  // 2. Parse Excel
  const wb = XLSX.read(buffer, { type: 'array' })
  const sheetName = config.sheetIndex !== undefined
    ? wb.SheetNames[config.sheetIndex]
    : wb.SheetNames.find(n => config.sheetNameContains && n.includes(config.sheetNameContains)) || wb.SheetNames[0]
  const ws = wb.Sheets[sheetName]

  if (!ws) {
    return { success: false, warnings: ['Không tìm thấy sheet trong file Excel'] }
  }

  // 3. Fill fields
  let filledCount = 0
  for (const [fieldId, mapping] of Object.entries(config.fields)) {
    let value = data[fieldId] || ''
    if (!value) continue

    // Apply value mapping
    if (config.valueMap?.[fieldId]?.[value]) {
      value = config.valueMap[fieldId][value]
    }

    const labels = Array.isArray(mapping.searchLabel) ? mapping.searchLabel : [mapping.searchLabel]
    const labelCell = findCellByLabel(ws, labels)

    if (!labelCell) {
      warnings.push(`⚠️ Không tìm thấy ô "${labels[0]}" — có thể ISA đã cập nhật form`)
      continue
    }

    if (mapping.isDate) {
      // Split date and find Y/M/D cells
      const parts = value.split('-')
      if (parts.length === 3) {
        const dateCells = findDateCells(ws, labelCell.r, labelCell.c)
        if (dateCells) {
          writeCell(ws, dateCells.year.r, dateCells.year.c, parts[0])
          writeCell(ws, dateCells.month.r, dateCells.month.c, parts[1].replace(/^0/, ''))
          writeCell(ws, dateCells.day.r, dateCells.day.c, parts[2].replace(/^0/, ''))
          filledCount++
        } else {
          // Fallback: write full date next to label
          const target = getOffsetCell(labelCell, mapping.offset)
          writeCell(ws, target.r, target.c, value)
          filledCount++
        }
      }
    } else {
      const target = getOffsetCell(labelCell, mapping.offset)
      writeCell(ws, target.r, target.c, value)
      filledCount++
    }
  }

  if (filledCount === 0) {
    return { success: false, warnings: ['Không điền được trường nào. ISA có thể đã thay đổi format form.'] }
  }

  // 4. Download
  const out = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([out], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${formId}-filled-${new Date().toISOString().slice(0, 10)}.xlsx`
  a.click()
  URL.revokeObjectURL(url)

  if (warnings.length > 0) {
    warnings.unshift(`✅ Đã điền ${filledCount} trường thành công`)
  }

  return { success: true, warnings }
}
