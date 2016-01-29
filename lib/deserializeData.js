class KeyMaker {
  constructor(rotationX = 0, y = 0) {
    this.keys = [];
    this.rotationX = rotationX || 0;
    this.x = rotationX || 0;
    this.y = y;
    this.width = 1;
    this.height = 1;
  }
  update(x, rx, y, ry, width, height) {
    this.rotationX = rx || this.rotationX;

    if (rx) {
      this.x = rx + (x || 0);
    } else {
      this.x += x || 0;
    }
    // this.x += (rx || 0 + x || 0);
    this.y += (ry || 0 + y || 0);
    this.width = width || this.width;
    this.height = height || this.height;
  }

  addKey(legend) {
    this.keys =
    [ ...this.keys,
      { x: this.x,
        y: this.y + this.height,
        isRotated: this.rotationX > 0,
        legend
      }
    ];

    this.x += this.width;
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
        maker.addKey(key);
      } else {
        maker.update(key.x, key.rx, key.y, key.ry, key.w, key.h)
      }
      return maker;
    }, prev ? new KeyMaker(prev.rotationX, prev.y + 1) : new KeyMaker());

    if (prev && Math.floor(prev.y) === Math.floor(keys.y)) {
      return [...rest.reverse(), keys.mergeKeys(prev)];
    } else {
      return [...newRows, keys];
    }
  }, []).map(maker => maker.keys.sort((a,b) => a.x > b.x ? 1 : -1));
};
