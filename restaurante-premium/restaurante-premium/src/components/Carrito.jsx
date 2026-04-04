import React, { useState } from 'react'
import { RESTAURANTE } from '../data/menu'

export default function Carrito({ carrito, onRemove, onAdd, onClear, total, totalItems }) {
  const [nota, setNota] = useState('')
  const [nombre, setNombre] = useState('')
  const [mesa, setMesa] = useState('')

  const enviarWhatsApp = () => {
    if (totalItems === 0) return
    const lineas = Object.values(carrito)
      .filter(e => e.cantidad > 0)
      .map(e => `  • ${e.cantidad}x ${e.item.nombre} — $${(e.item.precio * e.cantidad).toFixed(2)}`)
      .join('\n')

    let msg = `🍽️ *Pedido — ${RESTAURANTE.nombre}*\n`
    msg += `━━━━━━━━━━━━━━━━━━━━\n`
    if (nombre.trim()) msg += `👤 *Cliente:* ${nombre.trim()}\n`
    if (mesa.trim()) msg += `🪑 *Mesa/Reserva:* ${mesa.trim()}\n`
    msg += `━━━━━━━━━━━━━━━━━━━━\n`
    msg += `*Selección:*\n${lineas}\n`
    msg += `━━━━━━━━━━━━━━━━━━━━\n`
    msg += `*Total: $${total.toFixed(2)}*`
    if (nota.trim()) msg += `\n\n📝 *Nota:* ${nota.trim()}`
    msg += `\n\n_Enviado desde menu digital La Mesa_`

    window.open(`https://wa.me/${RESTAURANTE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const itemsArr = Object.values(carrito).filter(e => e.cantidad > 0)
  const inputStyle = {
    padding: '9px 12px',
    borderRadius: '3px',
    border: '1px solid rgba(200,169,110,0.2)',
    fontSize: '13px',
    background: 'rgba(255,255,255,0.03)',
    color: '#F5F0E8',
    outline: 'none',
    fontFamily: 'Jost, sans-serif',
    width: '100%',
    letterSpacing: '0.02em',
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(200,169,110,0.15)',
      borderRadius: '6px',
      padding: '1.25rem',
      position: 'sticky',
      top: '80px',
      maxHeight: 'calc(100vh - 110px)',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* Header */}
      <div>
        <p style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#8A8070', marginBottom: '4px' }}>TU SELECCIÓN</p>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: '#F5F0E8', fontWeight: '300' }}>
          {totalItems === 0 ? 'Carrito vacío' : `${totalItems} item${totalItems > 1 ? 's' : ''}`}
        </h3>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(200,169,110,0.15)' }} />

      {itemsArr.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '2.5rem 1rem',
          color: '#8A8070', fontSize: '13px',
          border: '1px dashed rgba(200,169,110,0.15)',
          borderRadius: '4px',
        }}>
          <div style={{ fontSize: '28px', marginBottom: '10px', opacity: 0.4 }}>🍽️</div>
          Agrega platos para comenzar
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {itemsArr.map(({ item, cantidad }) => (
            <div key={item.id} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 0',
              borderBottom: '1px solid rgba(200,169,110,0.08)',
              fontSize: '13px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                <button onClick={() => onRemove(item)} style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: 'transparent', border: '1px solid rgba(200,169,110,0.3)',
                  color: '#C8A96E', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>−</button>
                <span style={{ minWidth: '18px', textAlign: 'center', color: '#C8A96E', fontWeight: '400' }}>{cantidad}</span>
                <button onClick={() => onAdd(item)} style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.3)',
                  color: '#C8A96E', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>+</button>
              </div>
              <span style={{ flex: 1, color: '#EDE8DC', letterSpacing: '0.01em' }}>{item.nombre}</span>
              <span style={{ color: '#C8A96E', flexShrink: 0, fontFamily: 'Cormorant Garamond, serif', fontSize: '15px' }}>
                ${(item.precio * cantidad).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      {itemsArr.length > 0 && (
        <>
          {/* Total */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            padding: '12px 0',
            borderTop: '1px solid rgba(200,169,110,0.2)',
          }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#8A8070' }}>TOTAL</span>
            <span style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '26px', fontWeight: '300',
              color: '#C8A96E',
            }}>${total.toFixed(2)}</span>
          </div>

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input placeholder="Su nombre" value={nombre} onChange={e => setNombre(e.target.value)} style={inputStyle} />
            <input placeholder="N° de mesa o reserva (opcional)" value={mesa} onChange={e => setMesa(e.target.value)} style={inputStyle} />
            <textarea
              placeholder="Instrucciones especiales, alergias..."
              value={nota} onChange={e => setNota(e.target.value)}
              rows={2}
              style={{ ...inputStyle, resize: 'none' }}
            />
          </div>

          {/* WhatsApp Button */}
          <button onClick={enviarWhatsApp} style={{
            width: '100%', padding: '13px',
            background: 'linear-gradient(135deg, #25D366, #1EBE57)',
            color: '#fff',
            borderRadius: '3px',
            fontSize: '13px', fontWeight: '500',
            letterSpacing: '0.1em',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            ENVIAR PEDIDO
          </button>

          <button onClick={onClear} style={{
            width: '100%', padding: '8px',
            background: 'transparent', color: '#6A6050',
            border: '1px solid rgba(200,169,110,0.1)',
            borderRadius: '3px', fontSize: '11px', letterSpacing: '0.08em',
          }}>VACIAR CARRITO</button>
        </>
      )}
    </div>
  )
}
