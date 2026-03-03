import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, MapPin, Banknote, CalendarClock, ExternalLink, ChevronDown, AlertTriangle, Lightbulb, HelpCircle } from 'lucide-react'
import { guides } from '../data/guides'
import { useState } from 'react'

export default function GuidePage() {
  const { guideId } = useParams()
  const guide = guides.find((g) => g.id === guideId)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  if (!guide) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Không tìm thấy hướng dẫn</p>
        <Link to="/" className="text-blue-600 mt-4 inline-block">← Về trang chủ</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-4">
        <ArrowLeft className="w-4 h-4" /> Trang chủ
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="text-3xl mb-2">{guide.categoryIcon}</div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">{guide.title}</h1>
        <p className="text-gray-400 font-medium">{guide.titleJp}</p>
      </div>

      {/* Meta cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1"><Clock className="w-3.5 h-3.5" /> Thời gian</div>
          <div className="font-semibold text-sm text-gray-800">{guide.estimatedTime}</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1"><Banknote className="w-3.5 h-3.5" /> Chi phí</div>
          <div className="font-semibold text-sm text-gray-800">{guide.fee || 'N/A'}</div>
        </div>
        {guide.deadline && (
          <div className="bg-amber-50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-xs text-amber-600 mb-1"><CalendarClock className="w-3.5 h-3.5" /> Hạn nộp</div>
            <div className="font-semibold text-sm text-amber-800">{guide.deadline}</div>
          </div>
        )}
        <div className="bg-blue-50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-xs text-blue-600 mb-1"><MapPin className="w-3.5 h-3.5" /> Nơi nộp</div>
          <div className="font-semibold text-sm text-blue-800 leading-snug">{guide.where.split('—')[0]}</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-8 leading-relaxed">{guide.description}</p>

      {/* Required docs */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
        <h2 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
          📎 Giấy tờ cần mang theo
        </h2>
        <ul className="space-y-2">
          {guide.requiredDocs.map((doc, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
              <input type="checkbox" className="mt-0.5 rounded" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <h2 className="text-xl font-extrabold text-gray-900 mb-6">📋 Hướng dẫn từng bước</h2>
      <div className="space-y-6 mb-10">
        {guide.steps.map((step, i) => (
          <div key={i} className="relative pl-8 pb-6 border-l-2 border-blue-200 last:border-l-0">
            {/* Step number */}
            <div className="absolute left-0 top-0 -translate-x-1/2 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {i + 1}
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{step.description}</p>

              {step.tips && step.tips.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-3 mb-3">
                  <ul className="space-y-1.5 text-sm text-blue-700">
                    {step.tips.map((tip, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Lightbulb className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-blue-500" />
                        <span dangerouslySetInnerHTML={{ __html: tip.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {step.warning && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-red-700 font-medium">{step.warning}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      {guide.faq && guide.faq.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" /> Câu hỏi thường gặp
          </h2>
          <div className="space-y-2">
            {guide.faq.map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-3.5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-sm text-gray-800">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related links */}
      {guide.relatedLinks && guide.relatedLinks.length > 0 && (
        <div className="bg-gray-50 rounded-2xl p-5">
          <h2 className="font-bold text-gray-800 mb-3">🔗 Liên kết hữu ích</h2>
          <div className="space-y-2">
            {guide.relatedLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" /> {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
