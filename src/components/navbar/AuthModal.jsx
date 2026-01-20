"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';

/**
 * AuthModal Component - Modal de autenticación (Login/Register)
 */
const AuthModal = ({ mode, setMode, onClose, router }) => {
  const { login } = useAuthStore();
  const { loadCart } = useCartStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    setLoading(true);
    const loadingToast = toast.loading('Iniciando sesión...');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      login(data.user, data.token);
      await loadCart(data.user.id);

      toast.dismiss(loadingToast);
      toast.success(`¡Bienvenido ${data.user.name}!`, { duration: 2000, icon: '✨' });

      setTimeout(() => {
        onClose();
        router.refresh();
      }, 1000);

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.message || 'Error al iniciar sesión', { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden', { icon: '🔒' });
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Creando tu cuenta...');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrarse');
      }

      login(data.user, data.token);
      await loadCart(data.user.id);

      toast.dismiss(loadingToast);
      toast.success(`¡Cuenta creada! Bienvenido ${data.user.name} 🎉`, { duration: 2500, icon: '✨' });

      setTimeout(() => {
        onClose();
        router.refresh();
      }, 1200);

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.message || 'Error al crear la cuenta', { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (mode === 'login') {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gothic-obsidian/90 backdrop-blur-sm overflow-y-auto py-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-4 my-auto bg-gradient-to-br from-gothic-shadow via-gothic-obsidian to-gothic-shadow border-2 border-gothic-steel rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,_rgba(107,33,168,0.1)_0%,_transparent_50%)] rounded-lg pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gothic-silver hover:text-gothic-pearl hover:bg-gothic-iron rounded-md transition-all duration-300 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative px-8 pt-8 pb-6 border-b border-gothic-steel">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-gothic-amethyst to-transparent"></div>
          <h2 className="text-2xl font-bold text-gothic-pearl text-center tracking-wider">
            {mode === 'login' ? 'INICIAR SESIÓN' : 'CREAR CUENTA'}
          </h2>
          <p className="text-gothic-smoke text-sm text-center mt-2">
            {mode === 'login' ? 'Accede a tu cuenta gótica' : 'Únete a nuestra comunidad'}
          </p>
        </div>

        <div className="p-8 space-y-5">

          {mode === 'register' && (
            <>
              <div className="space-y-2">
                <label className="block text-gothic-silver text-sm font-medium tracking-wide">
                  NOMBRE COMPLETO
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gothic-obsidian border border-gothic-steel rounded-md text-gothic-pearl placeholder-gothic-smoke focus:border-gothic-amethyst focus:ring-1 focus:ring-gothic-amethyst outline-none transition-all duration-300 disabled:opacity-60"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gothic-silver text-sm font-medium tracking-wide">
                  TELÉFONO
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+54 381 123-4567"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gothic-obsidian border border-gothic-steel rounded-md text-gothic-pearl placeholder-gothic-smoke focus:border-gothic-amethyst focus:ring-1 focus:ring-gothic-amethyst outline-none transition-all duration-300 disabled:opacity-60"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="block text-gothic-silver text-sm font-medium tracking-wide">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              disabled={loading}
              className="w-full px-4 py-3 bg-gothic-obsidian border border-gothic-steel rounded-md text-gothic-pearl placeholder-gothic-smoke focus:border-gothic-amethyst focus:ring-1 focus:ring-gothic-amethyst outline-none transition-all duration-300 disabled:opacity-60"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gothic-silver text-sm font-medium tracking-wide">
              CONTRASEÑA
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
              className="w-full px-4 py-3 bg-gothic-obsidian border border-gothic-steel rounded-md text-gothic-pearl placeholder-gothic-smoke focus:border-gothic-amethyst focus:ring-1 focus:ring-gothic-amethyst outline-none transition-all duration-300 disabled:opacity-60"
            />
            {mode === 'register' && (
              <p className="text-xs text-gothic-ash">Mínimo 6 caracteres</p>
            )}
          </div>

          {mode === 'register' && (
            <div className="space-y-2">
              <label className="block text-gothic-silver text-sm font-medium tracking-wide">
                CONFIRMAR CONTRASEÑA
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={loading}
                className="w-full px-4 py-3 bg-gothic-obsidian border border-gothic-steel rounded-md text-gothic-pearl placeholder-gothic-smoke focus:border-gothic-amethyst focus:ring-1 focus:ring-gothic-amethyst outline-none transition-all duration-300 disabled:opacity-60"
              />
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gothic-steel bg-gothic-obsidian checked:bg-gothic-amethyst focus:ring-gothic-amethyst"
                />
                <span className="text-gothic-silver group-hover:text-gothic-pearl transition-colors">
                  Recordarme
                </span>
              </label>
              <a
                href="#"
                className="text-gothic-amethyst hover:text-gothic-plum transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-gothic-amethyst via-gothic-plum to-gothic-amethyst text-white font-bold tracking-wider rounded-md shadow-[0_4px_16px_rgba(107,33,168,0.4)] hover:shadow-[0_4px_20px_rgba(107,33,168,0.6)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {mode === 'login' ? 'Iniciando sesión...' : 'Creando cuenta...'}
              </span>
            ) : (
              mode === 'login' ? 'INICIAR SESIÓN' : 'CREAR CUENTA'
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gothic-steel"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-gothic-shadow text-gothic-smoke">O CONTINÚA CON</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 bg-gothic-iron border border-gothic-steel rounded-md text-gothic-silver hover:text-gothic-pearl hover:border-gothic-pewter transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 bg-gothic-iron border border-gothic-steel rounded-md text-gothic-silver hover:text-gothic-pearl hover:border-gothic-pewter transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          <div className="text-center pt-4 border-t border-gothic-steel">
            <p className="text-gothic-smoke text-sm">
              {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-gothic-amethyst hover:text-gothic-plum font-semibold transition-colors"
              >
                {mode === 'login' ? 'Regístrate aquí' : 'Inicia sesión'}
              </button>
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gothic-amethyst to-transparent"></div>
      </div>
    </div>
  );
};

export default AuthModal;