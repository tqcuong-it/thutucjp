export interface FormField {
  id: string
  label: string
  labelJp?: string
  type: 'text' | 'date' | 'select' | 'radio' | 'textarea' | 'phone' | 'address' | 'number'
  placeholder?: string
  hint?: string
  required?: boolean
  options?: { value: string; label: string }[]
  section?: string
}

export interface SubmissionInfo {
  where: string
  whereJp: string
  address?: string
  hours?: string
  howToSubmit: string[]
  afterSubmit: string[]
  importantNotes?: string[]
}

export interface FormTemplate {
  id: string
  title: string
  titleJp: string
  category: string
  categoryIcon: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: string
  officialUrl?: string
  pdfUrl?: string
  excelUrl?: string
  fee?: string
  processingTime?: string
  fields: FormField[]
  tips?: string[]
  requiredDocs?: string[]
  submission?: SubmissionInfo
}

export interface FormCategory {
  id: string
  icon: string
  title: string
  description: string
  color: string
}

export const categories: FormCategory[] = [
  {
    id: 'visa',
    icon: '🛂',
    title: 'Visa & Cư trú',
    description: 'Gia hạn visa, đổi tư cách lưu trú, xin vĩnh trú, chứng nhận nhập cảnh',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
  },
  {
    id: 'baby',
    icon: '👶',
    title: 'Thai sản & Trẻ em',
    description: 'Trợ cấp sinh con, nghỉ thai sản, phụ cấp trẻ em, đăng ký khai sinh',
    color: 'bg-pink-50 border-pink-200 text-pink-700',
  },
  {
    id: 'tax',
    icon: '💰',
    title: 'Thuế & Nenkin',
    description: 'Khai thuế, nenkin, ふるさと納税, hoàn thuế, năm cuối',
    color: 'bg-green-50 border-green-200 text-green-700',
  },
  {
    id: 'work',
    icon: '💼',
    title: 'Việc làm & CV',
    description: '履歴書, 職務経歴書, 退職届, trợ cấp thất nghiệp',
    color: 'bg-amber-50 border-amber-200 text-amber-700',
  },
  {
    id: 'housing',
    icon: '🏠',
    title: 'Nhà ở & Chuyển nhà',
    description: 'Đăng ký chuyển đi/đến, thay đổi địa chỉ, hợp đồng thuê',
    color: 'bg-purple-50 border-purple-200 text-purple-700',
  },
  {
    id: 'car',
    icon: '🚗',
    title: 'Xe & Bằng lái',
    description: 'Đổi bằng lái, đăng kiểm, thuế xe, bảo hiểm xe',
    color: 'bg-orange-50 border-orange-200 text-orange-700',
  },
  {
    id: 'insurance',
    icon: '🏥',
    title: 'Bảo hiểm & Y tế',
    description: '健康保険, 国民健康保険, trợ cấp ốm đau, high-cost medical',
    color: 'bg-red-50 border-red-200 text-red-700',
  },
  {
    id: 'other',
    icon: '📋',
    title: 'Khác',
    description: 'My Number, tài khoản ngân hàng, ủy quyền, giấy tờ gia đình',
    color: 'bg-gray-50 border-gray-200 text-gray-700',
  },
]

// ===== COMMON FIELD SETS =====
// Based on actual ISA 別記第三十号様式 (在留資格変更/在留期間更新 共通)

const visaStatusOptions = [
  { value: 'engineer', label: '技術・人文知識・国際業務（Kỹ sư/Nhân văn）' },
  { value: 'spouse', label: '日本人の配偶者等（Vợ/chồng người Nhật）' },
  { value: 'family', label: '家族滞在（Gia đình）' },
  { value: 'permanent_spouse', label: '永住者の配偶者等（Vợ/chồng vĩnh trú）' },
  { value: 'long_term', label: '定住者（Định cư）' },
  { value: 'student', label: '留学（Du học）' },
  { value: 'specified_skilled', label: '特定技能（Kỹ năng đặc định）' },
  { value: 'technical_intern', label: '技能実習（Thực tập sinh）' },
  { value: 'business_manager', label: '経営・管理（Kinh doanh/Quản lý）' },
  { value: 'highly_skilled', label: '高度専門職（Chuyên môn cao cấp）' },
  { value: 'designated', label: '特定活動（Hoạt động đặc biệt）' },
  { value: 'nursing', label: '介護（Điều dưỡng）' },
  { value: 'skilled', label: '技能（Kỹ năng）' },
  { value: 'other', label: 'Khác' },
]

// ── Sheet 1: 申請人等作成用１ ──
// Mục 1~16 trên form ISA

const sec1 = '① Thông tin cá nhân（個人情報）'
const sec2 = '② Cư trú & Hộ chiếu（在留・旅券）'
const sec3 = '③ Thân nhân tại Nhật（在日親族）'

const isaSheet1Fields: FormField[] = [
  // 1. Quốc tịch
  { id: 'nationality', label: 'Quốc tịch', labelJp: '①国籍・地域', type: 'text', placeholder: 'ベトナム', required: true, section: sec1, hint: 'Viết bằng tiếng Nhật. VD: ベトナム' },
  // 2. Ngày sinh
  { id: 'dob', label: 'Ngày sinh', labelJp: '②生年月日', type: 'date', required: true, section: sec1 },
  // 3. Họ tên
  { id: 'name_family', label: 'Họ (Family name)', labelJp: '③氏名 Family name', type: 'text', placeholder: 'NGUYEN', required: true, section: sec1, hint: 'Viết IN HOA giống hộ chiếu' },
  { id: 'name_given', label: 'Tên (Given name)', labelJp: '③氏名 Given name', type: 'text', placeholder: 'VAN A', required: true, section: sec1, hint: 'Viết IN HOA giống hộ chiếu' },
  // 4. Giới tính
  { id: 'gender', label: 'Giới tính', labelJp: '④性別', type: 'radio', options: [{ value: 'male', label: 'Nam（男）' }, { value: 'female', label: 'Nữ（女）' }], required: true, section: sec1 },
  // 5. Nơi sinh
  { id: 'birthplace', label: 'Nơi sinh', labelJp: '⑤出生地', type: 'text', placeholder: 'Ha Noi, Viet Nam', required: true, section: sec1, hint: 'Thành phố + quốc gia' },
  // 6. Hôn nhân
  { id: 'marital_status', label: 'Tình trạng hôn nhân', labelJp: '⑥配偶者の有無', type: 'radio', options: [{ value: 'married', label: 'Đã kết hôn（有）' }, { value: 'single', label: 'Chưa（無）' }], required: true, section: sec1 },
  // 7. Nghề nghiệp
  { id: 'occupation', label: 'Nghề nghiệp', labelJp: '⑦職業', type: 'text', placeholder: '会社員 / 学生 / 主婦', required: true, section: sec1, hint: 'VD: 会社員 (nhân viên), 学生 (sinh viên)' },
  // 8. Quê quán
  { id: 'home_country_address', label: 'Địa chỉ tại quê nhà', labelJp: '⑧本国における居住地', type: 'text', placeholder: 'Ha Noi, Viet Nam', section: sec1, hint: 'Địa chỉ ở Việt Nam (nếu có)' },
  // 9. Địa chỉ tại Nhật
  { id: 'address', label: 'Địa chỉ tại Nhật', labelJp: '⑨住居地', type: 'textarea', placeholder: '東京都新宿区○○1-2-3 △△マンション101', required: true, section: sec1, hint: 'Viết đầy đủ đến số phòng, bằng tiếng Nhật' },
  { id: 'phone', label: 'SĐT cố định', labelJp: '電話番号', type: 'phone', placeholder: '03-XXXX-XXXX', section: sec1, hint: 'Không bắt buộc nếu có SĐT di động' },
  { id: 'mobile', label: 'SĐT di động', labelJp: '携帯電話番号', type: 'phone', placeholder: '080-XXXX-XXXX', required: true, section: sec1 },
  // 10. Hộ chiếu
  { id: 'passport_no', label: 'Số hộ chiếu', labelJp: '⑩旅券 番号', type: 'text', placeholder: 'C1234567', required: true, section: sec2, hint: 'Ghi đúng theo hộ chiếu' },
  { id: 'passport_expiry', label: 'Hạn hộ chiếu', labelJp: '⑩旅券 有効期限', type: 'date', required: true, section: sec2 },
  // 11. Tư cách lưu trú hiện tại
  { id: 'current_status', label: 'Visa hiện tại', labelJp: '⑪現に有する在留資格', type: 'select', options: visaStatusOptions, required: true, section: sec2 },
  { id: 'current_period', label: 'Thời hạn visa', labelJp: '在留期間', type: 'select', options: [
    { value: '5year', label: '5 năm' }, { value: '3year', label: '3 năm' }, { value: '1year', label: '1 năm' },
    { value: '6month', label: '6 tháng' }, { value: '4month_15day', label: '4 tháng 15 ngày' },
    { value: '3month', label: '3 tháng' }, { value: '1month', label: '1 tháng' },
  ], required: true, section: sec2 },
  { id: 'expiry_date', label: 'Ngày hết hạn visa', labelJp: '在留期間の満了日', type: 'date', required: true, section: sec2, hint: 'Xem mặt trước 在留カード' },
  // 12. Thẻ cư trú
  { id: 'residence_card_no', label: 'Số thẻ cư trú', labelJp: '⑫在留カード番号', type: 'text', placeholder: 'AB12345678CD', required: true, section: sec2, hint: 'Mặt trước 在留カード, 12 ký tự' },
  // 15. Tiền án
  { id: 'criminal_record', label: 'Tiền án (bao gồm nước ngoài)', labelJp: '⑮犯罪を理由とする処分の有無', type: 'radio', options: [
    { value: 'no', label: 'Không có（無）' },
    { value: 'yes', label: 'Có（有）' },
  ], required: true, section: sec2, hint: 'Bao gồm vi phạm giao thông ở cả Nhật và nước ngoài' },
  { id: 'criminal_detail', label: 'Chi tiết tiền án (nếu có)', labelJp: '具体的内容', type: 'textarea', section: sec2, hint: 'Chỉ điền nếu chọn "Có" ở trên' },
  // 16. Thân nhân tại Nhật
  { id: 'has_family_japan', label: 'Có thân nhân tại Nhật?', labelJp: '⑯在日親族の有無', type: 'radio', options: [
    { value: 'yes', label: 'Có（有）' },
    { value: 'no', label: 'Không（無）' },
  ], required: true, section: sec3 },
  { id: 'family1_relationship', label: 'Quan hệ (người 1)', labelJp: '続柄', type: 'select', options: [
    { value: '', label: '— Chọn —' },
    { value: '配偶者', label: 'Vợ/Chồng（配偶者）' },
    { value: '子', label: 'Con（子）' },
    { value: '父', label: 'Cha（父）' },
    { value: '母', label: 'Mẹ（母）' },
    { value: '兄弟姉妹', label: 'Anh/Chị/Em（兄弟姉妹）' },
  ], section: sec3, hint: 'Điền nếu có thân nhân tại Nhật' },
  { id: 'family1_name', label: 'Họ tên (người 1)', labelJp: '氏名', type: 'text', section: sec3 },
  { id: 'family1_dob', label: 'Ngày sinh (người 1)', labelJp: '生年月日', type: 'date', section: sec3 },
  { id: 'family1_nationality', label: 'Quốc tịch (người 1)', labelJp: '国籍・地域', type: 'text', placeholder: 'ベトナム', section: sec3 },
  { id: 'family1_cohabit', label: 'Sống cùng?', labelJp: '同居の有無', type: 'radio', options: [{ value: 'yes', label: 'Có（有）' }, { value: 'no', label: 'Không（無）' }], section: sec3 },
  { id: 'family1_workplace', label: 'Nơi làm việc/học (người 1)', labelJp: '勤務先名称・通学先名称', type: 'text', section: sec3 },
  { id: 'family1_residence_card', label: 'Số 在留カード (người 1)', labelJp: '在留カード番号', type: 'text', section: sec3 },
]

// ── Sheet 3: 申請人等作成用２N ──
// Mục 17~22 (cho visa 技人国, 高度専門職, etc.)

const sec4 = '④ Nơi làm việc（勤務先）'
const sec5 = '⑤ Học vấn（最終学歴）'
const sec6 = '⑥ Kinh nghiệm làm việc（職歴）'

const isaSheet3Fields: FormField[] = [
  // 17. Nơi làm việc
  { id: 'company_name', label: 'Tên công ty', labelJp: '⑰勤務先(1)名称', type: 'text', placeholder: '株式会社 ○○', required: true, section: sec4, hint: 'Tên chính thức đầy đủ, bằng tiếng Nhật' },
  { id: 'company_branch', label: 'Chi nhánh/Văn phòng', labelJp: '支店・事業所名', type: 'text', section: sec4, hint: 'Nếu làm ở chi nhánh, không phải trụ sở chính' },
  { id: 'company_address', label: 'Địa chỉ nơi làm việc', labelJp: '(2)所在地', type: 'textarea', placeholder: '東京都港区○○2-3-8', required: true, section: sec4, hint: 'Địa chỉ nơi bạn THỰC SỰ làm việc (có thể khác trụ sở chính)' },
  { id: 'company_phone', label: 'SĐT nơi làm việc', labelJp: '(3)電話番号', type: 'phone', placeholder: '03-XXXX-XXXX', required: true, section: sec4 },
  // 18. Học vấn
  { id: 'school_location', label: 'Trường ở đâu?', labelJp: '⑱最終学歴 本邦/外国', type: 'radio', options: [
    { value: 'japan', label: 'Nhật Bản（本邦）' },
    { value: 'foreign', label: 'Nước ngoài（外国）' },
  ], required: true, section: sec5 },
  { id: 'school_level', label: 'Trình độ', labelJp: '学歴レベル', type: 'select', options: [
    { value: 'doctor', label: 'Tiến sĩ（大学院 博士）' },
    { value: 'master', label: 'Thạc sĩ（大学院 修士）' },
    { value: 'bachelor', label: 'Đại học（大学）' },
    { value: 'junior_college', label: 'Cao đẳng（短期大学）' },
    { value: 'vocational', label: 'Trường nghề（専門学校）' },
    { value: 'high_school', label: 'THPT（高等学校）' },
    { value: 'junior_high', label: 'THCS（中学校）' },
    { value: 'other', label: 'Khác（その他）' },
  ], required: true, section: sec5 },
  { id: 'school_name', label: 'Tên trường', labelJp: '(3)学校名', type: 'text', placeholder: 'ハノイ工科大学', required: true, section: sec5, hint: 'Viết bằng tiếng Nhật hoặc tiếng Anh' },
  { id: 'graduation_date', label: 'Ngày tốt nghiệp', labelJp: '(4)卒業年月日', type: 'date', required: true, section: sec5 },
  // 19. Chuyên ngành
  { id: 'major', label: 'Chuyên ngành', labelJp: '⑲専攻・専門分野', type: 'select', options: [
    { value: 'engineering', label: 'Kỹ thuật（工学）' },
    { value: 'computer_science', label: 'CNTT（情報科学）' },
    { value: 'economics', label: 'Kinh tế（経済学）' },
    { value: 'business', label: 'Quản trị KD（経営学）' },
    { value: 'law', label: 'Luật（法学）' },
    { value: 'literature', label: 'Văn học（文学）' },
    { value: 'linguistics', label: 'Ngôn ngữ（語学）' },
    { value: 'science', label: 'Khoa học（理学）' },
    { value: 'chemistry', label: 'Hóa học（化学）' },
    { value: 'agriculture', label: 'Nông nghiệp（農学）' },
    { value: 'medicine', label: 'Y khoa（医学）' },
    { value: 'nursing', label: 'Điều dưỡng（介護福祉）' },
    { value: 'education', label: 'Giáo dục（教育学）' },
    { value: 'sociology', label: 'Xã hội học（社会学）' },
    { value: 'other', label: 'Khác' },
  ], required: true, section: sec5 },
  // 20. Chứng chỉ IT
  { id: 'has_it_cert', label: 'Có chứng chỉ IT không?', labelJp: '⑳情報処理技術者資格の有無', type: 'radio', options: [
    { value: 'no', label: 'Không（無）' },
    { value: 'yes', label: 'Có（有）' },
  ], section: sec5, hint: 'VD: 基本情報, 応用情報, JITEC, AWS certified...' },
  { id: 'it_cert_name', label: 'Tên chứng chỉ IT', labelJp: '資格名又は試験名', type: 'text', placeholder: '基本情報技術者, AWS Solutions Architect', section: sec5, hint: 'Liệt kê các chứng chỉ, cách nhau bằng dấu phẩy' },
  // 21. Kinh nghiệm làm việc
  { id: 'work1_join', label: 'Công ty 1: Ngày vào', labelJp: '⑳職歴 入社', type: 'text', placeholder: '2018/04', section: sec6, hint: 'Năm/Tháng. VD: 2018/04' },
  { id: 'work1_leave', label: 'Công ty 1: Ngày nghỉ', labelJp: '退社', type: 'text', placeholder: '2022/03', section: sec6, hint: 'Để trống nếu đang làm' },
  { id: 'work1_company', label: 'Công ty 1: Tên', labelJp: '勤務先名称', type: 'text', placeholder: 'ABC Corporation', section: sec6 },
  { id: 'work2_join', label: 'Công ty 2: Ngày vào', labelJp: '入社', type: 'text', placeholder: '2022/04', section: sec6 },
  { id: 'work2_leave', label: 'Công ty 2: Ngày nghỉ', labelJp: '退社', type: 'text', section: sec6 },
  { id: 'work2_company', label: 'Công ty 2: Tên', labelJp: '勤務先名称', type: 'text', section: sec6 },
]

// ── Reuse field sets (backward compat) ──
const personalFields = isaSheet1Fields.filter(f => f.section === sec1)
const residenceFields = isaSheet1Fields.filter(f => f.section === sec2)
const addressFields = personalFields.filter(f => ['address', 'phone', 'mobile'].includes(f.id))
const passportFields = isaSheet1Fields.filter(f => ['passport_no', 'passport_expiry'].includes(f.id))
const companyFields = isaSheet3Fields.filter(f => f.section === sec4)

const bankFields: FormField[] = [
  { id: 'bank_name', label: 'Ngân hàng', labelJp: '金融機関名', type: 'text', placeholder: '楽天銀行', required: true, section: 'Tài khoản nhận tiền（振込先）' },
  { id: 'branch_name', label: 'Chi nhánh', labelJp: '支店名', type: 'text', required: true, section: 'Tài khoản nhận tiền（振込先）' },
  { id: 'account_type', label: 'Loại tài khoản', labelJp: '口座種別', type: 'radio', options: [{ value: 'normal', label: 'Thường（普通）' }, { value: 'current', label: 'Vãng lai（当座）' }], required: true, section: 'Tài khoản nhận tiền（振込先）' },
  { id: 'account_no', label: 'Số tài khoản', labelJp: '口座番号', type: 'text', required: true, section: 'Tài khoản nhận tiền（振込先）' },
  { id: 'account_holder', label: 'Tên chủ TK (カタカナ)', labelJp: '口座名義（カタカナ）', type: 'text', required: true, section: 'Tài khoản nhận tiền（振込先）' },
]

// ===== FORMS =====
export const forms: FormTemplate[] = [
  // ===== VISA =====
  {
    id: 'visa-extension',
    title: 'Gia hạn visa (在留期間更新)',
    titleJp: '在留期間更新許可申請書',
    category: 'visa',
    categoryIcon: '🛂',
    description: 'Đơn xin gia hạn thời gian lưu trú. Nộp tại 入国管理局 trước khi visa hết hạn 3 tháng.',
    difficulty: 'medium',
    estimatedTime: '15-20 phút',
    officialUrl: 'https://www.moj.go.jp/isa/applications/procedures/16-3.html',
    pdfUrl: 'https://www.moj.go.jp/isa/content/930004064.pdf',
    excelUrl: 'https://www.moj.go.jp/isa/content/930004065.xlsx',
    fee: '¥6,000（tem thu nhập）/ ¥5,500（online）',
    processingTime: '2 tuần ~ 1 tháng',
    tips: [
      'Nộp trước khi visa hết hạn ít nhất 3 tháng（在留期間満了の3ヶ月前から申請可能）',
      'Mang theo hộ chiếu + thẻ cư trú（在留カード）gốc',
      'Ảnh 4x3cm chụp trong 3 tháng gần nhất（縦4cm×横3cm、撮影後3ヶ月以内）',
      'Giờ tiếp nhận: 9:00-12:00, 13:00-16:00 ngày thường',
      'Có thể nộp online qua hệ thống 在留申請オンライン',
    ],
    requiredDocs: [
      'Hộ chiếu gốc（旅券）',
      'Thẻ cư trú gốc（在留カード）',
      'Ảnh 4×3cm（縦4cm×横3cm）',
      '源泉徴収票 hoặc 課税証明書（chứng minh thu nhập）',
      'Giấy tờ công ty（登記事項証明書, 決算書等）',
      'Hợp đồng lao động（雇用契約書）',
    ],
    submission: {
      where: '出入国在留管理局（入管）',
      whereJp: '地方出入国在留管理局',
      hours: '9:00-12:00, 13:00-16:00（thứ 2~6, trừ ngày lễ）',
      howToSubmit: [
        '📥 Download form chính thức từ link bên dưới → in ra → điền theo thông tin đã nhập ở ThủTụcJP',
        '📋 Hoặc nộp online qua 在留申請オンラインシステム (cần My Number Card)',
        '🏢 Mang hồ sơ đến 入管局 gần nhất → lấy số → chờ gọi',
        '💴 Mua 収入印紙 ¥6,000 tại quầy trong 入管 (mua sau khi được duyệt)',
      ],
      afterSubmit: [
        '📄 Nhận はがき (bưu thiếp) khi có kết quả — thường 2 tuần ~ 1 tháng',
        '🏢 Mang はがき + hộ chiếu + 在留カード + 収入印紙 ¥6,000 đến nhận thẻ mới',
        '💳 在留カード mới được cấp ngay tại quầy',
      ],
      importantNotes: [
        '⚠️ Nộp trước khi visa hết hạn — nếu đang chờ kết quả, visa tự động gia hạn 2 tháng',
        '⚠️ KHÔNG được làm việc khác tư cách hiện tại trong khi chờ',
        '💡 Đến sớm (trước 9:00) — 入管 rất đông, đặc biệt thứ 2 và cuối tháng',
      ],
    },
    fields: [
      ...isaSheet1Fields,
      // 13. Thời hạn mong muốn (khác với change: không cần lý do)
      { id: 'desired_period', label: 'Thời hạn mong muốn', labelJp: '⑬希望する在留期間', type: 'select', options: [
        { value: '5year', label: '5 năm' }, { value: '3year', label: '3 năm' }, { value: '1year', label: '1 năm' },
      ], required: true, section: sec2, hint: 'Kết quả phụ thuộc xét duyệt' },
      // Sheet 3 fields
      ...isaSheet3Fields,
    ],
  },
  {
    id: 'visa-change',
    title: 'Đổi tư cách lưu trú (在留資格変更)',
    titleJp: '在留資格変更許可申請書',
    category: 'visa',
    categoryIcon: '🛂',
    description: 'Đổi từ visa hiện tại sang visa khác. VD: Du học → Kỹ sư, Gia đình → Kỹ năng đặc định.',
    difficulty: 'hard',
    estimatedTime: '20-30 phút',
    officialUrl: 'https://www.moj.go.jp/isa/applications/procedures/16-2.html',
    pdfUrl: 'https://www.moj.go.jp/isa/content/930004064.pdf',
    excelUrl: 'https://www.moj.go.jp/isa/content/930004065.xlsx',
    fee: '¥6,000（tem thu nhập）/ ¥5,500（online）',
    processingTime: '1 ~ 2 tháng',
    tips: [
      'Phải đổi visa TRƯỚC khi bắt đầu hoạt động mới（活動変更前に申請）',
      'Nếu không đổi kịp → vi phạm luật nhập cảnh, có thể bị hủy visa',
      'Du học sinh xin việc → nộp ngay sau khi có nội định（内定）',
      'Mang theo giấy tờ chứng minh hoạt động mới',
    ],
    requiredDocs: [
      'Hộ chiếu + thẻ cư trú gốc',
      'Ảnh 4×3cm',
      'Hợp đồng lao động mới / Giấy nhập học',
      '卒業証明書（nếu đổi từ du học）',
      '履歴書（lý lịch）',
      'Giấy tờ công ty mới',
    ],
    submission: {
      where: '出入国在留管理局（入管）',
      whereJp: '地方出入国在留管理局',
      hours: '9:00-12:00, 13:00-16:00（thứ 2~6）',
      howToSubmit: [
        '📥 Download form chính thức → in → điền theo thông tin đã nhập',
        '📋 Hoặc nộp online qua 在留申請オンラインシステム',
        '🏢 Mang hồ sơ đến 入管局 gần nhất',
        '💴 Mua 収入印紙 ¥6,000 (mua sau khi được duyệt)',
      ],
      afterSubmit: [
        '📄 Nhận はがき khi có kết quả — thường 1~2 tháng',
        '🏢 Mang はがき + hộ chiếu + 在留カード + 収入印紙 đến nhận thẻ mới',
        '💳 在留カード mới có tư cách mới',
      ],
      importantNotes: [
        '⚠️ KHÔNG được làm hoạt động mới trước khi có tư cách mới',
        '⚠️ Du học sinh → phải nộp trước khi tốt nghiệp hoặc trong 特定活動 period',
        '💡 Chuẩn bị hồ sơ đầy đủ = xét duyệt nhanh hơn',
      ],
    },
    fields: [
      ...isaSheet1Fields,
      // 13. Visa muốn đổi sang
      { id: 'new_status', label: 'Visa muốn đổi sang', labelJp: '⑬希望する在留資格', type: 'select', options: visaStatusOptions, required: true, section: sec2 },
      { id: 'desired_period', label: 'Thời hạn mong muốn', labelJp: '在留期間', type: 'select', options: [
        { value: '5year', label: '5 năm' }, { value: '3year', label: '3 năm' }, { value: '1year', label: '1 năm' },
      ], required: true, section: sec2, hint: 'Kết quả phụ thuộc xét duyệt, có thể không đúng mong muốn' },
      // 14. Lý do
      { id: 'reason', label: 'Lý do đổi tư cách', labelJp: '⑭変更の理由', type: 'textarea', required: true, section: sec2, hint: 'VD: Tốt nghiệp ĐH, được nhận vào công ty ○○ làm SE' },
      // Sheet 3 fields
      ...isaSheet3Fields,
    ],
  },
  {
    id: 'coe-application',
    title: 'Chứng nhận tư cách lưu trú (在留資格認定)',
    titleJp: '在留資格認定証明書交付申請書',
    category: 'visa',
    categoryIcon: '🛂',
    description: 'Xin chứng nhận tư cách lưu trú trước khi nhập cảnh Nhật. Công ty/gia đình tại Nhật nộp thay.',
    difficulty: 'hard',
    estimatedTime: '25-30 phút',
    officialUrl: 'https://www.moj.go.jp/isa/applications/procedures/16-1.html',
    pdfUrl: 'https://www.moj.go.jp/isa/content/930004029.pdf',
    excelUrl: 'https://www.moj.go.jp/isa/content/930004030.xlsx',
    fee: 'Miễn phí',
    processingTime: '1 ~ 3 tháng',
    tips: [
      'Đơn này do người ở Nhật (công ty/gia đình) nộp thay',
      'Sau khi được cấp → mang đến Đại sứ quán Nhật xin visa',
      'COE có giá trị 3 tháng（交付後3ヶ月以内に入国）',
      'Có thể nhận qua email từ 2023（電子メール受領可）',
    ],
    requiredDocs: [
      'Đơn xin（申請書）',
      'Ảnh 4×3cm',
      'Phong bì dán tem gửi lại（返信用封筒）',
      'Hợp đồng lao động / Giấy nhập học',
      'Bằng tốt nghiệp + Lý lịch',
      'Giấy tờ công ty / trường học',
    ],
    submission: {
      where: '出入国在留管理局（入管）',
      whereJp: '地方出入国在留管理局',
      hours: '9:00-12:00, 13:00-16:00（thứ 2~6）',
      howToSubmit: [
        '📥 Download form chính thức → in → điền theo thông tin đã nhập',
        '🏢 Người bảo lãnh tại Nhật nộp đại diện tại 入管局',
        '📮 Hoặc gửi qua đường bưu điện đến 入管局',
      ],
      afterSubmit: [
        '📄 Kết quả: 1~3 tháng → nhận 在留資格認定証明書',
        '✈️ Gửi giấy chứng nhận về cho người xin ở nước ngoài',
        '🏢 Người xin mang giấy đến Đại sứ quán/Lãnh sự quán Nhật để xin visa',
        '📅 Giấy chứng nhận có hiệu lực 3 tháng — phải nhập cảnh trong thời hạn',
      ],
      importantNotes: [
        '⚠️ Người nộp = người bảo lãnh tại Nhật (công ty/gia đình), KHÔNG phải người xin',
        '💡 Hồ sơ công ty đầy đủ (決算書, 登記簿) = xét duyệt nhanh hơn',
      ],
    },
    fields: [
      ...personalFields,
      { id: 'desired_status', label: 'Tư cách lưu trú muốn xin', labelJp: '希望する在留資格', type: 'select', options: [
        { value: 'engineer', label: '技術・人文知識・国際業務' },
        { value: 'student', label: '留学' },
        { value: 'family', label: '家族滞在' },
        { value: 'spouse', label: '日本人の配偶者等' },
        { value: 'specified_skilled', label: '特定技能' },
        { value: 'technical_intern', label: '技能実習' },
        { value: 'other', label: 'Khác' },
      ], required: true, section: 'Thông tin xin cấp（申請情報）' },
      { id: 'desired_period', label: 'Thời gian lưu trú', labelJp: '希望する在留期間', type: 'select', options: [
        { value: '5year', label: '5 năm' }, { value: '3year', label: '3 năm' }, { value: '1year', label: '1 năm' },
      ], required: true, section: 'Thông tin xin cấp（申請情報）' },
      { id: 'entry_date', label: 'Ngày dự kiến nhập cảnh', labelJp: '入国予定日', type: 'date', section: 'Thông tin xin cấp（申請情報）' },
      { id: 'port_of_entry', label: 'Cửa khẩu nhập cảnh', labelJp: '入国予定港', type: 'text', placeholder: '成田空港', section: 'Thông tin xin cấp（申請情報）' },
      ...addressFields,
      ...passportFields,
      ...companyFields,
      { id: 'sponsor_name', label: 'Người bảo lãnh', labelJp: '代理人（届出人）氏名', type: 'text', required: true, section: 'Người nộp đơn tại Nhật（届出人）' },
      { id: 'sponsor_relation', label: 'Quan hệ với người xin', labelJp: '申請人との関係', type: 'text', placeholder: '雇用主 / 配偶者', section: 'Người nộp đơn tại Nhật（届出人）' },
      { id: 'sponsor_address', label: 'Địa chỉ người bảo lãnh', labelJp: '届出人住所', type: 'textarea', section: 'Người nộp đơn tại Nhật（届出人）' },
      { id: 'sponsor_phone', label: 'SĐT người bảo lãnh', labelJp: '届出人電話番号', type: 'phone', section: 'Người nộp đơn tại Nhật（届出人）' },
    ],
  },
  {
    id: 'permanent-residence',
    title: 'Xin vĩnh trú (永住許可)',
    titleJp: '永住許可申請書',
    category: 'visa',
    categoryIcon: '🛂',
    description: 'Xin phép cư trú vĩnh viễn tại Nhật. Cần ở Nhật ít nhất 10 năm (hoặc 3 năm nếu vợ/chồng người Nhật).',
    difficulty: 'hard',
    estimatedTime: '30-40 phút',
    officialUrl: 'https://www.moj.go.jp/isa/applications/procedures/16-4.html',
    fee: '¥8,000',
    processingTime: '4 ~ 6 tháng',
    tips: [
      'Cần ở Nhật liên tục ít nhất 10 năm（引き続き10年以上在留）',
      'Trong 10 năm, ít nhất 5 năm có visa làm việc（就労5年以上）',
      'Vợ/chồng người Nhật: 3 năm kết hôn + 1 năm ở Nhật',
      'Không vi phạm pháp luật, đóng thuế + nenkin đầy đủ',
      'Nên có JLPT N2 trở lên（日本語能力）',
      'Thu nhập ổn định ~¥3,000,000+/năm',
    ],
    requiredDocs: [
      'Đơn xin（申請書）',
      'Ảnh 4×3cm',
      'Lý do xin vĩnh trú（理由書）',
      '在職証明書（giấy xác nhận việc làm）',
      '住民税 課税・納税証明書（5 năm gần nhất）',
      '年金記録（nenkin record 2 năm）',
      '健康保険（bảo hiểm sức khỏe 2 năm）',
      'Thư giới thiệu từ người bảo lãnh（身元保証書）',
    ],
    submission: {
      where: '出入国在留管理局（入管）',
      whereJp: '地方出入国在留管理局',
      hours: '9:00-12:00, 13:00-16:00（thứ 2~6）',
      howToSubmit: [
        '📥 Download form chính thức → in → điền theo thông tin đã nhập',
        '🏢 Nộp trực tiếp tại 入管局 (KHÔNG nộp online)',
        '📋 Hồ sơ nhiều — chuẩn bị sẵn theo thứ tự',
      ],
      afterSubmit: [
        '📄 Kết quả: 4~8 tháng (rất lâu!)',
        '📮 Nhận はがき qua bưu điện',
        '🏢 Mang はがき + 在留カード + 収入印紙 ¥8,000 đến nhận thẻ mới',
        '🎉 Thẻ mới ghi「永住者」— không có hạn tư cách (nhưng thẻ vẫn hết hạn sau 7 năm)',
      ],
      importantNotes: [
        '⚠️ Yêu cầu: ở Nhật ≥10 năm, đóng thuế + nenkin đầy đủ',
        '⚠️ Vợ/chồng người Nhật: ≥3 năm kết hôn + ≥1 năm cư trú',
        '⚠️ Không có tiền án, không vi phạm giao thông nặng',
        '💡 Thu nhập ổn định (~¥3,000,000/năm trở lên)',
      ],
    },
    fields: [
      ...personalFields,
      ...residenceFields,
      { id: 'years_in_japan', label: 'Số năm ở Nhật', labelJp: '本邦在留年数', type: 'number', required: true, section: 'Thông tin cư trú（在留情報）' },
      { id: 'reason', label: 'Lý do xin vĩnh trú', labelJp: '永住許可を申請する理由', type: 'textarea', required: true, hint: 'Viết chi tiết: lý do muốn ở lại Nhật lâu dài, kế hoạch tương lai...', section: 'Thông tin cư trú（在留情報）' },
      ...addressFields,
      ...passportFields,
      ...companyFields,
      { id: 'guarantor_name', label: 'Người bảo lãnh', labelJp: '身元保証人氏名', type: 'text', required: true, section: 'Người bảo lãnh（身元保証人）' },
      { id: 'guarantor_relation', label: 'Quan hệ', labelJp: '申請人との関係', type: 'text', placeholder: '友人 / 雇用主', section: 'Người bảo lãnh（身元保証人）' },
      { id: 'guarantor_address', label: 'Địa chỉ', labelJp: '身元保証人住所', type: 'textarea', section: 'Người bảo lãnh（身元保証人）' },
      { id: 'guarantor_occupation', label: 'Nghề nghiệp', labelJp: '身元保証人職業', type: 'text', section: 'Người bảo lãnh（身元保証人）' },
    ],
  },

  // ===== BABY =====

  // ===== WORK =====
  {
    id: 'rirekisho',
    title: 'Lý lịch (履歴書)',
    titleJp: '履歴書',
    category: 'work',
    categoryIcon: '💼',
    description: 'Tạo 履歴書 chuẩn format Nhật Bản. Dùng để xin việc, thay đổi visa, v.v.',
    difficulty: 'medium',
    estimatedTime: '20-30 phút',
    tips: [
      'Ảnh 3×4cm nền trắng, mặc vest（証明写真）',
      'Ghi ngày tháng theo 令和 hoặc 西暦（thống nhất 1 cách）',
      '志望動機（Lý do ứng tuyển）= phần quan trọng nhất!',
      'Viết tay hoặc đánh máy đều được（đánh máy phổ biến hơn）',
    ],
    submission: {
      where: 'Gửi cho nhà tuyển dụng',
      whereJp: '応募先企業',
      howToSubmit: [
        '📧 Gửi email: đính kèm file PDF',
        '📮 Gửi bưu điện: in ra → bỏ phong bì A4 → dán tem「履歴書在中」',
        '🏢 Mang trực tiếp: in ra → bỏ phong bì → nộp tại buổi phỏng vấn',
      ],
      afterSubmit: [
        '📞 Chờ liên hệ từ công ty — thường 1~2 tuần',
        '📋 Chuẩn bị thêm 職務経歴書 nếu chưa có',
      ],
      importantNotes: [
        '📸 Ảnh 4×3cm: ăn mặc formal, nền trắng/xanh nhạt',
        '✍️ Viết tay = ấn tượng tốt (一部の企業), nhưng PC cũng OK',
        '💡 Nhờ người Nhật check chính tả trước khi gửi',
      ],
    },
    fields: [
      { id: 'name_kanji', label: 'Họ tên (Kanji)', labelJp: '氏名', type: 'text', required: true, section: 'Thông tin cá nhân（個人情報）' },
      { id: 'name_furigana', label: 'Furigana', labelJp: 'ふりがな', type: 'text', required: true, section: 'Thông tin cá nhân（個人情報）' },
      { id: 'dob', label: 'Ngày sinh', labelJp: '生年月日', type: 'date', required: true, section: 'Thông tin cá nhân（個人情報）' },
      { id: 'gender', label: 'Giới tính', labelJp: '性別', type: 'radio', options: [{ value: 'male', label: 'Nam（男）' }, { value: 'female', label: 'Nữ（女）' }], section: 'Thông tin cá nhân（個人情報）' },
      { id: 'address', label: 'Địa chỉ', labelJp: '住所', type: 'textarea', required: true, section: 'Thông tin cá nhân（個人情報）' },
      { id: 'phone', label: 'SĐT', labelJp: '電話番号', type: 'phone', required: true, section: 'Thông tin cá nhân（個人情報）' },
      { id: 'email', label: 'Email', labelJp: 'メール', type: 'text', section: 'Thông tin cá nhân（個人情報）' },
      { id: 'education', label: 'Học vấn', labelJp: '学歴', type: 'textarea', placeholder: '2014/04 ○○大学 入学\n2018/03 ○○大学 卒業', required: true, section: 'Học vấn & Kinh nghiệm（学歴・職歴）' },
      { id: 'work_history', label: 'Kinh nghiệm làm việc', labelJp: '職歴', type: 'textarea', placeholder: '2018/04 株式会社○○ 入社\n2023/03 一身上の都合により退職', section: 'Học vấn & Kinh nghiệm（学歴・職歴）' },
      { id: 'licenses', label: 'Bằng cấp / Chứng chỉ', labelJp: '免許・資格', type: 'textarea', placeholder: '2020/07 JLPT N2 合格\n2021/01 普通自動車免許', section: 'Bằng cấp（免許・資格）' },
      { id: 'motivation', label: 'Lý do ứng tuyển', labelJp: '志望動機', type: 'textarea', required: true, section: 'Động lực（志望動機）' },
      { id: 'self_pr', label: 'Giới thiệu bản thân', labelJp: '自己PR', type: 'textarea', section: 'Động lực（志望動機）' },
      { id: 'commute_time', label: 'Thời gian đi làm', labelJp: '通勤時間', type: 'text', placeholder: '約1時間', section: 'Khác（その他）' },
      { id: 'dependents', label: 'Số người phụ thuộc', labelJp: '扶養家族数（配偶者を除く）', type: 'number', placeholder: '1', section: 'Khác（その他）' },
      { id: 'desired_salary', label: 'Mức lương mong muốn', labelJp: '希望給与', type: 'text', placeholder: '貴社規定に従います', section: 'Khác（その他）' },
    ],
  },

  // ===== HOUSING =====

  // ===== INSURANCE =====

  // ===== TAX =====
  {
    id: 'furusato-nozei',
    title: 'ふるさと納税 (One-stop)',
    titleJp: 'ワンストップ特例申請書',
    category: 'tax',
    categoryIcon: '💰',
    description: 'Nộp đơn one-stop cho ふるさと納税. Không cần khai 確定申告 nếu donate ≤5 nơi.',
    difficulty: 'easy',
    estimatedTime: '5 phút',
    fee: 'Miễn phí',
    tips: [
      'Chỉ dùng được nếu donate ≤5 地方自治体/năm',
      'Nộp trước ngày 10/01 năm sau（翌年1月10日必着）',
      'Nếu đã nộp 確定申告 → one-stop bị vô hiệu, phải khai trong 確定申告',
      'Mỗi lần donate → nộp 1 đơn one-stop',
    ],
    submission: {
      where: '自治体 (chính quyền nơi bạn donate)',
      whereJp: 'ふるさと納税先の自治体',
      howToSubmit: [
        '📮 Gửi bưu điện đến 自治体 ghi trên 受領書',
        '📋 In form → điền → ký tên → gửi kèm bản copy My Number Card (mặt trước + sau)',
        '⏰ Gửi trước ngày 10/1 năm sau (VD: donate 2025 → gửi trước 10/1/2026)',
      ],
      afterSubmit: [
        '✅ Tự động khấu trừ 住民税 năm sau — không cần 確定申告',
        '📄 Nhận giấy xác nhận qua bưu điện',
      ],
      importantNotes: [
        '⚠️ One-stop chỉ áp dụng nếu donate ≤ 5 nơi/năm',
        '⚠️ Nếu > 5 nơi → phải làm 確定申告 thay thế',
        '⚠️ Nghỉ việc giữa năm / có thu nhập phụ → one-stop KHÔNG dùng được → phải 確定申告',
      ],
    },
    fields: [
      { id: 'name', label: 'Họ tên', labelJp: '氏名', type: 'text', required: true, section: 'Thông tin（申請者）' },
      { id: 'my_number', label: 'My Number', labelJp: 'マイナンバー', type: 'text', required: true, section: 'Thông tin（申請者）' },
      { id: 'address', label: 'Địa chỉ', labelJp: '住所', type: 'textarea', required: true, section: 'Thông tin（申請者）' },
      { id: 'phone', label: 'SĐT', labelJp: '電話番号', type: 'phone', section: 'Thông tin（申請者）' },
      { id: 'donation_date', label: 'Ngày donate', labelJp: '寄附年月日', type: 'date', required: true, section: 'Chi tiết donate（寄附内容）' },
      { id: 'donation_amount', label: 'Số tiền (¥)', labelJp: '寄附金額', type: 'number', required: true, section: 'Chi tiết donate（寄附内容）' },
      { id: 'municipality', label: 'Nơi nhận (市町村)', labelJp: '寄附先の自治体', type: 'text', required: true, section: 'Chi tiết donate（寄附内容）' },
    ],
  },
]
