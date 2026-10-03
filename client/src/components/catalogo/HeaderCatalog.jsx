function HeaderCatalog({ categoriaSeleccionada, setCategoria, busqueda, setBusqueda }) {
  return (
    <header className="catalog__header">
      <h1 id="catalog-title" className="section-title">Productos</h1>
      <div className="catalog__controls">
        <div className="catalog__filter">
          <label htmlFor="category-filter">Categoría:</label>
          <select 
            id="category-filter" 
            name="categoria"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            <option value="asientos">Asientos</option>
            <option value="mesas">Mesas</option>
            <option value="almacenamiento">Almacenamiento</option>
            <option value="escritorios">Escritorios</option>
          </select>
        </div>
        <div className="catalog__search">
          <label className="sr-only" htmlFor="product-search">Buscar productos</label>
          <svg className="catalog__search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
            <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
                <input
                  type="search"
                  id="product-search"
                  name="busqueda"
                  placeholder="buscar..."
                  aria-label="Buscar productos"
                  autoComplete="off"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>
          </header>
  )
}

export default HeaderCatalog;