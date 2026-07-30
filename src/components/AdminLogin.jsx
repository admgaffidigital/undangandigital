import React, { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff, X, Loader2 } from 'lucide-react';

const AdminLogin = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const emailInputRef = useRef(null);

  // Focus input on mount/open
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setError('');
      setIsShaking(false);
      setTimeout(() => {
        if (emailInputRef.current) emailInputRef.current.focus();
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email tidak boleh kosong!');
      triggerShake(emailInputRef);
      return;
    }
    if (!password.trim()) {
      setError('Password tidak boleh kosong!');
      triggerShake(null);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await onLogin(email, password);
      setIsLoading(false);
      if (!result.success) {
        setError(result.message || 'Login gagal!');
        triggerShake(null);
      }
    } catch (err) {
      setIsLoading(false);
      setError('Terjadi kesalahan koneksi.');
      triggerShake(null);
    }
  };

  const triggerShake = (refToFocus) => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    if (refToFocus && refToFocus.current) {
      refToFocus.current.focus();
      refToFocus.current.select();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4 transition-all duration-300">
      {/* Decorative backdrop elements */}
      <div className="absolute inset-0 batik-overlay opacity-30"></div>

      <div 
        className={`glass-card max-w-md w-full rounded-3xl border border-[#D4AF37]/35 shadow-[0_0_50px_rgba(212,175,55,0.25)] overflow-hidden relative animate-pop-in p-8 md:p-10 ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 text-gray-400 hover:text-[#D4AF37] transition-colors p-1.5 rounded-full hover:bg-white/5"
          disabled={isLoading}
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative corner embellishments */}
        <div className="absolute -top-10 -left-10 w-28 h-28 border border-[#D4AF37]/10 rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-28 h-28 border border-[#D4AF37]/10 rounded-full pointer-events-none"></div>

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/10 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Lock className="w-7 h-7 text-[#D4AF37] animate-pulse-gold rounded-full" />
          </div>
          <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold heading-font">
            Akses Terbatas
          </span>
          <h2 className="text-[#D4AF37] heading-font text-2xl md:text-3xl mt-1 mb-2 tracking-widest font-bold gold-text-gradient">
            ADMIN LOGIN
          </h2>
          <div className="floral-divider my-2"></div>
          <p className="text-gray-400 text-xs md:text-sm font-light mt-2 subheading-font italic">
            Silakan masukkan email dan kata sandi Anda untuk mengakses dashboard pengelolaan undangan.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <label className="text-[10px] tracking-wider uppercase text-[#D4AF37]/80 block mb-2 font-semibold">
              Email Admin
            </label>
            <input
              ref={emailInputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="input-elegant w-full pl-2 text-center text-base tracking-wide placeholder-gray-600"
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="text-[10px] tracking-wider uppercase text-[#D4AF37]/80 block mb-2 font-semibold">
              Kata Sandi
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-elegant w-full pr-12 pl-2 text-center text-lg tracking-widest font-mono placeholder-gray-600"
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 text-[#D4AF37]/75 hover:text-[#D4AF37] transition-colors p-1.5 focus:outline-none"
                disabled={isLoading}
                tabIndex="-1"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-xs text-center font-light border border-red-500/20 bg-red-950/20 py-2.5 px-3 rounded-lg animate-fade-in flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-gold w-full py-3.5 px-4 rounded-xl flex items-center justify-center font-semibold text-sm tracking-[0.15em] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)] disabled:opacity-70 disabled:pointer-events-none uppercase cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                'Masuk Dashboard'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
