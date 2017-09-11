import splitKeys from './splitKeys';
import getKeyCode from './getKeyCode';
import {maxBy} from 'lodash';

export default (keys, layer, specialMappings) => {
  const [left, right] = splitKeys(keys);
  const getRow = key => key.isRotated ? 4 : Math.floor(key.y) - 1;
  const getType = keyCode => keyCode === 1 ? 1 : 0;
  return [
    ...left.map((key, index) => {
      const keyCode = getKeyCode(key.legend, specialMappings);
      return `uniqueksetkey(${Math.floor(key.x)}(${getRow(key)}(${layer}(${keyCode.code}(${keyCode.type}`
    }),
    ...right.map((key, index) => {
      const thisRow = right.filter(ikey => getRow(ikey) === getRow(key));
      const maxX = Math.floor(maxBy(thisRow, 'x').x);
      const keyCode = getKeyCode(key.legend, specialMappings);
      const col = maxX - Math.floor(key.x); // Right hand goes right-to-left
      return `uniqueksetsubkey(${col}(${getRow(key)}(${layer}(${keyCode.code}(${keyCode.type}`;
    })

  ]
}
