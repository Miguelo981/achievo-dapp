# Achievo Smart Contracts

This repository contains the smart contracts for the Achievo dApp, which enables users to create and complete challenges to achieve their goals. The contracts are built using Hardhat and support multiple EVM chains.

## Features

- Multi-chain support (Polygon, BSC, Avalanche)
- Challenge creation and completion
- Reward distribution
- Gas optimization
- Comprehensive test coverage
- Type-safe contract interactions with TypeChain
- Gas reporting
- Contract verification support

## Prerequisites

- Node.js (>=10)
- pnpm
- Hardhat
- A wallet with testnet tokens for deployment
- Infura API key for network access

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
   - `MNEMONIC`: Your wallet mnemonic (default: test mnemonic)
   - `INFURA_API_KEY`: Your Infura API key for network access
   - `SOLIDITY_COVERAGE`: Set to true to enable coverage reporting

## Available Scripts

- `pnpm clean` - Clean all generated files and regenerate TypeChain types
- `pnpm compile` - Compile the smart contracts
- `pnpm test` - Run the test suite
- `pnpm coverage` - Generate coverage report
- `pnpm typechain` - Generate TypeChain types
- `pnpm watch-test` - Run tests in watch mode
- `pnpm node` - Start a local Hardhat node
- `pnpm deploy:contracts` - Deploy contracts to the specified network

## Network Configuration

The project supports multiple networks:

- `hardhat`: Local development network
- `localhost`: Local Ganache network (port 8545)
- `avalanche`: Avalanche network
- `bsc`: Binance Smart Chain
- `polygon`: Polygon network

Each network is configured with:

- Custom RPC URLs
- Chain IDs
- Account management
- Gas settings

## Contract Development

### Compiling Contracts

```bash
pnpm compile
```

### Testing

Run the test suite:

```bash
pnpm test
```

Generate coverage report:

```bash
pnpm coverage
```

### Deployment

To deploy the contracts to a specific network:

```bash
pnpm deploy:contracts
```

## Security

- Solhint for code quality
- Comprehensive test coverage
- Gas optimization
- OpenZeppelin contracts integration
- Contract verification support

## Tech Stack

- **Framework**: Hardhat
- **Language**: Solidity 0.7.6
- **Testing**: Mocha, Chai
- **Type Safety**: TypeChain
- **Code Quality**: Solhint, Prettier
- **Coverage**: solidity-coverage
- **Gas Reporting**: hardhat-gas-reporter
- **Deployment**: Hardhat Ignition

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.
