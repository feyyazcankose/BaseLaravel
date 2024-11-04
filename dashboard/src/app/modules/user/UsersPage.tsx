import { Route, Routes } from "react-router";
import UserList from "./list/UserList";
import AddUser from "./add/AddUser";
import EditUser from "./edit/EditUser";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Link } from "react-router-dom";
import ViewUser from "@app/modules/user/view/ViewUser";

const UsersPage = () => {
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
                            <BreadcrumbItem>Kullanıcılar</BreadcrumbItem>
                        </Breadcrumbs>
                        <UserList />
                    </>
                }
            />
            <Route path="/ekle" element={<AddUser />} />
            <Route path="/duzenle/:id" element={<EditUser />} />
            <Route path="/detay/:id" element={<ViewUser />} />
        </Routes>
    );
};

export default UsersPage;
