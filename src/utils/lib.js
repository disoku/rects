const getRandomInt = (min = 5, max = 50) => Math.floor(Math.random() * (max - min + 1)) + min;

const getScreenWidth = () => window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

const calculateCoordinates = (data) => {
  const processedData = [{
    ...data[0],
    x: 0,
    y: data[0].height,
  }];

  for (let i = 1; i < data.length; i++) {
    processedData.push({
      ...data[i],
      x: processedData[i - 1].x + data[i - 1].width,
      y: data[i].height,
    });
  }

  return processedData;
};

const calculateOutputRectangles = (data) => {
  const dataWithIndexes = data.map((d, i) => ({
    ...d,
    startPosition: i,
    subHeights: []
  }));

  const sortedData = [...dataWithIndexes].sort((a, b) => a.height - b.height);
  sortedData.forEach(d => {
    for (let i = d.startPosition + 1; dataWithIndexes[i] && dataWithIndexes[i].height > d.height; i++) {
      dataWithIndexes[i].subHeights.push(d.height)
    }
    for (let i = d.startPosition - 1; dataWithIndexes[i] && dataWithIndexes[i].height > d.height; i--) {
      dataWithIndexes[i].subHeights.push(d.height)
    }
  });

  const outputRectangles = [];
  dataWithIndexes.forEach(d => {
    if (d.subHeights.length === 0) {
      outputRectangles.push(d);
      return;
    }
    outputRectangles.push({
      x: d.x,
      y: d.subHeights[0],
      height: d.subHeights[0],
      width: d.width
    });
    for (let i = 1; i < d.subHeights.length; i++) {
      outputRectangles.push({
        x: d.x,
        y: outputRectangles[outputRectangles.length - 1].y + d.subHeights[i] - d.subHeights[i - 1],
        height: d.subHeights[i] - d.subHeights[i - 1],
        width: d.width
      });
    }
    outputRectangles.push({
      x: d.x,
      y: outputRectangles[outputRectangles.length - 1].y + d.height - outputRectangles[outputRectangles.length - 1].y,
      height: d.height - d.subHeights[d.subHeights.length - 1],
      width: d.width
    });
  });

  return removeVerticalLines(outputRectangles);
};

const removeVerticalLines = (outputRectangles) => {
  const result =[...outputRectangles];
  for (let i = 0; i - 1 < result.length; i++) {
    for (let j = i + 1; j < result.length; j++) {
      if (needJoin(result[i], result[j])) {
        result[i].width += result[j].width;
        result.splice(j, 1);
        j--;
      }
    }
  }

  return result;
};

const needJoin = (rect1, rect2) => rect1.y === rect2.y
  && rect1.height === rect2.height
  && rect1.width + rect1.x === rect2.x ;

export {
  calculateCoordinates,
  calculateOutputRectangles,
  getRandomInt,
  getScreenWidth
};
