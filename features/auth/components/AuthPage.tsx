// features/auth/components/AuthPage.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuth'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BiLogInCircle, BiUserPlus, BiEnvelope, BiLockAlt, BiUserCircle, BiCommand } from 'react-icons/bi'
import { useAuthForm } from '../hooks/use-auth-form'

export default function AuthPageComponent() {
  const { form, onSubmit, loading, error, isLogin, toggleMode } = useAuthForm()
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [nickname, setNickname] = useState('')
  // const [isLogin, setIsLogin] = useState(true)

  // const router = useRouter()
  // const { login, register, loading, error, setError } = useAuthStore()

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   if (isLogin) {
  //     await login(email, password)
  //     router.replace('/dashboard')
  //     router.refresh()
  //   } else {
  //     // await register(email, password)
  //     await register(email, password, nickname)
  //     setIsLogin(true)
  //   }
  // }

  return (
    // <div className="min-h-screen flex items-center justify-center bg-[#09090b] px-4 relative overflow-hidden">
    //   {/* Background glowing effect */}
    //   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

    //   <div className="w-full max-w-[400px] space-y-6 z-10">
    //     {/* Motto / project's name */}
    //     <div className="flex flex-col items-center space-y-2 mb-4">
    //       <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(8,145,178,0.4)]">
    //         <BiCommand className="text-white text-2xl" />
    //       </div>
    //       <h1 className="text-2xl font-bold tracking-tight text-white">
    //         SaaS Dashboard
    //       </h1>
    //     </div>

    //     <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-xl shadow-2xl text-zinc-300">
    //       <CardContent className="pt-8 pb-6 px-8">
    //         <div className="mb-8">
    //           <h2 className="text-xl font-semibold text-white">
    //             {isLogin ? 'Welcome back' : 'Create an account'}
    //           </h2>
    //           <p className="text-zinc-500 text-sm mt-1">
    //             {isLogin ? 'Enter your details to sign in' : 'Start your journey with us today'}
    //           </p>
    //         </div>

    //         <form onSubmit={handleSubmit} className="space-y-4">
    //           <div className="relative group">
    //             <BiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-500 transition-colors" />
    //             <Input
    //               type="email"
    //               placeholder="Email address"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               className="pl-10 bg-zinc-950/50 border-zinc-800 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all h-11"
    //               required
    //             />
    //           </div>

    //           {!isLogin && (
    //             <div className="relative group">
    //               <BiUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-500 transition-colors" />
    //               <Input
    //                 type="text"
    //                 placeholder="Nickname"
    //                 value={nickname}
    //                 onChange={(e) => setNickname(e.target.value)}
    //                 className="pl-10 bg-zinc-950/50 border-zinc-800 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all h-11"
    //                 required
    //               />
    //             </div>
    //           )}

    //           <div className="relative group">
    //             <BiLockAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-500 transition-colors" />
    //             <Input
    //               type="password"
    //               placeholder="Password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               className="pl-10 bg-zinc-950/50 border-zinc-800 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all h-11"
    //               required
    //             />
    //           </div>

    //           {error && (
    //             <p className="text-red-400 text-xs bg-red-400/10 p-2 rounded border border-red-400/20">
    //               {error}
    //             </p>
    //           )}

    //           <Button
    //             disabled={loading}
    //             className="w-full bg-white hover:bg-zinc-200 text-black font-semibold h-11 transition-all flex items-center justify-center gap-2 cursor-pointer"
    //           >
    //             {loading ? (
    //               <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
    //             ) : isLogin ? (
    //               <>Sign In <BiLogInCircle className="text-lg" /></>
    //             ) : (
    //               <>Create Account <BiUserPlus className="text-lg" /></>
    //             )}
    //           </Button>
    //         </form>
    //       </CardContent>
    //     </Card>

    //     <div className="text-center">
    //       <button
    //         onClick={() => {
    //           setIsLogin(!isLogin)
    //           setError(null)
    //         }}
    //         className="text-sm text-zinc-500 hover:text-white transition-colors cursor-pointer"
    //       >
    //         {isLogin ? (
    //           <span>New here? <span className="text-cyan-500 font-medium">Create an account</span></span>
    //         ) : (
    //           <span>Already have an account? <span className="text-cyan-500 font-medium">Log in</span></span>
    //         )}
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen flex items-center justify-center bg-[#09090b] px-4 relative overflow-hidden">
      {/* Background glowing effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[400px] space-y-6 z-10">
        <div className="flex flex-col items-center space-y-2 mb-4">
          <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(8,145,178,0.4)]">
            <BiCommand className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">SaaS Dashboard</h1>
        </div>

        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-xl shadow-2xl text-zinc-300">
          <CardContent className="pt-8 pb-6 px-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white">
                {isLogin ? 'Welcome back' : 'Create an account'}
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                {isLogin ? 'Enter your details to sign in' : 'Start your journey with us today'}
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={onSubmit} className="space-y-4">
              
              {/* Email Field */}
              <div className="relative group">
                <BiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-500 transition-colors z-20" />
                <Input
                  {...form.register('email')}
                  type="email"
                  placeholder="Email address"
                  className="pl-10 bg-zinc-950/50 border-zinc-800 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all h-11"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-[10px] mt-1 ml-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              {/* Nickname Field (Conditional) */}
              {!isLogin && (
                <div className="relative group">
                  <BiUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-500 transition-colors z-20" />
                  <Input
                    {...form.register('nickname')}
                    type="text"
                    placeholder="Nickname"
                    className="pl-10 bg-zinc-950/50 border-zinc-800 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all h-11"
                  />
                </div>
              )}

              {/* Password Field */}
              <div className="relative group">
                <BiLockAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-500 transition-colors z-20" />
                <Input
                  {...form.register('password')}
                  type="password"
                  placeholder="Password"
                  className="pl-10 bg-zinc-950/50 border-zinc-800 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all h-11"
                />
                {form.formState.errors.password && (
                  <p className="text-red-500 text-[10px] mt-1 ml-1">{form.formState.errors.password.message}</p>
                )}
              </div>

              {/* Server/Store Error */}
              {error && (
                <p className="text-red-400 text-xs bg-red-400/10 p-2 rounded border border-red-400/20">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-white hover:bg-zinc-200 text-black font-semibold h-11 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
            type="button"
            onClick={toggleMode}
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