const invertedObj = { a: "some", b: "object", c: 1 };

const invert = (obj) => {
  const newInvObj = {};
  Object.keys(obj).map((key) => (newInvObj[obj[key]] = key));
  return newInvObj;
};

console.log(invert(invertedObj));
