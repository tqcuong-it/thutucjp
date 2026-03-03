import { forms, type FormTemplate } from '../data/forms'

interface Props {
  form: FormTemplate
  data: Record<string, string>
}

// Map option values to display labels
function getDisplayValue(form: FormTemplate, fieldId: string, value: string): string {
  const field = form.fields.find(f => f.id === fieldId)
  if (field?.options) {
    const opt = field.options.find(o => o.value === value)
    return opt?.label || value
  }
  return value || ''
}

// Visa form (在留期間更新 / 在留資格変更)
function VisaForm({ form, data }: Props) {
  const gv = (id: string) => getDisplayValue(form, id, data[id] || '')
  const isChange = form.id === 'visa-change'
  const isExtension = form.id === 'visa-extension'
  const isCOE = form.id === 'coe-application'
  const isPR = form.id === 'permanent-residence'

  const formNumber = isChange ? '第三十号様式' : isExtension ? '第二十九号様式' : isCOE ? '第六号の三様式' : '第三十四号様式'
  const formTitle = form.titleJp
  const formTitleEn = isChange ? 'APPLICATION FOR CHANGE OF STATUS OF RESIDENCE'
    : isExtension ? 'APPLICATION FOR EXTENSION OF PERIOD OF STAY'
    : isCOE ? 'APPLICATION FOR CERTIFICATE OF ELIGIBILITY'
    : 'APPLICATION FOR PERMANENT RESIDENCE'

  return (
    <div className="official-form bg-white" style={{ fontFamily: '"MS Mincho", "Yu Mincho", "Hiragino Mincho Pro", serif', fontSize: '10px', lineHeight: 1.4 }}>
      {/* Page 1: 申請人等作成用 1 */}
      <div className="form-page" style={{ width: '210mm', minHeight: '297mm', padding: '10mm 12mm', boxSizing: 'border-box' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3mm' }}>
          <div style={{ fontSize: '7px', color: '#666' }}>別記{formNumber}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '8px' }}>申請人等作成用 １<br /><span style={{ fontSize: '7px', color: '#666' }}>For applicant, part 1</span></div>
            <div style={{ fontSize: '8px', textAlign: 'right' }}>日本国政府法務省<br /><span style={{ fontSize: '7px', color: '#666' }}>Ministry of Justice, Government of Japan</span></div>
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '4mm 0', borderBottom: '1px solid #000', paddingBottom: '2mm' }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px' }}>{formTitle}</div>
          <div style={{ fontSize: '8px', color: '#666' }}>{formTitleEn}</div>
        </div>

        <div style={{ fontSize: '8px', margin: '2mm 0 4mm' }}>
          法務大臣 殿<br />
          <span style={{ color: '#666', fontSize: '7px' }}>To the Minister of Justice</span>
        </div>

        {/* Main form table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px' }}>
          <tbody>
            <FormRow label="1 国籍・地域" labelEn="Nationality/Region" value={gv('nationality')} />
            <FormRow label="2 生年月日" labelEn="Date of birth" value={gv('dob')} />
            <FormRow label="3 氏名" labelEn="Name" value={`${gv('name_romaji')}${gv('name_kanji') ? `（${gv('name_kanji')}）` : ''}`} />
            <tr>
              <td style={cellLabel}>4 性別<br /><span style={cellLabelEn}>Sex</span></td>
              <td style={cellValue}>{gv('gender') === 'male' ? '☑ 男 Male  ☐ 女 Female' : gv('gender') === 'female' ? '☐ 男 Male  ☑ 女 Female' : ''}</td>
              <td style={cellLabel}>5 配偶者の有無<br /><span style={cellLabelEn}>Marital status</span></td>
              <td style={cellValue}>{gv('marital_status') === 'married' ? '☑ 有 Married  ☐ 無 Single' : gv('marital_status') === 'single' ? '☐ 有 Married  ☑ 無 Single' : ''}</td>
            </tr>
            <FormRow label="6 職業" labelEn="Occupation" value={gv('job_description')} />
            <FormRow label="7 住居地" labelEn="Address in Japan" value={`〒${gv('postal_code')}  ${gv('address')}`} />
            <tr>
              <td style={cellLabel}>電話番号<br /><span style={cellLabelEn}>Phone</span></td>
              <td style={cellValue}>{gv('phone')}</td>
              <td style={cellLabel}>メール<br /><span style={cellLabelEn}>Email</span></td>
              <td style={cellValue}>{gv('email')}</td>
            </tr>
            <FormRow label="8 旅券番号" labelEn="Passport No." value={gv('passport_no')} />
            <FormRow label="9 旅券有効期限" labelEn="Passport expiry" value={gv('passport_expiry')} />
            <FormRow label="10 在留カード番号" labelEn="Residence card No." value={gv('residence_card_no')} />
            <FormRow label="11 現在の在留資格" labelEn="Current status" value={gv('current_status')} />
            <FormRow label="12 在留期間満了日" labelEn="Expiry date" value={gv('expiry_date')} />
            {isExtension && <FormRow label="13 希望する在留期間" labelEn="Desired period" value={gv('desired_period')} />}
            {isChange && <FormRow label="13 変更を希望する在留資格" labelEn="Desired status" value={gv('new_status')} />}
            {isChange && <FormRow label="14 変更の理由" labelEn="Reason" value={gv('reason')} />}
            {isPR && <FormRow label="13 在日期間" labelEn="Years in Japan" value={gv('years_in_japan')} />}
            {isPR && <FormRow label="14 永住理由" labelEn="Reason" value={gv('reason')} />}
          </tbody>
        </table>

        {/* Company section */}
        <div style={{ marginTop: '4mm', borderTop: '2px solid #000', paddingTop: '2mm' }}>
          <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '2mm' }}>勤務先（所属機関）/ Place of employment</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px' }}>
            <tbody>
              <FormRow label="名称" labelEn="Company name" value={gv('company_name')} />
              <FormRow label="所在地" labelEn="Address" value={gv('company_address')} />
              <FormRow label="電話番号" labelEn="Phone" value={gv('company_phone')} />
              <FormRow label="業務内容" labelEn="Job description" value={gv('job_description')} />
              <FormRow label="給与" labelEn="Salary" value={gv('salary') ? `月額 ${gv('salary')}円` : ''} />
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '6mm', fontSize: '8px', borderTop: '1px solid #ccc', paddingTop: '2mm' }}>
          <div>以上の記載内容は事実と相違ありません。</div>
          <div style={{ color: '#666' }}>I hereby declare that the statement given above is true and correct.</div>
          <div style={{ marginTop: '4mm', display: 'flex', justifyContent: 'space-between' }}>
            <div>申請人（代理人）の署名 / Signature: ____________________</div>
            <div>年　　月　　日</div>
          </div>
        </div>

        {/* Watermark */}
        <div style={{ marginTop: '8mm', textAlign: 'center', fontSize: '7px', color: '#999' }}>
          ThủTụcJP.com — Được tạo tự động từ thông tin người dùng nhập. Vui lòng kiểm tra kỹ trước khi nộp.
        </div>
      </div>
    </div>
  )
}

// Rirekisho (履歴書)
function RirekishoForm({ form, data }: Props) {
  const gv = (id: string) => getDisplayValue(form, id, data[id] || '')
  return (
    <div className="official-form bg-white" style={{ fontFamily: '"MS Mincho", "Yu Mincho", "Hiragino Mincho Pro", serif', fontSize: '10px' }}>
      <div className="form-page" style={{ width: '210mm', minHeight: '297mm', padding: '10mm 12mm', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', letterSpacing: '8px', marginBottom: '6mm', borderBottom: '2px solid #000', paddingBottom: '3mm' }}>
          履　歴　書
        </div>

        <div style={{ textAlign: 'right', fontSize: '9px', marginBottom: '4mm' }}>
          {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })} 現在
        </div>

        <div style={{ display: 'flex', gap: '4mm', marginBottom: '4mm' }}>
          {/* Photo area */}
          <div style={{ width: '30mm', height: '40mm', border: '1px solid #999', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', color: '#999', textAlign: 'center', flexShrink: 0 }}>
            写真貼付<br />Photo<br />4cm×3cm
          </div>
          <table style={{ flex: 1, borderCollapse: 'collapse', fontSize: '9px' }}>
            <tbody>
              <FormRow label="ふりがな" labelEn="" value={gv('name_furigana')} />
              <FormRow label="氏名" labelEn="Name" value={gv('name_kanji')} />
              <FormRow label="生年月日" labelEn="Date of birth" value={gv('dob')} />
              <FormRow label="性別" labelEn="Sex" value={gv('gender') === 'male' ? '男' : gv('gender') === 'female' ? '女' : ''} />
            </tbody>
          </table>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px' }}>
          <tbody>
            <FormRow label="住所" labelEn="Address" value={gv('address')} />
            <FormRow label="電話" labelEn="Phone" value={gv('phone')} />
            <FormRow label="メール" labelEn="Email" value={gv('email')} />
          </tbody>
        </table>

        {/* Education */}
        <div style={{ marginTop: '4mm' }}>
          <div style={{ fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #000', marginBottom: '2mm', paddingBottom: '1mm' }}>学歴・職歴（Education & Work History）</div>
          <div style={{ fontSize: '9px', whiteSpace: 'pre-wrap', minHeight: '30mm', padding: '2mm', border: '1px solid #ddd' }}>
            {gv('education')}
            {gv('education') && gv('work_history') && '\n\n'}
            {gv('work_history')}
          </div>
        </div>

        {/* Licenses */}
        <div style={{ marginTop: '4mm' }}>
          <div style={{ fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #000', marginBottom: '2mm', paddingBottom: '1mm' }}>免許・資格（Licenses & Qualifications）</div>
          <div style={{ fontSize: '9px', whiteSpace: 'pre-wrap', minHeight: '15mm', padding: '2mm', border: '1px solid #ddd' }}>
            {gv('licenses')}
          </div>
        </div>

        {/* Motivation */}
        <div style={{ marginTop: '4mm' }}>
          <div style={{ fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #000', marginBottom: '2mm', paddingBottom: '1mm' }}>志望の動機（Motivation）</div>
          <div style={{ fontSize: '9px', whiteSpace: 'pre-wrap', minHeight: '20mm', padding: '2mm', border: '1px solid #ddd' }}>
            {gv('motivation')}
          </div>
        </div>

        {/* Self PR */}
        <div style={{ marginTop: '4mm' }}>
          <div style={{ fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #000', marginBottom: '2mm', paddingBottom: '1mm' }}>自己PR</div>
          <div style={{ fontSize: '9px', whiteSpace: 'pre-wrap', minHeight: '15mm', padding: '2mm', border: '1px solid #ddd' }}>
            {gv('self_pr')}
          </div>
        </div>

        {/* Other info */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', marginTop: '4mm' }}>
          <tbody>
            <FormRow label="通勤時間" labelEn="Commute" value={gv('commute_time')} />
            <FormRow label="扶養家族数" labelEn="Dependents" value={gv('dependents')} />
            <FormRow label="希望給与" labelEn="Desired salary" value={gv('desired_salary')} />
          </tbody>
        </table>

        <div style={{ marginTop: '8mm', textAlign: 'center', fontSize: '7px', color: '#999' }}>
          ThủTụcJP.com — Được tạo tự động. Vui lòng kiểm tra kỹ trước khi nộp.
        </div>
      </div>
    </div>
  )
}

// Generic form (furusato nozei etc)
function GenericForm({ form, data }: Props) {
  const gv = (id: string) => getDisplayValue(form, id, data[id] || '')
  const sections = [...new Set(form.fields.map((f) => f.section || 'Khác'))]

  return (
    <div className="official-form bg-white" style={{ fontFamily: '"MS Mincho", "Yu Mincho", "Hiragino Mincho Pro", serif', fontSize: '10px' }}>
      <div className="form-page" style={{ width: '210mm', minHeight: '297mm', padding: '10mm 12mm', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '6mm' }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px' }}>{form.titleJp}</div>
          <div style={{ fontSize: '10px', color: '#666' }}>{form.title}</div>
        </div>

        {sections.map(section => (
          <div key={section} style={{ marginBottom: '4mm' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #000', marginBottom: '2mm', paddingBottom: '1mm' }}>{section}</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px' }}>
              <tbody>
                {form.fields.filter(f => (f.section || 'Khác') === section).map(field => (
                  <FormRow key={field.id} label={field.labelJp || field.label} labelEn={field.labelJp ? field.label : ''} value={gv(field.id)} />
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <div style={{ marginTop: '10mm' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px' }}>
            <div>署名 / Signature: ____________________</div>
            <div>日付 / Date: ____________________</div>
          </div>
        </div>

        <div style={{ marginTop: '8mm', textAlign: 'center', fontSize: '7px', color: '#999' }}>
          ThủTụcJP.com — Được tạo tự động. Vui lòng kiểm tra kỹ trước khi nộp.
        </div>
      </div>
    </div>
  )
}

// Shared styles
const cellLabel: React.CSSProperties = {
  border: '1px solid #999',
  padding: '2mm 3mm',
  backgroundColor: '#f5f5f5',
  fontWeight: 'bold',
  width: '25%',
  verticalAlign: 'top',
}

const cellLabelEn: React.CSSProperties = {
  fontWeight: 'normal',
  fontSize: '7px',
  color: '#666',
}

const cellValue: React.CSSProperties = {
  border: '1px solid #999',
  padding: '2mm 3mm',
  verticalAlign: 'top',
}

function FormRow({ label, labelEn, value }: { label: string; labelEn: string; value: string }) {
  return (
    <tr>
      <td style={cellLabel}>
        {label}
        {labelEn && <><br /><span style={cellLabelEn}>{labelEn}</span></>}
      </td>
      <td colSpan={3} style={cellValue}>{value}</td>
    </tr>
  )
}

// Main export
export default function OfficialFormPreview({ form, data }: Props) {
  const isVisa = ['visa-extension', 'visa-change', 'coe-application', 'permanent-residence'].includes(form.id)
  const isRirekisho = form.id === 'rirekisho'

  return (
    <div id="official-form-print">
      {isVisa && <VisaForm form={form} data={data} />}
      {isRirekisho && <RirekishoForm form={form} data={data} />}
      {!isVisa && !isRirekisho && <GenericForm form={form} data={data} />}
    </div>
  )
}
