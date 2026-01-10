'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { loginSchema, validateWithMessage } from '@/domain/validators/user.schema';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validar con Zod ANTES de enviar al backend
    const validation = validateWithMessage(loginSchema, formData);
    
    if (!validation.success) {
      toast.error(validation.error, {
        icon: '⚠️',
      });
      setLoading(false);
      return;
    }

    // Toast de carga
    const loadingToast = toast.loading('Iniciando sesión...', {
      style: {
        background: 'var(--color-gothic-obsidian)',
        color: 'var(--color-gothic-silver)',
      }
    });

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.data), // Usar datos validados y sanitizados
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      // Guardar token y usuario
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Cerrar toast de carga
      toast.dismiss(loadingToast);

      // Toast de éxito con el nombre del usuario
      toast.success(`¡Bienvenido ${data.user.name}!`, {
        duration: 2000,
        icon: '✨',
      });

      // Esperar un momento para que se vea el toast antes de redirigir
      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 1000);
      
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.message || 'Error al iniciar sesión', {
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" 
         style={{ background: 'var(--color-gothic-abyss)' }}>
      
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gothic-amethyst opacity-5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gothic-plum opacity-5 blur-3xl rounded-full"></div>
      </div>

      <div className="relative w-full max-w-md">
        
        {/* Contenedor principal */}
        <div className="glass-metal p-8 shadow-2xl clip-path-gothic-lg">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-lg mb-4 clip-path-gothic-md"
                 style={{ background: 'var(--color-gothic-obsidian)' }}>
              <svg className="w-8 h-8" style={{ color: 'var(--color-gothic-chrome)' }} 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-shadow-metal" 
                style={{ color: 'var(--color-gothic-pearl)' }}>
              Iniciar Sesión
            </h1>
            <p style={{ color: 'var(--color-gothic-smoke)' }}>
              Accede a tu cuenta
            </p>
          </div>

          {/* Divisor decorativo */}
          <div className="gothic-divider mb-8"></div>

          {/* Form */}
          <div className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2"
                     style={{ color: 'var(--color-gothic-silver)' }}>
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-lg clip-path-gothic-sm transition-all duration-300"
                style={{
                  background: 'var(--color-gothic-shadow)',
                  border: '1px solid var(--color-gothic-steel)',
                  color: 'var(--color-gothic-chrome)',
                  outline: 'none',
                  opacity: loading ? 0.6 : 1,
                }}
                onFocus={(e) => !loading && (e.target.style.borderColor = 'var(--color-gothic-amethyst)')}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-gothic-steel)'}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2"
                     style={{ color: 'var(--color-gothic-silver)' }}>
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg clip-path-gothic-sm transition-all duration-300"
                style={{
                  background: 'var(--color-gothic-shadow)',
                  border: '1px solid var(--color-gothic-steel)',
                  color: 'var(--color-gothic-chrome)',
                  outline: 'none',
                  opacity: loading ? 0.6 : 1,
                }}
                onFocus={(e) => !loading && (e.target.style.borderColor = 'var(--color-gothic-amethyst)')}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-gothic-steel)'}
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="/recuperar-contrasena" 
                 className="text-sm transition-colors duration-300"
                 style={{ color: 'var(--color-gothic-smoke)' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--color-gothic-amethyst)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--color-gothic-smoke)'}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 font-semibold clip-path-gothic-md transition-all duration-300 text-shadow-metal"
              style={{
                background: loading 
                  ? 'var(--color-gothic-steel)' 
                  : 'linear-gradient(135deg, var(--color-gothic-amethyst) 0%, var(--color-gothic-plum) 100%)',
                color: 'var(--color-gothic-pearl)',
                border: '1px solid var(--color-gothic-amethyst)',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 0 20px rgba(107, 33, 168, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>

          {/* Divisor decorativo */}
          <div className="gothic-divider my-8"></div>

          {/* Register Link */}
          <div className="text-center">
            <p style={{ color: 'var(--color-gothic-smoke)' }}>
              ¿No tienes una cuenta?{' '}
              <Link href="/registrarse" 
                    className="font-semibold transition-colors duration-300"
                    style={{ color: 'var(--color-gothic-silver)' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-gothic-amethyst)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-gothic-silver)'}>
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Detalle decorativo inferior */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg clip-path-gothic-sm"
               style={{ background: 'var(--color-gothic-obsidian)' }}>
            <div className="w-2 h-2 rounded-full animate-subtle-pulse"
                 style={{ background: 'var(--color-gothic-amethyst)' }}></div>
            <span className="text-xs" style={{ color: 'var(--color-gothic-ash)' }}>
              Conexión segura
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}