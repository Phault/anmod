import { Dimensions, ScaledSize } from 'react-native';
import { observable, action } from 'mobx';

export enum Orientation {
  portrait,
  landscape
}

const dimensions = observable({
  width: 0,
  height: 0,

  get orientation() {
    return this.width < this.height
      ? Orientation.portrait
      : Orientation.landscape;
  }
});

const setDimensions = action((size: ScaledSize) => {
  dimensions.width = size.width;
  dimensions.height = size.height;
});

Dimensions.addEventListener('change', ({ window }) => setDimensions(window));

setDimensions(Dimensions.get('window'));

export default dimensions;
