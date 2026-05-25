import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl opacity-60">This page doesn't exist!</p>
      <Link to="/" className="btn btn-primary">
        Back to Pokédex
      </Link>
    </div>
  );
}
