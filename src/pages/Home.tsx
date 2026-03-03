import { Link } from 'react-router-dom'
import { FileText, Clock, ChevronRight } from 'lucide-react'
import { categories, forms } from '../data/forms'

const difficultyColor = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
}
const difficultyLabel = { easy: 'Dễ', medium: 'Trung bình', hard: 'Khó' }

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Giấy tờ tại Nhật, <span className="text-blue-600">dễ như ở nhà</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Hướng dẫn + tự động điền biểu mẫu tiếng Nhật cho người Việt.
          Visa, thai sản, thuế, CV — tất cả bằng tiếng Việt.
        </p>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📂 Danh mục</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`border rounded-xl p-4 text-center hover:shadow-md transition ${cat.color}`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-semibold text-sm">{cat.title}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Form list by category */}
      {categories.map((cat) => {
        const catForms = forms.filter((f) => f.category === cat.id)
        if (catForms.length === 0) return null
        return (
          <section key={cat.id} id={cat.id} className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {cat.icon} {cat.title}
            </h2>
            <div className="grid gap-3">
              {catForms.map((form) => (
                <Link
                  key={form.id}
                  to={`/form/${form.id}`}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition flex items-center justify-between group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{form.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[form.difficulty]}`}>
                        {difficultyLabel[form.difficulty]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{form.titleJp}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" /> {form.fields.length} trường
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {form.estimatedTime}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition" />
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      {/* Coming soon categories */}
      {categories
        .filter((cat) => !forms.some((f) => f.category === cat.id))
        .map((cat) => (
          <section key={cat.id} id={cat.id} className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {cat.icon} {cat.title}
            </h2>
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400">
              🚧 Đang phát triển — Sắp ra mắt!
            </div>
          </section>
        ))}

      {/* Stats */}
      <section className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-3xl font-bold text-blue-600">{forms.length}</div>
            <div className="text-sm text-gray-600">Biểu mẫu</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">{categories.length}</div>
            <div className="text-sm text-gray-600">Danh mục</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">100%</div>
            <div className="text-sm text-gray-600">Miễn phí</div>
          </div>
        </div>
      </section>
    </div>
  )
}
