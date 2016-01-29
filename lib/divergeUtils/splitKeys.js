import {groupBy, maxBy} from 'lodash';

export default keys => {
  const midX = maxBy(keys, 'x').x / 2;
  return Object.values(groupBy(keys, key => key.x < midX));
}
