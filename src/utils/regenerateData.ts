import { data_samples, devices, groups, rooms, userData } from "../initialData";

export const regenerateData = (): boolean => {
  try {
    localStorage.clear();
    localStorage.setItem("groups", JSON.stringify(groups));
    localStorage.setItem("rooms", JSON.stringify(rooms));
    localStorage.setItem("devices", JSON.stringify(devices));
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("data_samples", JSON.stringify(data_samples()));

    window.scrollTo(0, 0);

    return true;
  } catch (error) {
    return false;
  }
};
