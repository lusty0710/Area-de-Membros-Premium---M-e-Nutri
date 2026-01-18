import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Cadastro realizado! Verifique seu e-mail para confirmar (ou entre direto se o login automático estiver ativo).');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-bg via-white to-brand-soft p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden animate-fade-in-up border border-brand-border">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-dark to-brand-primary p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/10 blur-3xl transform -translate-y-1/2"></div>
          
          <div className="relative z-10 flex flex-col items-center">
             <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/30 shadow-lg mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white"/>
                <path d="M12 5C12 5 13.5 2.5 15.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16.5 6.5C16.5 6.5 14 6.5 13 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
              </svg>
            </div>
            <h1 className="font-display font-bold text-2xl text-white">Mãe Nutri+</h1>
            <p className="text-white/90 text-sm mt-1">Área VIP Exclusiva</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            {isSignUp ? 'Criar Conta' : 'Bem-vinda de volta!'}
          </h2>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 pl-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-light outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 pl-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-light outline-none transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                <span className="font-bold">Erro:</span> {error}
              </div>
            )}

            {message && (
              <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-primary/30 hover:bg-brand-dark hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  {isSignUp ? 'Cadastrar' : 'Entrar'} <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              {isSignUp ? 'Já tem uma conta?' : 'Ainda não tem acesso?'}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                  setMessage(null);
                }}
                className="ml-1 text-brand-dark font-bold hover:underline"
              >
                {isSignUp ? 'Fazer Login' : 'Criar Conta'}
              </button>
            </p>
          </div>
          
          {!isSignUp && (
            <div className="mt-4 text-center">
               <button onClick={() => alert("Entre em contato com o suporte para recuperar sua senha.")} className="text-xs text-gray-400 hover:text-brand-primary transition-colors">
                 Esqueceu sua senha?
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};