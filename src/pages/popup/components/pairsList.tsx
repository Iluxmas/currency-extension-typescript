import { ReactElement, FC } from 'react';
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
    <Container>
      <Header>Existing pairs</Header>
      <PairsContainer>
        {!!pairsData.length &&
          pairsData.map(([src, trgt]) => {
            return <Pair source={src} target={trgt} key={src + trgt} rates={rates} onDelete={onDelete} />;
          })}
      </PairsContainer>
      <UpdateButton onClick={onUpdate}>Update rates</UpdateButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  color: #232323;
  font-size: 18px;
  font-weight: 700;
  margin-top: 8px;
`;

const PairsContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const UpdateButton = styled.button`
  width: 40%;
  margin: 8px 0 8px auto;
  margin-left: auto;
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
