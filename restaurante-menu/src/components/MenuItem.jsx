import React from 'react'

export default function MenuItem({ item, cantidad, onAdd, onRemove }) {
  const enCarrito = cantidad > 0

  return (
    <div style={{
      background: 'var(--warm-white)',
      border: `1px solid ${enCarrito ? 'var(--gold)' : 'var(--border)'}`,
      borderRadius: '12px',
      padding: '1rem 1.1rem',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxShadow: enCarrito ? '0 0 0 2px var(--gold-light)' : 'none',
      position: 'relative',
    }}>

      {item.popular && (
        <span style={{
          position: 'absolute',
          top: '-9px',
          left: '14px',
          background: 'var(--gold)',
          color: '#fff',
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.05em',
          padding: '2px 8px',
          borderRadius: '20px',
        }}>
          Popular
        </span>
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '15px',
          fontWeight: '600',
          color: 'var(--charcoal)',
          marginBottom: '3px',
          marginTop: item.popular ? '2px' : '0',
        }}>
          {item.nombre}
        </p>
        <p style={{
          fontSize: '13px',
          color: 'var(--muted)',
          lineHeight: '1.4',
          marginBottom: '8px',
        }}>
          {item.descripcion}
        </p>
        <p style={{
          fontSize: '16px',
          fontWeight: '600',
          color: 'var(--gold-dark)',
        }}>
          ${item.precio.toFixed(2)}
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        flexShrink: 0,
        marginTop: '4px',
      }}>
        {enCarrito && (
          <>
            <button onClick={() => onRemove(item)} style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: 'var(--border)',
              color: 'var(--brown)',
              fontSize: '18px',
              fontWeight: '300',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}>−</button>
            <span style={{
              fontSize: '15px',
              fontWeight: '500',
              minWidth: '20px',
              textAlign: 'center',
              color: 'var(--charcoal)',
            }}>{cantidad}</span>
          </>
        )}
        <button onClick={() => onAdd(item)} style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background: 'var(--gold)',
          color: '#fff',
          fontSize: '20px',
          fontWeight: '300',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
          transition: 'background 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
        >+</button>
      </div>
    </div>
  )
}
