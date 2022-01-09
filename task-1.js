const inputArray = [3.6, 3.7, 6.4, 8.9];

const groupBy = (array, func) => {
  return array.reduce((obj, data) => {
    const key = func(data);
    obj[key] = obj[key] || [];
    obj[key].push(data);
    return obj;
  }, {});
};

groupBy(inputArray, Math.floor);
