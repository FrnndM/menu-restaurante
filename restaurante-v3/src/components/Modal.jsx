import React, { useEffect } from 'react'

export default function Modal({ item, cantidad, onAdd, onRemove, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  const enCarrito = cantidad > 0

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(44,26,14,0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#FDF6ED',
          borderRadius: '16px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'scaleIn 0.25s ease',
          boxShadow: '0 24px 80px rgba(44,26,14,0.4)',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: '300px', flexShrink: 0 }}>
          <img
            src={item.img}
            alt={item.nombre}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px 16px 0 0', display: 'block' }}
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(44,26,14,0.6) 0%, transparent 50%)',
            borderRadius: '16px 16px 0 0',
          }} />
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '14px', right: '14px',
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(253,246,237,0.9)',
              color: '#5C3317', fontSize: '18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '300',
            }}
          >✕</button>
          {/* Badges */}
          <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '6px' }}>
            {item.badge && (
              <span style={{
                background: '#C0622A', color: '#FDF6ED',
                fontSize: '11px', fontWeight: '700', letterSpacing: '0.06em',
                padding: '4px 10px', borderRadius: '20px',
              }}>{item.badge}</span>
            )}
            {item.estrella && (
              <span style={{
                background: '#D4922B', color: '#FDF6ED',
                fontSize: '11px', padding: '4px 10px', borderRadius: '20px',
              }}>⭐ Chef's Choice</span>
            )}
          </div>
          {/* Price overlay */}
          <div style={{
            position: 'absolute', bottom: '16px', right: '16px',
            fontFamily: 'Playfair Display, serif',
            fontSize: '32px', color: '#FDF6ED', fontWeight: '400',
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}>${item.precio}</div>
        </div>

        {/* Content */}
        <div style={{ padding: '28px 32px 32px' }}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '28px', color: '#2C1A0E',
            marginBottom: '12px', fontWeight: '700',
          }}>{item.nombre}</h2>

          <p style={{
            fontSize: '15px', color: '#5C3317',
            lineHeight: 1.7, marginBottom: '20px',
          }}>{item.descripcion}</p>

          {item.maridaje && (
            <div style={{
              background: '#F7ECD8',
              border: '1px solid rgba(192,98,42,0.2)',
              borderRadius: '8px', padding: '12px 16px',
              marginBottom: '24px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ fontSize: '20px' }}>🍷</span>
              <p style={{ fontSize: '13px', color: '#9B7B5A', fontStyle: 'italic' }}>{item.maridaje}</p>
            </div>
          )}

          {/* Controls */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(192,98,42,0.15)',
            paddingTop: '20px',
          }}>
            <div>
              <p style={{ fontSize: '12px', color: '#9B7B5A', letterSpacing: '0.08em', marginBottom: '2px' }}>PRECIO</p>
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '26px', color: '#C0622A', fontWeight: '700',
              }}>${item.precio}.00</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {enCarrito && (
                <>
                  <button
                    onClick={() => onRemove(item)}
                    style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: '#F2E2C4', border: '1px solid rgba(192,98,42,0.3)',
                      color: '#C0622A', fontSize: '20px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>−</button>
                  <span style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '22px', color: '#2C1A0E', minWidth: '28px', textAlign: 'center',
                  }}>{cantidad}</span>
                </>
              )}
              <button
                onClick={() => onAdd(item)}
                style={{
                  padding: enCarrito ? '0' : '12px 28px',
                  width: enCarrito ? '40px' : 'auto',
                  height: enCarrito ? '40px' : 'auto',
                  borderRadius: enCarrito ? '50%' : '8px',
                  background: '#C0622A', color: '#FDF6ED',
                  fontSize: enCarrito ? '20px' : '14px',
                  fontWeight: '700', letterSpacing: '0.06em',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#A8501F'}
                onMouseLeave={e => e.currentTarget.style.background = '#C0622A'}
              >
                {enCarrito ? '+' : 'AGREGAR AL PEDIDO'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
