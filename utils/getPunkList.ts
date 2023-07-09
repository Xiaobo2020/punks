import { TOTAL_SUPPLY } from "@/constants";
import { OrdInfo, PunkInfo } from "@/types";

// TODO: The implement of getPunkList
const getPunkList = () => {
  return new Promise<{
    punkList: Array<PunkInfo>;
    minted: number;
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        punkList: new Array(TOTAL_SUPPLY).fill(null).map((v, idx) => {
          return {
            id: idx,
            ords: [] as Array<OrdInfo>,
          };
        }),
        minted: 200,
      });
    }, 3000);
  });
};

export default getPunkList;
