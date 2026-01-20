"use client";

import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Tooltip from '@/components/navbar/Tooltip';

const ActionButton = ({ icon, count = 0, onClick, tooltip, showBadge = true }) => {
  return (
    <Tooltip content={tooltip}>
      <button
        onClick={onClick}
        className="nav-action-button"
      >
        {icon}
        {showBadge && count > 0 && (
          <span className="nav-badge">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>
    </Tooltip>
  );
};


export const FavoritesButton = ({ count }) => {
  const router = useRouter();

  return (
    <ActionButton
      icon={<Heart className="w-5 h-5" />}
      count={count}
      onClick={() => router.push('/favoritos')}
      tooltip={count === 0 ? 'Sin favoritos' : `${count} ${count === 1 ? 'favorito' : 'favoritos'}`}
    />
  );
};

export const CartButton = ({
  itemCount,
  cartItems,
  total,
  user,
  removeItem
}) => {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);

  const handleRemove = async (e, item) => {
    e.stopPropagation();
    if (user) {
      try {
        const userId = user._id || user.id;
        await removeItem(userId, item._id);
        toast.success('Producto eliminado');
      } catch (error) {
        toast.error('Error al eliminar');
      }
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <button
        onClick={() => router.push('/carrito')}
        className="nav-action-button"
      >
        <ShoppingBag className="w-5 h-5" />
        {itemCount > 0 && (
          <span className="nav-badge nav-badge-primary">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>

      {/* Cart Preview */}
      {showPreview && (
        <div className="cart-preview">
          {cartItems.length === 0 ? (
            <div className="p-6 text-center">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--color-gothic-steel)' }} />
              <p className="text-sm" style={{ color: 'var(--color-gothic-smoke)' }}>Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="max-h-64 overflow-y-auto">
                {cartItems.slice(0, 3).map((item) => {
                  const product = item.product;
                  return (
                    <div
                      key={item._id}
                      className="cart-item"
                    >
                      <div className="flex gap-3">
                        <div
                          className="w-16 h-16 flex-shrink-0 rounded overflow-hidden"
                          style={{ backgroundColor: 'var(--color-gothic-obsidian)' }}
                        >
                          {product?.main_image ? (
                            <img src={product.main_image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="w-6 h-6" style={{ color: 'var(--color-gothic-steel)' }} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-medium truncate"
                            style={{ color: 'var(--color-gothic-pearl)' }}
                          >
                            {product?.name}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: 'var(--color-gothic-smoke)' }}
                          >
                            Cantidad: {item.quantity}
                          </p>
                          <p
                            className="text-sm font-bold mt-1"
                            style={{ color: 'var(--color-gothic-amethyst)' }}
                          >
                            ${((item.price || product?.price || 0) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleRemove(e, item)}
                          className="p-1 transition-colors"
                          style={{ color: 'var(--color-gothic-smoke)' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gothic-smoke)'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {cartItems.length > 3 && (
                <div
                  className="px-3 py-2 text-center"
                  style={{ backgroundColor: 'rgba(var(--color-gothic-iron), 0.3)' }}
                >
                  <p
                    className="text-xs"
                    style={{ color: 'var(--color-gothic-smoke)' }}
                  >
                    +{cartItems.length - 3} productos más
                  </p>
                </div>
              )}

              <div
                className="p-4 border-t"
                style={{
                  borderTopColor: 'var(--color-gothic-steel)',
                  backgroundColor: 'rgba(var(--color-gothic-obsidian), 0.5)'
                }}
              >
                <div className="flex justify-between mb-3">
                  <span
                    className="font-semibold"
                    style={{ color: 'var(--color-gothic-silver)' }}
                  >
                    Total:
                  </span>
                  <span
                    className="font-bold text-lg"
                    style={{ color: 'var(--color-gothic-amethyst)' }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => router.push('/carrito')}
                  className="cart-view-button"
                >
                  Ver Carrito
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export const SearchButton = () => {
  return (
    <ActionButton
      icon={<Search className="w-5 h-5" />}
      onClick={() => { }}
      tooltip="Buscar"
      showBadge={false}
    />
  );
};