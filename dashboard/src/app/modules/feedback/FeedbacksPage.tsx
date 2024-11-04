import { Route, Routes } from "react-router";
import FeedbackList from "./list/FeedbackList";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Link } from "react-router-dom";

const FeedbacksPage = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <Breadcrumbs className="mb-5">
                            <BreadcrumbItem>
                                <Link to="/anasayfa">Ana Sayfa</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>Geri Bildirimler</BreadcrumbItem>
                        </Breadcrumbs>
                        <FeedbackList />
                    </>
                }
            />
        </Routes>
    );
};

export default FeedbacksPage;
