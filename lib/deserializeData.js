class KeyMaker {
  constructor(y = 0) {
    this.keys = [];
    this.x = 0;
    this.y = y;
    this.width = 1;
    this.height = 1;
  }
  update(x, y, width, height) {
    this.x += x || 0;
    this.y += y || 0;
    this.width = width || this.width;
    this.height = height || this.height;
  }

  addKey(legend) {
    this.x += this.width;
    this.keys =
    [ ...this.keys,
      { x: this.x,
        y: this.y + this.height,
        legend
      }
    ];
  }

  mergeKeys(target) {
    this.keys = [...this.keys, ...target.keys];
    return this;
  }
}

export default rows => {
  return rows.reduce((newRows, row) => {
    const [prev, ...rest] = newRows.reverse();

    const keys = row.reduce((maker, key) => {
      if (typeof key === 'string') {
        if (/\(|w|e|i|o/.test(key)) console.log(maker)
        maker.addKey(key);
      } else {
        maker.update(key.x, key.y, key.w, key.height)
      }
      return maker;
    }, prev ? new KeyMaker(prev.y + 1) : new KeyMaker());

    if (prev && Math.floor(prev.y) === Math.floor(keys.y)) {
      return [...rest.reverse(), keys.mergeKeys(prev)];
    } else {
      return [...newRows, keys];
    }
  }, []).map(maker => maker.keys.sort((a,b) => a.x > b.x ? 1 : -1));
};
