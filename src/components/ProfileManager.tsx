import { useState, useRef } from 'react'
import { Download, Upload, Lock, X, Check, AlertCircle } from 'lucide-react'
import { exportProfile, importProfile, getAllDrafts, type SavedProfile } from '../lib/storage'

interface Props {
  onImport: (profile: SavedProfile) => void
}

export default function ProfileManager({ onImport }: Props) {
  const [mode, setMode] = useState<'idle' | 'export' | 'import'>('idle')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profileName, setProfileName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const reset = () => {
    setMode('idle')
    setPassword('')
    setConfirmPassword('')
    setProfileName('')
    setError('')
    setSuccess('')
  }

  const handleExport = async () => {
    if (!password || password.length < 4) {
      setError('Mật khẩu phải ít nhất 4 ký tự')
      return
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp')
      return
    }

    setLoading(true)
    setError('')
    try {
      const drafts = getAllDrafts()
      const profile: SavedProfile = {
        version: 1,
        name: profileName || 'profile',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        forms: Object.fromEntries(
          Object.entries(drafts).map(([k, v]) => [k, v.data])
        ),
      }
      await exportProfile(profile, password, `thutucjp-${profileName || 'data'}.thutuc`)
      setSuccess('Đã xuất file thành công! ✅')
      setTimeout(reset, 2000)
    } catch {
      setError('Lỗi khi xuất file')
    } finally {
      setLoading(false)
    }
  }

  const handleImport = async (file: File) => {
    if (!password) {
      setError('Vui lòng nhập mật khẩu')
      return
    }

    setLoading(true)
    setError('')
    try {
      const profile = await importProfile(file, password)
      onImport(profile)
      setSuccess(`Đã nhập ${Object.keys(profile.forms).length} biểu mẫu! ✅`)
      setTimeout(reset, 2000)
    } catch (e) {
      setError((e as Error).message || 'Sai mật khẩu hoặc file bị hỏng')
    } finally {
      setLoading(false)
    }
  }

  if (mode === 'idle') {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => setMode('export')}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Download className="w-4 h-4" /> Lưu dữ liệu
        </button>
        <button
          onClick={() => setMode('import')}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
        >
          <Upload className="w-4 h-4" /> Nhập dữ liệu
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-600" />
          {mode === 'export' ? 'Lưu dữ liệu (mã hóa)' : 'Nhập dữ liệu'}
        </h3>
        <button onClick={reset} className="p-1 hover:bg-gray-100 rounded-lg">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="space-y-3">
        {mode === 'export' && (
          <div>
            <label className="text-sm font-medium text-gray-600">Tên hồ sơ</label>
            <input
              type="text"
              value={profileName}
              onChange={e => setProfileName(e.target.value)}
              placeholder="VD: nguyen-van-a"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-gray-600">
            Mật khẩu (để mã hóa/giải mã)
          </label>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
            placeholder="Ít nhất 4 ký tự"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {mode === 'export' && (
          <div>
            <label className="text-sm font-medium text-gray-600">Xác nhận mật khẩu</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => { setConfirmPassword(e.target.value); setError('') }}
              placeholder="Nhập lại mật khẩu"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}

        {mode === 'import' && (
          <div>
            <label className="text-sm font-medium text-gray-600">Chọn file .thutucjp_com</label>
            <input
              ref={fileRef}
              type="file"
              accept=".thutucjp_com"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm mt-1 file:mr-3 file:px-3 file:py-1 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-medium file:text-sm"
            />
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-xl">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl">
            <Check className="w-4 h-4 flex-shrink-0" /> {success}
          </div>
        )}

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
          🔐 File được mã hóa <strong>AES-256-GCM</strong> bằng mật khẩu của bạn.
          Không ai có thể đọc được nếu không biết mật khẩu — kể cả ThủTụcJP.
          <br />
          ⚠️ <strong>Quên mật khẩu = mất dữ liệu.</strong> Hãy nhớ kỹ!
        </div>

        <button
          onClick={() => {
            if (mode === 'export') handleExport()
            else if (fileRef.current?.files?.[0]) handleImport(fileRef.current.files[0])
            else setError('Vui lòng chọn file')
          }}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="animate-spin">⏳</span>
          ) : mode === 'export' ? (
            <><Download className="w-4 h-4" /> Xuất file mã hóa</>
          ) : (
            <><Upload className="w-4 h-4" /> Nhập & giải mã</>
          )}
        </button>
      </div>
    </div>
  )
}
