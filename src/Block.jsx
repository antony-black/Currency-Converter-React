import React from 'react';
import { defaultCurrencies } from './constants/currencies';

export const Block = ({ 
  value, 
  currency, 
  onChangeValue, 
  onChangeCurrency 
}) => {
  const isActive = (cur) => {
    return currency === cur ? 'active' : '';
  }
  return (
    <div className="block">
      <ul className="currencies">
        {defaultCurrencies.map((cur) => (
          <li
            onClick={() => onChangeCurrency(cur)}
            className={isActive(cur)}
            key={cur}>
            {cur}
          </li>
        ))}
      </ul>
      <input
        onChange={(e) => onChangeValue(e.target.value)}
        value={value}
        type="number"
        placeholder={0}
      />
    </div>
  );
}
