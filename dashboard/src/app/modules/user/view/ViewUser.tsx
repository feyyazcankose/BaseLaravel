/* eslint-disable @typescript-eslint/no-unused-vars */
import { changeStatus, getDetailUser } from "../core/api/user.request";
import {
    Avatar,
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Tab,
    Tabs,
    Tooltip,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { FetchStatus } from "@base/enums/api.enum";
import Loader from "@base/layout/components/loader/Loader";
import { IUserDetail } from "@app/modules/user/core/models/user.interface";
import moment from "moment";
import {
    Link,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProjectList from "@app/modules/user/view/components/ProjectList";
import { swal } from "@base/components/common/swal/SwalAlert";
import toast from "react-hot-toast";
import NotificationAddModal from "@app/modules/user/view/components/NotificationAddModal";
import NotificationList from "./components/partial/NotificationList";

const ViewUser = () => {
    const { id: userId } = useParams();
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = React.useState<IUserDetail | null>(
        null
    );
    const [action, setAction] = React.useState<string>("");
    const [isOpenNotificationList, setIsOpenNotificationList] =
        React.useState<boolean>(false);

    const [isOpenNotificationAdd, setIsOpenNotificationAdd] =
        React.useState<boolean>(false);

    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
        FetchStatus.IDLE
    );

    const [_, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        setSearchParams({});
    }, [isOpenNotificationList]);

    useEffect(() => {
        if (userId) {
            setFetchStatus(FetchStatus.LOADING);
            getDetailUser(parseInt(userId)).then((res) => {
                setUserDetail(res);
                setFetchStatus(FetchStatus.SUCCEEDED);
            });
        }
    }, [userId, action]);

    const changeUserStatus = () => {
        swal.fire({
            title: `Kullanıcıyı ${
                userDetail?.user.is_blocked ? "aktifleştirmek" : "engellemek"
            } istedeğinizden emin misiniz`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Evet",
            cancelButtonText: "Hayır",
        }).then((result) => {
            if (result.isConfirmed) {
                changeStatus(parseInt(userId ?? "0")).then(() => {
                    toast.success("Kullanıcı güncellendi");
                    setAction(`${new Date().getTime()}`);
                });
            }
        });
    };

    if (fetchStatus !== FetchStatus.SUCCEEDED) return <Loader />;

    return (
        <div>
            <div className="flex gap-1 items-center mb-8">
                <Link
                    to="/kullanicilar"
                    className="hover:bg-[#d4d4d4] p-2 rounded-lg cursor-pointer"
                >
                    <Icon icon="ph:arrow-left-bold" />
                </Link>
                <h2 className="text-[1.25rem] font-bold">
                    Kullanıcı Görüntüleme
                </h2>
            </div>
            <div className="pb-10 grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="lg:col-span-4 md:col-span-12 col-span-12">
                    {userDetail ? (
                        <Card className="w-full shadow-sm " shadow="none">
                            <CardBody className="flex flex-col gap-3">
                                <div className="flex flex-col items-center rounded-none  mt-5 px-2">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="flex flex-col items-center">
                                            <div className="flex flex-col items-center text-2xl font-medium text-zinc-800">
                                                <Badge
                                                    content=""
                                                    color={
                                                        userDetail.user
                                                            .is_blocked
                                                            ? "danger"
                                                            : "success"
                                                    }
                                                    shape="rectangle"
                                                >
                                                    <Avatar
                                                        as="button"
                                                        color="primary"
                                                        name={
                                                            userDetail.user?.name?.charAt(
                                                                0
                                                            ) ??
                                                            "" +
                                                                userDetail.user?.name
                                                                    .split(
                                                                        " "
                                                                    )?.[1]
                                                                    ?.charAt(
                                                                        0
                                                                    ) ??
                                                            ""
                                                        }
                                                        src={
                                                            userDetail.user
                                                                .image
                                                                ? userDetail
                                                                      .user
                                                                      .image
                                                                : undefined
                                                        }
                                                        showFallback
                                                        size="lg"
                                                    />
                                                </Badge>
                                                <div className="mt-3 dark:text-gray-400">
                                                    {userDetail.user.name}{" "}
                                                    {userDetail.user.surname}
                                                </div>
                                            </div>
                                            <div className="mt-1 text-sm text-gray-500">
                                                {userDetail.user.email}{" "}
                                            </div>
                                        </div>
                                        <div className="flex gap-0 items-start mt-4">
                                            <div className="flex flex-col justify-center px-4 py-2 whitespace-nowrap rounded-r-none rounded-lg border border-r-0 border-gray-300 dark:border-content4 border-solid">
                                                <div className="flex flex-col items-center">
                                                    <div className="text-sm text-gray-500">
                                                        Toplam Proje
                                                    </div>
                                                    <div className="mt-1 text-base font-medium text-zinc-800 dark:text-gray-400">
                                                        {
                                                            userDetail.total_projects
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center px-4 py-2 rounded-l-none rounded-lg border border-gray-300 dark:border-content4 border-solid">
                                                <div className="flex flex-col items-center">
                                                    <div className="text-sm text-gray-500">
                                                        Tamamlanan
                                                    </div>
                                                    <div className="mt-1 text-base font-medium text-zinc-800 dark:text-gray-400">
                                                        {
                                                            userDetail.total_completed_projects
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col self-stretch mt-5 w-full text-zinc-800">
                                        <div className="flex flex-col w-full">
                                            <div className="flex flex-col w-full text-base whitespace-nowrap">
                                                <div className="gap-0.5 self-start dark:text-gray-300">
                                                    Bilgiler
                                                </div>
                                                <Divider className="h-[0.1px] mt-4 dark:bg-content4"></Divider>
                                            </div>
                                            <div className="flex gap-2 flex-col items-start  mt-4 text-xs font-medium leading-none">
                                                <div className="w-full text-sm flex justify-between">
                                                    <p className="dark:text-gray-400">
                                                        Oluşturulma tarihi
                                                    </p>
                                                    <p className="font-bold dark:text-gray-300">
                                                        {moment(
                                                            userDetail.user
                                                                .created_at
                                                        ).format(
                                                            "DD MMMM YYYY"
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="w-full text-sm flex items-center justify-between">
                                                    <p className="dark:text-gray-400">
                                                        Toplam Geçirilen Zaman
                                                    </p>
                                                    <p className="font-bold dark:text-gray-300">
                                                        {userDetail.total_hours.toFixed(
                                                            2
                                                        )}{" "}
                                                        Saat
                                                    </p>
                                                </div>

                                                <div className="w-full text-sm flex items-center justify-between">
                                                    <p className="dark:text-gray-400">
                                                        Sıralama Değeri
                                                    </p>
                                                    <p className="font-bold dark:text-gray-300">
                                                        {userDetail.rank}. Sıra
                                                    </p>
                                                </div>

                                                <div className="w-full text-sm flex items-center justify-between">
                                                    <p className="dark:text-gray-400">
                                                        Toplam Cevap
                                                    </p>
                                                    <p className="font-bold dark:text-gray-300">
                                                        {
                                                            userDetail.total_answer
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col self-stretch mt-5 w-full text-zinc-800">
                                        <div className="flex flex-col w-full">
                                            <div className="flex flex-col w-full text-base whitespace-nowrap">
                                                <div className="gap-0.5 self-start dark:text-gray-300">
                                                    İşlemler
                                                </div>
                                                <Divider className="h-[0.1px] mt-4 dark:bg-content4"></Divider>
                                            </div>
                                            <div className="flex gap-2 items-start self-start mt-4 text-xs font-medium leading-none">
                                                <div className="flex flex-col min-w-[240px]">
                                                    <div className="flex gap-2 items-start overflow-x-auto whitespace-nowrap">
                                                        <Button
                                                            variant="bordered"
                                                            onPress={
                                                                changeUserStatus
                                                            }
                                                            size="sm"
                                                        >
                                                            <Icon
                                                                icon={
                                                                    userDetail
                                                                        .user
                                                                        .is_blocked
                                                                        ? "icon-park-outline:check-one"
                                                                        : "basil:user-block-outline"
                                                                }
                                                                className="hidden sm:block"
                                                            />
                                                            <div className="self-stretch my-auto">
                                                                {userDetail.user
                                                                    .is_blocked
                                                                    ? "Aktifleştir"
                                                                    : "Engelle"}
                                                            </div>
                                                        </Button>
                                                        <Button
                                                            variant="bordered"
                                                            onClick={() => {
                                                                setIsOpenNotificationList(
                                                                    !isOpenNotificationList
                                                                );
                                                            }}
                                                            size="sm"
                                                        >
                                                            <Icon
                                                                icon="mingcute:notification-line"
                                                                className="hidden sm:block"
                                                            />
                                                            <div className="self-stretch my-auto">
                                                                Bildirimleri{" "}
                                                                {isOpenNotificationList
                                                                    ? "kapat"
                                                                    : "aç"}
                                                            </div>
                                                        </Button>
                                                        <Dropdown size="sm">
                                                            <DropdownTrigger>
                                                                <Button
                                                                    variant="bordered"
                                                                    size="sm"
                                                                >
                                                                    <Icon
                                                                        icon="humbleicons:dots-horizontal"
                                                                        className="hidden sm:block"
                                                                    />
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu aria-label="Link Actions">
                                                                <DropdownItem
                                                                    key="home"
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/kullanicilar/duzenle/${userId}`
                                                                        )
                                                                    }
                                                                >
                                                                    Düzenle
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    key="about"
                                                                    onClick={() => {
                                                                        const users =
                                                                            JSON.stringify(
                                                                                [
                                                                                    {
                                                                                        id: userDetail
                                                                                            .user
                                                                                            .id,
                                                                                        name: userDetail
                                                                                            .user
                                                                                            .name,
                                                                                        surname:
                                                                                            userDetail
                                                                                                .user
                                                                                                .surname,
                                                                                    },
                                                                                ]
                                                                            );

                                                                        navigate(
                                                                            `/aktiviteler?users=${users}`
                                                                        );
                                                                    }}
                                                                >
                                                                    Aktiviteleri
                                                                    Gör
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {userDetail?.user?.devices?.length ? (
                                        <div className="flex flex-col self-stretch mt-5 w-full text-zinc-800">
                                            <div className="flex flex-col w-full">
                                                <div className="flex flex-col w-full text-base whitespace-nowrap">
                                                    <div className="gap-0.5 self-start dark:text-gray-300">
                                                        Cihaz Bilgileri
                                                    </div>
                                                    <Divider className="h-[0.1px] mt-4 mb-2 dark:bg-content4"></Divider>
                                                </div>
                                                <Tabs
                                                    aria-label="Devices"
                                                    variant="light"
                                                    color="secondary"
                                                >
                                                    {userDetail?.user?.devices?.map(
                                                        (device) => (
                                                            <Tab
                                                                key={device.id}
                                                                title={
                                                                    device.device_model ??
                                                                    device.os_type ??
                                                                    device.os_version
                                                                }
                                                            >
                                                                <div className="flex gap-2 flex-col items-start  mt-4 text-xs font-medium leading-none">
                                                                    <div className="w-full text-sm flex justify-between">
                                                                        <p className="dark:text-gray-400">
                                                                            Cihaz
                                                                            ID
                                                                        </p>
                                                                        <p className="font-bold dark:text-gray-300">
                                                                            {device?.device_id ??
                                                                                "-"}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2 flex-col items-start  mt-4 text-xs font-medium leading-none">
                                                                    <div className="w-full text-sm flex justify-between">
                                                                        <p className="dark:text-gray-400">
                                                                            Son
                                                                            aktivite
                                                                        </p>
                                                                        <p className="font-bold dark:text-gray-300">
                                                                            {device?.updated_at
                                                                                ? moment(
                                                                                      device.updated_at
                                                                                  ).format(
                                                                                      "DD MMMM YYYY HH:mm"
                                                                                  )
                                                                                : "-"}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2 flex-col items-start  mt-4 text-xs font-medium leading-none">
                                                                    <div className="w-full text-sm flex justify-between">
                                                                        <p className="dark:text-gray-400">
                                                                            Cihaz
                                                                            FCM
                                                                            Token
                                                                        </p>
                                                                        <p className="font-bold dark:text-gray-300">
                                                                            {device?.device_token ? (
                                                                                <Tooltip
                                                                                    content={
                                                                                        device.device_token
                                                                                    }
                                                                                    id={
                                                                                        device.id +
                                                                                        "token"
                                                                                    }
                                                                                    color="foreground"
                                                                                    placement="top"
                                                                                    key={
                                                                                        device.id +
                                                                                        "token"
                                                                                    }
                                                                                >
                                                                                    {device.device_token?.substring(
                                                                                        0,
                                                                                        30
                                                                                    ) +
                                                                                        "..."}
                                                                                </Tooltip>
                                                                            ) : (
                                                                                "-"
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2 flex-col items-start  mt-4 text-xs font-medium leading-none">
                                                                    <div className="w-full text-sm flex justify-between">
                                                                        <p className="dark:text-gray-400">
                                                                            Cihaz
                                                                            Modeli
                                                                        </p>
                                                                        <p className="font-bold dark:text-gray-300">
                                                                            {device?.device_model ??
                                                                                "-"}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2 flex-col items-start  mt-4 text-xs font-medium leading-none">
                                                                    <div className="w-full text-sm flex justify-between">
                                                                        <p className="dark:text-gray-400">
                                                                            İşletim
                                                                            Sistemi
                                                                        </p>
                                                                        <p className="font-bold dark:text-gray-300">
                                                                            {device?.os_type ??
                                                                                "-"}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2 flex-col items-start  mt-4 text-xs font-medium leading-none">
                                                                    <div className="w-full text-sm flex justify-between">
                                                                        <p className="dark:text-gray-400">
                                                                            İşletim
                                                                            Sistemi
                                                                            Versiyonu
                                                                        </p>
                                                                        <p className="font-bold dark:text-gray-300">
                                                                            {device?.os_version ??
                                                                                "-"}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2 flex-col items-start  mt-4 text-xs font-medium leading-none">
                                                                    <div className="w-full text-sm flex justify-between">
                                                                        <p className="dark:text-gray-400">
                                                                            Uygulama
                                                                            Versiyonu
                                                                        </p>
                                                                        <p className="font-bold dark:text-gray-300">
                                                                            {device?.app_version ??
                                                                                "-"}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Tab>
                                                        )
                                                    )}
                                                </Tabs>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </CardBody>
                            <CardFooter></CardFooter>
                        </Card>
                    ) : null}
                </div>
                <div className="lg:col-span-8 md:col-span-12 col-span-12 flex flex-col gap-5">
                    <Card shadow="none">
                        <CardBody>
                            {!isOpenNotificationList ? (
                                <Tabs
                                    aria-label="Options"
                                    variant="light"
                                    color="primary"
                                >
                                    <Tab
                                        key="ongoing"
                                        title="Süresi Devam Eden"
                                    >
                                        <ProjectList
                                            id={parseInt(userId ?? "0")}
                                            title="Süresi Devam Eden Projeler"
                                            type="ongoing"
                                        ></ProjectList>
                                    </Tab>
                                    <Tab key="completed" title="Süresi Dolan">
                                        <ProjectList
                                            id={parseInt(userId ?? "0")}
                                            title="Süresi Dolan Projeler"
                                            type="completed"
                                        ></ProjectList>
                                    </Tab>
                                </Tabs>
                            ) : (
                                <NotificationList
                                    id={userDetail?.user?.id ?? 0}
                                    setIsOpenNotificationAdd={
                                        setIsOpenNotificationAdd
                                    }
                                ></NotificationList>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>

            <NotificationAddModal
                id={parseInt(userId ?? "0")}
                isOpen={isOpenNotificationAdd}
                onOpenChange={(isOpen) => setIsOpenNotificationAdd(isOpen)}
            ></NotificationAddModal>
        </div>
    );
};

export default ViewUser;
