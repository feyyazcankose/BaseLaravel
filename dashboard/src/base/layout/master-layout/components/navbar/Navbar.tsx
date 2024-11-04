import { Navbar, NavbarContent } from "@nextui-org/react";
import React, { useEffect } from "react";
import { BurguerButton } from "./BurgerButton";
import { UserDropdown } from "./UserDropdown";
import RouteSearcher from "./RouteSearcher";
import { useFormContext } from "@base/context/FormContext";
import { useLocation } from "react-router-dom";
import { NavbarFormSubmit } from "@base/layout/master-layout/components/navbar/NavbarFormSubmit";
// import NotificationPopup from "@app/modules/notification/partials/NotificationPopup";

interface Props {
    children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
    const { handleSubmit, clearHandleSubmit } = useFormContext();
    const location = useLocation();

    useEffect(() => {
        const { pathname } = location;
        if (!pathname.includes("ekle") && !pathname.includes("duzenle")) {
            clearHandleSubmit();
        }
    }, [location]);

    return (
        <div className="sticky top-0 z-40 flex flex-col flex-1 w-[calc(100vw-16rem)]">
            <Navbar
                className="w-full"
                classNames={{
                    wrapper: "w-full max-w-full border-b border-default-100 ",
                }}
            >
                <NavbarContent className="md:hidden">
                    <BurguerButton />
                </NavbarContent>
                <NavbarContent
                    justify="center"
                    className="w-full flex items-center"
                >
                    {handleSubmit ? <NavbarFormSubmit /> : <RouteSearcher />}
                </NavbarContent>

                <NavbarContent
                    justify="end"
                    className="w-fit data-[justify=end]:flex-grow-0"
                >
                    {/* <NotificationPopup></NotificationPopup> */}
                    <NavbarContent>
                        <UserDropdown />
                    </NavbarContent>
                </NavbarContent>
            </Navbar>
            {children}
        </div>
    );
};
