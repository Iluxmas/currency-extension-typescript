import React, {ReactElement, FC} from 'react'
import {Pair} from './pair';

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
  pairsData: string[][],
  onDelete: (arg1: string, arg2: string) => void
}

const PairsList: FC<PairListProps> = ({ rates, pairsData, onDelete }): ReactElement => {

  return (
    <div>
      <h1>Existing pairs</h1>
      <ul id='pairs__list'>
        {!!pairsData.length &&
          pairsData.map(([src, trgt]) => {
  
                  
            return (<Pair
              source={src}
              target={trgt}
              key={src + trgt}
              rates={rates}
              onDelete={onDelete}
            />)
          })}
      </ul>
      <button id='btn__update'>Update rates</button>
    </div>
  );
}

export {PairsList};