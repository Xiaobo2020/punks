const getFullPunkId = (punkId: number) => {
  const punkIdStr = "" + punkId;
  const PAD = "0000";
  const result = PAD.substring(0, PAD.length - punkIdStr.length) + punkIdStr;
  return result;
};

export default getFullPunkId;
