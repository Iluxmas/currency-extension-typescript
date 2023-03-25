import React, { ReactElement, FC } from 'react';
import styled from 'styled-components';

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
      <Header>Existing pairs</Header>
      <PiarsList>
        {!!pairsData.length &&
          pairsData.map(([src, trgt]) => {
            return <Pair source={src} target={trgt} key={src + trgt} rates={rates} onDelete={onDelete} />;
          })}
      </PiarsList>
      <UpdateButton onClick={onUpdate}>Update rates</UpdateButton>
    </div>
  );
};

const Header = styled.h1`
  color: #232323;
  font-size: 18px;
  font-weight: 700;
  margin-top: 8px;
`;

const PiarsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const UpdateButton = styled.button`
  width: 30%;
  margin: 6px auto 10px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  color: #252525;
  background-color: #ddd;
  &:hover: {
    cursor: pointer;
    background-color: #ddd;
    opacity: 0.9;
  }
`;

export { PairsList };
