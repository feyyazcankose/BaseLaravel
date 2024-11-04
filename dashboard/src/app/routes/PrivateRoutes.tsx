import SuspensedView from "@app/core/components/SuspendedView";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import FeedbacksPage from "@app/modules/feedback/FeedbacksPage";

const PrivateRoutes = () => {
    // These components are lazy-loaded, meaning that they will be loaded on demand
    const DashboardPage = React.lazy(
        () => import("@app/modules/dashboard/DashboardPage")
    );
    const ProfilePage = React.lazy(
        () => import("@app/modules/profile/ProfilePage")
    );

    const AdminPage = React.lazy(() => import("@app/modules/admin/AdminsPage"));
    const NotificationsPage = React.lazy(
        () => import("@app/modules/notification/NotificationsPage")
    );

    const ActivitePage = React.lazy(
        () => import("@app/modules/activite/ActivitePage")
    );

    const UsersPage = React.lazy(() => import("@app/modules/user/UsersPage"));

    return (
        <Routes>
            <Route path="auth/*" element={<Navigate to="/" />} />
            <Route
                path="anasayfa/*"
                element={
                    <SuspensedView>
                        <DashboardPage />
                    </SuspensedView>
                }
            />
            <Route
                path="yoneticiler/*"
                element={
                    <SuspensedView>
                        <AdminPage />
                    </SuspensedView>
                }
            />
            <Route
                path="aktiviteler/*"
                element={
                    <SuspensedView>
                        <ActivitePage />
                    </SuspensedView>
                }
            />
            <Route
                path="kullanicilar/*"
                element={
                    <SuspensedView>
                        <UsersPage />
                    </SuspensedView>
                }
            />
            <Route
                path="bildirimler/*"
                element={
                    <SuspensedView>
                        <NotificationsPage />
                    </SuspensedView>
                }
            />
            <Route
                path="geri-bildirimler/*"
                element={
                    <SuspensedView>
                        <FeedbacksPage />
                    </SuspensedView>
                }
            />
            <Route
                path="hesabim/*"
                element={
                    <SuspensedView>
                        <ProfilePage />
                    </SuspensedView>
                }
            />

            {/* Page Not Found */}
            <Route path="*" element={<Navigate to="/error/404" />} />
        </Routes>
    );
};

export { PrivateRoutes };
