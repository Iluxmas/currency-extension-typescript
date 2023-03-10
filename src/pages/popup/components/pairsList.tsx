import React, { ReactElement, FC } from 'react';
import { Pair } from './pair';

type PairListProps = {
  rates: {
    [key: string]: {
      base: string;
      date: string;
      rates: {
        [key: string]: number;
      };
      success: boolean;
      timestamp: number;
    };
  }[];
  pairsData: string[][];
  onDelete: (arg1: string, arg2: string) => void;
};

const PairsList: FC<PairListProps> = ({ rates, pairsData, onDelete }): ReactElement => {
  return (
    <div>
      <h1 style={styles.header}>Existing pairs</h1>
      <ul style={styles.pairsList}>
        {!!pairsData.length &&
          pairsData.map(([src, trgt]) => {
            return <Pair source={src} target={trgt} key={src + trgt} rates={rates} onDelete={onDelete} />;
          })}
      </ul>
      <button style={styles.btn__update}>Update rates</button>
    </div>
  );
};

const styles: any = {
  pairsList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  header: {
    color: '#232323',
    fontSize: '18px',
    fontWeight: 700,
    marginTop: '8px',
  },
  btn__update: {
    width: '30%',
    margin: '6px auto 10px',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
    color: '#252525',
    backgroundColor: '#ddd',
  },
};

export { PairsList };
