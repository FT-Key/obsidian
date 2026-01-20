"use client";

import React from 'react';
import { User, Calendar, ShoppingBag, LogOut } from 'lucide-react';

export const UserDropdown = ({ user, handleLogout, router }) => (
  <div className="relative group">
    <button
      className="nav-action-button flex items-center gap-2 px-3 py-2"
      style={{ minWidth: '120px' }}
    >
      <User className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium max-w-[100px] truncate">
        {user?.name}
      </span>
    </button>

    <div
      className="absolute right-0 top-full mt-2 w-56 backdrop-blur-md border rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
      style={{
        backgroundColor: 'var(--color-gothic-shadow)',
        opacity: 0.95,
        borderColor: 'var(--color-gothic-steel)'
      }}
    >
      <div
        className="p-4 border-b"
        style={{ borderBottomColor: 'var(--color-gothic-steel)' }}
      >
        <p
          className="font-medium truncate"
          style={{ color: 'var(--color-gothic-pearl)' }}
        >
          {user?.name}
        </p>
        <p
          className="text-xs truncate mt-0.5"
          style={{ color: 'var(--color-gothic-smoke)' }}
        >
          {user?.email}
        </p>
      </div>

      <div className="py-1">
        <button
          onClick={() => router.push('/perfil')}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm transition-all"
          style={{ color: 'var(--color-gothic-silver)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-gothic-pearl)';
            e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-gothic-silver)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <User className="w-4 h-4" />
          <span>Mi Perfil</span>
        </button>
        <button
          onClick={() => router.push('/turnos')}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm transition-all"
          style={{ color: 'var(--color-gothic-silver)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-gothic-pearl)';
            e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-gothic-silver)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Calendar className="w-4 h-4" />
          <span>Mis Turnos</span>
        </button>
        <button
          onClick={() => router.push('/pedidos')}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm transition-all"
          style={{ color: 'var(--color-gothic-silver)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-gothic-pearl)';
            e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-gothic-silver)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Mis Pedidos</span>
        </button>
      </div>

      <div
        className="border-t"
        style={{ borderTopColor: 'var(--color-gothic-steel)' }}
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-all"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  </div>
);