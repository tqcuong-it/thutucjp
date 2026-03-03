export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Về ThủTụcJP</h1>
      
      <div className="prose prose-gray">
        <p className="text-lg text-gray-600 mb-6">
          <strong>ThủTụcJP</strong> giúp người Việt tại Nhật Bản điền các biểu mẫu, giấy tờ 
          bằng tiếng Việt — không cần biết tiếng Nhật cũng làm được.
        </p>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">🎯 Vấn đề</h2>
        <p className="text-gray-600 mb-4">
          Hơn 500,000 người Việt đang sống tại Nhật. Mỗi người đều phải đối mặt với 
          hàng chục loại giấy tờ: visa, thuế, bảo hiểm, thai sản, CV xin việc... 
          Tất cả đều bằng tiếng Nhật, format phức tạp, và hướng dẫn rất khó hiểu.
        </p>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">💡 Giải pháp</h2>
        <p className="text-gray-600 mb-4">
          ThủTụcJP cung cấp form điền sẵn bằng tiếng Việt với hướng dẫn chi tiết. 
          Bạn chỉ cần điền thông tin → hệ thống tạo biểu mẫu chuẩn format Nhật → in ra nộp.
        </p>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">👨‍💻 Tác giả</h2>
        <p className="text-gray-600 mb-4">
          <strong>Trần Quang Cương</strong> — Software Engineer / BrSE tại Nhật Bản, 
          10+ năm kinh nghiệm IT. Đã trải qua mọi loại giấy tờ từ visa, 
          thai sản, nenkin đến mua xe, thuê nhà. Hiểu rõ nỗi khổ của người Việt 
          khi đối mặt với thủ tục hành chính Nhật.
        </p>
        <p className="text-gray-600">
          Portfolio: <a href="https://cuongtq.it" className="text-blue-600 hover:underline" target="_blank" rel="noopener">cuongtq.it</a>
        </p>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">📬 Liên hệ</h2>
        <p className="text-gray-600">
          Email: <a href="mailto:contact@thutucjp.com" className="text-blue-600 hover:underline">contact@thutucjp.com</a>
        </p>
      </div>
    </div>
  )
}
