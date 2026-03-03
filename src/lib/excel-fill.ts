/**
 * Fill official ISA Excel templates with user data and trigger download.
 * Uses SheetJS (xlsx) to read template → fill cells → export.
 */
import * as XLSX from 'xlsx'

// Cell mapping for each form
// Key = field id from our form, Value = { sheet, cells } to fill
interface CellMapping {
  sheet: number  // sheet index
  cell: string   // cell address (e.g. 'H15')
}

interface FormMapping {
  templateUrl: string
  sheetName?: string  // if specific sheet
  fields: Record<string, CellMapping | CellMapping[]>
  // Some fields need date split (year/month/day)
  dateSplits?: Record<string, { year: CellMapping; month: CellMapping; day: CellMapping }>
  // Radio/select → text mapping
  valueMap?: Record<string, Record<string, string>>
}

// ===== VISA CHANGE (在留資格変更) =====
const visaChangeMapping: FormMapping = {
  templateUrl: '/forms/visa-change.xlsx',
  fields: {
    nationality:       { sheet: 0, cell: 'E15' },
    name_romaji:       { sheet: 0, cell: 'H20' },  // Family name area
    name_kanji:        { sheet: 0, cell: 'B18' },   // Below 氏名
    gender:            { sheet: 0, cell: 'E21' },   // Will mark 男 or 女
    marital_status:    { sheet: 0, cell: 'AG21' },  // 有 or 無
    current_status:    { sheet: 0, cell: 'E36' },
    residence_card_no: { sheet: 0, cell: 'E42' },
    address:           { sheet: 0, cell: 'B27' },
    phone:             { sheet: 0, cell: 'E30' },
    passport_no:       { sheet: 0, cell: 'H33' },
    new_status:        { sheet: 0, cell: 'E45' },
    reason:            { sheet: 0, cell: 'E51' },
    job_description:   { sheet: 0, cell: 'E24' },
  },
  dateSplits: {
    dob: {
      year:  { sheet: 0, cell: 'AA15' },
      month: { sheet: 0, cell: 'AE15' },
      day:   { sheet: 0, cell: 'AI15' },
    },
    passport_expiry: {
      year:  { sheet: 0, cell: 'AB33' },
      month: { sheet: 0, cell: 'AF33' },
      day:   { sheet: 0, cell: 'AJ33' },
    },
    expiry_date: {
      year:  { sheet: 0, cell: 'M39' },
      month: { sheet: 0, cell: 'Q39' },
      day:   { sheet: 0, cell: 'U39' },
    },
  },
  valueMap: {
    gender: { male: '男', female: '女' },
    marital_status: { married: '有', single: '無' },
    new_status: {
      engineer: '技術・人文知識・国際業務',
      spouse: '日本人の配偶者等',
      family: '家族滞在',
      specified_skilled: '特定技能',
      business_manager: '経営・管理',
      designated: '特定活動',
      long_term: '定住者',
    },
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
  },
}

// ===== VISA EXTENSION (在留期間更新) =====
// Same form structure as change but different title
const visaExtensionMapping: FormMapping = {
  ...visaChangeMapping,
  templateUrl: '/forms/visa-extension.xlsx',
  fields: {
    ...visaChangeMapping.fields,
    desired_period: { sheet: 0, cell: 'E48' },
  },
  valueMap: {
    ...visaChangeMapping.valueMap,
    desired_period: {
      '5year': '5年',
      '3year': '3年',
      '1year': '1年',
    },
  },
}

// All form mappings
const formMappings: Record<string, FormMapping> = {
  'visa-change': visaChangeMapping,
  'visa-extension': visaExtensionMapping,
}

/**
 * Fill Excel template with user data and trigger download
 */
export async function fillAndDownloadExcel(
  formId: string,
  data: Record<string, string>
): Promise<boolean> {
  const mapping = formMappings[formId]
  if (!mapping) {
    console.warn('No Excel mapping for form:', formId)
    return false
  }

  try {
    // Fetch template
    const response = await fetch(mapping.templateUrl)
    if (!response.ok) throw new Error('Failed to fetch template')
    const buffer = await response.arrayBuffer()
    const wb = XLSX.read(buffer, { type: 'array' })

    // Fill fields
    for (const [fieldId, cellDef] of Object.entries(mapping.fields)) {
      let value = data[fieldId] || ''
      
      // Apply value mapping
      if (mapping.valueMap?.[fieldId]?.[value]) {
        value = mapping.valueMap[fieldId][value]
      }

      if (!value) continue

      const cells = Array.isArray(cellDef) ? cellDef : [cellDef]
      for (const { sheet, cell } of cells) {
        const ws = wb.Sheets[wb.SheetNames[sheet]]
        if (ws) {
          ws[cell] = { t: 's', v: value }
        }
      }
    }

    // Fill date splits
    if (mapping.dateSplits) {
      for (const [fieldId, splits] of Object.entries(mapping.dateSplits)) {
        const value = data[fieldId]
        if (!value) continue
        
        // Parse date (YYYY-MM-DD)
        const parts = value.split('-')
        if (parts.length === 3) {
          const [year, month, day] = parts
          const ws = wb.Sheets[wb.SheetNames[splits.year.sheet]]
          if (ws) {
            ws[splits.year.cell] = { t: 's', v: year }
            ws[splits.month.cell] = { t: 's', v: month.replace(/^0/, '') }
            ws[splits.day.cell] = { t: 's', v: day.replace(/^0/, '') }
          }
        }
      }
    }

    // Export
    const out = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([out], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formId}-filled.xlsx`
    a.click()
    URL.revokeObjectURL(url)
    
    return true
  } catch (err) {
    console.error('Failed to fill Excel:', err)
    return false
  }
}

/**
 * Check if a form has Excel fill support
 */
export function hasExcelFill(formId: string): boolean {
  return formId in formMappings
}
