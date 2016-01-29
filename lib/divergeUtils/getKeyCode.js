import {decimalForSymbol} from 'ascii-codes';
import specialNames from 'key-name';

export default (legend, customMappings = {}) => {
  let keyCode = decimalForSymbol(legend);

  if (keyCode === -1) {
    keyCode =  customMappings[legend] || specialNames[legend];
  }

  if (!keyCode) {
    throw new Error(`Cannot find keycode mapping for key ${legend}`);
  }

  return keyCode;
};
