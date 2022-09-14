import { useEffect, useState } from "react";
import { ConnectWallet, useAddress, useSDK } from "@thirdweb-dev/react";
import { ContractType } from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  contractTypeToDisplayNameMapping as nameMapping,
  contractTypeToImageMapping as imageMapping,
} from "../const/contractToDisplayMappings";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  const address = useAddress();
  const sdk = useSDK();

  const [loading, setLoading] = useState(true);
  const [existingContracts, setExistingContracts] = useState<
    {
      address: string;
      contractType: ContractType;
    }[]
  >([]);

  // Load the smart contracts whenever the address/signer changes.
  useEffect(() => {
    // If there's no address, we can't load contracts for this address.
    if (!address || !sdk) {
      return;
    }

    // Fetch the contracts for this address and set them in state
    sdk
      .getContractList(address)
      .then((contracts) => {
        setExistingContracts(contracts);
      })
      .finally(() => setLoading(false));
  }, [address, sdk]);

  return (
    <>
      {/* Content */}
      <div className={styles.container}>
        {/* Top Section */}
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
              dashboard
            </a>
          </b>
          .
        </p>

        <hr className={styles.divider} />

        <h2>Your Contracts</h2>
        {!address ? (
          <>
            <p>
              <b>Connect Your Wallet to view your contracts</b>
            </p>
            <ConnectWallet accentColor="#F213A4">Connect Wallet</ConnectWallet>
          </>
        ) : (
          <>
            <Link href="/deploy">
              <a className={styles.mainButton}>Deploy a Contract</a>
            </Link>
            <div className={styles.contractBoxGrid}>
              {loading && <p>Loading...</p>}
              {existingContracts.map((c) => (
                <div
                  className={styles.contractBox}
                  key={c.address}
                  onClick={() => router.push(`/${c.contractType}/${c.address}`)}
                >
                  <div className={styles.contractImage}>
                    <img
                      // @ts-ignore
                      src={imageMapping[c.contractType]}
                      alt={c.contractType}
                    />
                  </div>
                  <b className={styles.cardName}>
                    {/* @ts-ignore */}
                    {nameMapping[c.contractType]}
                  </b>
                  <p className={styles.cardDescription}>
                    {c.address.slice(0, 6) + "..." + c.address.slice(-4)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
