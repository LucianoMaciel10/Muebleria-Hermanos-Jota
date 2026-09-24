function Essence() {
  return (
    <section className="essence">
      <div className="container">
        <p className="eyebrow">Nuestra Esencia</p>
        <h2 className="section-title">
          Donde la herencia se encuentra con la innovación
        </h2>
        <p className="essence__text">
          Hermanos Jota es el redescubrimiento de un arte olvidado: crear
          muebles que no solo sirven una función, sino que alimentan el alma.
          Cada pieza cuenta una historia de artesanía que honra el pasado
          mientras abraza el futuro.
        </p>

        <ul className="essence__features">
          <li className="feature-item">
            <span className="feature-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2c-3 3-5 6-5 9a5 5 0 0 0 10 0c0-3-2-6-5-9Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15v7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <h3>Madera Certificada FSC</h3>
            <p>Origen sustentable garantizado</p>
          </li>
          <li className="feature-item">
            <span className="feature-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21s-7-4.5-7-10.5V5l7-2 7 2v5.5C19 16.5 12 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3>Acabados Naturales</h3>
            <p>Libres de tóxicos, apto hogar</p>
          </li>
          <li className="feature-item">
            <span className="feature-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="9"
                  r="5.2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M8.5 13.5 7 21l5-2.5 5 2.5-1.5-7.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3>Garantía 10 Años</h3>
            <p>Construido para trascender</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Essence;
