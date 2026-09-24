function Commitment() {
  return (
    <section className="commitment">
      <div className="container commitment__inner">
        <svg
          className="commitment__icon"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 4c-9 0-16 5-16 13 8 0 13-4 15-10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 20c3-5 7-8 12-10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <div>
          <p className="commitment__title">Compromiso con el Futuro</p>
          <p className="commitment__text">
            Materiales 100% reciclables · Proveedores locales · Cero plásticos
            de un solo uso
          </p>
        </div>
      </div>
    </section>
  );
}

export default Commitment;
