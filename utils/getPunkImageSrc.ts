import getFullPunkId from "./getFullPunkId";

const getPunkImageSrc = (punkId: number) => {
  return `https://cryptopunks.app/cryptopunks/cryptopunk${getFullPunkId(
    punkId
  )}.png?size=2500&customColor=F7931A`;
};

export default getPunkImageSrc;
