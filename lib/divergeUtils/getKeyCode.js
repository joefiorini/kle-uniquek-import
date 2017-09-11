import {decimalForSymbol, symbolForDecimal} from 'ascii-codes';
import specialNames from 'key-name';

function buildScanCodeMap() {
  const map = {};

  // letters
  for (let i = decimalForSymbol('a'); i <= decimalForSymbol('z'); i++) {
    map[symbolForDecimal(i)] = i - 93;
  }

  // numbers
  for (let j = decimalForSymbol('1'); j <= decimalForSymbol('9'); j++) {
    map[symbolForDecimal(j)] = j - 19;
  }
  map['0'] = 39;

  const SHIFT = 500;
  // some symbols
  map['-'] = 45;
  map['='] = 46;
  map['+'] = { code: 46, type: 11 };
  map['!'] = { code: map['1'], type: 11 };
  map['@'] = { code: map['2'], type: 11 };
  map['#'] = { code: map['3'], type: 11 };
  map['$'] = { code: map['4'], type: 11 };
  map['%'] = { code: map['5'], type: 11 };
  map['^'] = { code: map['6'], type: 11 };
  map['&'] = { code: map['7'], type: 11 };
  map['*'] = { code: map['8'], type: 11 };
  map['('] = { code: map['9'], type: 11 };
  map[')'] = { code: map['0'], type: 11 };
  map['\\'] = 49;
  map['|'] = 2949;
  map['\''] = 52;
  map['"'] = { code: map['\''], type: 11 };
  map['`'] = 53;
  map['~'] = { code: 53, type: 11 };
  map[','] = 54;
  map['<'] = { code: 54, type: 11 };
  map['.'] = 55;
  map['>'] = { code: 55, type: 11 };
  map['['] = 47;
  map['{'] = { code: 47, type: 11 };
  map[']'] = 48;
  map['}'] = { code: 48, type: 11 };
  map['/'] = 56;
  map['?'] = { code: 56, type: 11 };
  map[';'] = 51;
  map[':'] = { code: 51, type: 11 };
  map['space'] = 44;

  return map;
}

export default (legend, customMappings = {}) => {
  const map  = buildScanCodeMap();
  let keyCode = map[legend];

  if (!keyCode) {
    keyCode =  customMappings[legend] || specialNames[legend];
  }

  if (!keyCode) {
    throw new Error(`Cannot find keycode mapping for key ${legend}`);
  }

  if (!keyCode.code) {
    keyCode = { code: keyCode, type: 0 };
  }

  return keyCode;
};
