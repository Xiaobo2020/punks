import { TOTAL_SUPPLY } from "@/constants";

const isValidPunkId = (punkId: string) => {
  // empty
  if (punkId === "") return true;
  // number
  if (/^\d+$/.test(punkId) === false) return false;
  // valid number
  const n = parseInt(punkId);
  return 0 <= n && n < TOTAL_SUPPLY;
};

export default isValidPunkId;
