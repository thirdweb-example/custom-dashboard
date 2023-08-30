import React, { useState } from "react";
import { ConnectWallet, useAddress, useSDK } from "@thirdweb-dev/react";
import { ContractType } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";
import {
  contractsToShowOnDeploy as contracts,
  contractTypeToDisplayNameMapping as nameMapping,
  contractTypeToImageMapping as imageMapping,
} from "../const/contractToDisplayMappings";
import { useRouter } from "next/router";

export default function Deploy() {
  const router = useRouter();
  const address = useAddress();
  const sdk = useSDK();
  const [isLoading, setIsLoading] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  async function deployContract(contractSelected: ContractType) {
    if (!address || !sdk) {
      return;
    }

    try {
      setIsLoading(true);
      setIsBlurred(true);

      const contractAddress = await sdk.deployer.deployBuiltInContract(
      // @ts-ignore - we're excluding custom contracts from the demo
      contractSelected,
      {
        name: `My ${contractSelected}`,
        primary_sale_recipient: address,
        voting_token_address: address,
        description: `My awesome ${contractSelected} contract`,
        // Recipients are required when trying to deploy a split contract
        recipients: [
          {
            address,
            sharesBps: 100 * 100,
          },
        ],
      }
    );

    // This is the contract address of the contract you just deployed
    setIsLoading(false);
    setIsBlurred(false);

    alert(`Successfully deployed ${contractSelected} at ${contractAddress}`);

    const newTabUrl = `https://thirdweb.com/mumbai/${contractAddress}`;
    const newTab = window.open(newTabUrl, "_blank");

    if (newTab) {
      newTab.focus();
    }

    router.push(`/`);
  } catch (error) {
    setIsLoading(false);
    setIsBlurred(false);
    console.error("Error deploying contract:", error);
    // Handle error, display error message, etc.
  }
}

  return (
    <>
      {/* Content */}
      <div className={`${styles.container} ${isBlurred ? styles.blurred : ""}`}>
        <h1 className={styles.h1}>thirdweb Custom Dashboard</h1>
        <p className={styles.explain}>
          Learn how to dynamically create smart contracts using the thirdweb SDK
          and view all of the contracts you&apos;ve created, similar to our{" "}
          <b>
            <a
              href="https://thirdweb.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.purple}
            >
              thirdweb dashboard
            </a>
          </b>
          .
        </p>

        <hr className={styles.divider} />

        <h2>What do you want to deploy?</h2>
        {!address ? (
          <>
            <p>
              <b>Connect Your Wallet to deploy a contract</b>
            </p>
            <ConnectWallet />
          </>
        ) : (
          <>
            <div className={styles.contractBoxGrid}>
              {contracts.map((c) => (
                <div
                  className={styles.contractBox}
                  key={c}
                  onClick={() => deployContract(c as ContractType)}
                >
                  <div className={styles.contractImage}>
                    <img src={imageMapping[c as ContractType]} alt={c} />
                  </div>
                  <b className={styles.cardName}>
                    {nameMapping[c as ContractType]}
                  </b>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </>
  );
}