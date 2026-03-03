export interface GuideStep {
  title: string
  description: string
  tips?: string[]
  warning?: string
}

export interface Guide {
  id: string
  title: string
  titleJp: string
  category: string
  categoryIcon: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: string
  fee?: string
  deadline?: string
  where: string
  steps: GuideStep[]
  requiredDocs: string[]
  faq?: { q: string; a: string }[]
  relatedLinks?: { label: string; url: string }[]
}

export const guides: Guide[] = [
  {
    id: 'move-out',
    title: 'Chuyển đi — Đăng ký 転出届',
    titleJp: '転出届',
    category: 'housing',
    categoryIcon: '🏠',
    description: 'Khi chuyển nhà sang quận/thành phố khác, phải nộp 転出届 tại nơi đang ở trước khi chuyển.',
    difficulty: 'easy',
    estimatedTime: '30 phút (tại quầy)',
    fee: 'Miễn phí',
    deadline: '14 ngày trước ~ ngày chuyển nhà',
    where: '市区町村役場（市役所/区役所） — quầy 住民課 hoặc 戸籍住民課',
    steps: [
      {
        title: '1. Chuẩn bị giấy tờ',
        description: 'Mang theo: thẻ cư trú（在留カード）, My Number Card（マイナンバーカード）hoặc 通知カード, và ấn章（印鑑）nếu có.',
        tips: [
          'Nếu dùng My Number Card → có thể làm 特例転出（không cần giấy 転出証明書）',
          'Mang theo cả giấy tờ của người cùng chuyển (vợ/chồng, con)',
        ],
      },
      {
        title: '2. Đến 市役所/区役所',
        description: 'Đến quầy 住民課（じゅうみんか）hoặc 戸籍住民課. Nói: 「転出届を出したいです」(Tôi muốn nộp đơn chuyển đi).',
        tips: [
          'Giờ mở: thường 8:30-17:00 ngày thường (thứ 2~6)',
          'Một số nơi mở cả thứ 7 buổi sáng — check website 市役所',
          'Có thể đặt lịch online (予約) ở một số thành phố lớn',
        ],
      },
      {
        title: '3. Điền đơn 転出届',
        description: 'Nhân viên sẽ đưa form 転出届. Điền: họ tên, địa chỉ cũ, địa chỉ mới, ngày chuyển (dự kiến), họ tên người cùng chuyển.',
        tips: [
          'Nếu không biết viết tiếng Nhật → nhờ nhân viên giúp, họ rất thân thiện',
          'Cần biết trước địa chỉ mới chính xác (đến số phòng)',
        ],
        warning: 'Địa chỉ mới phải chính xác — sai sẽ ảnh hưởng thư từ, bảo hiểm, thuế!',
      },
      {
        title: '4. Nhận 転出証明書',
        description: 'Sau khi nộp, nhận giấy 転出証明書（てんしゅつしょうめいしょ）. Đây là giấy chứng nhận bạn đã đăng ký chuyển đi.',
        tips: [
          'GIỮ GIẤY NÀY CẨN THẬN — cần nộp ở nơi mới (転入届)',
          'Nếu dùng My Number Card → không cần giấy này (特例転出)',
        ],
        warning: '転出証明書 mất không cấp lại được dễ dàng!',
      },
      {
        title: '5. Các thay đổi liên quan',
        description: 'Đồng thời hỏi nhân viên về:',
        tips: [
          '国民健康保険 — nếu đang tham gia, cần trả thẻ bảo hiểm',
          '児童手当 — nếu đang nhận, cần báo chuyển',
          '印鑑登録 — tự động hủy khi chuyển đi',
          'ゴミ — trả thẻ vứt rác nếu có (tùy 市)',
        ],
      },
      {
        title: '6. Sau khi chuyển → Nộp 転入届 ở nơi mới',
        description: 'Trong vòng 14 ngày sau khi chuyển đến, mang 転出証明書 đến 市役所 nơi mới để nộp 転入届.',
        warning: 'Quá 14 ngày → có thể bị phạt 50,000¥ (lý thuyết, thực tế hiếm khi phạt nhưng tránh để muộn).',
      },
    ],
    requiredDocs: [
      '在留カード（thẻ cư trú）',
      'マイナンバーカード hoặc 通知カード',
      '印鑑（con dấu）— tùy 市 có yêu cầu hay không',
      '国民健康保険証（nếu có）',
    ],
    faq: [
      {
        q: 'Chuyển nhà trong cùng thành phố thì sao?',
        a: 'Nộp 転居届（てんきょとどけ）thay vì 転出届. Không cần 転出証明書.',
      },
      {
        q: 'Có thể nộp online không?',
        a: 'Một số thành phố hỗ trợ qua マイナポータル (myna.go.jp). Cần My Number Card + smartphone NFC.',
      },
      {
        q: 'Quên nộp trước khi chuyển thì sao?',
        a: 'Vẫn nộp được sau khi chuyển — nhưng nên liên hệ 市役所 cũ qua điện thoại trước.',
      },
    ],
    relatedLinks: [
      { label: 'マイナポータル — 転出届オンライン', url: 'https://myna.go.jp/' },
      { label: 'Hướng dẫn chuyển nhà (入管庁)', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00014.html' },
    ],
  },
  {
    id: 'move-in',
    title: 'Chuyển đến — Đăng ký 転入届',
    titleJp: '転入届',
    category: 'housing',
    categoryIcon: '🏠',
    description: 'Sau khi chuyển đến nơi mới, nộp 転入届 trong vòng 14 ngày tại 市区町村役場 nơi mới.',
    difficulty: 'easy',
    estimatedTime: '30-60 phút (tại quầy)',
    fee: 'Miễn phí',
    deadline: '14 ngày sau khi chuyển đến',
    where: '市区町村役場（市役所/区役所）nơi MỚI — quầy 住民課',
    steps: [
      {
        title: '1. Chuẩn bị giấy tờ',
        description: 'Mang theo: 転出証明書（nhận từ nơi cũ）, 在留カード, マイナンバーカード, 印鑑.',
        tips: [
          'Nếu 特例転出（dùng My Number Card）→ không cần 転出証明書',
          'Mang theo giấy tờ gia đình nếu cùng chuyển',
        ],
      },
      {
        title: '2. Đến 市役所 nơi mới',
        description: 'Đến quầy 住民課. Nói: 「転入届を出したいです」',
        tips: [
          'Hẹn đi vào buổi sáng để tránh đông',
          'Thứ 2 đầu tháng thường rất đông — tránh nếu được',
        ],
      },
      {
        title: '3. Điền đơn 転入届 + nộp 転出証明書',
        description: 'Điền form 転入届: họ tên, địa chỉ mới, ngày chuyển đến. Nộp kèm 転出証明書.',
      },
      {
        title: '4. Cập nhật thẻ cư trú（在留カード）',
        description: 'Nhân viên sẽ ghi địa chỉ mới vào mặt sau thẻ cư trú（在留カード裏面）.',
        warning: 'BẮT BUỘC cho người nước ngoài — không cập nhật trong 14 ngày có thể ảnh hưởng gia hạn visa!',
      },
      {
        title: '5. Cập nhật My Number Card',
        description: 'Nếu có マイナンバーカード → nhân viên sẽ cập nhật địa chỉ. Cần nhập mã PIN (数字4桁).',
        tips: [
          'Quên PIN → phải reset tại 市役所 (mất thêm thời gian)',
        ],
      },
      {
        title: '6. Đăng ký lại các dịch vụ',
        description: 'Tại 市役所, đồng thời làm:',
        tips: [
          '国民健康保険 — đăng ký mới nếu cần',
          '児童手当 — nộp đơn 認定請求書 trong 15 ngày',
          '印鑑登録 — đăng ký lại con dấu nếu cần',
          '学校 — nếu có con → xin giấy chuyển trường',
        ],
      },
      {
        title: '7. Thay đổi địa chỉ ở các nơi khác',
        description: 'Nhớ báo thay đổi địa chỉ cho:',
        tips: [
          '銀行（ngân hàng）— đổi online hoặc tại chi nhánh',
          '会社（công ty）— báo HR',
          '郵便局（bưu điện）— nộp 転居届 để forward thư 1 năm',
          '電気・ガス・水道（điện/gas/nước）— đăng ký mới',
          '携帯（điện thoại）— đổi địa chỉ online',
          '保険会社（bảo hiểm）— báo thay đổi',
          '運転免許（bằng lái）— đổi tại 警察署 hoặc 免許センター',
        ],
      },
    ],
    requiredDocs: [
      '転出証明書（từ 市役所 cũ）',
      '在留カード（thẻ cư trú）',
      'マイナンバーカード + PIN (4 số)',
      '印鑑（con dấu）',
      'Hộ chiếu（一部の市区町村で必要）',
    ],
    faq: [
      {
        q: 'Bao lâu thì xong?',
        a: 'Thường 30-60 phút. Nếu đăng ký thêm bảo hiểm, 児童手当 thì ~1-2 tiếng.',
      },
      {
        q: 'Vợ/chồng có cần đi cùng không?',
        a: 'Không bắt buộc — 1 người đại diện hộ gia đình（世帯主）nộp cho cả nhà được.',
      },
      {
        q: 'Forward thư là gì?',
        a: 'Nộp 転居届 tại bưu điện → tất cả thư gửi đến địa chỉ cũ sẽ tự chuyển đến địa chỉ mới trong 1 năm. Miễn phí. Làm online: e-tenkyo.post.japanpost.jp',
      },
    ],
    relatedLinks: [
      { label: 'e転居 — Forward thư online', url: 'https://welcometown.post.japanpost.jp/etn/' },
      { label: 'マイナポータル', url: 'https://myna.go.jp/' },
    ],
  },
  {
    id: 'birth-allowance',
    title: 'Trợ cấp sinh con ¥500,000（出産育児一時金）',
    titleJp: '出産育児一時金',
    category: 'baby',
    categoryIcon: '👶',
    description: 'Mỗi bé sinh ra được trợ cấp ¥500,000. Áp dụng cho tất cả người có bảo hiểm sức khỏe tại Nhật.',
    difficulty: 'easy',
    estimatedTime: '15 phút (nếu bệnh viện làm giúp)',
    fee: 'Miễn phí',
    deadline: '2 năm kể từ ngày sinh',
    where: 'Bệnh viện (直接支払制度) hoặc 健保組合/市役所',
    steps: [
      {
        title: '1. Hiểu 2 cách nhận tiền',
        description: 'Có 2 cách nhận trợ cấp:',
        tips: [
          '🏥 **Cách 1: 直接支払制度（ちょくせつしはらい）** — Bệnh viện làm giúp, phổ biến nhất (90% bệnh viện). Bạn chỉ trả phần chênh lệch.',
          '📋 **Cách 2: Tự nộp đơn** — Nếu bệnh viện không hỗ trợ, hoặc sinh ở nước ngoài. Tự nộp cho bảo hiểm sau sinh.',
        ],
      },
      {
        title: '2. Cách 1: 直接支払制度 (phổ biến nhất)',
        description: 'Khi nhập viện sinh, bệnh viện sẽ đưa form 「直接支払制度利用合意書」. Ký tên là xong!',
        tips: [
          'Bệnh viện tự claim ¥500,000 từ bảo hiểm',
          'Bạn chỉ trả phần vượt — VD: phí sinh ¥600,000 → bạn trả ¥100,000',
          'Nếu phí sinh < ¥500,000 → bạn được trả lại phần thừa (差額)',
        ],
      },
      {
        title: '3. Nếu phí sinh < ¥500,000 → Xin hoàn tiền chênh lệch',
        description: 'Nộp đơn 差額申請 cho bảo hiểm để nhận lại phần thừa.',
        tips: [
          '健保組合 (bảo hiểm công ty) → hỏi HR hoặc liên hệ 健保 trực tiếp',
          '国保 (bảo hiểm quốc dân) → nộp tại 市役所',
          'Thường nhận tiền sau 1-2 tháng qua chuyển khoản',
        ],
      },
      {
        title: '4. Cách 2: Tự nộp đơn (nếu bệnh viện không hỗ trợ)',
        description: 'Nộp cho: 健保組合（bảo hiểm công ty）hoặc 市役所（nếu 国保）',
        tips: [
          'Cần: đơn xin（申請書, lấy từ 健保/市役所）',
          'Giấy chứng nhận sinh（出産証明書）— bệnh viện cấp',
          'Thẻ bảo hiểm（保険証）',
          'Sổ ngân hàng（通帳）',
          'Sổ tay mẹ bầu（母子手帳）',
        ],
      },
      {
        title: '5. Timeline',
        description: 'Tóm tắt thời gian:',
        tips: [
          '妊娠中 (mang thai): Hỏi bệnh viện có 直接支払制度 không',
          '出産時 (lúc sinh): Ký form tại bệnh viện',
          '退院後 (sau xuất viện): Trả phần chênh lệch (nếu có)',
          '1-2 tháng sau: Nhận hoàn tiền (nếu phí sinh < ¥500,000)',
        ],
      },
    ],
    requiredDocs: [
      '健康保険証（thẻ bảo hiểm）',
      '母子手帳（sổ tay mẹ bầu）',
      '出産証明書（giấy chứng nhận sinh — bệnh viện cấp）',
      '通帳（sổ ngân hàng để nhận tiền hoàn）',
      '印鑑（con dấu — một số nơi yêu cầu）',
    ],
    faq: [
      {
        q: 'Sinh đôi thì sao?',
        a: 'Mỗi bé ¥500,000. Sinh đôi = ¥1,000,000!',
      },
      {
        q: 'Vợ ở nhà không đi làm (家族滞在) thì ai xin?',
        a: 'Xin qua bảo hiểm của chồng（被扶養者として）. Hỏi HR công ty chồng.',
      },
      {
        q: 'Sinh ở Việt Nam được không?',
        a: 'Được! Nhưng phải tự nộp đơn (Cách 2). Cần giấy chứng nhận sinh có dịch tiếng Nhật + công chứng.',
      },
      {
        q: '¥500,000 có đủ không?',
        a: 'Phí sinh trung bình ở Nhật: ¥450,000-¥700,000 tùy bệnh viện và khu vực. Tokyo thường đắt hơn.',
      },
    ],
    relatedLinks: [
      { label: '全国健康保険協会 — 出産育児一時金', url: 'https://www.kyoukaikenpo.or.jp/g6/cat620/r310/' },
    ],
  },
  {
    id: 'child-allowance',
    title: 'Phụ cấp trẻ em hàng tháng（児童手当）',
    titleJp: '児童手当',
    category: 'baby',
    categoryIcon: '👶',
    description: '¥15,000/tháng (dưới 3 tuổi), ¥10,000/tháng (3 tuổi~). Nộp tại 市区町村役場.',
    difficulty: 'easy',
    estimatedTime: '30 phút (tại quầy)',
    fee: 'Miễn phí',
    deadline: '15 ngày sau sinh hoặc sau khi chuyển đến',
    where: '市区町村役場（市役所/区役所） — quầy 子育て支援課',
    steps: [
      {
        title: '1. Biết bạn được bao nhiêu',
        description: 'Mức phụ cấp hàng tháng:',
        tips: [
          '0~3 tuổi: **¥15,000/tháng**',
          '3 tuổi ~ tiểu học (con thứ 1, 2): **¥10,000/tháng**',
          '3 tuổi ~ tiểu học (con thứ 3 trở lên): **¥15,000/tháng**',
          'Trung học: **¥10,000/tháng**',
          'Trả 3 lần/năm: tháng 2, 6, 10 (mỗi lần 4 tháng)',
        ],
      },
      {
        title: '2. Khi nào nộp?',
        description: 'Nộp càng sớm càng tốt vì:',
        tips: [
          '**Sau sinh**: nộp trong 15 ngày（出生日の翌日から15日以内）',
          '**Chuyển nhà**: nộp trong 15 ngày sau 転入届',
          '⚠️ Nộp muộn = mất tiền các tháng trước đó (không hồi tố)',
        ],
        warning: 'Ví dụ: bé sinh 1/3, nộp đơn 20/4 → mất tiền tháng 3! Nên nộp ngay trong 15 ngày.',
      },
      {
        title: '3. Đến 市役所 nộp đơn',
        description: 'Đến quầy 子育て支援課（こそだてしえんか）. Nói: 「児童手当の申請をしたいです」',
        tips: [
          'Có thể nộp cùng lúc với 転入届 hoặc 出生届',
          'Một số nơi có quầy tổng hợp cho người nước ngoài（外国人相談）',
        ],
      },
      {
        title: '4. Điền đơn 認定請求書',
        description: 'Nhân viên đưa form「児童手当 認定請求書」. Điền: họ tên cha/mẹ, con, địa chỉ, My Number, tài khoản ngân hàng.',
        tips: [
          'Người đứng tên = người có thu nhập cao hơn trong gia đình',
          'Tài khoản ngân hàng phải đứng tên người xin (không phải tên vợ/chồng)',
        ],
      },
      {
        title: '5. Nhận kết quả',
        description: 'Thường được duyệt ngay. Tiền vào tài khoản vào kỳ trả tiếp theo (tháng 2, 6, hoặc 10).',
        tips: [
          'Nhận giấy 認定通知書 qua đường bưu điện',
          'Mỗi năm tháng 6 phải nộp 現況届（確認書）— thường 市役所 gửi form về nhà',
        ],
      },
    ],
    requiredDocs: [
      '在留カード（thẻ cư trú）',
      'マイナンバーカード hoặc 通知カード（của cả cha + mẹ + con）',
      '健康保険証（thẻ bảo hiểm）',
      '通帳（sổ ngân hàng — tên người xin）',
      '印鑑（con dấu）',
    ],
    faq: [
      {
        q: 'Thu nhập cao có bị giảm không?',
        a: 'Có. Thu nhập > ~¥9,600,000/năm (1 con) → giảm còn ¥5,000/tháng（特例給付）. Thu nhập rất cao → không nhận.',
      },
      {
        q: 'Cả 2 vợ chồng đều đi làm thì ai xin?',
        a: 'Người có thu nhập cao hơn. Thường là chồng, nhưng nếu vợ lương cao hơn thì vợ xin.',
      },
      {
        q: 'Mỗi năm phải nộp lại không?',
        a: 'Tháng 6 hàng năm nộp 現況届 (xác nhận tình trạng). 市役所 gửi form về nhà, điền và gửi lại.',
      },
    ],
    relatedLinks: [
      { label: '内閣府 — 児童手当制度', url: 'https://www8.cao.go.jp/shoushi/jidouteate/annai.html' },
    ],
  },
  {
    id: 'high-cost-medical',
    title: 'Hoàn phí y tế cao（高額療養費）',
    titleJp: '高額療養費制度',
    category: 'insurance',
    categoryIcon: '🏥',
    description: 'Khi chi phí y tế 1 tháng vượt ngưỡng → được hoàn lại phần vượt. VD: thu nhập thường → ngưỡng ~¥80,000.',
    difficulty: 'easy',
    estimatedTime: '15 phút',
    fee: 'Miễn phí',
    deadline: '2 năm kể từ ngày khám',
    where: '健保組合（bảo hiểm công ty）hoặc 市役所（nếu 国保）',
    steps: [
      {
        title: '1. Hiểu ngưỡng chi trả',
        description: 'Ngưỡng phụ thuộc thu nhập hàng tháng:',
        tips: [
          '~¥260,000/tháng（一般）: ngưỡng ~**¥57,600**/tháng',
          '~¥280,000-500,000（区分ウ）: **80,100円 +（総医療費 − 267,000円）× 1%**',
          '~¥530,000-790,000（区分エ）: **167,400円+...**',
          '住民税非課税（thu nhập thấp）: **¥35,400**/tháng',
          '⚡ Công thức: chi vượt phần trên → được hoàn lại',
        ],
      },
      {
        title: '2. Cách 1: Xin 限度額適用認定証 TRƯỚC khi nhập viện (khuyến nghị)',
        description: 'Nếu biết trước sẽ nhập viện/phẫu thuật → xin giấy 限度額適用認定証 TRƯỚC.',
        tips: [
          'Xin từ: 健保組合（công ty）hoặc 市役所（国保）',
          'Mang giấy này đến bệnh viện → chỉ cần trả đúng ngưỡng, KHÔNG phải ứng trước',
          'Xử lý: 3-5 ngày làm việc',
          '🆕 Từ 2024: dùng My Number Card thay thế → không cần xin giấy riêng',
        ],
        warning: 'Nếu không xin trước → phải trả toàn bộ rồi xin hoàn lại sau (mất 2-3 tháng).',
      },
      {
        title: '3. Cách 2: Xin hoàn tiền SAU khi trả (高額療養費支給申請)',
        description: 'Nếu đã trả tiền rồi → nộp đơn xin hoàn lại phần vượt ngưỡng.',
        tips: [
          '健保組合: liên hệ trực tiếp hoặc download form từ website',
          '国保: đến 市役所 quầy 保険年金課',
          'Mang theo: thẻ bảo hiểm, hóa đơn bệnh viện, sổ ngân hàng',
          'Thời gian hoàn: 2-3 tháng sau khi nộp đơn',
        ],
      },
      {
        title: '4. Mẹo tiết kiệm',
        description: 'Một số mẹo để tối ưu chế độ:',
        tips: [
          '📅 **Cùng 1 tháng**: Nếu có thể, gom các lần khám vào cùng tháng → dễ vượt ngưỡng',
          '👨‍👩‍👧 **Cộng dồn gia đình（世帯合算）**: Chi phí cả gia đình cộng lại',
          '🔄 **4 tháng liên tiếp（多数回該当）**: Từ tháng thứ 4 trở đi, ngưỡng giảm xuống (~¥44,400)',
          '📝 **確定申告**: Khai thuế cuối năm → khấu trừ thêm qua 医療費控除',
        ],
      },
    ],
    requiredDocs: [
      '健康保険証（thẻ bảo hiểm）',
      '医療費の領収書（hóa đơn bệnh viện — giữ tất cả!）',
      '通帳（sổ ngân hàng）',
      'マイナンバーカード（nếu dùng thay 限度額適用認定証）',
    ],
    faq: [
      {
        q: 'Sinh con có áp dụng không?',
        a: 'Sinh thường = không (không phải "bệnh"). Sinh mổ = CÓ (phần phẫu thuật được tính).',
      },
      {
        q: 'Có áp dụng cho nha khoa không?',
        a: 'Có, nếu tổng chi phí bảo hiểm trong 1 tháng vượt ngưỡng. Nhưng phần tự túc (tẩy trắng, implant) thì không.',
      },
      {
        q: 'Con cái có được tính chung không?',
        a: 'Có (世帯合算). Nhưng mỗi hóa đơn phải ≥ ¥21,000 mới được cộng.',
      },
    ],
    relatedLinks: [
      { label: '厚生労働省 — 高額療養費制度', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html' },
    ],
  },
  {
    id: 'kakutei-shinkoku',
    title: 'Khai thuế cuối năm（確定申告）',
    titleJp: '確定申告',
    category: 'tax',
    categoryIcon: '💰',
    description: 'Khai thuế thu nhập cá nhân hàng năm. Bắt buộc nếu có thu nhập ngoài lương, freelance, hoặc muốn khấu trừ y tế.',
    difficulty: 'medium',
    estimatedTime: '1-3 tiếng (chuẩn bị + điền)',
    fee: 'Miễn phí',
    deadline: '16/2 ~ 15/3 hàng năm',
    where: '税務署（sở thuế）hoặc online qua e-Tax',
    steps: [
      {
        title: '1. Bạn có cần khai thuế không?',
        description: 'Nhiều người lương đi làm (会社員) KHÔNG cần khai vì công ty đã 年末調整. Nhưng BẮT BUỘC nếu:',
        tips: [
          '💼 **Có thu nhập phụ > ¥200,000/năm** (freelance, đầu tư, cho thuê...)',
          '🏥 **Chi phí y tế > ¥100,000/năm** → khấu trừ 医療費控除',
          '🏠 **Mua nhà** → khấu trừ 住宅ローン控除 (năm đầu)',
          '🏠 **ふるさと納税 > 5 nơi** → phải khai (≤5 nơi dùng one-stop)',
          '🔄 **Chuyển việc trong năm** và công ty mới chưa 年末調整',
          '💰 **Lương > ¥20,000,000/năm**',
          '📤 **Nghỉ việc giữa năm** và không ai 年末調整',
        ],
      },
      {
        title: '2. Chuẩn bị giấy tờ',
        description: 'Tập hợp tất cả giấy tờ TRƯỚC khi bắt đầu:',
        tips: [
          '📄 **源泉徴収票** — giấy khấu trừ thuế từ công ty (nhận cuối năm/tháng 1)',
          '🆔 **マイナンバーカード** hoặc 通知カード + CMND',
          '🏦 **Sổ ngân hàng** — để nhận tiền hoàn thuế',
          '🧾 **Hóa đơn y tế** — nếu xin 医療費控除',
          '📋 **Chứng nhận bảo hiểm** — 生命保険, 地震保険',
          '🏠 **Giấy tờ nhà** — nếu xin 住宅ローン控除',
          '💝 **ふるさと納税 受領書** — nếu khai ふるさと納税',
        ],
      },
      {
        title: '3. Cách 1: Khai online bằng e-Tax (KHUYẾN NGHỊ)',
        description: 'Nhanh nhất, không cần đến 税務署.',
        tips: [
          '🌐 Truy cập: **確定申告書等作成コーナー** (www.keisan.nta.go.jp)',
          '🔐 Đăng nhập bằng **My Number Card + smartphone** (ICカードリーダー不要)',
          '📝 Hệ thống hướng dẫn từng bước, tự tính thuế',
          '📤 Submit online → xong! Không cần in, không cần đi',
          '💰 Hoàn thuế nhanh hơn: ~3 tuần (vs 1-2 tháng nếu nộp giấy)',
        ],
        warning: 'Cần My Number Card + đã đăng ký 利用者識別番号. Lần đầu mất ~15 phút setup.',
      },
      {
        title: '4. Cách 2: Đến 税務署 trực tiếp',
        description: 'Nếu không dùng được e-Tax:',
        tips: [
          '📍 Tìm 税務署 gần nhà: search "〇〇市 税務署"',
          '📅 Thời gian tiếp nhận: 16/2 ~ 15/3, 8:30-17:00',
          '⚠️ **RẤT ĐÔNG** — đặc biệt tuần đầu và tuần cuối, nên đi sớm',
          '💡 Nhiều 税務署 mở **会場 (hội trường riêng)** với nhân viên hỗ trợ',
          '🗣️ Có thể nhờ phiên dịch qua **多言語対応** (gọi trước hỏi)',
        ],
      },
      {
        title: '5. Nhận tiền hoàn thuế',
        description: 'Nếu được hoàn thuế（還付金）:',
        tips: [
          'e-Tax: ~3 tuần sau khi submit',
          'Nộp giấy: ~1-2 tháng',
          'Tiền vào thẳng tài khoản ngân hàng đã đăng ký',
          'Check trạng thái: e-Tax → 「還付金の処理状況」',
        ],
      },
    ],
    requiredDocs: [
      '源泉徴収票（giấy khấu trừ thuế từ công ty）',
      'マイナンバーカード hoặc 通知カード',
      '通帳（sổ ngân hàng để nhận hoàn thuế）',
      '医療費の領収書（nếu xin khấu trừ y tế）',
      '各種控除証明書（chứng nhận bảo hiểm, nhà...）',
    ],
    faq: [
      {
        q: 'Không khai thuế có bị phạt không?',
        a: 'Nếu BẮT BUỘC mà không khai → phạt 無申告加算税 (15-20% thuế thiếu) + lãi 延滞税. Nếu không bắt buộc thì không sao.',
      },
      {
        q: '年末調整 và 確定申告 khác gì?',
        a: '年末調整 = công ty làm giúp (tự động, tháng 12). 確定申告 = bạn tự khai (tháng 2-3). Nếu công ty đã 年末調整 đầy đủ, bạn KHÔNG cần 確定申告.',
      },
      {
        q: 'Freelance/副業 thu nhập < ¥200,000 có cần khai?',
        a: 'Thuế thu nhập (所得税) → KHÔNG cần. Nhưng thuế địa phương (住民税) → VẪN phải khai tại 市役所!',
      },
    ],
    relatedLinks: [
      { label: '国税庁 — 確定申告書作成コーナー', url: 'https://www.keisan.nta.go.jp/' },
      { label: 'e-Tax（電子申告）', url: 'https://www.e-tax.nta.go.jp/' },
    ],
  },
  {
    id: 'nenkin',
    title: 'Hệ thống Nenkin（年金）cho người nước ngoài',
    titleJp: '国民年金・厚生年金',
    category: 'tax',
    categoryIcon: '💰',
    description: 'Bảo hiểm hưu trí Nhật Bản. Tất cả cư dân 20-59 tuổi phải đóng. Khi về nước có thể xin hoàn（脱退一時金）.',
    difficulty: 'medium',
    estimatedTime: '30 phút (đăng ký) / 1 tiếng (xin hoàn)',
    fee: '¥16,980/tháng (国民年金, 2025)',
    where: '年金事務所 hoặc 市役所',
    steps: [
      {
        title: '1. Hiểu 2 loại Nenkin',
        description: 'Có 2 loại chính:',
        tips: [
          '🏢 **厚生年金（こうせいねんきん）** — Đi làm công ty → công ty + bạn đóng 50:50, trừ thẳng lương. KHÔNG cần tự đăng ký.',
          '👤 **国民年金（こくみんねんきん）** — Không đi làm, freelance, sinh viên → tự đóng ¥16,980/tháng tại 市役所.',
          '⚡ Đi làm công ty = tự động có cả 2 (厚生年金 bao gồm 国民年金).',
        ],
      },
      {
        title: '2. Đăng ký（加入）',
        description: 'Khi mới đến Nhật hoặc chuyển từ 厚生年金 → 国民年金:',
        tips: [
          'Đến 市役所 quầy 年金課/保険年金課',
          'Mang theo: 在留カード, マイナンバー',
          'Nhận 年金手帳 hoặc 基礎年金番号通知書',
          '⚠️ Đăng ký trong 14 ngày kể từ khi cư trú',
        ],
      },
      {
        title: '3. Không đủ tiền đóng? → Xin miễn/giảm（免除・猶予）',
        description: 'Nếu thu nhập thấp, có thể xin giảm:',
        tips: [
          '**全額免除** — miễn 100% (thu nhập < ~¥67万/năm cho độc thân)',
          '**3/4免除** — chỉ đóng 1/4',
          '**半額免除** — đóng 1/2',
          '**1/4免除** — đóng 3/4',
          '**納付猶予** — hoãn đóng (dưới 50 tuổi)',
          '📋 Nộp đơn tại 市役所 hoặc 年金事務所',
          '⚠️ Phải nộp đơn MỖI NĂM (tháng 7)',
        ],
        warning: 'ĐỪNG BỎ QUA không đóng và không xin miễn → trở thành 未納 (nợ), ảnh hưởng gia hạn visa!',
      },
      {
        title: '4. Về nước → Xin hoàn Nenkin（脱退一時金）',
        description: 'Nếu đã đóng ≥ 6 tháng và rời Nhật vĩnh viễn:',
        tips: [
          '📋 Nộp đơn 脱退一時金裁定請求書 cho 日本年金機構',
          '⏰ Nộp **trong 2 năm** sau khi rời Nhật',
          '💰 Được hoàn: tối đa 5 năm đóng góp (上限60ヶ月)',
          '📍 Nộp từ nước ngoài qua đường bưu điện hoặc online',
          '🏦 Tiền chuyển vào tài khoản ngân hàng nước ngoài',
          '⚡ Từ 2021: tối đa 5 năm (trước đó 3 năm) → hoàn nhiều hơn!',
        ],
      },
      {
        title: '5. Giấy tờ xin hoàn Nenkin',
        description: 'Chuẩn bị TRƯỚC khi rời Nhật:',
        tips: [
          '📄 年金手帳 hoặc 基礎年金番号通知書',
          '📄 Bản sao hộ chiếu (trang có dấu xuất cảnh)',
          '🏦 Thông tin ngân hàng nước ngoài (SWIFT code)',
          '📄 Giấy ủy quyền thuế（納税管理人届出書）— nếu muốn ai đó ở Nhật đại diện',
          '⚠️ QUAN TRỌNG: Hủy 転出届 TRƯỚC khi rời Nhật!',
        ],
        warning: 'Nếu không nộp 転出届 → hệ thống vẫn tính bạn ở Nhật → không xin hoàn được!',
      },
    ],
    requiredDocs: [
      '在留カード（thẻ cư trú）',
      'マイナンバーカード hoặc 通知カード',
      '年金手帳 hoặc 基礎年金番号通知書',
      'Hộ chiếu（パスポート）',
      '通帳（sổ ngân hàng — khi xin hoàn thì cần TK nước ngoài）',
    ],
    faq: [
      {
        q: 'Không đóng Nenkin có ảnh hưởng visa không?',
        a: 'CÓ! Từ 2024, 入管庁 check 年金 khi gia hạn visa. Chưa đóng → nên xin 免除 ngay, đừng để 未納.',
      },
      {
        q: 'Đóng Nenkin ở Nhật có được tính khi về VN không?',
        a: 'Nhật và VN chưa ký hiệp định xã hội → KHÔNG tính lẫn nhau. Chỉ có thể xin 脱退一時金.',
      },
      {
        q: 'Ở lại Nhật lâu dài thì được gì?',
        a: 'Đóng ≥ 10 năm → được nhận lương hưu khi 65 tuổi. Đóng 40 năm đầy đủ = ~¥780,000/năm (~¥65,000/tháng).',
      },
    ],
    relatedLinks: [
      { label: '日本年金機構 — 脱退一時金', url: 'https://www.nenkin.go.jp/service/jukyu/sonota-kyufu/dattai-ichiji/20150406.html' },
      { label: 'ねんきんネット（check số tiền đã đóng）', url: 'https://www.nenkin.go.jp/n_net/' },
    ],
  },
  {
    id: 'drivers-license-convert',
    title: 'Đổi bằng lái nước ngoài sang Nhật（外免切替）',
    titleJp: '外国免許切替',
    category: 'car',
    categoryIcon: '🚗',
    description: 'Đổi bằng lái Việt Nam sang bằng lái Nhật Bản. Cần: bằng lái VN + ở VN ≥3 tháng sau khi cấp bằng.',
    difficulty: 'hard',
    estimatedTime: '2-4 tuần (cả quá trình)',
    fee: '~¥5,000-8,000 (lệ phí + dịch thuật)',
    deadline: 'Không có hạn — nhưng cần có bằng lái trước khi lái xe',
    where: '運転免許センター（trung tâm bằng lái）— KHÔNG phải 警察署',
    steps: [
      {
        title: '1. Điều kiện cần',
        description: 'Kiểm tra trước khi bắt đầu:',
        tips: [
          '✅ Có bằng lái Việt Nam CÒN HẠN',
          '✅ Đã ở Việt Nam ≥ 3 tháng SAU khi được cấp bằng',
          '✅ Có thể chứng minh thời gian ở VN (dấu passport, vé máy bay)',
          '❌ Bằng quốc tế (IDP) KHÔNG dùng để đổi sang Nhật',
        ],
        warning: 'Điểm khó nhất: chứng minh đã ở VN ≥ 3 tháng sau khi cấp bằng. Nếu cấp bằng rồi sang Nhật ngay → KHÔNG đủ điều kiện!',
      },
      {
        title: '2. Dịch thuật bằng lái（翻訳文）',
        description: 'Bằng lái VN cần được dịch sang tiếng Nhật bởi cơ quan chính thức:',
        tips: [
          '🏢 **JAF (日本自動車連盟)** — ¥4,000, chính thức nhất, ~2 tuần',
          '🏢 **Đại sứ quán VN tại Nhật** — cũng được chấp nhận',
          '📍 JAF: nộp trực tiếp hoặc gửi bưu điện',
          '⚠️ Dịch ở nơi khác (Google Dịch, tiệm dịch thuật thường) → KHÔNG được chấp nhận',
        ],
      },
      {
        title: '3. Chuẩn bị hồ sơ',
        description: 'Tập hợp đầy đủ:',
        tips: [
          '📄 Bằng lái VN (bản gốc)',
          '📄 Bản dịch JAF',
          '📄 Hộ chiếu (CŨ + MỚI nếu có) — cần xem dấu xuất nhập cảnh',
          '📄 在留カード',
          '📸 Ảnh 3x2.4cm (1 tấm)',
          '📄 住民票 (xin ở 市役所, ¥300)',
          '💰 Lệ phí: ~¥2,550 (thực hành) + ¥1,750 (cấp bằng)',
        ],
      },
      {
        title: '4. Đến 運転免許センター',
        description: 'ĐẾN ĐÚNG NƠI — chỉ 免許センター mới làm 外免切替, không phải 警察署.',
        tips: [
          '📍 Saitama: 鴻巣免許センター',
          '📍 Tokyo: 府中運転免許試験場 hoặc 鮫洲',
          '📍 Osaka: 門真運転免許試験場',
          '📅 Tiếp nhận: thường 8:30-9:30 (CHỈ BUỔI SÁNG)',
          '📞 Gọi trước hỏi ngày tiếp nhận 外免切替 (không phải ngày nào cũng nhận)',
        ],
        warning: 'Mỗi 免許センター có lịch riêng cho 外免切替. GỌI TRƯỚC hoặc check website!',
      },
      {
        title: '5. Phỏng vấn + Kiểm tra kiến thức',
        description: 'Tại 免許センター:',
        tips: [
          '🗣️ **Phỏng vấn** — hỏi về kinh nghiệm lái xe ở VN (đơn giản)',
          '📝 **Kiểm tra kiến thức** — 10 câu đúng/sai, cần đúng ≥ 7',
          '🌐 Có đề bằng tiếng Anh/Việt (tùy nơi)',
          '💡 Câu hỏi không khó nhưng có bẫy — search "外免切替 問題" để luyện',
        ],
      },
      {
        title: '6. Thi thực hành（技能試験）',
        description: 'Lái xe trong sân thi (場内コース), KHÔNG phải trên đường.',
        tips: [
          '🚗 Xe số tự động (AT) → dễ hơn, khuyến nghị',
          '📏 Các bài thi: đi thẳng, rẽ, dừng, lùi hình chữ S, cranking',
          '⚠️ **Tỷ lệ đỗ lần đầu ~30-40%** — đa số rớt vì "chạy không đúng kiểu Nhật"',
          '💡 Tips: gương → xi-nhan → gương → vào → tay lái (確認動作 rất quan trọng)',
          '💡 Tập ở 教習所 (trường dạy lái) 1-2 buổi = đầu tư xứng đáng',
          '🔄 Rớt → đăng ký thi lại (¥2,550/lần), thường 2-4 tuần sau',
        ],
        warning: 'Phải THỂ HIỆN RÕ động tác 確認 (kiểm tra gương, quay đầu) — thiếu = trượt ngay!',
      },
      {
        title: '7. Nhận bằng',
        description: 'Đỗ thực hành → nhận bằng lái Nhật trong ngày hoặc hôm sau.',
        tips: [
          '🎉 Bằng lái Nhật hợp lệ trên toàn Nhật',
          '📅 Gia hạn: lần đầu 3 năm → sau đó 5 năm (nếu không vi phạm)',
          '🔄 Bằng VN vẫn giữ nguyên (không bị thu)',
        ],
      },
    ],
    requiredDocs: [
      'Bằng lái Việt Nam (bản gốc, còn hạn)',
      'Bản dịch JAF（翻訳文）',
      'Hộ chiếu (cũ + mới) — cần dấu xuất nhập cảnh',
      '在留カード',
      '住民票（xin ở 市役所, ¥300）',
      'Ảnh 3x2.4cm (1 tấm, nền trắng/xanh, chụp trong 6 tháng)',
      'Lệ phí ~¥4,300-¥5,000',
    ],
    faq: [
      {
        q: 'Bằng lái VN hết hạn thì sao?',
        a: 'Không đổi được. Phải gia hạn bằng VN trước (có thể nhờ người nhà ở VN làm ủy quyền).',
      },
      {
        q: 'Không có dấu passport chứng minh ở VN ≥ 3 tháng?',
        a: 'Rất khó. Có thể dùng vé máy bay, giấy tờ cư trú VN. Nhưng 免許センター có quyền từ chối.',
      },
      {
        q: 'Thi thực hành rớt mấy lần?',
        a: 'Trung bình 1-3 lần. Một số người rớt 5-6 lần. Tips: tập ở 教習所 trước, ¥15,000-¥30,000/buổi nhưng đáng.',
      },
      {
        q: 'Có thể thi bằng xe máy không?',
        a: 'Có. 原付（50cc）→ chỉ thi kiến thức. 普通二輪（400cc）→ thi cả thực hành.',
      },
    ],
    relatedLinks: [
      { label: 'JAF — Dịch thuật bằng lái', url: 'https://jaf.or.jp/common/visitor-procedures/translate' },
      { label: '警察庁 — 外国免許切替', url: 'https://www.npa.go.jp/policies/application/license_renewal/have_DL_issed_arrow_arrow.html' },
    ],
  },
  {
    id: 'shaken',
    title: 'Đăng kiểm xe（車検）',
    titleJp: '車検（自動車検査登録制度）',
    category: 'car',
    categoryIcon: '🚗',
    description: 'Kiểm tra an toàn xe bắt buộc. Xe mới: sau 3 năm, sau đó mỗi 2 năm. Hết hạn = không được chạy.',
    difficulty: 'easy',
    estimatedTime: '1-3 ngày (tùy nơi)',
    fee: '¥50,000-¥150,000 (tùy xe + nơi làm)',
    deadline: '1 tháng trước ngày hết hạn 車検',
    where: 'ディーラー, 整備工場, ガソリンスタンド, 車検専門店, hoặc ユーザー車検',
    steps: [
      {
        title: '1. Check ngày hết hạn',
        description: 'Xem sticker trên kính hoặc 車検証（giấy đăng kiểm）:',
        tips: [
          '📋 車検証 → ghi 有効期間の満了する日',
          '🔖 Sticker trên kính trước (góc phải trên)',
          '⏰ Có thể làm trước 1 tháng mà KHÔNG mất ngày (VD: hết 3/15 → làm từ 2/15 vẫn ghi 3/15)',
          '⚠️ Chạy xe hết hạn 車検 → phạt 6 điểm + ¥300,000 + tạm giữ bằng',
        ],
        warning: 'Xe hết hạn 車検 = KHÔNG ĐƯỢC LÁI trên đường. Phải chở bằng xe cứu hộ đến nơi kiểm.',
      },
      {
        title: '2. Chọn nơi làm 車検',
        description: 'So sánh 5 lựa chọn:',
        tips: [
          '🏢 **ディーラー（đại lý）**: ¥100,000-¥150,000 — đắt nhất nhưng yên tâm nhất, phát hiện vấn đề sớm',
          '🔧 **整備工場**: ¥50,000-¥100,000 — giá vừa, chất lượng tốt',
          '⛽ **ガソリンスタンド / 車検専門店**: ¥40,000-¥70,000 — rẻ, nhanh (1 ngày)',
          '🛞 **カー用品店（Autobacs/Yellow Hat）**: ¥50,000-¥80,000 — tiện, có thay phụ tùng luôn',
          '🔑 **ユーザー車検（tự đi kiểm）**: ¥30,000-¥40,000 — rẻ nhất nhưng phải tự chuẩn bị xe',
        ],
      },
      {
        title: '3. Đặt lịch + Mang xe đến',
        description: 'Gọi hoặc đặt online:',
        tips: [
          '📞 Đặt trước 1-2 tuần',
          '🚗 Mang xe đến vào ngày hẹn',
          '📋 Mang theo: 車検証, 自賠責保険証, 自動車税納税証明書, 印鑑',
          '💳 Thanh toán: tiền mặt hoặc card (tùy nơi)',
        ],
      },
      {
        title: '4. Nội dung kiểm tra',
        description: 'Thợ sẽ check toàn bộ xe:',
        tips: [
          '🔦 Đèn (pha, xi-nhan, phanh, lùi)',
          '🛞 Lốp (còn gai ≥ 1.6mm)',
          '🔧 Phanh, hệ thống lái',
          '💨 Khí thải',
          '🔊 Còi, gương',
          '📏 Kích thước (nếu có độ xe)',
        ],
      },
      {
        title: '5. Nhận kết quả',
        description: 'Đỗ → nhận 車検証 mới + sticker mới dán kính.',
        tips: [
          '✅ Đỗ: nhận xe ngay hoặc hôm sau',
          '❌ Rớt: sửa + thi lại (trong ngày hoặc đặt lịch mới)',
          '📋 Kiểm tra 車検証 mới: ngày hết hạn = +2 năm',
        ],
      },
    ],
    requiredDocs: [
      '車検証（giấy đăng kiểm — trong xe）',
      '自賠責保険証明書（bảo hiểm bắt buộc — trong xe）',
      '自動車税納税証明書（biên lai thuế xe — nhận tháng 5 hàng năm）',
      '印鑑（con dấu）— một số nơi yêu cầu',
      'Tiền: ¥50,000-¥150,000',
    ],
    faq: [
      {
        q: 'Mất 車検証 thì sao?',
        a: 'Xin cấp lại ở 陸運局（運輸支局）, ¥350, cần 印鑑 + 身分証.',
      },
      {
        q: '車検 có bao gồm bảo hiểm không?',
        a: 'Có — 自賠責保険（bảo hiểm bắt buộc）gia hạn cùng lúc, tính trong tổng phí.',
      },
      {
        q: 'Xe kei (軽自動車) có rẻ hơn không?',
        a: 'Có, rẻ hơn ~¥10,000-¥20,000 vì thuế trọng lượng thấp hơn.',
      },
    ],
    relatedLinks: [
      { label: '自動車検査インターネット予約 (ユーザー車検)', url: 'https://www.yoyaku.naltec.go.jp/' },
    ],
  },
  {
    id: 'shokumukeirekisho',
    title: 'Viết Sơ yếu lý lịch công việc（職務経歴書）',
    titleJp: '職務経歴書',
    category: 'work',
    categoryIcon: '💼',
    description: 'CV chi tiết về kinh nghiệm làm việc. Khác 履歴書 — tập trung vào skills, thành tích, projects đã làm.',
    difficulty: 'medium',
    estimatedTime: '2-4 tiếng',
    fee: 'Miễn phí',
    where: 'Tự viết → nộp kèm 履歴書 khi xin việc',
    steps: [
      {
        title: '1. Hiểu 職務経歴書 vs 履歴書',
        description: 'Hai cái này KHÁC nhau, thường nộp CẢ HAI:',
        tips: [
          '📋 **履歴書** = thông tin cá nhân + lịch sử (form chuẩn, ngắn gọn)',
          '📝 **職務経歴書** = chi tiết công việc đã làm (tự viết, 1-3 trang A4)',
          '💡 職務経歴書 là thứ nhà tuyển dụng ĐỌC KỸ NHẤT',
          '🎯 Mục tiêu: chứng minh bạn CÓ KỸ NĂNG họ cần',
        ],
      },
      {
        title: '2. Cấu trúc chuẩn',
        description: 'Format phổ biến nhất (逆編年体 — mới nhất lên đầu):',
        tips: [
          '**① 職務要約（2-3 dòng）** — tóm tắt career: bao nhiêu năm, ngành gì, điểm mạnh',
          '**② 職務経歴（phần chính）** — từng công ty: tên, thời gian, vị trí, nội dung công việc, thành tích',
          '**③ 活かせる経験・スキル** — kỹ năng: ngôn ngữ, IT, chứng chỉ',
          '**④ 自己PR（2-3 dòng）** — điểm mạnh + điều bạn có thể đóng góp',
        ],
      },
      {
        title: '3. Viết phần 職務経歴 (quan trọng nhất)',
        description: 'Mỗi công ty viết theo mẫu:',
        tips: [
          '🏢 **Tên công ty + quy mô** (VD: 従業員500名)',
          '📅 **Thời gian** (VD: 2020年4月～2023年3月)',
          '👤 **Vị trí + bộ phận**',
          '📋 **Nội dung công việc** — viết cụ thể, dùng bullet points',
          '⭐ **Thành tích** — DÙ SỐ LIỆU: "売上30%向上", "コスト20%削減", "チーム10名マネジメント"',
          '💻 **Công nghệ/tool** (nếu IT): Java, AWS, React...',
        ],
        warning: 'KHÔNG viết chung chung "頑張りました" — phải có CON SỐ cụ thể!',
      },
      {
        title: '4. Tips cho người Việt',
        description: 'Những lỗi thường gặp của người VN:',
        tips: [
          '🇻🇳 **Kinh nghiệm ở VN vẫn tính** — đừng bỏ qua, đó là điểm mạnh',
          '🌐 **Song ngữ = điểm cộng lớn** — ghi rõ: ベトナム語（ネイティブ）、日本語（N2/N1）、英語',
          '🌉 **BrSE/Bridge SE** — Nhật rất thiếu, ghi rõ kinh nghiệm offshore nếu có',
          '📏 **Đúng 2 trang A4** — không quá dài, không quá ngắn',
          '✍️ **Nhờ người Nhật check** — sai ngữ pháp = ấn tượng xấu',
        ],
      },
      {
        title: '5. Format & nộp',
        description: 'Hoàn thiện và gửi:',
        tips: [
          '📄 Font: 明朝体 hoặc ゴシック体, size 10.5-11',
          '📐 Margins: 2-2.5cm',
          '📅 Ghi ngày viết ở góc phải trên',
          '💾 Lưu PDF → gửi email hoặc upload',
          '📝 Nộp giấy: in 1 mặt, KHÔNG đóng ghim, bỏ vào 封筒 A4',
        ],
      },
    ],
    requiredDocs: [
      'Thông tin các công ty đã làm (tên, địa chỉ, quy mô)',
      'Mô tả công việc + thành tích cụ thể',
      'Chứng chỉ, bằng cấp (JLPT, TOEIC, IT...)',
    ],
    faq: [
      {
        q: 'Mới ra trường, chưa có kinh nghiệm thì viết gì?',
        a: 'Viết: thực tập, project ở trường, part-time, hoạt động ngoại khóa. 新卒 thường không cần 職務経歴書.',
      },
      {
        q: 'Có template không?',
        a: 'Có nhiều trên: doda.jp, rikunabi.com, マイナビ. Search "職務経歴書 テンプレート" + ngành nghề.',
      },
      {
        q: 'Viết bằng tiếng Anh được không?',
        a: 'Nếu công ty Nhật → viết tiếng Nhật. Công ty nước ngoài ở Nhật → hỏi trước, có thể nộp cả 2.',
      },
    ],
    relatedLinks: [
      { label: 'doda — 職務経歴書テンプレート', url: 'https://doda.jp/guide/syokureki/' },
      { label: 'リクナビNEXT — 職務経歴書の書き方', url: 'https://next.rikunabi.com/tenshokuknowhow/archives/5765/' },
    ],
  },
]
