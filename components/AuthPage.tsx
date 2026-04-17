// app/auth/AuthPage.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuth'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const router = useRouter()
  const { login, register, loading, error, setError } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      await login(email, password)
      router.replace('/dashboard')
      router.refresh()
    } else {
      // await register(email, password)
      await register(email, password, nickname)
      setIsLogin(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
          
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            {isLogin ? 'Вход' : 'Регистрация'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded bg-gray-800 text-white"
            />

            {!isLogin && (
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Nickname"
                className="w-full p-3 rounded bg-gray-800 text-white"
              />
            )}

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className="w-full p-3 rounded bg-gray-800 text-white"
            />

            {error && <p className="text-red-500">{error}</p>}

            <button
              disabled={loading}
              className="w-full bg-blue-600 py-3 rounded text-white"
            >
              {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Регистрация'}
            </button>
          </form>

          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError(null)
            }}
            className="mt-4 text-gray-400 text-sm"
          >
            {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт?'}
          </button>
        </div>
      </div>
    </div>
  )
}