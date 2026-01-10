'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerStyle={{
        top: 20,
      }}
      toastOptions={{
        // Estilos por defecto
        duration: 4000,
        style: {
          background: 'var(--color-gothic-obsidian)',
          color: 'var(--color-gothic-silver)',
          border: '1px solid var(--color-gothic-steel)',
          padding: '16px',
          borderRadius: '8px',
          fontFamily: 'var(--font-geist-sans)',
        },
        // Estilos para success
        success: {
          duration: 3000,
          iconTheme: {
            primary: 'var(--color-gothic-amethyst)',
            secondary: 'var(--color-gothic-pearl)',
          },
          style: {
            border: '1px solid var(--color-gothic-amethyst)',
            boxShadow: '0 0 15px rgba(107, 33, 168, 0.15)',
          },
        },
        // Estilos para error
        error: {
          duration: 4000,
          iconTheme: {
            primary: 'var(--color-gothic-crimson)',
            secondary: 'var(--color-gothic-pearl)',
          },
          style: {
            border: '1px solid var(--color-gothic-crimson)',
            background: 'rgba(153, 27, 27, 0.15)',
          },
        },
        // Estilos para loading
        loading: {
          iconTheme: {
            primary: 'var(--color-gothic-smoke)',
            secondary: 'var(--color-gothic-pearl)',
          },
          style: {
            border: '1px solid var(--color-gothic-gunmetal)',
          },
        },
      }}
    />
  );
}