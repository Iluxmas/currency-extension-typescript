import Pair from './pair.js';

type PairListProps = {
  rates: {
    [key: string]: {
      base: string
      date: string
      rates: { 
        [key: string]: number
      }
      success: boolean
      timestamp: number
    }
  }[],
  pairsData: [string,string][],
  onDelete: (arg1: string, arg2: string) => void
}

export default function PairsList({ rates, pairsData, onDelete }: PairListProps) {

  

  return (
    <div>
      <h1>Existing pairs</h1>
      <ul id='pairs__list'>
        {!!pairsData &&
          pairsData.map(([src, trgt]) => {
            let ratio = 0
            if (rates) ratio = rates.find((item) => !!item[src])[src]
            
            return (<Pair
              source={src}
              target={trgt}
              key={src + trgt}
              rate={ratio}
              onDelete={onDelete}
            ></Pair>
          )})}
      </ul>
      <button id='btn__update'>Update rates</button>
    </div>
  );
}
