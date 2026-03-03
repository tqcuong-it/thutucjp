import { Outlet, Link, useLocation } from 'react-router-dom'
import { FileText, Home, Info, Menu, X, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

  const navLinks = [
    { to: '/', icon: <Home className="w-4 h-4" />, label: 'Trang chủ' },
    { to: '/about', icon: <Info className="w-4 h-4" />, label: 'Giới thiệu' },
    { to: '/privacy', icon: <Shield className="w-4 h-4" />, label: 'Bảo mật' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-700 transition-colors shadow-sm">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold text-gray-900 tracking-tight">
                ThủTục<span className="text-blue-600">JP</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium -mt-0.5 hidden sm:block">Giấy tờ tại Nhật</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${location.pathname === link.to
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden border-t border-gray-100 bg-white px-4 py-2 space-y-1 animate-in slide-in-from-top duration-200">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium
                  ${location.pathname === link.to
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-8 w-full flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white mt-auto no-print">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">ThủTục<span className="text-blue-600">JP</span></span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-blue-600 transition-colors">Bảo mật</Link>
              <Link to="/about" className="text-gray-500 hover:text-blue-600 transition-colors">Giới thiệu</Link>
              <a href="mailto:contact@thutucjp.com" className="text-gray-500 hover:text-blue-600 transition-colors">Liên hệ</a>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-xs text-gray-400">© 2026 ThủTụcJP — Giấy tờ tại Nhật, dễ như ở nhà 🇻🇳🇯🇵</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Dữ liệu xử lý 100% trên trình duyệt
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
