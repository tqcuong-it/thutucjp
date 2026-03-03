import { Link } from 'react-router-dom'
import { FileText, Clock, ChevronRight, Shield, Sparkles, Globe } from 'lucide-react'
import { categories, forms } from '../data/forms'
import { saveDraft } from '../lib/storage'
import type { SavedProfile } from '../lib/storage'
import ProfileManager from '../components/ProfileManager'

const difficultyColor = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-700',
}
const difficultyLabel = { easy: 'Dễ', medium: 'Trung bình', hard: 'Khó' }

export default function Home() {
  const handleImport = (profile: SavedProfile) => {
    // Save all form data to drafts
    for (const [formId, data] of Object.entries(profile.forms)) {
      saveDraft(formId, data)
    }
    window.location.reload()
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative text-center py-8 md:py-14 mb-10">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" /> Miễn phí · Không cần đăng ký
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
          Giấy tờ tại Nhật
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            dễ như ở nhà
          </span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Điền biểu mẫu tiếng Nhật bằng tiếng Việt.
          <br className="hidden md:block" />
          Visa, thai sản, thuế, CV — hướng dẫn chi tiết từng bước.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>100% bảo mật</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-blue-500" />
            <span>Nguồn: 出入国在留管理庁</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-indigo-500" />
            <span>{forms.length} biểu mẫu</span>
          </div>
        </div>
      </section>

      {/* Profile Manager */}
      <section className="mb-8 flex justify-center">
        <ProfileManager onImport={handleImport} />
      </section>

      {/* Categories grid */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          📂 Danh mục
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const count = forms.filter(f => f.category === cat.id).length
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className={`group border rounded-2xl p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${cat.color}`}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <div className="font-semibold text-sm">{cat.title}</div>
                {count > 0 && (
                  <div className="text-xs opacity-70 mt-1">{count} biểu mẫu</div>
                )}
              </a>
            )
          })}
        </div>
      </section>

      {/* Form list by category */}
      {categories.map((cat) => {
        const catForms = forms.filter((f) => f.category === cat.id)
        if (catForms.length === 0) return (
          <section key={cat.id} id={cat.id} className="mb-10 scroll-mt-20">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {cat.icon} {cat.title}
            </h2>
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 border border-dashed border-gray-200 rounded-2xl p-10 text-center">
              <div className="text-4xl mb-3 opacity-60">🚧</div>
              <p className="text-gray-400 font-medium">Đang phát triển — Sắp ra mắt!</p>
            </div>
          </section>
        )
        return (
          <section key={cat.id} id={cat.id} className="mb-10 scroll-mt-20">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {cat.icon} {cat.title}
            </h2>
            <div className="grid gap-3">
              {catForms.map((form) => (
                <Link
                  key={form.id}
                  to={`/form/${form.id}`}
                  className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {form.title}
                      </h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${difficultyColor[form.difficulty]}`}>
                        {difficultyLabel[form.difficulty]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2.5 font-medium">{form.titleJp}</p>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-1">{form.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> {form.fields.length} trường
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {form.estimatedTime}
                      </span>
                      {form.fee && (
                        <span className="text-emerald-600 font-medium">
                          {form.fee.startsWith('Miễn') ? '🆓 Miễn phí' : `💰 ${form.fee.split('（')[0]}`}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all ml-3 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      {/* Stats + CTA */}
      <section className="mt-16 mb-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
            500,000+ người Việt tại Nhật
            <br />
            <span className="opacity-80 text-lg font-medium">đều cần ThủTụcJP</span>
          </h2>

          <div className="grid grid-cols-3 gap-6 mb-8 max-w-md mx-auto">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold">{forms.length}</div>
              <div className="text-sm opacity-70">Biểu mẫu</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold">{categories.length}</div>
              <div className="text-sm opacity-70">Danh mục</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold">0¥</div>
              <div className="text-sm opacity-70">Chi phí</div>
            </div>
          </div>

          <a
            href="#visa"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
          >
            Bắt đầu ngay <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  )
}
