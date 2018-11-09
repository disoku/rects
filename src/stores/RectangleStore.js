import store from 'store';
import { getRandomInt } from '../utils/lib'
import { LOCAL_STORAGE_KEYS } from '../utils/constants'

class RectangleStore {
  rectangles = [];

  constructor(rootStore, initialState) {
    this.fileHash = initialState.fileHash || null;
  }

  generateRectangles(number) {
    const rectangles = [];
    for (let i = 0; i < number; i++) {
      rectangles.push({
        width: getRandomInt(),
        height: getRandomInt()
      })
    }

    this.rectangles = rectangles;
    store.set(LOCAL_STORAGE_KEYS.RECTANGLES, rectangles);
  }

  getRectanglesFromLocalStorage() {
    return store.get(LOCAL_STORAGE_KEYS.RECTANGLES);
  }

  saveRotatedRectangles(rectangles) {
    store.set(LOCAL_STORAGE_KEYS.ROTATED_RECTANGLES, rectangles);
  }

}

export default RectangleStore
