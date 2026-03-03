import { Outlet, Link } from 'react-router-dom'
import { FileText, Home, Info, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            <FileText className="w-6 h-6" />
            <span>ThủTục<span className="text-gray-800">JP</span></span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-blue-600 flex items-center gap-1">
              <Home className="w-4 h-4" /> Trang chủ
            </Link>
            <Link to="/about" className="hover:text-blue-600 flex items-center gap-1">
              <Info className="w-4 h-4" /> Giới thiệu
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-3 text-sm">
            <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-700">
              <Home className="w-4 h-4" /> Trang chủ
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-700">
              <Info className="w-4 h-4" /> Giới thiệu
            </Link>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <div className="mb-2">
            <Link to="/privacy" className="hover:text-blue-600">Bảo mật</Link>
            <span className="mx-2">·</span>
            <Link to="/about" className="hover:text-blue-600">Giới thiệu</Link>
          </div>
          © 2026 ThủTụcJP — Giấy tờ tại Nhật, dễ như ở nhà 🇻🇳🇯🇵
        </div>
      </footer>
    </div>
  )
}
