import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./CompaniesDropdown";
import { CollapseItems } from "./CollapseItems";
import { useSidebarContext } from "@base/layout/contexts/LayoutContext";
import { SidebarItem } from "./SidebarItem";
import { SidebarMenu } from "./SidebarMenu";
import { sidebarData } from "./sidebar.data";
import { User } from "@nextui-org/react";
import { useAuth } from "@app/modules/auth/core/contexts/AuthContext";
import {
    hasPermission,
    hasPermissionMany,
} from "@base/helpers/permissions/permission.helper";

export const SidebarWrapper = () => {
    const { collapsed, setCollapsed } = useSidebarContext();
    const { currentUser } = useAuth();

    return (
        <aside className="h-screen z-50 sticky top-0 ">
            {collapsed ? (
                <button
                    className={Sidebar.Overlay()}
                    tabIndex={0}
                    onClick={setCollapsed}
                />
            ) : null}
            <div
                className={Sidebar({
                    collapsed: collapsed,
                    className: "fancy-scrollbar",
                })}
            >
                <div className={Sidebar.Header()}>
                    <CompaniesDropdown />
                </div>
                <div className="flex flex-col justify-between h-full">
                    <div className={Sidebar.Body()}>
                        {sidebarData.map((item) => {
                            if (
                                item.type === "single" &&
                                hasPermission(item.roles)
                            ) {
                                return (
                                    <SidebarItem
                                        key={item.id}
                                        title={item.title}
                                        icon={item.icon}
                                        to={item.to}
                                    />
                                );
                            } else if (
                                item.type === "collapse" &&
                                hasPermissionMany(item?.roles)
                            ) {
                                return (
                                    <CollapseItems
                                        key={item.id}
                                        icon={item.icon}
                                        items={item.items}
                                        title={item.title}
                                    />
                                );
                            } else if (hasPermission(item?.roles)) {
                                return (
                                    <SidebarMenu
                                        key={item.id}
                                        title={item.title}
                                    >
                                        {item?.items?.map((subItem) => {
                                            if (
                                                subItem.type === "single" &&
                                                hasPermission(subItem.roles)
                                            ) {
                                                return (
                                                    <SidebarItem
                                                        key={subItem.id}
                                                        title={subItem.title}
                                                        icon={subItem.icon}
                                                        to={subItem.to}
                                                    />
                                                );
                                            } else if (
                                                subItem.type === "collapse"
                                            ) {
                                                return (
                                                    <CollapseItems
                                                        key={subItem.id}
                                                        icon={subItem.icon}
                                                        items={subItem.items}
                                                        title={subItem.title}
                                                    />
                                                );
                                            }
                                        })}
                                    </SidebarMenu>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
            <div className={Sidebar.Footer()}>
                <User
                    name={currentUser?.data.name}
                    description={currentUser?.data.email}
                    avatarProps={{
                        name: currentUser?.data.name.charAt(0),
                        color: "success",
                    }}
                />
            </div>
        </aside>
    );
};
