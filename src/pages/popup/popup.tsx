import React, { useEffect, FC, ReactElement, useCallback } from 'react';
// import ReactDOM from 'react-dom/client';
import { PairForm } from './components/pairForm';
import { PairsList } from './components/pairsList';
import { MessageType, TRatio, TPairs } from '../../types/types';
import { usePersistentState } from '../../hooks/usePersistentState';
import './popup.css';

const Popup: FC = (): ReactElement => {
  const [codes, setCodes] = usePersistentState({}, 'codesList');
  const [pairs, setPairs] = usePersistentState<TPairs>([], 'pairs');
  const [ratios, setRatios] = usePersistentState<TRatio[] | []>([], 'ratios');

  const getNewRate = useCallback((sourceCurrency: string): void => {
    chrome.runtime.sendMessage({ type: MessageType.getRate, value: sourceCurrency }, function (response) {
      setRatios(response.ratios);
    });
  }, []);

  // get currency codes
  useEffect(() => {
    if (codes && Object.keys(codes).length === 0) {
      chrome.runtime.sendMessage({ type: MessageType.getCodes }, function (response) {
        setCodes(response.codesList);
      });
    }
  }, []);

  useEffect(() => {
    const keys = ratios.map((ratio) => Object.keys(ratio)[0]);
    console.log('0031');
    console.log(keys);
    for (let i = 0; i < pairs.length; i++) {
      if (keys.indexOf(pairs[i][0]) < 0) {
        getNewRate(pairs[i][0]);
      }
    }
  }, [pairs]);

  const handleAddPair = (sourceCurrency: string, targetCurrency: string): void => {
    const newPairsData = pairs ? [...pairs, [sourceCurrency, targetCurrency]] : [[sourceCurrency, targetCurrency]];
    setPairs(newPairsData);
  };

  const handleDeletePair = (sourceCurrency: string, targetCurrency: string): void => {
    const newPairs = pairs.filter((item) => !(item[0] === sourceCurrency && item[1] === targetCurrency));
    setPairs(newPairs);
  };

  const handleUpdate = () => {
    chrome.runtime.sendMessage({ type: MessageType.updateRates }, function (response) {
      console.log(response);
      // setRatios(response.ratios);
    });
  };

  return (
    <div style={styles.extension__container} className="extension__container">
      <PairsList pairsData={pairs} rates={ratios} onDelete={handleDeletePair} onUpdate={handleUpdate} />
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
