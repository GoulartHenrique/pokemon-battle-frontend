import { NavLink, Outlet } from "react-router";

export default function Layout() {
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
          <NavLink to="/login" className="btn btn-primary btn-sm">
            Login
          </NavLink>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
