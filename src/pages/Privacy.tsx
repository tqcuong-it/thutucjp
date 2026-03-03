export default function Privacy() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Chính sách bảo mật</h1>
      <p className="text-sm text-gray-400 mb-8">Cập nhật: 2026-03-03</p>

      <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">🔒 Nguyên tắc cốt lõi</h2>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-semibold text-green-800">
              ThủTụcJP KHÔNG thu thập, KHÔNG lưu trữ, KHÔNG gửi dữ liệu cá nhân của bạn lên bất kỳ server nào.
            </p>
            <p className="mt-2 text-green-700">
              Toàn bộ thông tin bạn nhập (tên, địa chỉ, số hộ chiếu, My Number, v.v.) chỉ được xử lý 
              trực tiếp trên trình duyệt (browser) của bạn. Khi bạn đóng trang web, dữ liệu biến mất hoàn toàn.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">📋 Chi tiết</h2>
          <ul className="space-y-3">
            <li>
              <strong>Dữ liệu biểu mẫu:</strong> Tất cả thông tin bạn điền vào form được xử lý 100% phía client (trình duyệt). 
              Không có backend, không có database, không có API nào nhận dữ liệu của bạn. 
              Khi bạn nhấn "In/Xuất PDF", trình duyệt tự tạo bản in — không qua server.
            </li>
            <li>
              <strong>Cookies:</strong> ThủTụcJP không sử dụng cookies để theo dõi người dùng. 
              Cloudflare (nhà cung cấp hosting) có thể sử dụng cookies kỹ thuật để bảo mật và tối ưu hiệu năng.
            </li>
            <li>
              <strong>Analytics:</strong> Chúng tôi có thể sử dụng Cloudflare Web Analytics — công cụ 
              bảo vệ quyền riêng tư, không dùng cookies, không theo dõi cá nhân.
            </li>
            <li>
              <strong>Quảng cáo:</strong> Nếu trang web hiển thị quảng cáo (Google AdSense), 
              Google có thể sử dụng cookies theo <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener">chính sách của Google</a>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">🇯🇵 個人情報の取り扱いについて</h2>
          <div className="bg-gray-50 rounded-xl p-4 text-gray-700">
            <p>本サイト（ThủTụcJP）は、ユーザーが入力した個人情報（氏名、住所、旅券番号、マイナンバー等）を一切収集・保存・送信しません。</p>
            <p className="mt-2">すべてのデータ処理はブラウザ上（クライアントサイド）でのみ行われ、サーバーへの送信は一切ありません。ページを閉じるとデータは完全に消去されます。</p>
            <p className="mt-2">本サイトは個人情報保護法に基づき、ユーザーのプライバシーを最大限に尊重します。</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2">✉️ Liên hệ</h2>
          <p>Nếu có câu hỏi về bảo mật: <a href="mailto:contact@thutucjp.com" className="text-blue-600 hover:underline">contact@thutucjp.com</a></p>
        </section>
      </div>
    </div>
  )
}
