import React, { useEffect, useState, FC, ReactElement } from 'react';
import ReactDOM from 'react-dom/client';
import { PairForm } from './components/pairForm';
import { PairsList } from './components/pairsList';
import ApiService from './utils/api';
import './popup.css';

type Codes = {
  [key: string]: string
};

type Pairs = string[][];

type Ratio = {
  [key: string]: {
    base: string
    date: string
    rates: { 
      [key: string]: number
    }
    success: boolean
    timestamp: number
  }
};


const Popup: FC = ():ReactElement => {
  const [codes, setCodes] = useState<Codes>({});
  const [pairs, setPairs] = useState<Pairs|[]>([]);
  const [ratios, setRatios] = useState<Ratio[]>([]);

  // get currency codes
  useEffect(() => {
    chrome.storage.local
      .get('codesList')
      .then((result) => {
        if (!result.codesList) {
          ApiService.getResource('/symbols')
            .then((res) => res.json())
            .then((data) => {
              chrome.storage.local.set({ codesList: data.symbols });
              setCodes(data.symbols);
            })
            .catch((err) => console.log(err));
        } else {
          setCodes(result.codesList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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


  function handleAddPair(src: string, trgt:string): void {
    let newPairsData;
    if (pairs) {
      newPairsData = [...pairs, [src, trgt]];
    } else {
      newPairsData = [[src, trgt]];
    }
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
      ApiService.getResource(`/latest?base=${src}`)
        .then((res) => res.json())
        .then((data) => {
          let newRatios;
          if (ratios) {
            newRatios = [...ratios, { [src]: data }];
          } else {
            newRatios = [{ [src]: data }];
          }
          setRatios(newRatios);
          chrome.storage.local.set({ ratios: [...newRatios] });
        })
        .catch((err) => console.log(err));
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
    <div className='extension__container'>
      <PairsList pairsData={pairs} rates={ratios} onDelete={handleDeletePair} />
      <PairForm codes={codes} onAdd={handleAddPair} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Popup />);
