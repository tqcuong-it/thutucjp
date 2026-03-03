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
const personalFields: FormField[] = [
  { id: 'nationality', label: 'Quốc tịch', labelJp: '国籍・地域', type: 'text', placeholder: 'ベトナム', required: true, section: 'Thông tin cá nhân（個人情報）' },
  { id: 'name_romaji', label: 'Họ tên (chữ La-tinh)', labelJp: '氏名（ローマ字）', type: 'text', placeholder: 'NGUYEN VAN A', required: true, section: 'Thông tin cá nhân（個人情報）' },
  { id: 'name_kanji', label: 'Họ tên (Kanji)', labelJp: '氏名（漢字）', type: 'text', hint: 'Nếu không có kanji thì bỏ trống', section: 'Thông tin cá nhân（個人情報）' },
  { id: 'dob', label: 'Ngày sinh', labelJp: '生年月日', type: 'date', required: true, section: 'Thông tin cá nhân（個人情報）' },
  { id: 'gender', label: 'Giới tính', labelJp: '性別', type: 'radio', options: [{ value: 'male', label: 'Nam（男）' }, { value: 'female', label: 'Nữ（女）' }], required: true, section: 'Thông tin cá nhân（個人情報）' },
  { id: 'marital_status', label: 'Tình trạng hôn nhân', labelJp: '配偶者の有無', type: 'radio', options: [{ value: 'married', label: 'Đã kết hôn（有）' }, { value: 'single', label: 'Chưa kết hôn（無）' }], required: true, section: 'Thông tin cá nhân（個人情報）' },
]

const residenceFields: FormField[] = [
  { id: 'residence_card_no', label: 'Số thẻ cư trú', labelJp: '在留カード番号', type: 'text', placeholder: 'AB12345678CD', required: true, section: 'Thông tin cư trú（在留情報）' },
  { id: 'current_status', label: 'Tư cách lưu trú hiện tại', labelJp: '在留資格', type: 'select', options: [
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
    { value: 'other', label: 'Khác' },
  ], required: true, section: 'Thông tin cư trú（在留情報）' },
  { id: 'expiry_date', label: 'Ngày hết hạn visa', labelJp: '在留期間の満了日', type: 'date', required: true, section: 'Thông tin cư trú（在留情報）' },
]

const addressFields: FormField[] = [
  { id: 'postal_code', label: 'Mã bưu điện', labelJp: '郵便番号', type: 'text', placeholder: '123-4567', required: true, section: 'Địa chỉ & Liên lạc（住所・連絡先）' },
  { id: 'address', label: 'Địa chỉ tại Nhật', labelJp: '住居地', type: 'textarea', placeholder: '東京都新宿区○○1-2-3', required: true, section: 'Địa chỉ & Liên lạc（住所・連絡先）' },
  { id: 'phone', label: 'Số điện thoại', labelJp: '電話番号', type: 'phone', placeholder: '080-XXXX-XXXX', required: true, section: 'Địa chỉ & Liên lạc（住所・連絡先）' },
  { id: 'email', label: 'Email', labelJp: '電子メール', type: 'text', placeholder: 'email@example.com', section: 'Địa chỉ & Liên lạc（住所・連絡先）' },
]

const passportFields: FormField[] = [
  { id: 'passport_no', label: 'Số hộ chiếu', labelJp: '旅券番号', type: 'text', required: true, section: 'Hộ chiếu（旅券）' },
  { id: 'passport_expiry', label: 'Ngày hết hạn hộ chiếu', labelJp: '旅券有効期限', type: 'date', required: true, section: 'Hộ chiếu（旅券）' },
]

const companyFields: FormField[] = [
  { id: 'company_name', label: 'Tên công ty', labelJp: '勤務先名称', type: 'text', placeholder: '株式会社 ○○', required: true, section: 'Công việc（勤務先）' },
  { id: 'company_address', label: 'Địa chỉ công ty', labelJp: '勤務先所在地', type: 'textarea', placeholder: '東京都○○区...', required: true, section: 'Công việc（勤務先）' },
  { id: 'company_phone', label: 'SĐT công ty', labelJp: '勤務先電話番号', type: 'phone', section: 'Công việc（勤務先）' },
  { id: 'job_description', label: 'Nội dung công việc', labelJp: '職務内容', type: 'textarea', placeholder: 'システム開発、プログラミング...', section: 'Công việc（勤務先）' },
  { id: 'salary', label: 'Thu nhập hàng năm (¥)', labelJp: '年収', type: 'number', placeholder: '4800000', hint: 'Tổng thu nhập trước thuế', section: 'Công việc（勤務先）' },
]

const bankFields: FormField[] = [
  { id: 'bank_name', label: 'Ngân hàng', labelJp: '金融機関名', type: 'text', placeholder: '楽天銀行', required: true, section: 'Tài khoản nhận tiền（振込先）' },
  { id: 'branch_name', label: 'Chi nhánh', labelJp: '支店名', type: 'text', required: true, section: 'Tài khoản nhận tiền（振込先）' },
  { id: 'account_type', label: 'Loại tài khoản', labelJp: '口座種別', type: 'radio', options: [{ value: 'normal', label: 'Thường（普通）' }, { value: 'current', label: 'Vãng lai（当座）' }], required: true, section: 'Tài khoản nhận tiền（振込先）' },
  { id: 'account_no', label: 'Số tài khoản', labelJp: '口座番号', type: 'text', required: true, section: 'Tài khoản nhận tiền（振込先）' },
  { id: 'account_holder', label: 'Tên chủ tài khoản (カタカナ)', labelJp: '口座名義（カタカナ）', type: 'text', required: true, section: 'Tài khoản nhận tiền（振込先）' },
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
    fields: [
      ...personalFields,
      ...residenceFields,
      { id: 'desired_period', label: 'Thời gian muốn gia hạn', labelJp: '希望する在留期間', type: 'select', options: [
        { value: '5year', label: '5 năm' }, { value: '3year', label: '3 năm' }, { value: '1year', label: '1 năm' },
      ], required: true, section: 'Thông tin cư trú（在留情報）' },
      ...addressFields,
      ...passportFields,
      ...companyFields,
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
    fields: [
      ...personalFields,
      ...residenceFields,
      { id: 'new_status', label: 'Tư cách lưu trú muốn đổi sang', labelJp: '変更を希望する在留資格', type: 'select', options: [
        { value: 'engineer', label: '技術・人文知識・国際業務（Kỹ sư/Nhân văn）' },
        { value: 'spouse', label: '日本人の配偶者等（Vợ/chồng người Nhật）' },
        { value: 'family', label: '家族滞在（Gia đình）' },
        { value: 'specified_skilled', label: '特定技能（Kỹ năng đặc định）' },
        { value: 'business_manager', label: '経営・管理（Kinh doanh）' },
        { value: 'designated', label: '特定活動（Hoạt động đặc biệt）' },
        { value: 'long_term', label: '定住者（Định cư）' },
        { value: 'other', label: 'Khác' },
      ], required: true, section: 'Thông tin cư trú（在留情報）' },
      { id: 'reason', label: 'Lý do đổi tư cách', labelJp: '変更の理由', type: 'textarea', required: true, hint: 'VD: Tốt nghiệp đại học, xin được việc tại công ty ○○', section: 'Thông tin cư trú（在留情報）' },
      ...addressFields,
      ...passportFields,
      ...companyFields,
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
