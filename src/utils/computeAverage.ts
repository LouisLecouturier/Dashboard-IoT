export const computeAverage = (arr: any[]) : number => {
  return arr.reduce((a, b) => parseInt(a) + parseInt(b), 0) / arr.length;
};
