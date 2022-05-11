import {
  useAddress,
  useDisconnect,
  useMetamask,
  useSigner,
} from "@thirdweb-dev/react";
import { ContractType, ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const address = useAddress();
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

  const signer = useSigner();
  ``;

  // const [contractSelected, setContractSelected] = useState<ContractType>();

  async function deployContract() {
    const contractSelected = "nft-collection";

    if (!address || !signer) {
      return;
    }

    const thirdweb = new ThirdwebSDK(signer);

    switch (contractSelected) {
      case "nft-collection":
        thirdweb?.deployer?.deployNFTCollection({
          name: "My NFT Collection",
          primary_sale_recipient: address,
        });

        break;
    }
  }

  useEffect(() => {
    if (!address || !signer) {
      return;
    }

    const thirdweb = new ThirdwebSDK(signer);

    thirdweb.getContractList(address).then((contracts) => {
      setExistingContracts(contracts);
    });
  }, [address, signer]);

  console.log("found contracts:", existingContracts);

  return (
    <div>
      {address ? (
        <>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Your address: {address}</p>

          {/* Dropdown of each type of contract => map to an item in a dropdown => set state whenever it changes */}

          <button onClick={deployContract}>deploy</button>

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
