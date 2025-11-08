import React, { useEffect, useState } from "react";
import { fetchWelcome } from "../api/client";
import logo from "../assets/logo.png";

export default function Welcome() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWelcome()
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <section className="welcome card">
      <div className="welcome-inner">
        <img src={logo} alt="logo" className="welcome-logo" />
        <h2>Bienvenido Candidato 01</h2>

        {!data && !error && <p>Cargando...</p>}
        {error && <p className="error">Error: {error}</p>}
        {data && (
          <>
            <p className="muted">{data.message}</p>
            <button
              className="btn"
              onClick={() => (window.location.href = "/providers")}
            >
              Continuar
            </button>
          </>
        )}
      </div>

      <div className="version">
        versión {data?.version || process.env.REACT_APP_APP_VERSION || "0.0.1"}
      </div>
    </section>
  );
}
