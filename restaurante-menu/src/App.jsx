import React, { useState } from 'react'
import { RESTAURANTE, CATEGORIAS } from './data/menu'
import MenuItem from './components/MenuItem'
import Carrito from './components/Carrito'

export default function App() {
  const [carrito, setCarrito] = useState({})
  const [categoriaActiva, setCategoriaActiva] = useState(CATEGORIAS[0].id)
  const [carritoAbierto, setCarritoAbierto] = useState(false)

  const totalItems = Object.values(carrito).reduce((s, e) => s + e.cantidad, 0)
  const total = Object.values(carrito).reduce((s, e) => s + (e.item.precio * e.cantidad), 0)

  const agregarItem = (item) => {
    setCarrito(prev => ({
      ...prev,
      [item.id]: {
        item,
        cantidad: (prev[item.id]?.cantidad || 0) + 1
      }
    }))
  }

  const quitarItem = (item) => {
    setCarrito(prev => {
      const actual = prev[item.id]?.cantidad || 0
      if (actual <= 1) {
        const next = { ...prev }
        delete next[item.id]
        return next
      }
      return { ...prev, [item.id]: { item, cantidad: actual - 1 } }
    })
  }

  const limpiarCarrito = () => setCarrito({})

  const categoriaData = CATEGORIAS.find(c => c.id === categoriaActiva)

  return (
    <>
      {/* HEADER */}
      <header style={{
        background: 'var(--warm-white)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h1 style={{
              fontSize: '22px',
              color: 'var(--brown)',
              lineHeight: 1,
            }}>
              {RESTAURANTE.nombre}
            </h1>
            <p style={{ fontSize: '11px', color: 'var(--gold-dark)', letterSpacing: '0.08em' }}>
              {RESTAURANTE.slogan}
            </p>
          </div>

          {/* Botón carrito mobile */}
          <button
            onClick={() => setCarritoAbierto(!carritoAbierto)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: totalItems > 0 ? 'var(--gold)' : 'var(--cream)',
              color: totalItems > 0 ? '#fff' : 'var(--muted)',
              borderRadius: '24px',
              border: '1px solid var(--border)',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
          >
            🛒 {totalItems > 0 ? `${totalItems} · $${total.toFixed(2)}` : 'Carrito'}
          </button>
        </div>
      </header>

      {/* HERO */}
      <div style={{
        background: `linear-gradient(135deg, var(--brown) 0%, #2C1E14 100%)`,
        padding: '3rem 1.5rem',
        textAlign: 'center',
      }}>
        <p style={{
          display: 'inline-block',
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          {RESTAURANTE.horario}
        </p>
        <h2 style={{
          fontSize: 'clamp(26px, 5vw, 42px)',
          color: '#FAF7F2',
          lineHeight: 1.2,
          marginBottom: '10px',
        }}>
          Menú del día
        </h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
          {RESTAURANTE.direccion}
        </p>
      </div>

      {/* NAV CATEGORÍAS */}
      <div style={{
        background: 'var(--warm-white)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: '64px',
        zIndex: 90,
        overflowX: 'auto',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          gap: '0',
        }}>
          {CATEGORIAS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              style={{
                padding: '14px 18px',
                fontSize: '14px',
                fontWeight: categoriaActiva === cat.id ? '500' : '400',
                color: categoriaActiva === cat.id ? 'var(--gold-dark)' : 'var(--muted)',
                background: 'transparent',
                borderBottom: categoriaActiva === cat.id
                  ? '2px solid var(--gold)'
                  : '2px solid transparent',
                borderLeft: 'none',
                borderRight: 'none',
                borderTop: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
            >
              {cat.emoji} {cat.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 320px',
        gap: '1.5rem',
        alignItems: 'start',
      }}
        className="content-grid"
      >
        {/* MENU ITEMS */}
        <div>
          <h3 style={{
            fontSize: '22px',
            color: 'var(--brown)',
            marginBottom: '1rem',
          }}>
            {categoriaData.emoji} {categoriaData.nombre}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '12px',
          }}>
            {categoriaData.items.map(item => (
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

        {/* CARRITO DESKTOP */}
        <div style={{ display: 'block' }}>
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

      {/* CARRITO MOBILE OVERLAY */}
      {carritoAbierto && (
        <div
          onClick={() => setCarritoAbierto(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(28,26,23,0.5)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--warm-white)',
              borderRadius: '20px 20px 0 0',
              padding: '1.25rem',
            }}
          >
            <div style={{
              width: '36px', height: '4px',
              background: 'var(--border)',
              borderRadius: '2px',
              margin: '0 auto 1rem',
            }} />
            <Carrito
              carrito={carrito}
              onAdd={agregarItem}
              onRemove={quitarItem}
              onClear={() => { limpiarCarrito(); setCarritoAbierto(false) }}
              total={total}
              totalItems={totalItems}
            />
          </div>
        </div>
      )}

      {/* RESPONSIVE STYLES */}
      <style>{`
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr !important;
          }
          .content-grid > div:last-child {
            display: none !important;
          }
        }
      `}</style>

      {/* FOOTER */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: 'var(--muted)',
        fontSize: '13px',
        borderTop: '1px solid var(--border)',
        marginTop: '3rem',
      }}>
        <p>{RESTAURANTE.nombre} · {RESTAURANTE.direccion}</p>
        <p style={{ marginTop: '4px' }}>{RESTAURANTE.horario}</p>
      </footer>
    </>
  )
}
