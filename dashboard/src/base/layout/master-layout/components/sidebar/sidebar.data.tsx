import { Icon } from "@iconify/react/dist/iconify.js";
import {
    ICollapseItem,
    ISidebarItem,
    ISidebarMenu,
} from "./sidebar.interfaces";
import { ERole } from "@base/enums/role.enum";

export const sidebarData: (ISidebarItem | ICollapseItem | ISidebarMenu)[] = [
    {
        id: "home",
        title: "Ana Sayfa",
        type: "single",
        icon: (
            <Icon
                icon="humbleicons:dashboard"
                width="1rem"
                height="1rem"
                className="text-black dark:text-gray-200"
            />
        ),
        to: "/anasayfa",
        roles: `${ERole.Public}`,
    } as ISidebarItem,
    {
        roles: ERole.Public,
        title: "Modüller",
        items: [
            {
                id: "project",
                icon: (
                    <Icon
                        icon="lets-icons:form"
                        width="1rem"
                        height="1rem"
                        className="text-black dark:text-gray-200"
                    />
                ),
                title: "Projeler",
                to: "/projeler",
                type: "single",
                roles: `${ERole.PROJECT_VIEW}`,
            } as ISidebarItem,
            {
                icon: (
                    <Icon
                        icon="tabler:users"
                        width="1rem"
                        height="1rem"
                        className="text-black dark:text-gray-200"
                    />
                ),
                title: "Hesaplar",
                type: "collapse",
                id: "",
                roles: `${ERole.ADMIN_VIEW},${ERole.USER_VIEW},${ERole.COMPANY_VIEW}`,
                items: [
                    // {
                    //     title: "Kullanıcılar",
                    //     type: "collapse",
                    //     to: "/kullanicilar",
                    //     roles: `${ERole.USER_VIEW}`,
                    // },
                    {
                        title: "Yöneticiler",
                        type: "collapse",
                        to: "/yoneticiler",
                        roles: `${ERole.ADMIN_VIEW}`,
                    },
                ],
            } as ICollapseItem,

            // {
            //     icon: (
            //         <Icon
            //             icon="bx:brush"
            //             width="1rem"
            //             height="1rem"
            //             className="text-black dark:text-gray-200"
            //         />
            //     ),
            //     title: "İçerikler",
            //     type: "collapse",
            //     id: "",
            //     roles: `${ERole.CATEGORY_VIEW},${ERole.SLIDER_VIEW}`,
            //     items: [
            //         {
            //             id: "category",
            //             title: "Kategoriler",
            //             to: "/kategoriler",
            //             type: "collapse",
            //             roles: `${ERole.CATEGORY_VIEW}`,
            //         },
            //         {
            //             id: "slider",
            //             title: "Kayan İçerikler",
            //             to: "/sliderlar",
            //             type: "collapse",
            //             roles: `${ERole.SLIDER_VIEW}`,
            //         },
            //         {
            //             id: "file-mananer",
            //             icon: (
            //                 <Icon
            //                     icon="hugeicons:folder-03"
            //                     width="1rem"
            //                     height="1rem"
            //                     className="text-black dark:text-gray-200"
            //                 />
            //             ),
            //             title: "Dosyalar",
            //             to: "/dosya-yoneticisi",
            //             type: "single",
            //             roles: `${ERole.ADMIN_VIEW}`,
            //         } as ISidebarItem,
            //     ],
            // } as ICollapseItem,
        ],
    } as ISidebarMenu,
    // {
    //     roles: ERole.Public,
    //     title: "İstekler",
    //     items: [
    //         {
    //             id: "feedback",
    //             icon: (
    //                 <Icon
    //                     icon="uil:feedback"
    //                     width="1rem"
    //                     height="1rem"
    //                     className="text-black dark:text-gray-200"
    //                 />
    //             ),
    //             title: "Geri Bildirimler",
    //             to: "/geri-bildirimler",
    //             type: "single",
    //             roles: `${ERole.FEEDBACK_VIEW}`,
    //         } as ISidebarItem,
    //         {
    //             id: "award",
    //             icon: (
    //                 <Icon
    //                     icon="fluent:gift-20-regular"
    //                     width="1rem"
    //                     height="1rem"
    //                     className="text-black dark:text-gray-200"
    //                 />
    //             ),
    //             title: "Hediye İstekleri",
    //             to: "/hediye-istekleri",
    //             type: "single",
    //             roles: `${ERole.FEEDBACK_VIEW}`,
    //         } as ISidebarItem,
    //         {
    //             id: "history",
    //             icon: (
    //                 <Icon
    //                     icon="tabler:clock-hour-2"
    //                     width="1rem"
    //                     height="1rem"
    //                     className="text-black dark:text-gray-200"
    //                 />
    //             ),
    //             title: "Aktiviteler",
    //             to: "/aktiviteler",
    //             type: "single",
    //             roles: `${ERole.USER_VIEW}`,
    //         } as ISidebarItem,
    //     ],
    // } as ISidebarMenu,
];
