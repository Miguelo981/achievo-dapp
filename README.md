# Achievo dApp Monorepo

Achievo is a decentralized application (dApp) for achieving goals by completing challenges. This monorepo contains the frontend SPA, backend server, and smart contracts, organized as separate packages.

## Project Structure

- **app/**: Frontend single-page application (SPA) built with React, TanStack Router, and Wagmi with TanStack Query. [Read more](./app/README.md)
- **server/**: Backend server using TypeScript, tRPC, wagmi, and viem for blockchain interactions.
- **contracts/**: Smart contracts written in Solidity, managed with Hardhat, supporting multiple EVM chains (Polygon, BSC, Avalanche, etc.).

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended) or [Deno](https://deno.com/) (v2+ recommended)
- [pnpm](https://pnpm.io/) (for managing monorepo dependencies)

## Getting Started

1. **Install dependencies for all packages:**

   ```bash
   pnpm install
   ```

2. **Setup environment variables:**

   - Copy and configure `.env` files in `app/`, `server/`, and `contracts/` as needed.

3. **Run the frontend app:**

   ```bash
   cd app
   pnpm dev
   ```

   See [app/README.md](./app/README.md) for more details.

4. **Run the backend server:**

   ```bash
   cd server
   pnpm dev
   ```

   or

   ```bash
   cd server
   deno task start
   ```

   See [server/README.md](./server/README.md) for more details.

5. **Develop and test smart contracts:**

   ```bash
   cd contracts
   pnpm test
   # or
   pnpm compile
   # or
   pnpm deploy:contracts
   ```

   See [contracts/README.md](./contracts/README.md) for more details.

## Scripts

- `pnpm lint` — Lint all packages
- `pnpm format` — Format code in all packages
- `pnpm test:all` — Run tests in all packages

## Technologies Used

- **Frontend:** React, TanStack Router, TanStack Query, Wagmi, Vitest
- **Backend:** TypeScript, tRPC, wagmi, viem, zod
- **Smart Contracts:** Solidity, Hardhat, TypeChain

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License.
