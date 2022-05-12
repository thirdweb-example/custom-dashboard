import { useAddress, useSigner } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useState } from "react";

// Here's a list of contracts that you can deploy.
const contractsYouCanDeploy = [
  "nft-collection",
  "split",
  "token",
  "pack",
  "edition",
  "edition-drop",
  "token-drop",
  "vote",
  "marketplace",
  "nft-drop",
];

export default function Deploy() {
  const address = useAddress();
  const signer = useSigner();

  // Store the selected contract type in state.
  const [contractSelected, setContractSelected] = useState<string>();

  // Function to deploy the proxy contract
  async function deployContract() {
    if (!address || !signer) {
      return;
    }

    if (contractSelected === "pack") {
      alert("Pack is not supported yet");
    }

    const thirdweb = new ThirdwebSDK(signer);

    const contractAddress = await thirdweb.deployer.deployBuiltInContract(
      // @ts-ignore
      contractSelected,
      {
        name: `My ${contractSelected}`,
        primary_sale_recipient: address,
        voting_token_address: address,
        description: `My awesome ${contractSelected} contract`,
      }
    );

    // This is the contract address of the contract you just deployed
    console.log(contractAddress);

    alert(`Succesfully deployed ${contractSelected} at ${contractAddress}`);
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {contractsYouCanDeploy.map((contract) => (
          <div
            key={contract}
            // @ts-ignore
            onClick={() => setContractSelected(contract)}
            style={
              contractSelected === contract
                ? {
                    backgroundColor: "red",
                    width: 100,
                    padding: 4,
                    margin: 4,
                    border: "1px solid red",
                  }
                : {
                    backgroundColor: "white",
                    width: 100,
                    padding: 4,
                    margin: 4,
                    border: "1px solid red",
                  }
            }
          >
            {contract}
          </div>
        ))}
      </div>

      <button onClick={deployContract}>deploy</button>
    </div>
  );
}
