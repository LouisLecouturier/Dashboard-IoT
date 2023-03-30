import { GroupType } from "../types/GroupType";
import { RoomType } from "../types/RoomType";
import { DeviceType } from "../types/DeviceType";
import { generateRandomMacAddress } from "./utils/generateRandomMacAddress";
import { DataSampleType } from "../types/DataSampleType";
import { seedData } from "./utils/seedData";
import { CategoryType } from "../types/CategoryType";

export const userData = {
  firstName: "Léa",
  lastName: "Crobate",
  email: "lea.crobate@domain.com",
};

export const groups: GroupType[] = [
  {
    uuid: 1,
    name: "Chambres",
  },
  {
    uuid: 2,
    name: "Pièces de vie",
  },
];

export const rooms: RoomType[] = [
  {
    uuid: 1,
    groupUuid: 1,
    name: "Chambre de Louis",
    color: "#EC7063",
    sampling: true,
  },
  {
    uuid: 2,
    groupUuid: 1,
    name: "Chambre de Marie",
    color: "#F7DC6F",
    sampling: false,
  },
];

export const devices: DeviceType[] = [
  {
    uuid: 1,
    roomUuid: 1,
    name: "Chambre de Louis #1",
    battery: 100,
    sampling: true,
    samplingRate: 1800000,
    macAddress: generateRandomMacAddress(),
  },
  {
    uuid: 2,
    roomUuid: 2,
    name: "Chambre de Marie #1",
    battery: 64,
    sampling: false,
    samplingRate: 1800000,
    macAddress: generateRandomMacAddress(),
  },
  {
    uuid: 3,
    battery: 99,
    sampling: false,
    samplingRate: 1800000,
    macAddress: generateRandomMacAddress(),
  },
  {
    uuid: 4,
    battery: 100,
    sampling: false,
    samplingRate: 1800000,

    macAddress: generateRandomMacAddress(),
  },
  {
    uuid: 5,
    battery: 98,
    sampling: false,
    samplingRate: 1800000,

    macAddress: generateRandomMacAddress(),
  },
];

export const categories: CategoryType[] = [
  {
    name: "temperature",
    displayName: "Température",
    unit: "°C",
  },
  {
    name: "humidity",
    displayName: "Humidité",
    unit: "%",
  },
  {
    name: "light",
    displayName: "Luminosité",
    unit: "Lux",
  },
  {
    name: "sound",
    displayName: "Son",
    unit: "dB",
  },
  {
    name: "gas",
    displayName: "CO2",
    unit: "ppm",
  },
  {
    name: "battery",
    displayName: "Batterie",
    unit: "%",
  },
];

export const data_samples = () => {
  const data: DataSampleType[] = [];
  const today: Date = new Date();

  for (let i = 0; i < 24; i++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      i,
      0,
      0,
      0
    );
    data.push(seedData(date));
  }

  return data;
};
