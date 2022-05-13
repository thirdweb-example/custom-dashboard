const contractTypeToDisplayNameMapping = {
  "nft-drop": "NFT Drop",
  "nft-collection": "NFT Collection",
  "edition-drop": "Edition Drop",
  edition: "Edition",
  "token-drop": "Token Drop",
  token: "Token",
  vote: "Vote",
  split: "Split",
  marketplace: "Marketplace",
  pack: "Pack",
  custom: "Custom",
};

const contractTypeToImageMapping = {
  "nft-drop": `icons/drop.webp`,
  "nft-collection": `icons/nft-collection.webp`,
  "edition-drop": `icons/drop.webp`,
  edition: `icons/nft-collection.webp`,
  "token-drop": `icons/token.webp`,
  token: `icons/drop.webp`,
  vote: `icons/vote.webp`,
  split: `icons/splits.webp`,
  marketplace: `icons/marketplace.webp`,
  pack: `icons/pack.webp`,
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
  "marketplace",
  "nft-drop",
];

export {
  contractTypeToDisplayNameMapping,
  contractTypeToImageMapping,
  contractsToShowOnDeploy,
};
