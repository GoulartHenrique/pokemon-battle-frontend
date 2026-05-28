# ⚡ PokéBattle — Frontend

A Pokémon Battle Game built with React, TypeScript, and the PokéAPI. Choose your Pokémon, battle opponents, and climb the leaderboard!

## 🎮 Features

- **Pokédex** — Browse all 151 Gen 1 Pokémon with search and type filter
- **Pokémon Details** — View stats, types, height, weight, and official artwork
- **Battle System** — Turn-based combat with real stats (HP, Attack, Defense, Speed)
- **Leaderboard** — Top 10 players ranked by score
- **Authentication** — Register and login with JWT-based auth
- **Dark/Light Mode** — Toggle between themes
- **Responsive** — Mobile-friendly with hamburger menu

## 🛠️ Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- DaisyUI v5
- PokéAPI

## 📦 Installation

```bash
git clone https://github.com/GoulartHenrique/pokemon-battle-frontend.git
cd pokemon-battle-frontend
npm install
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
VITE_AUTH_URL=http://localhost:3001
VITE_BACKEND_URL=http://localhost:3000
```

## ▶️ Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
src/
├── components/      # Layout, ProtectedRoute
├── context/         # AuthContext, authContextValue
├── hooks/           # useAuth, useBattle
├── pages/           # Home, PokemonDetail, Battle, Leaderboard, Login, Register, NotFound
├── services/        # pokemonService (PokéAPI calls)
├── types/           # TypeScript interfaces (pokemon, battle, auth)
└── utils/           # battleCalc, typeColors
```

## 🎯 How It Works

1. User registers and logs in (JWT auth via external service)
2. Browse the Pokédex — search by name or filter by type
3. Pick a Pokémon and enter battle
4. Turn-based combat: attack and defend based on real Pokémon stats
5. Win or lose — results are saved and the leaderboard updates

## 🏗️ Related Repos

- **Backend (Leaderboard & Battle API):** [pokemon-battle-backend](https://github.com/Richthofen97/pokemon-battle-backend)
- **Auth Service:** [pokemon (auth-service)](https://github.com/qgong-its/pokemon)
