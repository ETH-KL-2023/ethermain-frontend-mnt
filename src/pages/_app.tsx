import "@/styles/globals.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import {
  sepolia,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  lineaTestnet,
  mantleTestnet,
  Chain,
  localhost,
  polygonMumbai,
  taikoJolnir,
} from "viem/chains";
import { configureChains, mainnet, createConfig, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

export default function App({ Component, pageProps }: AppProps) {
  const { chains, publicClient } = configureChains(
    [ mantleTestnet, taikoJolnir, polygonMumbai, localhost],
    [
      //Mantle
      jsonRpcProvider({
        rpc: chain => ({
          http: `https://rpc.testnet.mantle.xyz`,
        }),
      }),
      
      // //Taiko
      // jsonRpcProvider({
      //   rpc: (chain) => ({
      //     http: `https://rpc.jolnir.taiko.xyz`,
      //   }),
      // }),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "d36ea301e4422955da199fa95fec8ee7",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
