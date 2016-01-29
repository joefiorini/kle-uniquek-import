import {groupBy, maxBy} from 'lodash';

export default keys => {
  console.log(keys)
  const midX = maxBy(keys, 'x').x / 2;
  console.log('midx:', midX)
  return Object.values(groupBy(keys, key => key.x < midX));
}
