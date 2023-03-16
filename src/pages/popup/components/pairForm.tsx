import React, { useEffect, useState, ReactElement, FC } from 'react';

type PairFormProps = {
  codes: {
    [key: string]: string;
  };
  onAdd: (arg1: string, arg2: string) => void;
};

const PairForm: FC<PairFormProps> = ({ codes, onAdd }): ReactElement => {
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [data, setData] = useState([['', '']]);

  useEffect(() => {
    let entries = Object.entries(codes);

    if (entries.length) {
      setData(entries);
      setSource(entries[0][0]);
      setTarget(entries[0][0]);
    }
  }, [codes]);

  function addNewPair() {
    onAdd(source, target);
  }

  return (
    <div style={styles.form__container}>
      <h1 style={styles.header}>Add new pair</h1>
      <div style={styles.select__container}>
        <label htmlFor="source" style={styles.input__label}>
          Source
        </label>
        <select name="source" style={styles.select} value={source} onChange={({ target }) => setSource(target.value)}>
          {!!data &&
            data.map(([code, name]) => (
              <option key={code + name.slice(0, 10)} value={code} style={styles.option__item}>
                {code + ' - ' + name}
              </option>
            ))}
        </select>
      </div>
      <div style={styles.select__container}>
        <label htmlFor="target" style={styles.input__label}>
          Target
        </label>
        <select name="target" style={styles.select} value={target} onChange={({ target }) => setTarget(target.value)}>
          {!!data &&
            data.map(([code, name]) => (
              <option key={code + name.slice(0, 10)} value={code} style={styles.option__item}>
                {code + ' - ' + name}
              </option>
            ))}
        </select>
      </div>
      <button style={styles.btn__add} onClick={addNewPair}>
        Add Pair
      </button>
    </div>
  );
};
const styles: any = {
  form__container: {
    marginBottom: '10px',
  },
  select__container: {
    display: 'flex',
    gap: '10px',

    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  header: {
    color: '#232323',
    fontSize: '18px',
    fontWeight: 700,
    marginTop: '8px',
  },
  input__label: {
    width: '20%',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '14px',
  },
  btn__add: {
    margin: '0 auto',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
    color: '#252525',
    backgroundColor: '#ddd',
  },
  select: {
    width: '76%',
    color: '#252525',
    backgroundColor: '#fff',
    border: '1px solid #666',
  },
  option__item: {
    color: '#252525',
  },
};
export { PairForm };
