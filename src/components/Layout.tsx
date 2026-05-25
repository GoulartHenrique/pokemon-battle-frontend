import { NavLink, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";

export default function Layout() {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen">
      <nav className="navbar bg-base-200 shadow-md px-4">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost text-xl" onClick={closeMenu}>
            ⚡ PokéBattle
          </NavLink>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-2">
          <NavLink to="/" className="btn btn-ghost btn-sm">
            Pokédex
          </NavLink>
          <NavLink to="/battle" className="btn btn-ghost btn-sm">
            Battle
          </NavLink>
          <NavLink to="/leaderboard" className="btn btn-ghost btn-sm">
            Leaderboard
          </NavLink>
          {isAuthenticated ? (
            <button onClick={logout} className="btn btn-error btn-sm">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="btn btn-primary btn-sm">
              Login
            </NavLink>
          )}
        </div>

        {/* Theme toggle - always visible */}
        <button onClick={toggleTheme} className="btn btn-ghost btn-sm">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* Mobile hamburger button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn btn-ghost btn-sm"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-base-200 shadow-md px-4 pb-3 flex flex-col items-end gap-1">
          <NavLink
            to="/"
            className="btn btn-outline btn-sm"
            onClick={closeMenu}
          >
            Pokédex
          </NavLink>
          <NavLink
            to="/battle"
            className="btn btn-outline btn-sm"
            onClick={closeMenu}
          >
            Battle
          </NavLink>
          <NavLink
            to="/leaderboard"
            className="btn btn-outline btn-sm"
            onClick={closeMenu}
          >
            Leaderboard
          </NavLink>
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="btn btn-error btn-sm"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="btn btn-primary btn-sm"
              onClick={closeMenu}
            >
              Login
            </NavLink>
          )}
        </div>
      )}

      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
