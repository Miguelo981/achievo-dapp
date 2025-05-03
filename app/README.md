# Achievo Frontend

The Achievo frontend is a modern single-page application (SPA) built with React, TanStack Router, and TanStack Query. It provides a user-friendly interface for interacting with the Achievo dApp, allowing users to create and complete challenges to achieve their goals.

## Features

- Modern, responsive UI
- Type-safe routing with TanStack Router
- Efficient data fetching with TanStack Query
- Blockchain integration with Wagmi and RainbowKit
- Hot module replacement
- Comprehensive test coverage
- Internationalization support
- Form handling with React Hook Form

## Prerequisites

- Node.js (v22.9.0)
- pnpm (>=9.14.2)
- Modern web browser with Web3 support (e.g., MetaMask)

## Installation

```bash
pnpm install
```

## Configuration

1. Copy `.env.sample` to `.env`:

   ```bash
   cp .env.sample .env
   ```

2. Configure your environment variables:
   - `VITE_WALLET_CONNECT_PROJECT_ID`: Your WalletConnect project ID
   - `VITE_MAINET_CHALLENGE_TOKEN_ADDRESS`: Mainnet challenge token contract address
   - `VITE_BSC_CHALLENGE_TOKEN_ADDRESS`: BSC challenge token contract address
   - `VITE_SERVER_HOST`: Backend server host URL

## Development

Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:3000` by default.

## Building for Production

Create a production build:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm serve
```

The build output will be in the `dist` directory.

## Testing

Run the test suite:

```bash
pnpm test
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── routes/         # Application routes
├── hooks/          # Custom React hooks
├── services/       # API and blockchain services
├── i18n/           # i18n config
...
```

## Tech Stack

- **Framework**: React 19
- **Routing**: TanStack Router
- **State Management**: TanStack Query, React Context
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Shadcn
- **Blockchain**: Wagmi, RainbowKit, Viem
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest, Testing Library
- **Build Tool**: Vite 6
- **Package Manager**: pnpm 9.14.2

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
