export const getSecondsFromMillis = (time: number): number => {
  return Math.floor(time / 1000) % 60
};

export const getMinutesFromMillis = (time: number): number => {
  return Math.floor(time / 60000) % 60;
};

export const getHoursFromMillis = (time: number): number => {
  return Math.floor(time / 3600000);
};
