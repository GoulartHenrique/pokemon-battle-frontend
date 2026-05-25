import { NavLink, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Layout() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <nav className="navbar bg-base-200 shadow-md px-4">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost text-xl">
            ⚡ PokéBattle
          </NavLink>
        </div>
        <div className="flex gap-2">
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
      </nav>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
