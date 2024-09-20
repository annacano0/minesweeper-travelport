export type CellType = {
    x: number;
    y: number;
    isMine: boolean;
    isCovered: boolean; 
    numberOfMinesAround: number;
  }

export type MinefieldType = CellType[][]

export type isTaggedType = 
    | '' 
    | 'mined'
    | 'inconclusive'
