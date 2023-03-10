import React, { useEffect, useState, FC, ReactElement } from 'react';
import ReactDOM from 'react-dom/client';
import { PairForm } from './components/pairForm';
import { PairsList } from './components/pairsList';
import { ApiService } from '../../utils/api';
import './popup.css';

type Codes = {
  [key: string]: string;
};

type Pairs = string[][];

type Ratio = {
  [key: string]: {
    base: string;
    date: string;
    rates: {
      [key: string]: number;
    };
    success: boolean;
    timestamp: number;
  };
};

const Popup: FC = (): ReactElement => {
  const [codes, setCodes] = useState({});
  const [pairs, setPairs] = useState<Pairs>([]);
  const [ratios, setRatios] = useState<Ratio[] | []>([]);

  // get currency codes
  useEffect(() => {
    chrome.storage.local
      .get('codesList')
      .then((result) => {
        if (!result.codesList) {
          chrome.runtime.sendMessage({ method: 'getCodes' }, function (response) {
            setCodes(response.codesList);
          });
        } else {
          setCodes(result.codesList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // get currency rates
  useEffect(() => {
    chrome.storage.local
      .get('ratios')
      .then((result) => {
        if (result.ratios) {
          setRatios(result.ratios);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // get currency pairs
  useEffect(() => {
    chrome.storage.local
      .get('pairs')
      .then((result) => {
        if (result.pairs) {
          setPairs(result.pairs);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAddPair(src: string, trgt: string): void {
    let newPairsData;

    newPairsData = [...pairs, [src, trgt]];
    setPairs(newPairsData);

    chrome.storage.local
      .set({ pairs: newPairsData })
      .then((res) => {
        getNewRate(src);
      })
      .catch((err) => console.log(err));
  }

  function getNewRate(src: string): void {
    if (!ratios || !ratios.some((item) => item[src] !== undefined)) {
      chrome.runtime.sendMessage({ method: 'getRate', value: `${src}` }, function (response) {
        console.log(response.ratios);
        setRatios(response.ratios);
      });
    }
  }

  function handleDeletePair(src: string, trgt: string): void {
    if (pairs) {
      const newPairs = pairs.filter((item) => !(item[0] === src && item[1] === trgt));
      setPairs(newPairs);
      chrome.storage.local.set({ pairs: newPairs });
    }
  }

  return (
    <div style={styles.extension__container} className="extension__container">
      <PairsList pairsData={pairs} rates={ratios} onDelete={handleDeletePair} />
      <PairForm codes={codes} onAdd={handleAddPair} />
    </div>
  );
};

const styles: any = {
  extension__container: {
    color: '#232323',
    fontFamily: "'Montserrat', sans-serif",
    fontStyle: 'normal',
    fontWeight: 400,
    maxWidth: '340px',
    display: 'flex',
    flexDirection: 'column',
  },
};

export { Popup };
// const root = ReactDOM.createRoot(document.getElementById('root')!);
// root.render(<Popup />);
