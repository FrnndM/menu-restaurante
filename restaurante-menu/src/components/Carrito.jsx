import React, { useState } from 'react'
import { RESTAURANTE } from '../data/menu'

export default function Carrito({ carrito, onRemove, onAdd, onClear, total, totalItems }) {
  const [nota, setNota] = useState('')
  const [nombre, setNombre] = useState('')

  const enviarWhatsApp = () => {
    if (totalItems === 0) return

    const lineas = Object.values(carrito)
      .filter(e => e.cantidad > 0)
      .map(e => `• ${e.cantidad}x ${e.item.nombre} — $${(e.item.precio * e.cantidad).toFixed(2)}`)
      .join('\n')

    let msg = `🍽️ *Pedido – ${RESTAURANTE.nombre}*\n\n`
    if (nombre.trim()) msg += `👤 Nombre: ${nombre.trim()}\n\n`
    msg += `*Items:*\n${lineas}\n\n`
    msg += `*Total: $${total.toFixed(2)}*`
    if (nota.trim()) msg += `\n\n📝 Nota: ${nota.trim()}`

    const url = `https://wa.me/${RESTAURANTE.whatsapp}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  const itemsArr = Object.values(carrito).filter(e => e.cantidad > 0)

  return (
    <div style={{
      background: 'var(--warm-white)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '1.25rem',
      position: 'sticky',
      top: '100px',
      maxHeight: 'calc(100vh - 130px)',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--brown)', marginBottom: '2px' }}>Tu pedido</h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
          {totalItems === 0 ? 'Agrega items del menú' : `${totalItems} item${totalItems > 1 ? 's' : ''} seleccionado${totalItems > 1 ? 's' : ''}`}
        </p>
      </div>

      {itemsArr.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '2.5rem 1rem',
          color: 'var(--muted)',
          fontSize: '14px',
          borderRadius: '10px',
          background: 'var(--cream)',
          border: '1.5px dashed var(--border)',
          flex: 1,
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🛒</div>
          Tu carrito está vacío
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
            {itemsArr.map(({ item, cantidad }) => (
              <div key={item.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 10px',
                background: 'var(--cream)',
                borderRadius: '8px',
                fontSize: '13px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  flexShrink: 0,
                }}>
                  <button onClick={() => onRemove(item)} style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: 'var(--border)', color: 'var(--brown)',
                    fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>−</button>
                  <span style={{ minWidth: '18px', textAlign: 'center', fontWeight: '500' }}>{cantidad}</span>
                  <button onClick={() => onAdd(item)} style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: 'var(--gold)', color: '#fff',
                    fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>+</button>
                </div>
                <span style={{ flex: 1, color: 'var(--charcoal)' }}>{item.nombre}</span>
                <span style={{ fontWeight: '500', color: 'var(--gold-dark)', flexShrink: 0 }}>
                  ${(item.precio * cantidad).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '12px',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontWeight: '500', color: 'var(--brown)' }}>Total</span>
            <span style={{
              fontSize: '20px',
              fontFamily: 'Playfair Display, serif',
              fontWeight: '700',
              color: 'var(--charcoal)',
            }}>${total.toFixed(2)}</span>
          </div>
        </>
      )}

      {itemsArr.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
          <input
            placeholder="Tu nombre (opcional)"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            style={{
              padding: '9px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              fontSize: '14px',
              background: 'var(--cream)',
              color: 'var(--charcoal)',
              outline: 'none',
              fontFamily: 'DM Sans, sans-serif',
            }}
          />
          <textarea
            placeholder="Nota especial (alergias, sin cebolla...)"
            value={nota}
            onChange={e => setNota(e.target.value)}
            rows={2}
            style={{
              padding: '9px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              fontSize: '13px',
              background: 'var(--cream)',
              color: 'var(--charcoal)',
              resize: 'none',
              outline: 'none',
              fontFamily: 'DM Sans, sans-serif',
            }}
          />

          <button
            onClick={enviarWhatsApp}
            style={{
              width: '100%',
              padding: '13px',
              background: '#25D366',
              color: '#fff',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1EBE57'}
            onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
          >
            <WhatsAppIcon />
            Enviar pedido por WhatsApp
          </button>

          <button
            onClick={onClear}
            style={{
              width: '100%',
              padding: '9px',
              background: 'transparent',
              color: 'var(--muted)',
              borderRadius: '8px',
              fontSize: '13px',
              border: '1px solid var(--border)',
            }}
          >
            Limpiar pedido
          </button>
        </div>
      )}
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
}
