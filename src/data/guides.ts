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
]
