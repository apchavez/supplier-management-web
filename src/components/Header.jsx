import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logoBlanco.png";
import icon from "../assets/icon.png";

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className="appbar">
      <div className="left">
        <img src={icon} alt="icon" className="icon" />
        <img src={logo} alt="gapsi" className="brand" />
        <span className="brand-title">e-Commerce Gapsi</span>
      </div>
      <nav className="nav">
        <Link to="/">
          <button className={pathname === "/" ? "" : "ghost"}>Inicio</button>
        </Link>
        <Link to="/providers">
          <button className={pathname === "/providers" ? "" : "ghost"}>
            Proveedores
          </button>
        </Link>
      </nav>
    </header>
  );
}
