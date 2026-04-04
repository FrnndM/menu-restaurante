import React, { useState, useEffect } from 'react'
import { RESTAURANTE, CATEGORIAS, HISTORIA } from './data/menu'
import MenuItem from './components/MenuItem'
import Carrito from './components/Carrito'
import Modal from './components/Modal'

export default function App() {
  const [carrito, setCarrito] = useState({})
  const [categoriaActiva, setCategoriaActiva] = useState(CATEGORIAS[0].id)
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [modalItem, setModalItem] = useState(null)

  const totalItems = Object.values(carrito).reduce((s,e) => s+e.cantidad, 0)
  const total = Object.values(carrito).reduce((s,e) => s+(e.item.precio*e.cantidad), 0)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const agregarItem = item => setCarrito(prev => ({
    ...prev, [item.id]: { item, cantidad: (prev[item.id]?.cantidad||0)+1 }
  }))
  const quitarItem = item => setCarrito(prev => {
    const n = prev[item.id]?.cantidad||0
    if (n<=1) { const x={...prev}; delete x[item.id]; return x }
    return {...prev, [item.id]: {item, cantidad:n-1}}
  })
  const limpiar = () => setCarrito({})
  const catData = CATEGORIAS.find(c=>c.id===categoriaActiva)

  return (
    <>
      {/* ── HEADER ── */}
      <header style={{
        position:'fixed', top:0, left:0, right:0, zIndex:200,
        background: scrolled ? 'rgba(253,246,237,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(192,98,42,0.15)' : 'none',
        transition:'all 0.35s ease',
        padding:'0 2rem', height:'70px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        <div>
          <h1 style={{ fontFamily:'Playfair Display, serif', fontSize:'26px', color: scrolled?'#2C1A0E':'#FDF6ED', letterSpacing:'0.06em', lineHeight:1 }}>
            La Mesa
          </h1>
          <p style={{ fontSize:'9px', letterSpacing:'0.22em', color: scrolled?'#C0622A':'rgba(253,246,237,0.7)', marginTop:'2px' }}>
            QUITO · ALTA COCINA
          </p>
        </div>
        <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
          <button
            onClick={() => document.getElementById('menu-section').scrollIntoView({behavior:'smooth'})}
            style={{
              padding:'8px 18px',
              background:'transparent',
              border:`1px solid ${scrolled?'rgba(192,98,42,0.4)':'rgba(253,246,237,0.5)'}`,
              color: scrolled?'#C0622A':'#FDF6ED',
              borderRadius:'6px', fontSize:'11px', letterSpacing:'0.1em',
              display:'none',
            }}
            className="nav-btn"
          >VER MENÚ</button>
          <button
            onClick={() => setCarritoAbierto(!carritoAbierto)}
            style={{
              display:'flex', alignItems:'center', gap:'8px',
              padding:'9px 18px',
              background: totalItems>0 ? '#C0622A' : scrolled ? 'rgba(192,98,42,0.1)' : 'rgba(253,246,237,0.15)',
              border:`1px solid ${totalItems>0?'#C0622A': scrolled?'rgba(192,98,42,0.3)':'rgba(253,246,237,0.4)'}`,
              color: totalItems>0||!scrolled ? '#FDF6ED' : '#C0622A',
              borderRadius:'8px', fontSize:'12px', fontWeight:'700', letterSpacing:'0.06em',
              transition:'all 0.2s',
              boxShadow: totalItems>0 ? '0 4px 16px rgba(192,98,42,0.35)' : 'none',
            }}>
            🛒 {totalItems>0 ? `${totalItems} · $${total.toFixed(2)}` : 'PEDIDO'}
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{
        minHeight:'100vh',
        background:`linear-gradient(to bottom, rgba(44,26,14,0.35) 0%, rgba(44,26,14,0.6) 55%, #FDF6ED 100%),
                    url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=85') center/cover no-repeat`,
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        textAlign:'center', padding:'8rem 2rem 6rem',
        position:'relative',
      }}>
        <p style={{ fontSize:'11px', letterSpacing:'0.35em', color:'rgba(253,246,237,0.8)', marginBottom:'20px', animation:'fadeUp 0.7s ease 0.2s both' }}>
          ✦ NORTE DE QUITO · ECUADOR ✦
        </p>
        <h2 style={{
          fontFamily:'Playfair Display, serif',
          fontSize:'clamp(50px,9vw,96px)',
          fontWeight:'700', lineHeight:1.05,
          color:'#FDF6ED', letterSpacing:'0.02em',
          marginBottom:'18px',
          animation:'fadeUp 0.7s ease 0.35s both',
          textShadow:'0 4px 32px rgba(44,26,14,0.4)',
        }}>
          Alta Cocina<br/>
          <em style={{ color:'#E8845A', fontStyle:'italic', fontWeight:'400' }}>&amp; Cócteles</em>
        </h2>
        <p style={{
          fontSize:'16px', color:'rgba(253,246,237,0.75)',
          letterSpacing:'0.03em', marginBottom:'44px',
          maxWidth:'500px', lineHeight:1.8,
          animation:'fadeUp 0.7s ease 0.5s both',
        }}>{RESTAURANTE.slogan}</p>
        <div style={{ display:'flex', gap:'14px', flexWrap:'wrap', justifyContent:'center', animation:'fadeUp 0.7s ease 0.65s both' }}>
          <button
            onClick={() => document.getElementById('menu-section').scrollIntoView({behavior:'smooth'})}
            style={{
              padding:'14px 36px',
              background:'#C0622A', color:'#FDF6ED',
              borderRadius:'8px', fontSize:'13px', fontWeight:'700', letterSpacing:'0.12em',
              boxShadow:'0 6px 24px rgba(192,98,42,0.45)',
              transition:'all 0.2s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='#A8501F';e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='#C0622A';e.currentTarget.style.transform='translateY(0)'}}
          >VER MENÚ COMPLETO</button>
          <button
            onClick={() => window.open(`https://wa.me/${RESTAURANTE.whatsapp}?text=Hola, quisiera hacer una reserva en La Mesa Quito`, '_blank')}
            style={{
              padding:'14px 36px',
              background:'transparent',
              border:'2px solid rgba(253,246,237,0.6)',
              color:'#FDF6ED', borderRadius:'8px',
              fontSize:'13px', fontWeight:'700', letterSpacing:'0.12em',
              transition:'all 0.2s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(253,246,237,0.15)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}
          >RESERVAR MESA</button>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:'40px', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', animation:'float 2.5s ease infinite' }}>
          <div style={{ width:'1px', height:'36px', background:'rgba(253,246,237,0.35)' }} />
          <p style={{ fontSize:'9px', letterSpacing:'0.2em', color:'rgba(253,246,237,0.4)' }}>DESLIZA</p>
        </div>
      </section>

      {/* ── HIGHLIGHTS BAR ── */}
      <div style={{
        background:'#F7ECD8',
        borderTop:'1px solid rgba(192,98,42,0.15)',
        borderBottom:'1px solid rgba(192,98,42,0.15)',
        padding:'14px 0', overflowX:'auto',
      }}>
        <div style={{ display:'flex', justifyContent:'center', minWidth:'max-content', padding:'0 2rem', gap:'0' }}>
          {[
            {icon:'⭐',text:'Alta Cocina 5 Estrellas'},
            {icon:'🥃',text:'Bar Artesanal'},
            {icon:'🇪🇨',text:'Gastronomía Ecuatoriana'},
            {icon:'🍷',text:'Carta de Vinos Premium'},
            {icon:'📍',text:'Norte de Quito'},
          ].map((h,i)=>(
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:'8px',
              padding:'0 24px',
              borderRight: i<4 ? '1px solid rgba(192,98,42,0.2)' : 'none',
            }}>
              <span style={{fontSize:'15px'}}>{h.icon}</span>
              <span style={{fontSize:'11px', letterSpacing:'0.1em', color:'#9B7B5A', fontWeight:'700'}}>{h.text.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── HISTORIA ── */}
      <section style={{
        maxWidth:'1100px', margin:'0 auto',
        padding:'6rem 2rem',
        display:'grid',
        gridTemplateColumns:'1fr 1fr',
        gap:'5rem', alignItems:'center',
      }} className="historia-grid">
        {/* Images collage */}
        <div style={{ position:'relative', height:'520px' }}>
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=85"
            alt="Restaurante"
            style={{
              position:'absolute', top:0, left:0,
              width:'72%', height:'68%',
              objectFit:'cover', borderRadius:'14px',
              boxShadow:'0 12px 40px rgba(44,26,14,0.18)',
            }}
          />
          <img
            src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=500&q=85"
            alt="Chef cocinando"
            style={{
              position:'absolute', bottom:0, right:0,
              width:'58%', height:'54%',
              objectFit:'cover', borderRadius:'14px',
              boxShadow:'0 12px 40px rgba(44,26,14,0.18)',
            }}
          />
          {/* Decorative badge */}
          <div style={{
            position:'absolute', bottom:'34%', left:'18%',
            background:'#C0622A', color:'#FDF6ED',
            borderRadius:'50%', width:'96px', height:'96px',
            display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center',
            textAlign:'center', boxShadow:'0 8px 24px rgba(192,98,42,0.4)',
            zIndex:10,
          }}>
            <span style={{fontFamily:'Playfair Display, serif', fontSize:'22px', fontWeight:'700', lineHeight:1}}>25</span>
            <span style={{fontSize:'9px', letterSpacing:'0.1em', marginTop:'2px'}}>AÑOS</span>
          </div>
        </div>

        {/* Text */}
        <div>
          <p style={{fontSize:'11px', letterSpacing:'0.22em', color:'#C0622A', marginBottom:'14px', fontWeight:'700'}}>NUESTRA HISTORIA</p>
          <h2 style={{
            fontFamily:'Playfair Display, serif',
            fontSize:'clamp(30px,4vw,44px)', fontWeight:'700',
            color:'#2C1A0E', lineHeight:1.2, marginBottom:'28px',
          }}>{HISTORIA.titulo}</h2>
          {HISTORIA.parrafos.map((p,i)=>(
            <p key={i} style={{
              fontSize:'14px', color:'#5C3317', lineHeight:1.8,
              marginBottom:'16px', fontWeight:'300',
            }}>{p}</p>
          ))}
          <div style={{
            borderLeft:'3px solid #C0622A',
            paddingLeft:'20px', marginTop:'28px',
          }}>
            <p style={{fontFamily:'Playfair Display, serif', fontSize:'16px', color:'#2C1A0E', fontStyle:'italic', lineHeight:1.6, marginBottom:'8px'}}>
              {HISTORIA.quote}
            </p>
            <p style={{fontSize:'12px', color:'#9B7B5A', letterSpacing:'0.06em'}}>{HISTORIA.autor}</p>
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <section style={{ background:'#F7ECD8', padding:'4rem 0', overflow:'hidden' }}>
        <div style={{ textAlign:'center', marginBottom:'2.5rem', padding:'0 2rem' }}>
          <p style={{fontSize:'10px', letterSpacing:'0.22em', color:'#C0622A', marginBottom:'10px', fontWeight:'700'}}>GALERÍA</p>
          <h2 style={{fontFamily:'Playfair Display, serif', fontSize:'36px', color:'#2C1A0E'}}>Nuestros Platos</h2>
        </div>
        <div style={{ display:'flex', gap:'12px', padding:'0 2rem', overflowX:'auto', scrollbarWidth:'none' }}>
          {[
            {url:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80', label:'Lomo Black Angus'},
            {url:'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80', label:'Cócteles de Autor'},
            {url:'https://images.unsplash.com/photo-1535400255456-984e5a9ea7ce?w=400&q=80', label:'Ceviche Imperial'},
            {url:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80', label:'Volcán de Chocolate'},
            {url:'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&q=80', label:'Tabla de Quesos'},
            {url:'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=400&q=80', label:'Páramo Negroni'},
          ].map((g,i)=>(
            <div key={i} style={{ position:'relative', flexShrink:0, width:'220px', height:'280px', borderRadius:'12px', overflow:'hidden' }}>
              <img src={g.url} alt={g.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(44,26,14,0.6) 0%, transparent 50%)' }} />
              <p style={{ position:'absolute', bottom:'12px', left:'12px', fontSize:'12px', color:'#FDF6ED', fontWeight:'700', letterSpacing:'0.04em' }}>{g.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MENÚ SECTION ── */}
      <section id="menu-section" style={{ maxWidth:'1200px', margin:'0 auto', padding:'5rem 1.5rem 3rem' }}>
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <p style={{fontSize:'10px', letterSpacing:'0.22em', color:'#C0622A', marginBottom:'12px', fontWeight:'700'}}>NUESTRA PROPUESTA</p>
          <h2 style={{ fontFamily:'Playfair Display, serif', fontSize:'clamp(34px,5vw,52px)', color:'#2C1A0E' }}>Carta del Día</h2>
          <p style={{ fontSize:'13px', color:'#9B7B5A', marginTop:'10px' }}>Toca cualquier plato para verlo en detalle</p>
        </div>

        {/* Tabs */}
        <div style={{
          display:'flex', gap:'0', overflowX:'auto',
          borderBottom:'2px solid rgba(192,98,42,0.15)',
          marginBottom:'2.5rem',
          position:'sticky', top:'70px', zIndex:90,
          background:'rgba(253,246,237,0.97)', backdropFilter:'blur(10px)',
        }}>
          {CATEGORIAS.map(cat=>(
            <button key={cat.id} onClick={()=>setCategoriaActiva(cat.id)} style={{
              padding:'13px 20px',
              fontSize:'11px', letterSpacing:'0.1em', fontWeight: categoriaActiva===cat.id?'700':'400',
              color: categoriaActiva===cat.id?'#C0622A':'#9B7B5A',
              background:'transparent',
              borderBottom:`2.5px solid ${categoriaActiva===cat.id?'#C0622A':'transparent'}`,
              borderLeft:'none', borderRight:'none', borderTop:'none',
              whiteSpace:'nowrap', transition:'all 0.2s',
              marginBottom:'-2px',
            }}>{cat.emoji} {cat.nombre.toUpperCase()}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) 300px', gap:'2rem', alignItems:'start' }} className="content-grid">
          <div>
            <div style={{ marginBottom:'1.5rem' }}>
              <p style={{fontSize:'10px', letterSpacing:'0.2em', color:'#C0622A', marginBottom:'6px', fontWeight:'700'}}>{catData.tag}</p>
              <h3 style={{fontFamily:'Playfair Display, serif', fontSize:'30px', color:'#2C1A0E', marginBottom:'6px'}}>{catData.nombre}</h3>
              <p style={{fontSize:'13px', color:'#9B7B5A'}}>{catData.descripcion}</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:'16px' }}>
              {catData.items.map(item=>(
                <MenuItem
                  key={item.id}
                  item={item}
                  cantidad={carrito[item.id]?.cantidad||0}
                  onAdd={agregarItem}
                  onRemove={quitarItem}
                  onOpenModal={setModalItem}
                />
              ))}
            </div>
          </div>
          <div>
            <Carrito carrito={carrito} onAdd={agregarItem} onRemove={quitarItem} onClear={limpiar} total={total} totalItems={totalItems} />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        margin:'0 0 0',
        padding:'6rem 2rem',
        background:`linear-gradient(rgba(44,26,14,0.72), rgba(44,26,14,0.72)),
                    url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=85') center/cover`,
        textAlign:'center',
      }}>
        <p style={{fontSize:'10px', letterSpacing:'0.25em', color:'#E8845A', marginBottom:'16px', fontWeight:'700'}}>RESERVACIONES</p>
        <h2 style={{fontFamily:'Playfair Display, serif', fontSize:'clamp(28px,4vw,48px)', color:'#FDF6ED', marginBottom:'16px'}}>
          Celebra algo especial<br/><em style={{color:'#E8845A'}}>con nosotros</em>
        </h2>
        <p style={{fontSize:'14px', color:'rgba(253,246,237,0.6)', maxWidth:'460px', margin:'0 auto 32px', lineHeight:1.8}}>
          Eventos privados, cenas de negocios, aniversarios. Diseñamos una experiencia a tu medida.
        </p>
        <button
          onClick={()=>window.open(`https://wa.me/${RESTAURANTE.whatsapp}?text=Hola, quisiera información sobre reservas y eventos privados en La Mesa`, '_blank')}
          style={{
            padding:'14px 40px',
            background:'#C0622A', color:'#FDF6ED',
            borderRadius:'8px', fontSize:'13px', fontWeight:'700', letterSpacing:'0.12em',
            boxShadow:'0 6px 24px rgba(192,98,42,0.5)',
            transition:'all 0.2s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='#A8501F';e.currentTarget.style.transform='translateY(-2px)'}}
          onMouseLeave={e=>{e.currentTarget.style.background='#C0622A';e.currentTarget.style.transform='translateY(0)'}}
        >RESERVAR POR WHATSAPP</button>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:'#2C1A0E', padding:'4rem 2rem 2rem', color:'#FDF6ED' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:'3rem', marginBottom:'3rem' }} className="footer-grid">
            <div>
              <h3 style={{ fontFamily:'Playfair Display, serif', fontSize:'32px', color:'#E8845A', marginBottom:'12px' }}>La Mesa</h3>
              <p style={{ fontSize:'13px', color:'rgba(253,246,237,0.5)', lineHeight:1.8, maxWidth:'280px' }}>
                Alta cocina ecuatoriana e internacional en el corazón del norte de Quito. 25 años creando experiencias gastronómicas inolvidables.
              </p>
            </div>
            <div>
              <p style={{ fontSize:'10px', letterSpacing:'0.18em', color:'#C0622A', marginBottom:'14px', fontWeight:'700' }}>HORARIOS</p>
              {[
                'Lun–Jue: 12:00–23:00',
                'Vie–Sáb: 12:00–01:00',
                'Dom: 12:00–21:00',
              ].map(h=><p key={h} style={{fontSize:'13px', color:'rgba(253,246,237,0.55)', marginBottom:'6px'}}>{h}</p>)}
            </div>
            <div>
              <p style={{ fontSize:'10px', letterSpacing:'0.18em', color:'#C0622A', marginBottom:'14px', fontWeight:'700' }}>CONTACTO</p>
              {[
                {label:'📍 '+RESTAURANTE.direccion},
                {label:'📸 '+RESTAURANTE.instagram},
                {label:'✉️ '+RESTAURANTE.reservas},
              ].map(c=><p key={c.label} style={{fontSize:'12px', color:'rgba(253,246,237,0.5)', marginBottom:'8px', lineHeight:1.5}}>{c.label}</p>)}
            </div>
          </div>
          <div style={{ borderTop:'1px solid rgba(253,246,237,0.1)', paddingTop:'20px', textAlign:'center' }}>
            <p style={{ fontSize:'11px', color:'rgba(253,246,237,0.3)' }}>© 2025 La Mesa · Alta Cocina & Bar · Quito, Ecuador</p>
          </div>
        </div>
      </footer>

      {/* ── MOBILE CART ── */}
      {carritoAbierto && (
        <div onClick={()=>setCarritoAbierto(false)} style={{
          position:'fixed', inset:0, background:'rgba(44,26,14,0.65)', zIndex:300,
          display:'flex', alignItems:'flex-end', backdropFilter:'blur(4px)',
        }}>
          <div onClick={e=>e.stopPropagation()} style={{
            width:'100%', maxHeight:'90vh', overflowY:'auto',
            background:'#FDF6ED', borderRadius:'20px 20px 0 0',
            padding:'1.25rem',
            boxShadow:'0 -8px 40px rgba(44,26,14,0.25)',
          }}>
            <div style={{ width:'36px', height:'4px', background:'rgba(192,98,42,0.3)', borderRadius:'2px', margin:'0 auto 1rem' }} />
            <Carrito carrito={carrito} onAdd={agregarItem} onRemove={quitarItem} onClear={()=>{limpiar();setCarritoAbierto(false)}} total={total} totalItems={totalItems} />
          </div>
        </div>
      )}

      {/* ── MODAL ── */}
      {modalItem && (
        <Modal
          item={modalItem}
          cantidad={carrito[modalItem.id]?.cantidad||0}
          onAdd={item => { agregarItem(item) }}
          onRemove={item => { quitarItem(item) }}
          onClose={() => setModalItem(null)}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .content-grid { grid-template-columns: 1fr !important; }
          .content-grid > div:last-child { display: none !important; }
          .historia-grid { grid-template-columns: 1fr !important; }
          .historia-grid > div:first-child { height: 320px !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .nav-btn { display: none !important; }
        }
      `}</style>
    </>
  )
}
