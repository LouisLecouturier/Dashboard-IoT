import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms_Pages/Rooms";
import Devices from "./pages/Devices_Pages/Devices";
import Device from "./pages/Devices_Pages/Device";

import Informations from "./pages/Informations";
import Room from "./pages/Rooms_Pages/Room";
import CreateRoom from "./pages/Rooms_Pages/CreateRoom";
import CreateBox from "./pages/Devices_Pages/CreateDevice/CreateDevice";
import Settings from "./pages/Settings";
import CreateGroup from "./pages/Groups_Pages/CreateGroup";

import { useEffectOnce } from "usehooks-ts";
import { NotificationProvider } from "./contexts/notificationContext";
import { groups, devices, rooms, data_samples, userData } from "./initialData";
import { RefreshProvider } from "./contexts/refreshContext";
import SnackNotification from "./components/shared/Feedback/SnackNotification";
import EditGroup from "./pages/Groups_Pages/EditGroup";
import EditRoom from "./pages/Rooms_Pages/EditRoom";

function App() {
  useEffectOnce(() => {
    if (!localStorage.getItem("groups")) {
      localStorage.setItem("groups", JSON.stringify(groups));
    }
    if (!localStorage.getItem("rooms")) {
      localStorage.setItem("rooms", JSON.stringify(rooms));
    }
    if (!localStorage.getItem("devices")) {
      localStorage.setItem("devices", JSON.stringify(devices));
    }
    if (!localStorage.getItem("userData")) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }

    if (!localStorage.getItem("data_samples")) {
      localStorage.setItem("data_samples", JSON.stringify(data_samples()));
    }
  });

  return (
    <div className="App">
      <NotificationProvider>
        <RefreshProvider>
          <Router>
            <Navbar />

            <div className="page">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/devices" element={<Devices />} />
                <Route
                  path="/devices/:uuid/configure"
                  element={<CreateBox />}
                />
                <Route path="/devices/:uuid" element={<Device />} />
                <Route path="/groups/create" element={<CreateGroup />} />
                <Route path="/groups/:uuid/edit" element={<EditGroup />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route
                  path="/groups/:uuid/rooms/create"
                  element={<CreateRoom />}
                />
                <Route path="/rooms/:uuid" element={<Room />} />
                <Route path="/rooms/:uuid/edit" element={<EditRoom />} />
                <Route path="/informations" element={<Informations />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/*" element={<Dashboard />} />
              </Routes>
            </div>
          </Router>
        </RefreshProvider>
        <SnackNotification />
      </NotificationProvider>
    </div>
  );
}

export default App;
