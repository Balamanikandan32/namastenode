require("./sample");

function sum(a, b) {
  const result = a + b;
  return result;
}

const samplefunction = async () => {
  // const await Promise.resolved(20)
  //   const sample = await new Promise((resolve) => setTimeout(resolve, 5000));
  return "bala";
};

samplefunction();

console.log("module evaluated");

module.exports.sum = sum;
