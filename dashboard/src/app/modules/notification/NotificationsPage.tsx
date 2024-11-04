import { Route, Routes } from "react-router";
import NotificationList from "./notification-list/NotificationList";

const NotificationsPage = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NotificationList />
                    </>
                }
            />
        </Routes>
    );
};

export default NotificationsPage;
