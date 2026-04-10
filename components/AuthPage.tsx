// app/auth/AuthPage.tsx

'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // true = login, false = signup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        router.replace('/dashboard')
        router.refresh()
        return
      }
      // if (isLogin) {
      //   // Sign In
      //   const { data, error } = await supabase.auth.signInWithPassword({
      //     email,
      //     password,
      //   });

      //   if (error) throw error;

      //   // 🔑 убеждаемся, что сессия есть
      //   // const session = await supabase.auth.getSession();

      //   const session = data.session;

      //   console.log("SESSION:", session);
        
      //   if (session) {
      //     const res = await fetch('/api/auth/set-cookie', {
      //       method: 'POST',
      //       headers: { 'Content-Type': 'application/json' },
      //       body: JSON.stringify({
      //         access_token: session.access_token,
      //         refresh_token: session.refresh_token,
      //       }),
      //     });

      //     if (res.ok) {
      //       // Перезагружаем страницу полностью, чтобы сервер увидел cookie
      //       window.location.assign('/dashboard'); // 🔹 assign вместо href
      //       return;
      //     } else {
      //         throw new Error('Не удалось записать cookie');
      //     }
      //     // if (res.ok) {
      //     //   // ✅ После установки cookie делаем редирект
      //     //   window.location.href = '/dashboard';
      //     //   return; 
      //     // } else {
      //     //   throw new Error('Не удалось записать cookie');
      //     // }
      //   }
        
        // if (session) {
        //   await fetch('/api/auth/set-cookie', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //       access_token: session.access_token,
        //       refresh_token: session.refresh_token,
        //     }),
        //   });
        // }

        // router.replace('/dashboard');
        // router.push('/dashboard');
        // router.refresh(); 
       else {
        // Sign Up
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;
        
        // alert('Проверьте вашу почту! Мы отправили ссылку для подтверждения аккаунта.');
        // Можно не переключать, а оставить на форме логина
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Добро пожаловать</h1>
            <p className="text-gray-400 mt-2">
              {isLogin ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Пароль</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-950/50 border border-red-900 p-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 transition py-3.5 rounded-xl font-medium text-white text-lg disabled:cursor-not-allowed"
            >
              {loading 
                ? 'Загрузка...' 
                : isLogin 
                  ? 'Войти' 
                  : 'Зарегистрироваться'
              }
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-gray-400 hover:text-white transition text-sm"
            >
              {isLogin 
                ? "Нет аккаунта? Зарегистрироваться" 
                : "Уже есть аккаунт? Войти"}
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-8">
          Защищено Supabase Auth
        </p>
      </div>
    </div>
  );
}