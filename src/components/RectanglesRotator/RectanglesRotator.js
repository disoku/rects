import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import RectanglesChart from '../RectanglesChart';
import { calculateCoordinates, calculateOutputRectangles, getScreenWidth } from '../../utils/lib';

import { Button, InputNumber, message as antMessage } from 'antd';
import './RectanglesRotator.css';

class RectanglesRotator extends PureComponent {
  constructor() {
    super();
    this.state = {
      count: 3,
      rectangles: []
    }
  }

  setRectanglesCount = (count) => this.setState({ count });

  onGenerateClicked = () => {
    this.props.rectangleStore.generateRectangles(this.state.count);
    this.setState({ chartIdentifier: Math.random()});
    antMessage.success('Rectangles were generated and saved to local storage');
  };

  onDrawGeneratedClicked = () => {
    const rectangles = this.props.rectangleStore.getRectanglesFromLocalStorage();
    if (!rectangles) {
      antMessage.error('Can\'t get rectangles from local storage. Please click Generate button');
      return;
    }
    const rectanglesCoordinates = calculateCoordinates(rectangles);
    this.setState({ rectangles: rectanglesCoordinates, });
  };

  onDrawCalculatedClicked = () => {
    const { rectangles } = this.state;
    const rotatedRectangles = calculateOutputRectangles(rectangles);
    this.props.rectangleStore.saveRotatedRectangles(rotatedRectangles);
    this.setState({ rotatedRectangles });
  };

  render() {
    const { count, rectangles, rotatedRectangles, chartIdentifier } = this.state;

    return (
      <div className='rectangles-rotator'>
        <div className='controls'>
          <InputNumber min={3} max={30} defaultValue={count} size='large' onChange={this.setRectanglesCount}/>
          <Button type='primary' size='large' onClick={this.onGenerateClicked}>
            Generate
          </Button>
          <Button type='primary' size='large' onClick={this.onDrawGeneratedClicked}>
            Draw Generated Rectangles
          </Button>
          <Button type='danger' size='large' onClick={this.onDrawCalculatedClicked}>
            Draw Calculated Rectangles
          </Button>
        </div>
        <RectanglesChart key={chartIdentifier} rectangles={rectangles} width={getScreenWidth()} height={200}/>
        <RectanglesChart key={chartIdentifier + 1} rectangles={rotatedRectangles} width={getScreenWidth()} height={200}/>
      </div>
    );
  }
}


export default inject('rectangleStore')(observer(RectanglesRotator));
