import { DataSampleType } from "../../types/DataSampleType";

const generateRandomTemperature = (): number => {
  return Math.random() * 24;
};

const generateRandomHumidity = (): number => {
  return Math.random() * 100;
};

const generateRandomLight = (): number => {
  return Math.random() * 1000;
};

const generateRandomSound = (): number => {
  return Math.random() * 76;
};

const generateRandomCo2 = (): number => {
  return Math.random() * 70;
};

export const seedData = (date: Date): DataSampleType => {
  return {
    uuid: date.getHours(),
    temperature: generateRandomTemperature(),
    humidity: generateRandomHumidity(),
    light: generateRandomLight(),
    sound: generateRandomSound(),
    gas: generateRandomCo2(),
    battery: 98 - date.getHours() * 0.5,
    timestamp: date,
  };
};
