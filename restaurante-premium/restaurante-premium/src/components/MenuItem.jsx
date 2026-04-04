import React, { useState } from 'react'

export default function MenuItem({ item, cantidad, onAdd, onRemove }) {
  const [imgError, setImgError] = useState(false)
  const enCarrito = cantidad > 0

  const badgeColor = {
    'Signature': '#C8A96E',
    'Premium': '#E8C98A',
    'Nuevo': '#4A9E6A',
    'Bestseller': '#C8A96E',
    'Sin alcohol': '#4A9E6A',
    'Champagne': '#C8A96E',
  }

  return (
    <div style={{
      background: enCarrito ? 'rgba(200,169,110,0.06)' : 'rgba(255,255,255,0.02)',
      border: `1px solid ${enCarrito ? 'rgba(200,169,110,0.4)' : 'rgba(200,169,110,0.12)'}`,
      borderRadius: '6px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      animation: 'fadeUp 0.4s ease forwards',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Image */}
      <div style={{
        height: '180px',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
      }}>
        {!imgError ? (
          <img
            src={item.img}
            alt={item.nombre}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              display: 'block',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'rgba(200,169,110,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '40px',
          }}>🍽️</div>
        )}
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '60%',
          background: 'linear-gradient(to top, rgba(10,8,6,0.7) 0%, transparent 100%)',
        }} />
        {/* Badges */}
        <div style={{
          position: 'absolute', top: '10px', left: '10px',
          display: 'flex', gap: '6px', flexWrap: 'wrap',
        }}>
          {item.badge && (
            <span style={{
              background: badgeColor[item.badge] || 'rgba(200,169,110,0.9)',
              color: '#0A0806',
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.08em',
              padding: '3px 8px',
              borderRadius: '2px',
              textTransform: 'uppercase',
            }}>{item.badge}</span>
          )}
          {item.estrella && (
            <span style={{
              background: 'rgba(10,8,6,0.8)',
              color: '#C8A96E',
              fontSize: '10px',
              padding: '3px 8px',
              borderRadius: '2px',
              border: '1px solid rgba(200,169,110,0.4)',
            }}>⭐ Chef</span>
          )}
        </div>
        {/* Price on image */}
        <div style={{
          position: 'absolute', bottom: '10px', right: '10px',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '20px',
          fontWeight: '300',
          color: '#C8A96E',
        }}>
          ${item.precio}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '17px',
          fontWeight: '400',
          color: '#F5F0E8',
          lineHeight: 1.2,
        }}>{item.nombre}</h3>

        <p style={{
          fontSize: '12px',
          color: '#8A8070',
          lineHeight: 1.5,
          flex: 1,
        }}>{item.descripcion}</p>

        {item.maridaje && (
          <p style={{
            fontSize: '11px',
            color: 'rgba(200,169,110,0.6)',
            fontStyle: 'italic',
            letterSpacing: '0.03em',
          }}>{item.maridaje}</p>
        )}

        {/* Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '8px',
          marginTop: '4px',
        }}>
          {enCarrito && (
            <>
              <button onClick={() => onRemove(item)} style={{
                width: '28px', height: '28px',
                borderRadius: '50%',
                background: 'rgba(200,169,110,0.1)',
                border: '1px solid rgba(200,169,110,0.3)',
                color: '#C8A96E',
                fontSize: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>−</button>
              <span style={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#C8A96E',
                minWidth: '20px',
                textAlign: 'center',
              }}>{cantidad}</span>
            </>
          )}
          <button onClick={() => onAdd(item)} style={{
            width: enCarrito ? '28px' : 'auto',
            height: '28px',
            borderRadius: enCarrito ? '50%' : '3px',
            background: 'rgba(200,169,110,0.15)',
            border: '1px solid rgba(200,169,110,0.5)',
            color: '#C8A96E',
            fontSize: enCarrito ? '16px' : '12px',
            padding: enCarrito ? '0' : '0 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            letterSpacing: '0.08em',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,169,110,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(200,169,110,0.15)' }}
          >
            {enCarrito ? '+' : 'AÑADIR'}
          </button>
        </div>
      </div>
    </div>
  )
}
