import { Route, Routes } from "react-router";
import ViewActivite from "./view/ViewActivite";

const ActivitesPage = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <ViewActivite />
                    </>
                }
            />
        </Routes>
    );
};

export default ActivitesPage;
