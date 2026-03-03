import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ArrowLeft, Download, Info, CheckCircle, Save, Trash2, MapPin, FileText, ExternalLink, AlertTriangle, Clock } from 'lucide-react'
import { forms } from '../data/forms'
import { useState, useEffect, useCallback } from 'react'
import { saveDraft, loadDraft, clearDraft } from '../lib/storage'
import OfficialFormPreview from '../components/OfficialFormPreview'

export default function FormPage() {
  const { formId } = useParams()
  const form = forms.find((f) => f.id === formId)
  const draft = formId ? loadDraft(formId) : null
  const { register, handleSubmit, formState: { errors }, watch, reset: resetForm } = useForm({
    defaultValues: draft || {},
  })
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [draftSaved, setDraftSaved] = useState(!!draft)

  // Auto-save draft every 5 seconds
  const watchAll = watch()
  const autoSave = useCallback(() => {
    if (formId && !submitted) {
      const values = watchAll as Record<string, string>
      const hasData = Object.values(values).some(v => v && v.trim())
      if (hasData) {
        saveDraft(formId, values)
        setDraftSaved(true)
      }
    }
  }, [formId, submitted, watchAll])

  useEffect(() => {
    const timer = setInterval(autoSave, 5000)
    return () => clearInterval(timer)
  }, [autoSave])

  const handleClearDraft = () => {
    if (formId && confirm('Xóa bản nháp? Dữ liệu đã nhập sẽ bị xóa.')) {
      clearDraft(formId)
      resetForm({})
      setDraftSaved(false)
    }
  }

  if (!form) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Không tìm thấy biểu mẫu</p>
        <Link to="/" className="text-blue-600 mt-4 inline-block">← Về trang chủ</Link>
      </div>
    )
  }

  const sections = [...new Set(form.fields.map((f) => f.section || 'Khác'))]

  const onSubmit = (data: Record<string, string>) => {
    setFormData(data)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Print the official form
  const handlePrint = () => {
    window.print()
  }

  if (submitted) {
    return (
      <div>
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-4">
          <ArrowLeft className="w-4 h-4" /> Trang chủ
        </Link>

        {/* Success + Actions (hidden when printing) */}
        <div className="no-print">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-green-800 mb-2">Đã điền xong! ✅</h2>
            <p className="text-green-600 text-sm">Form bên dưới đã được điền sẵn thông tin của bạn. Bấm "In form" để in ra nộp.</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handlePrint}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors text-lg"
            >
              🖨️ In form / Save PDF
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="px-5 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 font-medium transition-colors"
            >
              ✏️ Sửa lại
            </button>
          </div>

          {/* Official form download links */}
          {(form.pdfUrl || form.excelUrl) && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-500 mb-2">📄 Hoặc tải form gốc từ cơ quan chính thức:</p>
              <div className="flex flex-wrap gap-2">
                {form.pdfUrl && (
                  <a href={form.pdfUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm hover:bg-red-100">
                    <Download className="w-3.5 h-3.5" /> PDF gốc (入管庁)
                  </a>
                )}
                {form.excelUrl && (
                  <a href={form.excelUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm hover:bg-green-100">
                    <Download className="w-3.5 h-3.5" /> Excel gốc
                  </a>
                )}
                {form.officialUrl && (
                  <a href={form.officialUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm hover:bg-blue-100">
                    <ExternalLink className="w-3.5 h-3.5" /> Trang chính thức
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Official form preview (THIS is what gets printed) */}
        <div className="mb-6 border border-gray-300 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 flex items-center gap-2 no-print">
            <FileText className="w-4 h-4" /> Preview — Form sẽ được in như bên dưới
          </div>
          <OfficialFormPreview form={form} data={formData} />
        </div>

        {/* STEP 3: Where to submit */}
        {form.submission && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 mb-4">
            <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Bước 3: Nộp ở đâu?
            </h3>

            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="font-bold text-gray-900 text-lg">{form.submission.where}</div>
              <div className="text-gray-400 text-sm">{form.submission.whereJp}</div>
              {form.submission.hours && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                  <Clock className="w-4 h-4" /> {form.submission.hours}
                </div>
              )}
            </div>

            <h4 className="font-semibold text-indigo-800 text-sm mb-2">📋 Cách nộp:</h4>
            <ul className="space-y-1.5 mb-4">
              {form.submission.howToSubmit.map((step, i) => (
                <li key={i} className="text-sm text-indigo-700">{step}</li>
              ))}
            </ul>

            <h4 className="font-semibold text-indigo-800 text-sm mb-2">✅ Sau khi nộp:</h4>
            <ul className="space-y-1.5 mb-4">
              {form.submission.afterSubmit.map((step, i) => (
                <li key={i} className="text-sm text-indigo-700">{step}</li>
              ))}
            </ul>

            {form.submission.importantNotes && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <h4 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Lưu ý quan trọng:
                </h4>
                <ul className="space-y-1">
                  {form.submission.importantNotes.map((note, i) => (
                    <li key={i} className="text-sm text-amber-700">{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Required docs checklist */}
        {form.requiredDocs && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-4">
            <h3 className="font-bold text-amber-900 mb-3">📎 Checklist giấy tờ cần mang theo</h3>
            <ul className="space-y-2">
              {form.requiredDocs.map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                  <input type="checkbox" className="mt-0.5 rounded" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Edit button */}
        <button
          onClick={() => setSubmitted(false)}
          className="w-full py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 font-medium transition-colors"
        >
          ✏️ Sửa lại thông tin
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Back */}
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-4">
        <ArrowLeft className="w-4 h-4" /> Trang chủ
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{form.title}</h1>
        <p className="text-gray-500">{form.titleJp}</p>
      </div>

      {/* Draft indicator */}
      {draftSaved && !submitted && (
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 mb-4">
          <span className="text-sm text-emerald-700 flex items-center gap-1.5">
            <Save className="w-4 h-4" /> Bản nháp đã lưu — dữ liệu sẽ tự động khôi phục khi quay lại
          </span>
          <button onClick={handleClearDraft} className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1">
            <Trash2 className="w-3.5 h-3.5" /> Xóa nháp
          </button>
        </div>
      )}

      {/* Meta info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {form.fee && (
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500">Phí</div>
            <div className="font-semibold text-sm">{form.fee}</div>
          </div>
        )}
        {form.processingTime && (
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500">Thời gian xử lý</div>
            <div className="font-semibold text-sm">{form.processingTime}</div>
          </div>
        )}
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-xs text-gray-500">Số trường</div>
          <div className="font-semibold text-sm">{form.fields.length} trường</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-xs text-gray-500">Thời gian điền</div>
          <div className="font-semibold text-sm">{form.estimatedTime}</div>
        </div>
      </div>

      {/* Official links */}
      {(form.officialUrl || form.pdfUrl || form.excelUrl) && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 flex flex-wrap gap-3">
          {form.officialUrl && (
            <a href={form.officialUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">📄 Trang chính thức (入管庁)</a>
          )}
          {form.pdfUrl && (
            <a href={form.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">📋 Tải PDF gốc</a>
          )}
          {form.excelUrl && (
            <a href={form.excelUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">📊 Tải Excel gốc</a>
          )}
        </div>
      )}

      {/* Tips */}
      {form.tips && form.tips.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 font-semibold text-blue-800 mb-2">
            <Info className="w-4 h-4" /> Lưu ý quan trọng
          </div>
          <ul className="text-sm text-blue-700 space-y-1">
            {form.tips.map((tip, i) => (
              <li key={i}>• {tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Required docs */}
      {form.requiredDocs && form.requiredDocs.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="font-semibold text-amber-800 mb-2">📎 Giấy tờ cần chuẩn bị</div>
          <ul className="text-sm text-amber-700 space-y-1">
            {form.requiredDocs.map((doc, i) => (
              <li key={i}>☐ {doc}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {sections.map((section) => (
          <div key={section} className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-semibold text-gray-800 mb-4 pb-2 border-b">{section}</h2>
            <div className="space-y-4">
              {form.fields
                .filter((f) => (f.section || 'Khác') === section)
                .map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.labelJp && (
                        <span className="text-gray-400 ml-1">({field.labelJp})</span>
                      )}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea
                        {...register(field.id, { required: field.required })}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        {...register(field.id, { required: field.required })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="">— Chọn —</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'radio' ? (
                      <div className="flex gap-4">
                        {field.options?.map((opt) => (
                          <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                              type="radio"
                              {...register(field.id, { required: field.required })}
                              value={opt.value}
                              className="text-blue-600"
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    ) : (
                      <input
                        type={field.type === 'phone' ? 'tel' : field.type === 'number' ? 'number' : field.type}
                        {...register(field.id, { required: field.required })}
                        placeholder={field.placeholder}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    )}

                    {field.hint && (
                      <p className="text-xs text-gray-400 mt-1">{field.hint}</p>
                    )}
                    {errors[field.id] && (
                      <p className="text-xs text-red-500 mt-1">Bắt buộc điền</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          ✅ Hoàn thành
        </button>
      </form>
    </div>
  )
}
