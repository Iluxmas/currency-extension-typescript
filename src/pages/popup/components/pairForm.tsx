import React, { useEffect, useState, ReactElement, FC } from 'react';
import styled from 'styled-components';

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
    <FormContainer>
      <Header>Add new pair</Header>
      <SelectContainer>
        <Label htmlFor="source">Source</Label>
        <Select name="source" value={source} onChange={({ target }) => setSource(target.value)}>
          {!!data &&
            data.map(([code, name]) => (
              <Option key={code + name.slice(0, 10)} value={code}>
                {code + ' - ' + name}
              </Option>
            ))}
        </Select>
      </SelectContainer>
      <SelectContainer>
        <Label htmlFor="target">Target</Label>
        <Select name="target" value={target} onChange={({ target }) => setTarget(target.value)}>
          {!!data &&
            data.map(([code, name]) => (
              <Option key={code + name.slice(0, 10)} value={code}>
                {code + ' - ' + name}
              </Option>
            ))}
        </Select>
      </SelectContainer>
      <AddButton onClick={addNewPair}>Add Pair</AddButton>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;
const Header = styled.h1`
  color: #232323;
  font-size: 18px;
  font-weight: 700;
  margin-top: 0;
`;
const SelectContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const Label = styled.label`
  width: 20%;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
`;
const Select = styled.select`
  width: 76%;
  color: #252525;
  background-color: #fff;
  border: 1px solid #666;
`;
const AddButton = styled.button`
  margin: 8px 0 0 auto;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  color: #252525;
  background-color: #ddd;
`;

const Option = styled.option`
  color: #252525;
`;

export { PairForm };
