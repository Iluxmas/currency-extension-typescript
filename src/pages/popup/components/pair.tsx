import React, { useState, useEffect, ReactElement, FC } from 'react';

type PairProps = {
  source: string
  target: string
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
  }[]
  onDelete: (arg1: string, arg2: string) => void
}

const Pair: FC<PairProps> = ({ source, target, rates, onDelete }): ReactElement => {
  const [amount, setAmount] = useState(1);
  const [isSwitched, setIsSwitched] = useState(false);
  const [ratio, setRatio] = useState(0)

  useEffect(() => {
    console.log(rates);
    const rate = rates.find(item => !!item[source])
    if (rate) {
      setRatio(rate[source].rates[target])
      if (rate[source].rates[target] >= 1) {
        setAmount(1);
      } else if (rate[source].rates[target] >= 0.1) {
        setAmount(10);
      } else {
        setAmount(100);
      }
    }
  }, [rates,target,source]);

  return (
    <li className='pair'>
      <input
        className='source__amount'
        type='number'
        value={amount}
        min={0}
        max={99999}
        onChange={({ target }) => setAmount(+target.value)}
      />
      <span className='curr__code code_source'>{isSwitched ? target : source}</span>
      <span>=</span>
      <p className='result__value'>
        {(amount * (isSwitched ? 1 / ratio : ratio)).toFixed(2)}
      </p>
      <span className='curr__code code_target'>{isSwitched ? source : target}</span>
      <button className='btn_ switch__code' onClick={() => setIsSwitched(!isSwitched)}></button>
      <button className='btn_ delete__code' onClick={() => onDelete(source, target)}></button>
    </li>
  );
}
export {Pair};
