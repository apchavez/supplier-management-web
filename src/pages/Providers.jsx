import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AddProviderForm from "../features/providers/AddProviderForm";
import ProvidersList from "../features/providers/ProvidersList";
import { loadProviders } from "../features/providers/providersSlice";

export default function Providers() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProviders());
  }, [dispatch]);

  return (
    <section>
      <h2 className="title">Lista de proveedores</h2>

      {}

      <AddProviderForm />
      <ProvidersList />
    </section>
  );
}
