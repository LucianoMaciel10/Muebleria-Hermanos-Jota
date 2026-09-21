import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'

function App() {
  // Vista actual: 'inicio' | 'productos' | 'carrito' | 'contacto'
  const [vista, setVista] = useState('inicio')

  return (
    <>
      <Navbar vista={vista} onNavigate={setVista} cantidadCarrito={0} />

      <main id="main">
        {vista === 'inicio' && <Home onNavigate={setVista} />}
        {vista === 'productos' && <div className="container"><h1>Productos</h1></div>}
        {vista === 'carrito' && <div className="container"><h1>Carrito</h1></div>}
        {vista === 'contacto' && <div className="container"><h1>Contacto</h1></div>}
      </main>

      <Footer onNavigate={setVista} />
    </>
  )
}

export default App