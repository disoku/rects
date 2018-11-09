import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class RectanglesChart extends PureComponent {
  componentDidMount() {
    this.svg = d3.select(this.domContainer)
      .append('svg')
      .attr('width', this.props.width)
      .attr('height', this.props.height)
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    const { rectangles, width, height, margin } = this.props;
    const polygonWidth = rectangles.reduce((acc, rect) => Math.max(rect.x + rect.width, acc), 0);
    const scaleX = d3.scaleLinear()
      .domain([0, polygonWidth])
      .range([0, width - margin.left - margin.right]);

    const polygonHeight = Math.max(...rectangles.map(d => d.y));
    const scaleY = d3.scaleLinear()
      .domain([0, polygonHeight])
      .range([0, height - margin.top - margin.bottom]);

    this.svg.selectAll('rect')
      .data(rectangles)
      .enter()
      .append('rect')
      .attr('x', (rect) => scaleX(rect.x))
      .attr('y', (rect) => height - scaleY(rect.y))
      .attr('width', (rect) => scaleX(rect.width))
      .attr('height', (rect) => scaleY(rect.height))
      .attr('fill', '#FFFFFF')
      .attr('stroke', '#000000')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  }

  render() {
    return <div id={'#' + this.props.id} ref={el => this.domContainer = el}/>
  }
}

RectanglesChart.propTypes = {
  rectangles: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  })),
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  })
};

RectanglesChart.defaultProps = {
  margin: {
    top: 0,
    right: 10,
    bottom: 10,
    left: 10
  }
};

export default RectanglesChart;
