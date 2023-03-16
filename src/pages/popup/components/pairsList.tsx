import React, { ReactElement, FC } from 'react';
import { Pair } from './pair';
import { TRatio } from '../../../types/types';
type PairListProps = {
  rates: TRatio[];
  pairsData: string[][];
  onDelete: (arg1: string, arg2: string) => void;
  onUpdate: () => void;
};

const PairsList: FC<PairListProps> = ({ rates, pairsData, onDelete, onUpdate }): ReactElement => {
  return (
    <div>
      <h1 style={styles.header}>Existing pairs</h1>
      <ul style={styles.pairsList}>
        {!!pairsData.length &&
          pairsData.map(([src, trgt]) => {
            return <Pair source={src} target={trgt} key={src + trgt} rates={rates} onDelete={onDelete} />;
          })}
      </ul>
      <button onClick={onUpdate} style={styles.btn__update}>
        Update rates
      </button>
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
    ':hover': {
      cursor: 'pointer',
      backgroundColor: '#ddd',
      opacity: 0.9,
    },
  },
};

export { PairsList };
