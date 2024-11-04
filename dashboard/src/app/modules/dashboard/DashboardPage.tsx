import { Route, Routes } from "react-router";

const DashboardPage = () => {
    return (
        <Routes>
            <Route path="/" element={<>Dashboard</>}></Route>
        </Routes>
    );
};

export default DashboardPage;
