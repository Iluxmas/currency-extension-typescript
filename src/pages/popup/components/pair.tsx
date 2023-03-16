import React, { useState, useEffect, ReactElement, FC } from 'react';

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
    <li style={styles.pair}>
      <input
        style={styles.source__amount}
        type="number"
        value={amount}
        min={0}
        max={99999}
        onChange={({ target }) => setAmount(+target.value)}
      />
      <span style={styles.curr__code}>{isSwitched ? target : source}</span>
      <span>=</span>
      <p style={styles.result__value}>{(amount * (isSwitched ? 1 / ratio : ratio)).toFixed(2)}</p>
      <span style={styles.curr__code}>{isSwitched ? source : target}</span>
      <button style={styles.switch__code} onClick={() => setIsSwitched(!isSwitched)}>
        &#8644;
      </button>
      <button style={styles.delete__code} onClick={() => onDelete(source, target)}>
        &#10005;
      </button>
    </li>
  );
};

const styles: any = {
  pair: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    margin: '0 auto',
    marginBottom: '8px',
  },
  source__amount: {
    width: '60px',
    color: '#252525',
    textAlign: 'end',
    backgroundColor: '#fff',
    border: '1px solid #666',
    padding: '1px 3px',
    '::WebkitInnerSpinButton': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '::WebkitOuterSpinButton': {
      WebkitAppearance: 'none',
      margin: 0,
    },
  },
  delete__code: {
    backgroundColor: 'transparent',
    // backgroundImage: "url('../../../images/icons8-close-30.png')",
    width: '18px',
    height: '18px',
    backgroundSize: '90%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: '2px',
    lineHeight: 1,
    fontWeight: 700,
    fontSize: '14px',
    border: '1px solid #ccc',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: '#ddd',
    },
  },
  switch__code: {
    marginLeft: '6px',
    backgroundColor: 'transparent',
    // backgroundImage: "url('../../../images/rotate.png')",
    width: '18px',
    height: '18px',
    backgroundSize: '90%',
    lineHeight: 1,
    fontWeight: 700,
    fontSize: '14px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: '2px',
    border: '1px solid #ccc',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: '#ddd',
    },
  },
  curr__code: {
    display: 'inline-block',
    fontWeight: '600',
    fontSize: '14px',
    width: '30px',
  },
  result__value: {
    padding: '2px',
    textAlign: 'end',
    lineHeight: '16px',
    margin: 0,
    width: '60px',
    border: '1px solid #ddd',
  },
};
export { Pair };
