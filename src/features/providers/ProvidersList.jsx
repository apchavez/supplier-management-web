import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProvider, setPageIndex } from "./providersSlice";

export default function ProvidersList() {
  const dispatch = useDispatch();
  const { page, pageIndex, loading, error } = useSelector((s) => s.providers);

  const items = page?.content ?? [];
  const total = page?.totalElements ?? 0;
  const totalPages = page?.totalPages ?? 1;

  return (
    <div className="card">
      <div className="table-head">
        <div>Nombre</div>
        <div>Razón Social</div>
        <div>Dirección</div>
        <div style={{ textAlign: "center" }}>Acciones</div>
      </div>

      <div className="table-body">
        {loading && (
          <div className="row">
            <div>Cargando...</div>
          </div>
        )}
        {error && <div className="row error">Error: {error}</div>}
        {!loading && !items.length && <div className="row">Sin resultados</div>}

        {items.map((it) => (
          <div className="row" key={it.id}>
            <div>{it.name}</div>
            <div>{it.businessName}</div>
            <div>{it.address}</div>
            <div className="actions-cell">
              {}
              <button
                className="icon-btn"
                title="Eliminar"
                onClick={() => dispatch(removeProvider(it.id))}
              >
                <span className="material-icons">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pager">
        <button
          className="ghost"
          disabled={pageIndex <= 0}
          onClick={() => dispatch(setPageIndex(pageIndex - 1))}
        >
          ‹ Anterior
        </button>

        <span>
          Página {pageIndex + 1} de {totalPages} · {total} registros
        </span>

        <button
          className="ghost"
          disabled={pageIndex + 1 >= totalPages}
          onClick={() => dispatch(setPageIndex(pageIndex + 1))}
        >
          Siguiente ›
        </button>
      </div>
    </div>
  );
}
