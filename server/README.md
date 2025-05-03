# Achievo Server

The Achievo server is a TypeScript-based backend service that handles blockchain interactions and provides API endpoints for the Achievo dApp. It uses tRPC for type-safe API development and integrates with various blockchain networks through wagmi and viem.

## Features

- Type-safe API with tRPC
- Multi-chain support (Polygon, BSC, Sepolia, Ganache)
- Email notifications with Resend
- Environment-based configuration
- Hot reloading in development
- Blockchain contract interaction

## Prerequisites

- Node.js (v22+) or Deno (v2+)
- pnpm
- Access to blockchain networks
- Resend account for email notifications

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
   - `SECRET`: Secret string for encryption management
   - `PORT`: Server port (default: 4000)
   - `INFURA_API_KEY`: Your Infura API key for blockchain access
   - `RESEND_API_KEY`: Your Resend API key for email notifications
   - `OWNER_EMAIL`: Email address for system notifications
   - `APP_HOST`: Frontend application host URL
   - `*_CHALLENGE_ADDRESS`: Contract addresses for different networks:
     - `MAINET_CHALLENGE_ADDRESS`
     - `SEPOLIA_CHALLENGE_ADDRESS`
     - `BSC_CHALLENGE_ADDRESS`
     - `GANACHE_CHALLENGE_ADDRESS`
     - `POLYGON_CHALLENGE_ADDRESS`

## Development

Start the development server with hot reloading:

```bash
pnpm dev
```

Format code:

```bash
pnpm format
```

## Production Deployment

1. Build the TypeScript code:

   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start:prod
   ```

For production environments, consider using:

- PM2 for process management
- Nginx as a reverse proxy
- Environment-specific configuration

## Available Scripts

- `pnpm dev` - Start development server with hot reloading
- `pnpm build` - Build TypeScript code
- `pnpm start` - Start the server in development mode
- `pnpm start:prod` - Start the server in production mode
- `pnpm format` - Format code with Prettier

## API Documentation

The server provides the following main endpoints:

- `/api/trpc/*` - tRPC endpoints

## Architecture

- **tRPC**: Type-safe API development
- **wagmi**: Blockchain interactions
- **viem**: Ethereum client
- **zod**: Runtime type checking
- **Resend**: Email notifications

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **API**: tRPC
- **Blockchain**: wagmi, viem
- **Email**: Resend
- **Validation**: Zod
- **Formatting**: Prettier

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
