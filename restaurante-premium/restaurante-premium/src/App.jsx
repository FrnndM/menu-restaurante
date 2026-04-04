import React, { useState, useEffect } from 'react'
import { RESTAURANTE, CATEGORIAS } from './data/menu'
import MenuItem from './components/MenuItem'
import Carrito from './components/Carrito'

export default function App() {
  const [carrito, setCarrito] = useState({})
  const [categoriaActiva, setCategoriaActiva] = useState(CATEGORIAS[0].id)
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const totalItems = Object.values(carrito).reduce((s, e) => s + e.cantidad, 0)
  const total = Object.values(carrito).reduce((s, e) => s + (e.item.precio * e.cantidad), 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const agregarItem = (item) => setCarrito(prev => ({
    ...prev,
    [item.id]: { item, cantidad: (prev[item.id]?.cantidad || 0) + 1 }
  }))

  const quitarItem = (item) => setCarrito(prev => {
    const actual = prev[item.id]?.cantidad || 0
    if (actual <= 1) { const n = { ...prev }; delete n[item.id]; return n }
    return { ...prev, [item.id]: { item, cantidad: actual - 1 } }
  })

  const limpiarCarrito = () => setCarrito({})
  const catData = CATEGORIAS.find(c => c.id === categoriaActiva)

  return (
    <>
      {/* HEADER */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? 'rgba(10,8,6,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,169,110,0.15)' : 'none',
        transition: 'all 0.4s ease',
        padding: '0 2rem',
        height: '70px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '24px', fontWeight: '300',
            color: '#C8A96E', letterSpacing: '0.1em',
            lineHeight: 1,
          }}>La Mesa</h1>
          <p style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#8A8070', marginTop: '2px' }}>
            QUITO · ALTA COCINA
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href={`tel:${RESTAURANTE.whatsapp}`} style={{
            fontSize: '11px', letterSpacing: '0.1em', color: '#8A8070',
            textDecoration: 'none', display: 'none',
          }}>RESERVAS</a>

          <button
            onClick={() => setCarritoAbierto(!carritoAbierto)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px',
              background: totalItems > 0 ? 'rgba(200,169,110,0.15)' : 'transparent',
              border: `1px solid ${totalItems > 0 ? 'rgba(200,169,110,0.5)' : 'rgba(200,169,110,0.2)'}`,
              color: '#C8A96E', borderRadius: '3px',
              fontSize: '11px', letterSpacing: '0.1em',
              transition: 'all 0.2s',
            }}>
            🛒 {totalItems > 0 ? `${totalItems} · $${total.toFixed(2)}` : 'PEDIDO'}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section style={{
        height: '100vh',
        background: `linear-gradient(to bottom, rgba(10,8,6,0.3) 0%, rgba(10,8,6,0.7) 60%, rgba(10,8,6,1) 100%),
                     url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80') center/cover no-repeat`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '2rem',
        position: 'relative',
      }}>
        <p style={{
          fontSize: '11px', letterSpacing: '0.3em', color: '#C8A96E',
          marginBottom: '20px', animation: 'fadeUp 0.8s ease 0.2s both',
        }}>
          ✦ QUITO · ECUADOR ✦
        </p>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(48px, 8vw, 90px)',
          fontWeight: '300', lineHeight: 1.1,
          color: '#F5F0E8', letterSpacing: '0.05em',
          marginBottom: '20px',
          animation: 'fadeUp 0.8s ease 0.4s both',
        }}>
          Alta Cocina<br />
          <em style={{ color: '#C8A96E', fontStyle: 'italic' }}>& Cócteles</em>
        </h2>
        <p style={{
          fontSize: '15px', color: 'rgba(245,240,232,0.6)',
          letterSpacing: '0.05em', marginBottom: '40px',
          maxWidth: '480px', lineHeight: 1.7,
          animation: 'fadeUp 0.8s ease 0.6s both',
          fontWeight: '300',
        }}>
          {RESTAURANTE.slogan}
        </p>
        <div style={{
          display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center',
          animation: 'fadeUp 0.8s ease 0.8s both',
        }}>
          <button
            onClick={() => document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '13px 32px',
              background: '#C8A96E', color: '#0A0806',
              borderRadius: '3px', fontSize: '12px',
              letterSpacing: '0.15em', fontWeight: '500',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >VER MENÚ</button>
          <button
            onClick={() => window.open(`https://wa.me/${RESTAURANTE.whatsapp}?text=Hola, quisiera hacer una reserva en La Mesa`, '_blank')}
            style={{
              padding: '13px 32px',
              background: 'transparent',
              border: '1px solid rgba(200,169,110,0.5)',
              color: '#C8A96E', borderRadius: '3px',
              fontSize: '12px', letterSpacing: '0.15em',
            }}
          >RESERVAR MESA</button>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '30px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          animation: 'pulse 2s infinite',
        }}>
          <div style={{ width: '1px', height: '40px', background: 'rgba(200,169,110,0.4)' }} />
          <p style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#8A8070' }}>SCROLL</p>
        </div>
      </section>

      {/* HIGHLIGHTS BAR */}
      <div style={{
        background: 'rgba(200,169,110,0.06)',
        borderTop: '1px solid rgba(200,169,110,0.15)',
        borderBottom: '1px solid rgba(200,169,110,0.15)',
        padding: '16px 2rem',
        display: 'flex', gap: '0', overflowX: 'auto',
        justifyContent: 'center',
      }}>
        {[
          { icon: '⭐', text: 'Alta Cocina 5 Estrellas' },
          { icon: '🥃', text: 'Bar Artesanal' },
          { icon: '🇪🇨', text: 'Gastronomía Ecuatoriana' },
          { icon: '🍷', text: 'Carta de Vinos Premium' },
          { icon: '📍', text: 'Norte de Quito' },
        ].map((h, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '0 24px', borderRight: i < 4 ? '1px solid rgba(200,169,110,0.15)' : 'none',
            whiteSpace: 'nowrap',
          }}>
            <span style={{ fontSize: '14px' }}>{h.icon}</span>
            <span style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#8A8070' }}>{h.text.toUpperCase()}</span>
          </div>
        ))}
      </div>

      {/* MENU SECTION */}
      <section id="menu-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: '12px' }}>NUESTRA PROPUESTA</p>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '300', color: '#F5F0E8',
          }}>Carta del Día</h2>
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex', gap: '0', overflowX: 'auto',
          borderBottom: '1px solid rgba(200,169,110,0.15)',
          marginBottom: '2.5rem',
          position: 'sticky', top: '70px', zIndex: 90,
          background: 'rgba(10,8,6,0.95)',
          backdropFilter: 'blur(12px)',
        }}>
          {CATEGORIAS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              style={{
                padding: '14px 20px',
                fontSize: '11px', letterSpacing: '0.12em',
                fontWeight: categoriaActiva === cat.id ? '500' : '300',
                color: categoriaActiva === cat.id ? '#C8A96E' : '#6A6050',
                background: 'transparent',
                borderBottom: `2px solid ${categoriaActiva === cat.id ? '#C8A96E' : 'transparent'}`,
                borderLeft: 'none', borderRight: 'none', borderTop: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}>
              {cat.emoji} {cat.nombre.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Content grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 300px',
          gap: '2rem',
          alignItems: 'start',
        }} className="content-grid">
          {/* Items */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: '6px' }}>
                {catData.tag}
              </p>
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '32px', fontWeight: '300', color: '#F5F0E8',
                marginBottom: '6px',
              }}>{catData.nombre}</h3>
              <p style={{ fontSize: '13px', color: '#6A6050', letterSpacing: '0.02em' }}>
                {catData.descripcion}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
            }}>
              {catData.items.map(item => (
                <MenuItem
                  key={item.id}
                  item={item}
                  cantidad={carrito[item.id]?.cantidad || 0}
                  onAdd={agregarItem}
                  onRemove={quitarItem}
                />
              ))}
            </div>
          </div>

          {/* Carrito Desktop */}
          <div>
            <Carrito
              carrito={carrito}
              onAdd={agregarItem}
              onRemove={quitarItem}
              onClear={limpiarCarrito}
              total={total}
              totalItems={totalItems}
            />
          </div>
        </div>
      </section>

      {/* AMBIANCE SECTION */}
      <section style={{
        margin: '4rem 0',
        padding: '5rem 2rem',
        background: `linear-gradient(rgba(10,8,6,0.8), rgba(10,8,6,0.8)),
                     url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80') center/cover`,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: '16px' }}>
          LA EXPERIENCIA
        </p>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: '300', color: '#F5F0E8',
          marginBottom: '20px',
        }}>
          Más que una cena,<br />
          <em style={{ color: '#C8A96E', fontStyle: 'italic' }}>un recuerdo</em>
        </h2>
        <p style={{
          fontSize: '14px', color: 'rgba(245,240,232,0.5)',
          maxWidth: '500px', margin: '0 auto 32px',
          lineHeight: 1.8, fontWeight: '300',
        }}>
          En el corazón del norte de Quito, donde el mundo de los negocios se detiene a disfrutar. 
          Ingredientes ecuatorianos, técnica internacional, ambiente de primer nivel.
        </p>
        <button
          onClick={() => window.open(`https://wa.me/${RESTAURANTE.whatsapp}?text=Quisiera reservar una mesa para esta semana`, '_blank')}
          style={{
            padding: '13px 36px',
            background: 'transparent',
            border: '1px solid #C8A96E',
            color: '#C8A96E', borderRadius: '3px',
            fontSize: '12px', letterSpacing: '0.15em',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#C8A96E'; e.currentTarget.style.color = '#0A0806' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C8A96E' }}
        >
          RESERVAR AHORA VÍA WHATSAPP
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: 'rgba(0,0,0,0.5)',
        borderTop: '1px solid rgba(200,169,110,0.1)',
        padding: '3rem 2rem',
        textAlign: 'center',
      }}>
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '28px', fontWeight: '300',
          color: '#C8A96E', letterSpacing: '0.1em',
          marginBottom: '20px',
        }}>La Mesa · Quito</h3>
        <div style={{
          display: 'flex', gap: '40px', justifyContent: 'center',
          flexWrap: 'wrap', marginBottom: '24px',
        }}>
          {[
            { label: 'Dirección', value: RESTAURANTE.direccion },
            { label: 'Horario', value: RESTAURANTE.horario },
            { label: 'Instagram', value: RESTAURANTE.instagram },
            { label: 'Reservas', value: RESTAURANTE.reservas },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#6A6050', marginBottom: '4px' }}>{label.toUpperCase()}</p>
              <p style={{ fontSize: '13px', color: '#8A8070' }}>{value}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '11px', color: '#6A6050', letterSpacing: '0.05em' }}>
          © 2025 La Mesa · Alta Cocina & Bar · Quito, Ecuador
        </p>
      </footer>

      {/* Mobile cart overlay */}
      {carritoAbierto && (
        <div onClick={() => setCarritoAbierto(false)} style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 300, display: 'flex', alignItems: 'flex-end',
          backdropFilter: 'blur(4px)',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '100%', maxHeight: '90vh', overflowY: 'auto',
            background: '#0A0806',
            borderRadius: '12px 12px 0 0',
            border: '1px solid rgba(200,169,110,0.2)',
            padding: '1.25rem',
          }}>
            <div style={{ width: '32px', height: '3px', background: 'rgba(200,169,110,0.3)', borderRadius: '2px', margin: '0 auto 1rem' }} />
            <Carrito
              carrito={carrito} onAdd={agregarItem} onRemove={quitarItem}
              onClear={() => { limpiarCarrito(); setCarritoAbierto(false) }}
              total={total} totalItems={totalItems}
            />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 800px) {
          .content-grid { grid-template-columns: 1fr !important; }
          .content-grid > div:last-child { display: none !important; }
        }
      `}</style>
    </>
  )
}
