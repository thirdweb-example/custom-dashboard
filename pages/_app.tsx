import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Header from "../components/Header";
import Head from "next/head";
import React from "react";
import ThirdwebGuideFooter from "../components/guide/ThirdwebGuideFooter";
import ThirdwebGuideOverlay from "../components/guide/ThirdwebGuideOverlay";
import "../styles/globals.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }: AppProps) {
  const [showGuideOverlay, setShowGuideOverlay] = React.useState(false);

  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <ThirdwebGuideOverlay
        show={showGuideOverlay}
        setShow={setShowGuideOverlay}
      />
      <Head>
        <title>thirdweb Custom Dashboard Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="thirdweb example repository to showcase how to use thirdweb's deployer to dynamically deploy any of thirdweb's pre-built smart contracts"
        />
        <meta
          name="keywords"
          content="thirdweb, thirdweb deployer, thirdweb sdk deploy contract, thirdweb sdk, thirdweb react, thirdweb typescript"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
      <ThirdwebGuideFooter onLearnMore={() => setShowGuideOverlay(true)} />
    </ThirdwebProvider>
  );
}

export default MyApp;
