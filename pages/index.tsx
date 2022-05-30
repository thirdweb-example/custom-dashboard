import { useAddress, useMetamask, useSigner } from "@thirdweb-dev/react";
import { ContractType, ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  contractTypeToDisplayNameMapping as nameMapping,
  contractTypeToImageMapping as imageMapping,
} from "../const/contractToDisplayMappings";
import Link from "next/link";

const Home: NextPage = () => {
  const router = useRouter();
  const address = useAddress();
  const signer = useSigner();
  const connectWithMetamask = useMetamask();

  const [existingContracts, setExistingContracts] = useState<
    {
      address: string;
      contractType: ContractType;
    }[]
  >([]);

  // Load the smart contracts whenever the address/signer changes.
  useEffect(() => {
    // If there's no address, we can't load contracts for this address.
    if (!address || !signer) {
      return;
    }

    // Typically you don't need to pass this signer, we detect it automatically
    const thirdweb = new ThirdwebSDK(signer);

    // Fetch the contracts for this address and set them in state
    thirdweb.getContractList(address).then((contracts) => {
      setExistingContracts(contracts);
    });
  }, [address, signer]);

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
              thirdweb dashboard
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
            <button className={styles.mainButton} onClick={connectWithMetamask}>
              Connect Wallet
            </button>
          </>
        ) : (
          <>
            <Link href="/deploy">
              <a className={styles.mainButton}>Deploy a Contract</a>
            </Link>
            <div className={styles.contractBoxGrid}>
              {existingContracts.map((c) => (
                <div
                  className={styles.contractBox}
                  key={c.address}
                  onClick={() => router.push(`/${c.contractType}/${c.address}`)}
                >
                  <div className={styles.contractImage}>
                    <img
                      src={imageMapping[c.contractType]}
                      alt={c.contractType}
                    />
                  </div>
                  <b className={styles.cardName}>
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
