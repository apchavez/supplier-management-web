import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProvider } from "./providersSlice";

export default function AddProviderForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");

  const submit = () => {
    if (!name || !businessName || !address) return;
    dispatch(createProvider({ name, businessName, address }));
    setName("");
    setBusinessName("");
    setAddress("");
  };

  return (
    <div className="toolbar">
      <button className="btn btn-blue" onClick={submit}>
        <span className="bullet blue" /> Agregar
      </button>
      <button className="btn btn-red ghost" onClick={() => window.print()}>
        <span className="bullet red" /> Imprimir
      </button>

      <div className="form-inline">
        <input
          className="textfield"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="textfield"
          placeholder="Razón Social"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <input
          className="textfield"
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
    </div>
  );
}
