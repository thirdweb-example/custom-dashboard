const contractTypeToDisplayNameMapping = {
  "nft-drop": "NFT Drop",
  "nft-collection": "NFT Collection",
  "edition-drop": "Edition Drop",
  edition: "Edition",
  "token-drop": "Token Drop",
  token: "Token",
  vote: "Vote",
  split: "Split",
  pack: "Pack",
  custom: "Custom",
  multiwrap: "Multiwrap",
  "signature-drop": "Signature Drop",
  "marketplace-v3": "Marketplace v3",
  "marketplace": "Marketplace",
};

const contractTypeToImageMapping = {
  "signature-drop": `icons/signature-drop.webp`,
  "nft-drop": `icons/drop.webp`,
  "edition-drop": `icons/drop.webp`,
  "nft-collection": `icons/nft-collection.webp`,
  edition: `icons/nft-collection.webp`,
  token: `icons/drop.webp`,
  "token-drop": `icons/token.webp`,
  split: `icons/splits.webp`,
  vote: `icons/vote.webp`,
  "marketplace-v3": `icons/marketplace.webp`,
  "marketplace": `icons/marketplace.webp`,
  pack: `icons/pack.webp`,
  multiwrap: `icons/general.webp`,
  custom: `icons/custom.svg`,
};

// Here's a list of contracts that you can deploy.
const contractsToShowOnDeploy = [
  "nft-collection",
  "split",
  "token",
  "pack",
  "edition",
  "edition-drop",
  "token-drop",
  "vote",
  "nft-drop",
  "marketplace-v3",
  // "multi-wrap",
  // "signature-drop",
];

export {
  contractTypeToDisplayNameMapping,
  contractTypeToImageMapping,
  contractsToShowOnDeploy,
};
