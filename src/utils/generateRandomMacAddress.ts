export const generateRandomMacAddress = (): string => {
  const macAddress = [];
  for (let i = 0; i < 6; i++) {
    macAddress.push(Math.floor(Math.random() * 255).toString(16));
  }
  return macAddress.join(":").toUpperCase();
};
