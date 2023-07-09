// TODO: Detailed OrdInfo type definition
export type OrdInfo = {
  minted: boolean;
  inscription: string;
};
export type PunkInfo = {
  id: number;
  ords: Array<OrdInfo>;
};
