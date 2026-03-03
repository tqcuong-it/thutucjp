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
  fields: FormField[]
  tips?: string[]
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
    description: 'Gia hạn visa, đổi tư cách lưu trú, xin vĩnh trú',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
  },
  {
    id: 'baby',
    icon: '👶',
    title: 'Thai sản & Trẻ em',
    description: 'Trợ cấp sinh con, nghỉ thai sản, phụ cấp trẻ em',
    color: 'bg-pink-50 border-pink-200 text-pink-700',
  },
  {
    id: 'tax',
    icon: '💰',
    title: 'Thuế & Nenkin',
    description: 'Khai thuế, năm cuối, nenkin, ふるさと納税',
    color: 'bg-green-50 border-green-200 text-green-700',
  },
  {
    id: 'work',
    icon: '💼',
    title: 'Việc làm & CV',
    description: '履歴書, 職務経歴書, 退職届, thất nghiệp',
    color: 'bg-amber-50 border-amber-200 text-amber-700',
  },
  {
    id: 'housing',
    icon: '🏠',
    title: 'Nhà ở & Chuyển nhà',
    description: 'Hợp đồng thuê, 転出届, 転入届, đăng ký địa chỉ',
    color: 'bg-purple-50 border-purple-200 text-purple-700',
  },
  {
    id: 'car',
    icon: '🚗',
    title: 'Xe & Bằng lái',
    description: 'Đổi bằng lái, đăng kiểm, thuế xe',
    color: 'bg-orange-50 border-orange-200 text-orange-700',
  },
  {
    id: 'insurance',
    icon: '🏥',
    title: 'Bảo hiểm & Y tế',
    description: '健康保険, 国民健康保険, trợ cấp ốm đau',
    color: 'bg-red-50 border-red-200 text-red-700',
  },
  {
    id: 'other',
    icon: '📋',
    title: 'Khác',
    description: 'My Number, tài khoản ngân hàng, ủy quyền',
    color: 'bg-gray-50 border-gray-200 text-gray-700',
  },
]

// First form: 在留期間更新許可申請 (Visa extension)
export const forms: FormTemplate[] = [
  {
    id: 'visa-extension',
    title: 'Gia hạn visa (在留期間更新)',
    titleJp: '在留期間更新許可申請書',
    category: 'visa',
    categoryIcon: '🛂',
    description: 'Đơn xin gia hạn thời gian lưu trú tại Nhật Bản. Nộp tại 入国管理局 trước khi visa hết hạn 3 tháng.',
    difficulty: 'medium',
    estimatedTime: '15-20 phút',
    tips: [
      'Nộp trước khi visa hết hạn ít nhất 3 tháng',
      'Mang theo hộ chiếu + thẻ cư trú (在留カード) gốc',
      'Cần ảnh 4x3cm chụp trong 3 tháng gần nhất',
      'Phí: ¥4,000 (tem thu nhập)',
    ],
    fields: [
      // Section 1: Thông tin cá nhân
      { id: 'nationality', label: 'Quốc tịch', labelJp: '国籍・地域', type: 'text', placeholder: 'Việt Nam', required: true, section: 'Thông tin cá nhân' },
      { id: 'name_kanji', label: 'Họ tên (Kanji/Hán tự)', labelJp: '氏名（漢字）', type: 'text', placeholder: '', hint: 'Nếu không có kanji thì bỏ trống', section: 'Thông tin cá nhân' },
      { id: 'name_romaji', label: 'Họ tên (La-tinh)', labelJp: '氏名（ローマ字）', type: 'text', placeholder: 'NGUYEN VAN A', required: true, section: 'Thông tin cá nhân' },
      { id: 'dob', label: 'Ngày sinh', labelJp: '生年月日', type: 'date', required: true, section: 'Thông tin cá nhân' },
      { id: 'gender', label: 'Giới tính', labelJp: '性別', type: 'radio', options: [{ value: 'male', label: 'Nam (男)' }, { value: 'female', label: 'Nữ (女)' }], required: true, section: 'Thông tin cá nhân' },
      { id: 'marital_status', label: 'Tình trạng hôn nhân', labelJp: '配偶者の有無', type: 'radio', options: [{ value: 'married', label: 'Đã kết hôn (有)' }, { value: 'single', label: 'Chưa kết hôn (無)' }], required: true, section: 'Thông tin cá nhân' },

      // Section 2: Thông tin cư trú
      { id: 'residence_card_no', label: 'Số thẻ cư trú', labelJp: '在留カード番号', type: 'text', placeholder: 'AB12345678CD', required: true, section: 'Thông tin cư trú' },
      { id: 'current_status', label: 'Tư cách lưu trú hiện tại', labelJp: '在留資格', type: 'select', options: [
        { value: 'engineer', label: '技術・人文知識・国際業務' },
        { value: 'spouse', label: '日本人の配偶者等' },
        { value: 'family', label: '家族滞在' },
        { value: 'permanent', label: '永住者' },
        { value: 'student', label: '留学' },
        { value: 'specified', label: '特定技能' },
        { value: 'other', label: 'Khác' },
      ], required: true, section: 'Thông tin cư trú' },
      { id: 'expiry_date', label: 'Ngày hết hạn visa', labelJp: '在留期間の満了日', type: 'date', required: true, section: 'Thông tin cư trú' },
      { id: 'desired_period', label: 'Thời gian muốn gia hạn', labelJp: '希望する在留期間', type: 'select', options: [
        { value: '5year', label: '5 năm' },
        { value: '3year', label: '3 năm' },
        { value: '1year', label: '1 năm' },
      ], required: true, section: 'Thông tin cư trú' },

      // Section 3: Địa chỉ & Liên lạc
      { id: 'postal_code', label: 'Mã bưu điện', labelJp: '郵便番号', type: 'text', placeholder: '123-4567', required: true, section: 'Địa chỉ & Liên lạc' },
      { id: 'address', label: 'Địa chỉ tại Nhật', labelJp: '住居地', type: 'textarea', placeholder: '東京都新宿区○○1-2-3 マンション101', required: true, section: 'Địa chỉ & Liên lạc' },
      { id: 'phone', label: 'Số điện thoại', labelJp: '電話番号', type: 'phone', placeholder: '080-XXXX-XXXX', required: true, section: 'Địa chỉ & Liên lạc' },
      { id: 'email', label: 'Email', labelJp: '電子メール', type: 'text', placeholder: 'email@example.com', section: 'Địa chỉ & Liên lạc' },

      // Section 4: Passport
      { id: 'passport_no', label: 'Số hộ chiếu', labelJp: '旅券番号', type: 'text', required: true, section: 'Hộ chiếu' },
      { id: 'passport_expiry', label: 'Ngày hết hạn hộ chiếu', labelJp: '旅券有効期限', type: 'date', required: true, section: 'Hộ chiếu' },

      // Section 5: Công việc
      { id: 'company_name', label: 'Tên công ty', labelJp: '勤務先名称', type: 'text', placeholder: '株式会社 ○○', required: true, section: 'Công việc' },
      { id: 'company_address', label: 'Địa chỉ công ty', labelJp: '勤務先所在地', type: 'textarea', placeholder: '東京都港区...', required: true, section: 'Công việc' },
      { id: 'company_phone', label: 'SĐT công ty', labelJp: '勤務先電話番号', type: 'phone', section: 'Công việc' },
      { id: 'salary', label: 'Thu nhập hàng năm (¥)', labelJp: '年収', type: 'number', placeholder: '4800000', hint: 'Tổng thu nhập trước thuế', section: 'Công việc' },
    ],
  },
  {
    id: 'birth-allowance',
    title: 'Trợ cấp sinh con (出産育児一時金)',
    titleJp: '出産育児一時金支給申請書',
    category: 'baby',
    categoryIcon: '👶',
    description: 'Đơn xin trợ cấp sinh con ¥500,000. Áp dụng cho tất cả người có bảo hiểm sức khỏe tại Nhật.',
    difficulty: 'easy',
    estimatedTime: '10 phút',
    tips: [
      'Trợ cấp: ¥500,000/bé (từ 2023)',
      'Nộp cho bảo hiểm sức khỏe (健保 hoặc 国保)',
      'Thường bệnh viện làm giúp (直接支払制度)',
      'Nếu bệnh viện không hỗ trợ → tự nộp sau sinh',
    ],
    fields: [
      { id: 'parent_name', label: 'Họ tên người xin', labelJp: '被保険者氏名', type: 'text', required: true, section: 'Thông tin người xin' },
      { id: 'insurance_no', label: 'Số bảo hiểm', labelJp: '被保険者証の番号', type: 'text', required: true, section: 'Thông tin người xin' },
      { id: 'dob_parent', label: 'Ngày sinh', labelJp: '生年月日', type: 'date', required: true, section: 'Thông tin người xin' },
      { id: 'address', label: 'Địa chỉ', labelJp: '住所', type: 'textarea', required: true, section: 'Thông tin người xin' },
      { id: 'phone', label: 'SĐT', labelJp: '電話番号', type: 'phone', required: true, section: 'Thông tin người xin' },

      { id: 'baby_name', label: 'Tên bé', labelJp: '出生児氏名', type: 'text', section: 'Thông tin em bé' },
      { id: 'baby_dob', label: 'Ngày sinh bé', labelJp: '出産年月日', type: 'date', required: true, section: 'Thông tin em bé' },
      { id: 'hospital_name', label: 'Tên bệnh viện', labelJp: '出産した医療機関', type: 'text', required: true, section: 'Thông tin em bé' },

      { id: 'bank_name', label: 'Ngân hàng', labelJp: '金融機関名', type: 'text', placeholder: '楽天銀行', required: true, section: 'Tài khoản nhận tiền' },
      { id: 'branch_name', label: 'Chi nhánh', labelJp: '支店名', type: 'text', required: true, section: 'Tài khoản nhận tiền' },
      { id: 'account_type', label: 'Loại tài khoản', labelJp: '口座種別', type: 'radio', options: [{ value: 'normal', label: 'Thường (普通)' }, { value: 'current', label: 'Vãng lai (当座)' }], required: true, section: 'Tài khoản nhận tiền' },
      { id: 'account_no', label: 'Số tài khoản', labelJp: '口座番号', type: 'text', required: true, section: 'Tài khoản nhận tiền' },
    ],
  },
  {
    id: 'child-allowance',
    title: 'Phụ cấp trẻ em (児童手当)',
    titleJp: '児童手当認定請求書',
    category: 'baby',
    categoryIcon: '👶',
    description: 'Đăng ký phụ cấp trẻ em hàng tháng. ¥15,000/tháng (dưới 3 tuổi), ¥10,000 (3 tuổi~).',
    difficulty: 'easy',
    estimatedTime: '10 phút',
    tips: [
      'Nộp tại 市区町村役場 trong vòng 15 ngày sau sinh',
      'Mang theo: 在留カード, 健康保険証, thẻ My Number, sổ ngân hàng',
      '¥15,000/tháng cho bé dưới 3 tuổi',
      '¥10,000/tháng cho bé 3 tuổi trở lên',
    ],
    fields: [
      { id: 'parent_name', label: 'Họ tên người xin', labelJp: '請求者氏名', type: 'text', required: true, section: 'Thông tin người xin' },
      { id: 'dob_parent', label: 'Ngày sinh', labelJp: '生年月日', type: 'date', required: true, section: 'Thông tin người xin' },
      { id: 'address', label: 'Địa chỉ', labelJp: '住所', type: 'textarea', required: true, section: 'Thông tin người xin' },
      { id: 'phone', label: 'SĐT', labelJp: '電話番号', type: 'phone', required: true, section: 'Thông tin người xin' },
      { id: 'my_number', label: 'Số My Number', labelJp: 'マイナンバー', type: 'text', placeholder: '1234 5678 9012', required: true, section: 'Thông tin người xin' },

      { id: 'child_name', label: 'Tên con', labelJp: '児童氏名', type: 'text', required: true, section: 'Thông tin trẻ em' },
      { id: 'child_dob', label: 'Ngày sinh con', labelJp: '児童の生年月日', type: 'date', required: true, section: 'Thông tin trẻ em' },
      { id: 'relationship', label: 'Quan hệ', labelJp: '請求者との続柄', type: 'select', options: [
        { value: 'father', label: 'Bố (父)' }, { value: 'mother', label: 'Mẹ (母)' },
      ], required: true, section: 'Thông tin trẻ em' },

      { id: 'insurance_type', label: 'Loại bảo hiểm', labelJp: '加入年金', type: 'select', options: [
        { value: 'kosei', label: '厚生年金 (Công ty)' },
        { value: 'kokumin', label: '国民年金 (Tự đóng)' },
      ], required: true, section: 'Bảo hiểm' },

      { id: 'bank_name', label: 'Ngân hàng', labelJp: '金融機関名', type: 'text', required: true, section: 'Tài khoản nhận tiền' },
      { id: 'branch_name', label: 'Chi nhánh', labelJp: '支店名', type: 'text', required: true, section: 'Tài khoản nhận tiền' },
      { id: 'account_no', label: 'Số tài khoản', labelJp: '口座番号', type: 'text', required: true, section: 'Tài khoản nhận tiền' },
    ],
  },
  {
    id: 'rirekisho',
    title: 'Lý lịch (履歴書)',
    titleJp: '履歴書',
    category: 'work',
    categoryIcon: '💼',
    description: 'Tạo履歴書 chuẩn format Nhật Bản. Xuất PDF để in hoặc nộp online.',
    difficulty: 'medium',
    estimatedTime: '20-30 phút',
    tips: [
      'Ảnh 3x4cm nền trắng, mặc vest',
      'Viết tay hoặc đánh máy đều được (đánh máy phổ biến hơn)',
      'Ghi ngày tháng theo lịch Nhật (令和) hoặc Tây (西暦)',
      'Lý do xin việc (志望動機) là phần quan trọng nhất!',
    ],
    fields: [
      { id: 'name_kanji', label: 'Họ tên (Kanji)', labelJp: '氏名', type: 'text', required: true, section: 'Thông tin cá nhân' },
      { id: 'name_furigana', label: 'Furigana', labelJp: 'ふりがな', type: 'text', required: true, section: 'Thông tin cá nhân' },
      { id: 'dob', label: 'Ngày sinh', labelJp: '生年月日', type: 'date', required: true, section: 'Thông tin cá nhân' },
      { id: 'gender', label: 'Giới tính', labelJp: '性別', type: 'radio', options: [{ value: 'male', label: 'Nam (男)' }, { value: 'female', label: 'Nữ (女)' }], section: 'Thông tin cá nhân' },
      { id: 'address', label: 'Địa chỉ', labelJp: '住所', type: 'textarea', required: true, section: 'Thông tin cá nhân' },
      { id: 'phone', label: 'SĐT', labelJp: '電話番号', type: 'phone', required: true, section: 'Thông tin cá nhân' },
      { id: 'email', label: 'Email', labelJp: 'メール', type: 'text', section: 'Thông tin cá nhân' },

      { id: 'education', label: 'Học vấn', labelJp: '学歴', type: 'textarea', placeholder: '2014/04 ○○大学 入学\n2018/03 ○○大学 卒業', required: true, section: 'Học vấn & Kinh nghiệm' },
      { id: 'work_history', label: 'Kinh nghiệm làm việc', labelJp: '職歴', type: 'textarea', placeholder: '2018/04 株式会社○○ 入社\n2023/03 一身上の都合により退職', section: 'Học vấn & Kinh nghiệm' },

      { id: 'licenses', label: 'Bằng cấp / Chứng chỉ', labelJp: '免許・資格', type: 'textarea', placeholder: '2020/07 JLPT N2 合格\n2021/01 普通自動車免許', section: 'Bằng cấp' },

      { id: 'motivation', label: 'Lý do ứng tuyển', labelJp: '志望動機', type: 'textarea', required: true, section: 'Động lực' },
      { id: 'self_pr', label: 'Giới thiệu bản thân', labelJp: '自己PR', type: 'textarea', section: 'Động lực' },
      { id: 'commute_time', label: 'Thời gian đi làm', labelJp: '通勤時間', type: 'text', placeholder: '約1時間', section: 'Khác' },
      { id: 'dependents', label: 'Số người phụ thuộc', labelJp: '扶養家族数', type: 'number', placeholder: '2', section: 'Khác' },
    ],
  },
]
