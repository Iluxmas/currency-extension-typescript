import React, { useEffect, FC, ReactElement } from 'react';
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

  // get currency codes
  useEffect(() => {
    if (codes && Object.keys(codes).length === 0) {
      chrome.runtime.sendMessage({ type: MessageType.getCodes }, function (response) {
        setCodes(response.codesList);
      });
    }
  }, []);

  useEffect(() => {
    for (let i = 0; i < pairs.length; i++) {
      getNewRate(pairs[i][0]);
    }
  }, [pairs]);

  const handleAddPair = (sourceCurrency: string, targetCurrency: string): void => {
    const newPairsData = pairs ? [...pairs, [sourceCurrency, targetCurrency]] : [[sourceCurrency, targetCurrency]];
    setPairs(newPairsData);
  };

  const getNewRate = (sourceCurrency: string): void => {
    chrome.runtime.sendMessage({ type: MessageType.getRate, value: sourceCurrency }, function (response) {
      setRatios(response.ratios);
    });
  };

  const handleDeletePair = (sourceCurrency: string, targetCurrency: string): void => {
    const newPairs = pairs.filter((item) => !(item[0] === sourceCurrency && item[1] === targetCurrency));
    setPairs(newPairs);
  };

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
