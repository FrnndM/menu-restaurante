import React, { useState } from 'react'

export default function MenuItem({ item, cantidad, onAdd, onRemove, onOpenModal }) {
  const [imgError, setImgError] = useState(false)
  const enCarrito = cantidad > 0

  return (
    <div style={{
      background: '#FFFAF4',
      border: `1.5px solid ${enCarrito ? 'rgba(192,98,42,0.5)' : 'rgba(192,98,42,0.12)'}`,
      borderRadius: '14px',
      overflow: 'hidden',
      transition: 'all 0.25s ease',
      boxShadow: enCarrito
        ? '0 4px 20px rgba(192,98,42,0.15)'
        : '0 2px 8px rgba(44,26,14,0.06)',
      cursor: 'pointer',
      animation: 'fadeUp 0.4s ease forwards',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(192,98,42,0.18)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = enCarrito ? '0 4px 20px rgba(192,98,42,0.15)' : '0 2px 8px rgba(44,26,14,0.06)' }}
    >
      {/* Image — click opens modal */}
      <div
        onClick={() => onOpenModal(item)}
        style={{ height: '190px', overflow: 'hidden', position: 'relative' }}
      >
        {!imgError ? (
          <img
            src={item.img}
            alt={item.nombre}
            onError={() => setImgError(true)}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #F2E2C4, #F7ECD8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '48px',
          }}>🍽️</div>
        )}
        {/* Gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
          background: 'linear-gradient(to top, rgba(44,26,14,0.55) 0%, transparent 100%)',
        }} />
        {/* Zoom hint */}
        <div style={{
          position: 'absolute', bottom: '10px', right: '10px',
          background: 'rgba(253,246,237,0.85)',
          borderRadius: '20px', padding: '3px 9px',
          fontSize: '10px', color: '#C0622A', letterSpacing: '0.05em',
          fontWeight: '700',
        }}>VER MÁS +</div>
        {/* Badges */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {item.badge && (
            <span style={{
              background: '#C0622A', color: '#FDF6ED',
              fontSize: '10px', fontWeight: '700', letterSpacing: '0.05em',
              padding: '3px 8px', borderRadius: '20px',
            }}>{item.badge}</span>
          )}
          {item.popular && !item.badge && (
            <span style={{
              background: '#D4922B', color: '#FDF6ED',
              fontSize: '10px', fontWeight: '700',
              padding: '3px 8px', borderRadius: '20px',
            }}>⭐ Popular</span>
          )}
        </div>
        {/* Price */}
        <div style={{
          position: 'absolute', bottom: '10px', left: '12px',
          fontFamily: 'Playfair Display, serif',
          fontSize: '20px', color: '#FDF6ED', fontWeight: '700',
          textShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }}>${item.precio}</div>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px 16px' }}>
        <h3
          onClick={() => onOpenModal(item)}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '16px', color: '#2C1A0E',
            marginBottom: '6px', lineHeight: 1.3,
          }}
        >{item.nombre}</h3>
        <p style={{
          fontSize: '12px', color: '#9B7B5A', lineHeight: 1.5,
          marginBottom: '14px',
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{item.descripcion}</p>

        {/* Add/Remove controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontSize: '11px', color: '#C0622A', letterSpacing: '0.04em',
            fontWeight: '400',
          }}>
            {enCarrito ? `${cantidad} en pedido` : 'Toca para ver más'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {enCarrito && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); onRemove(item) }}
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: '#F2E2C4', border: '1px solid rgba(192,98,42,0.3)',
                    color: '#C0622A', fontSize: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>−</button>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#C0622A', minWidth: '18px', textAlign: 'center' }}>{cantidad}</span>
              </>
            )}
            <button
              onClick={e => { e.stopPropagation(); onAdd(item) }}
              style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: '#C0622A', color: '#FDF6ED', fontSize: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s, transform 0.1s',
                boxShadow: '0 2px 8px rgba(192,98,42,0.35)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#A8501F'; e.currentTarget.style.transform = 'scale(1.08)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C0622A'; e.currentTarget.style.transform = 'scale(1)' }}
            >+</button>
          </div>
        </div>
      </div>
    </div>
  )
}
