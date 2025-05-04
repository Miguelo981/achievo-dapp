import type { ComponentType, FC, ReactNode } from 'react'

type ProviderWithProps = [ComponentType<any>, Record<string, any>?]

interface BuildProviderTreeProps {
  children: ReactNode
}

export function buildProviderTree(providers: ProviderWithProps[]): FC<BuildProviderTreeProps> {
  return ({ children }) =>
    providers.reduceRight((acc, [Provider, props]) => {
      return <Provider {...(props ?? {})}>{acc}</Provider>
    }, children as ReactNode)
}
