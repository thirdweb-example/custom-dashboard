import React from "react";
import { useContract } from "@thirdweb-dev/react";
import { ContractType } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { contractTypeToDisplayNameMapping } from "../../const/contractToDisplayMappings";
import styles from "../../styles/Home.module.css";

type Props = {};

export default function ContractPage({}: Props) {
  const router = useRouter();
  const { contractType, contractAddress } = router.query;

  // If you know what kind of contract it is, you can access all of the functions of it rather than just the shared ones between all contracts.
  // e.g. if you just want to view an nft-collection, then you can use the `useNftCollection` hook instead of `useContract`.
  // this will return an nft-collection object, which has all of the functions of the nft-collection contract.
  // and provide you with a lot more functionality
  const myContract = useContract(contractAddress as string);

  console.log(myContract);

  return (
    <div className={styles.container}>
      <h1>
        Your {contractTypeToDisplayNameMapping[contractType as ContractType]}
      </h1>
      <p>{contractAddress}</p>

      <hr className={styles.divider} />

      <h2>Here&apos;s what you can access:</h2>

      <div className={styles.functionBoxGrid}>
        {!myContract
          ? null
          : Object.entries(myContract).map(([functionName, functionData]) => (
              <div className={styles.functionBox} key={functionName}>
                <h3>{functionName}</h3>
              </div>
            ))}
      </div>
    </div>
  );
}
