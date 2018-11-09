import RectangleStore from './stores/RectangleStore';

class RootStore {
    constructor(initialState = {}) {
        this.rectangleStore = new RectangleStore(this, initialState.rectangleStore || {});
    }
}

export default RootStore;
