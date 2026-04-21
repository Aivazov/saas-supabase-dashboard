// app/auth/AuthPage.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuth'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BiLogInCircle, BiUserPlus, BiEnvelope, BiLockAlt, BiUserCircle, BiCommand } from 'react-icons/bi'

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
    // <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
    //   <div className="w-full max-w-md">
    //     <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
          
    //       <h1 className="text-3xl font-bold text-white text-center mb-6">
    //         {isLogin ? 'Login' : 'Регистрация'}
    //       </h1>

    //       <form onSubmit={handleSubmit} className="space-y-4">
    //         <input
    //           type="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           placeholder="Email"
    //           className="w-full p-3 rounded bg-gray-800 text-white"
    //         />

    //         {!isLogin && (
    //           <input
    //             type="text"
    //             value={nickname}
    //             onChange={(e) => setNickname(e.target.value)}
    //             placeholder="Nickname"
    //             className="w-full p-3 rounded bg-gray-800 text-white"
    //           />
    //         )}

    //         <input
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           placeholder="Пароль"
    //           className="w-full p-3 rounded bg-gray-800 text-white"
    //         />

    //         {error && <p className="text-red-500">{error}</p>}

    //         <button
    //           disabled={loading}
    //           className="w-full bg-blue-600 py-3 rounded text-white"
    //         >
    //           {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Регистрация'}
    //         </button>
    //       </form>

    //       <button
    //         onClick={() => {
    //           setIsLogin(!isLogin)
    //           setError(null)
    //         }}
    //         className="mt-4 text-gray-400 text-sm"
    //       >
    //         {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт?'}
    //       </button>
    //     </div>
    //   </div>
    // </div>
    // <div className="relative min-h-screen flex items-center justify-center bg-[#09090b] px-4 overflow-hidden">
    //   {/* Декоративный фоновый градиент */}
    //   <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px]" />
    //   <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />

    //   <Card className="w-full max-w-md bg-zinc-900/50 border-zinc-800 backdrop-blur-xl shadow-2xl relative z-10">
    //     <CardHeader className="space-y-1 text-center">
    //       <CardTitle className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
    //         {isLogin ? 'Welcome Back' : 'Create Account'}
    //       </CardTitle>
    //       <CardDescription className="text-zinc-400">
    //         {isLogin 
    //           ? 'Enter your credentials to access your dashboard' 
    //           : 'Join us and start managing your workspace today'}
    //       </CardDescription>
    //     </CardHeader>

    //     <CardContent>
    //       <form onSubmit={handleSubmit} className="space-y-4">
    //         <div className="space-y-2">
    //           <Label htmlFor="email" className="text-zinc-300 ml-1">Email address</Label>
    //           <div className="relative">
    //             <BiEnvelope className="absolute left-3 top-3 text-zinc-500 w-5 h-5" />
    //             <Input
    //               id="email"
    //               type="email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               placeholder="name@example.com"
    //               className="pl-10 bg-zinc-800/50 border-zinc-700 focus:ring-cyan-500 text-white"
    //               required
    //             />
    //           </div>
    //         </div>

    //         {!isLogin && (
    //           <div className="space-y-2">
    //             <Label htmlFor="nickname" className="text-zinc-300 ml-1">Nickname</Label>
    //             <div className="relative">
    //               <BiUserCircle className="absolute left-3 top-3 text-zinc-500 w-5 h-5" />
    //               <Input
    //                 id="nickname"
    //                 type="text"
    //                 value={nickname}
    //                 onChange={(e) => setNickname(e.target.value)}
    //                 placeholder="Your unique name"
    //                 className="pl-10 bg-zinc-800/50 border-zinc-700 focus:ring-cyan-500 text-white"
    //                 required
    //               />
    //             </div>
    //           </div>
    //         )}

    //         <div className="space-y-2">
    //           <Label htmlFor="password" className="text-zinc-300 ml-1">Password</Label>
    //           <div className="relative">
    //             <BiLockAlt className="absolute left-3 top-3 text-zinc-500 w-5 h-5" />
    //             <Input
    //               id="password"
    //               type="password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               placeholder="••••••••"
    //               className="pl-10 bg-zinc-800/50 border-zinc-700 focus:ring-cyan-500 text-white"
    //               required
    //             />
    //           </div>
    //         </div>

    //         {error && (
    //           <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
    //             {error}
    //           </div>
    //         )}

    //         <Button
    //           disabled={loading}
    //           className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-6 mt-2 transition-all shadow-[0_0_20px_rgba(8,145,178,0.2)]"
    //         >
    //           {loading ? (
    //             <span className="flex items-center gap-2">
    //               <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    //               Processing...
    //             </span>
    //           ) : isLogin ? (
    //             <span className="flex items-center gap-2"><BiLogInCircle className="w-5 h-5" /> Sign In</span>
    //           ) : (
    //             <span className="flex items-center gap-2"><BiUserPlus className="w-5 h-5" /> Get Started</span>
    //           )}
    //         </Button>
    //       </form>
    //     </CardContent>

    //     <CardFooter className="flex flex-col space-y-4">
    //       <div className="relative w-full">
    //         <div className="absolute inset-0 flex items-center">
    //           <span className="w-full border-t border-zinc-800" />
    //         </div>
    //         <div className="relative flex justify-center text-xs uppercase">
    //           <span className="bg-[#0b0b0d] px-2 text-zinc-500">Or continue with</span>
    //         </div>
    //       </div>

    //       <button
    //         type="button"
    //         onClick={() => {
    //           setIsLogin(!isLogin)
    //           setError(null)
    //         }}
    //         className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors underline-offset-4 hover:underline"
    //       >
    //         {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
    //       </button>
    //     </CardFooter>
    //   </Card>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] px-4 relative overflow-hidden">
      {/* Background glowing effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[400px] space-y-6 z-10">
        {/* Motto / project's name */}
        <div className="flex flex-col items-center space-y-2 mb-4">
          <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(8,145,178,0.4)]">
            <BiCommand className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            SaaS Dashboard
          </h1>
        </div>

        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-xl shadow-2xl">
          <CardContent className="pt-8 pb-6 px-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white">
                {isLogin ? 'Welcome back' : 'Create an account'}
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                {isLogin ? 'Enter your details to sign in' : 'Start your journey with us today'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group">
                <BiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-500 transition-colors" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-zinc-950/50 border-zinc-800 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all h-11"
                  required
                />
              </div>

              {!isLogin && (
                <div className="relative group">
                  <BiUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-500 transition-colors" />
                  <Input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="pl-10 bg-zinc-950/50 border-zinc-800 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all h-11"
                    required
                  />
                </div>
              )}

              <div className="relative group">
                <BiLockAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-500 transition-colors" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-zinc-950/50 border-zinc-800 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all h-11"
                  required
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs bg-red-400/10 p-2 rounded border border-red-400/20">
                  {error}
                </p>
              )}

              <Button
                disabled={loading}
                className="w-full bg-white hover:bg-zinc-200 text-black font-semibold h-11 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : isLogin ? (
                  <>Sign In <BiLogInCircle className="text-lg" /></>
                ) : (
                  <>Create Account <BiUserPlus className="text-lg" /></>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError(null)
            }}
            className="text-sm text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            {isLogin ? (
              <span>New here? <span className="text-cyan-500 font-medium">Create an account</span></span>
            ) : (
              <span>Already have an account? <span className="text-cyan-500 font-medium">Log in</span></span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}