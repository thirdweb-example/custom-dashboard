import {
  useAddress,
  useDisconnect,
  useMetamask,
  useSigner,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const address = useAddress();
  const signer = useSigner();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  const [existingContracts, setExistingContracts] = useState<
    {
      address: string;
      contractType:
        | "nft-collection"
        | "split"
        | "custom"
        | "token"
        | "pack"
        | "edition"
        | "edition-drop"
        | "token-drop"
        | "vote"
        | "marketplace"
        | "nft-drop";
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
    <div>
      {address ? (
        <>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Your address: {address}</p>

          <hr />

          <h1>Your Smart Contracts</h1>
          <Link href="/deploy">Deploy A new contract</Link>

          {existingContracts.map((contract) => (
            <p key={contract.address}>
              <b>{contract.contractType}</b>: {contract.address}
            </p>
          ))}
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Home;
