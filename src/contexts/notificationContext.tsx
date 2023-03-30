import React, { createContext, useState, ReactNode } from "react";
import { NotificationType } from "../../types/NotificationType";

type NotificationContextType = {
  notification: NotificationType | null;
  setNotification: (value: NotificationType) => void;
};

export const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  setNotification: (value: NotificationType) => {},
});

export default NotificationContext;

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
