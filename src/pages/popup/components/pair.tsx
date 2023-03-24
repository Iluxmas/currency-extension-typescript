import React, { useState, useEffect, ReactElement, FC } from 'react';
import styled from 'styled-components';

type PairProps = {
  source: string;
  target: string;
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
  onDelete: (arg1: string, arg2: string) => void;
};

const Pair: FC<PairProps> = ({ source, target, rates, onDelete }): ReactElement => {
  const [amount, setAmount] = useState(1);
  const [isSwitched, setIsSwitched] = useState(false);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const rate = rates.find((item) => !!item[source]);
    if (rate) {
      setRatio(rate[source].rates[target]);
      if (rate[source].rates[target] >= 1) {
        setAmount(1);
      } else if (rate[source].rates[target] >= 0.1) {
        setAmount(10);
      } else {
        setAmount(100);
      }
    }
  }, [rates, target, source]);

  return (
    <ListItem>
      <Input
        type="number"
        value={amount}
        min={0}
        max={99999}
        onChange={({ target }) => setAmount(target.valueAsNumber)}
      />
      <CurrencySpan>{isSwitched ? target : source}</CurrencySpan>
      <span>=</span>
      <ResultValue>{(amount * (isSwitched ? 1 / ratio : ratio)).toFixed(2)}</ResultValue>
      <CurrencySpan>{isSwitched ? source : target}</CurrencySpan>
      <SwitchButton onClick={() => setIsSwitched(!isSwitched)}>&#8644;</SwitchButton>
      <DeleteButton onClick={() => onDelete(source, target)}>&#10005;</DeleteButton>
    </ListItem>
  );
};

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 auto;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 60px;
  color: #252525;
  text-align: end;
  background-color: #fff;
  border: 1px solid #666;
  padding: 1px 3px;
  input::webkit-inner-spin-button: {
    -webkit-appearance: none;
    margin: 0;
  }
  input::webkit-outer-spin-button: {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ActionButton = styled.button`
  background-color: 'transparent';
  width: 18px;
  height: 18px;
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: center;
  font-size: 14px;
  font-weight: 700;
  padding: 2px;
  border: 1px solid #ccc;
  button:hover: {
    cursor: pointer;
    background-color: #ddd;
  },
`;

const DeleteButton = styled(ActionButton)`
  line-height: 0.95;
`;

const SwitchButton = styled(ActionButton)`
  margin-left: 6px;
  line-height: 0.9;
`;

const CurrencySpan = styled.span`
  display: inline-block;
  font-weight: 600;
  font-size: 14px;
  width: 30px;
`;

const ResultValue = styled.p`
  padding: 2px;
  text-align: end;
  line-height: 16px;
  margin: 0;
  width: 60px;
  border: 1px solid #ddd;
`;

export { Pair };
