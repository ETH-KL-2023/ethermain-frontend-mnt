import "@/styles/globals.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import {
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
} from "viem/chains";
import { configureChains, mainnet, createConfig, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  const { chains, publicClient } = configureChains(

    [mantleTestnet, polygonMumbai, localhost],
    [
      alchemyProvider({
        apiKey: process.env.ALCHEMY_ID || "7tVsktJMmHlyYh2l2v6zpSYnPxvIcvhC",
      }),
      publicProvider(),
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
