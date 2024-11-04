/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
    getDashboardSummaryCards,
    getDashboardSummary,
} from "../core/api/dashboard.requests";
import {
    IDashboardCardResponseData,
    IDashboarGraphResponse,
} from "../core/models/dashboard.interfaces";
import { FetchStatus } from "@base/enums/api.enum";
import { DashboardChart } from "./DashboardChart";
import {
    SUMMARY_METHOD,
    SUMMARY_METHOD_INFO,
} from "../core/models/dashboard.enum";
import { DashboardLineLoader, DashboardMultiLineLoader } from "./Loader";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from "@nextui-org/react";

const Dashboard = () => {
    const [dashboardCard, setDashboardCard] =
        React.useState<IDashboardCardResponseData | null>(null);

    const [dashboardCardFetchStatus, setDashboarCardFetchStatus] =
        React.useState<FetchStatus>(FetchStatus.IDLE);

    const [dashboard, setDashboard] = React.useState<IDashboarGraphResponse>({
        items: [],
        pv: "",
        uv: "",
        pv_range: "",
        uv_range: "",
    });

    const [method, setMethod] = React.useState<SUMMARY_METHOD>(
        SUMMARY_METHOD.WEEK
    );

    const [dashboardFetchStatus, setDashboarFetchStatus] =
        React.useState<FetchStatus>(FetchStatus.IDLE);

    React.useEffect(() => {
        setDashboarCardFetchStatus(FetchStatus.IDLE);
        setTimeout(function () {
            getDashboardSummaryCards(method)
                .then((response) => {
                    setDashboardCard(response.data);
                    setDashboarCardFetchStatus(FetchStatus.SUCCEEDED);
                })
                .catch(() => {
                    setDashboardCard(null);
                });
        }, 300);
    }, [method]);

    React.useEffect(() => {
        setDashboarFetchStatus(FetchStatus.IDLE);
        setTimeout(function () {
            getDashboardSummary(method)
                .then((response: any) => {
                    setDashboard(response);
                    setDashboarFetchStatus(FetchStatus.SUCCEEDED);
                })
                .catch(() => {
                    setDashboard({
                        items: [],
                        pv: "",
                        uv: "",
                    });
                });
        }, 300);
    }, [method]);

    // if (fetchStatus !== FetchStatus.SUCCEEDED) return <Loader isComponent />;

    return (
        <React.Fragment>
            <section className="flex gap-5 text-xs text-gray-900 whitespace-nowrap  max-md:flex-wrap mt-2">
                <div className="flex sm:gap-0  gap-2 items-center sm:flex-nowrap flex-wrap sm:justify-end sm:shadow-small rounded-lg">
                    <Button
                        onClick={() => setMethod(SUMMARY_METHOD.TODAY)}
                        variant="bordered"
                        className={`min-h-[44px] min-w-[110px] justify-center px-6 py-3 rounded-lg sm:rounded-tr-none sm:rounded-br-none  border-solid  ${
                            SUMMARY_METHOD.TODAY == method
                                ? "bg-primary-500 text-white border-primary-500"
                                : " text-black bg-white dark:bg-content1 dark:text-white border-slate-200 dark:border-none"
                        }`}
                    >
                        Bugün
                    </Button>
                    <Button
                        onClick={() => setMethod(SUMMARY_METHOD.WEEK)}
                        variant="bordered"
                        className={`min-h-[44px] min-w-[110px] justify-center px-6 py-3 rounded-lg sm:rounded-none sm:border-l-0 border-solid  ${
                            SUMMARY_METHOD.WEEK == method
                                ? "bg-primary-500 text-white border-primary-500"
                                : " text-black bg-white dark:bg-content1 dark:text-white border-slate-200 dark:border-none"
                        }`}
                    >
                        Bu Hafta
                    </Button>
                    <Button
                        onClick={() => setMethod(SUMMARY_METHOD.MONTH)}
                        variant="bordered"
                        className={`min-h-[44px] min-w-[110px] justify-center px-6 py-3  rounded-lg sm:rounded-none sm:border-l-0 border-solid  ${
                            SUMMARY_METHOD.MONTH == method
                                ? "bg-primary-500 text-white border-primary-500"
                                : " text-black bg-white dark:bg-content1 dark:text-white border-slate-200 dark:border-none"
                        }`}
                    >
                        Bu Ay
                    </Button>
                    <Button
                        onClick={() => setMethod(SUMMARY_METHOD.YEAR)}
                        variant="bordered"
                        className={`min-h-[44px] min-w-[110px] justify-center px-6 py-3  rounded-lg sm:rounded-tl-none sm:rounded-bl-none sm:border-l-0 border-solid  ${
                            SUMMARY_METHOD.YEAR == method
                                ? "bg-primary-500 text-white border-primary-500"
                                : " text-black bg-white dark:bg-content1 dark:text-white border-slate-200 dark:border-none"
                        }`}
                    >
                        Bu Yıl
                    </Button>
                </div>
            </section>
            <div className="flex flex-col items-center w-full  max-md:max-w-full mt-5">
                <section className="flex flex-col w-full max-md:max-w-full pb-6 ">
                    <section>
                        <div className="flex gap-3 pb-4 max-md:flex-wrap max-md:px-5 mt-5">
                            <div className="text-xl font-medium leading-7 text-black dark:text-white text-opacity-90">
                                Genel Özet
                            </div>
                            <div className="justify-center px-3 py-1 text-sm leading-5 text-gray-500 rounded bg-slate-100">
                                {SUMMARY_METHOD_INFO[method]}
                            </div>
                        </div>
                        <div className="flex gap-4 justify-between max-md:flex-wrap ">
                            <Card className="w-full p-4 border-0" shadow="sm">
                                <CardBody className="w-full">
                                    <div className="flex gap-2 justify-between items-center">
                                        <p className="text-lg">Toplam Proje</p>
                                        <Tooltip
                                            id="total_sale"
                                            content="Sistem üzerinde bulunan toplam proje sayısı"
                                            color="foreground"
                                        >
                                            <Icon
                                                icon="hugeicons:block-game"
                                                width="1.5rem"
                                                height="1.5rem"
                                                className="text-black dark:text-gray-200"
                                            />
                                        </Tooltip>
                                    </div>
                                    <div className="text-2xl font-medium leading-8 text-black dark:text-white text-opacity-90 mt-2 max-w-40">
                                        {dashboardCardFetchStatus ===
                                        FetchStatus.SUCCEEDED ? (
                                            <React.Fragment>
                                                {dashboardCard?.total_projects ??
                                                    0}
                                            </React.Fragment>
                                        ) : (
                                            <DashboardLineLoader></DashboardLineLoader>
                                        )}
                                    </div>

                                    <div className="flex gap-10">
                                        <div className="flex gap-2 mt-5">
                                            <div className="text-sm flex-col flex items-start">
                                                <p className="flex items-center gap-2">
                                                    <Icon
                                                        icon="prime:circle-on"
                                                        color="#9334ea"
                                                        width="0.5rem"
                                                        height="0.5rem"
                                                    />
                                                    {dashboardCard?.total_ongoing_projects ??
                                                        0}
                                                </p>
                                                <p>Devam Eden</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-5">
                                            <div className="text-sm flex-col flex items-start">
                                                <p className="flex items-center gap-2">
                                                    <Icon
                                                        icon="prime:circle-on"
                                                        color="#f87315"
                                                        width="0.5rem"
                                                        height="0.5rem"
                                                    />
                                                    {dashboardCard?.total_completed_projects ??
                                                        0}
                                                </p>
                                                <p>Biten</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card
                                className="w-full p-4 border-0 dark:border-0 "
                                shadow="sm"
                            >
                                <CardBody className="w-full">
                                    <div className="flex gap-2 justify-between items-center">
                                        <div className="text-lg">
                                            Toplam Kullanıcı
                                        </div>
                                        <Tooltip
                                            id="total_sale"
                                            content="Sistem üzerinde bulunan toplam kullanıcı sayısı"
                                            color="foreground"
                                        >
                                            <Icon
                                                data-tooltip-id="total_sale"
                                                icon="basil:user-outline"
                                                width="1.5rem"
                                                height="1.5rem"
                                            />
                                        </Tooltip>
                                    </div>
                                    <div className="text-2xl font-medium leading-8 text-black dark:text-white text-opacity-90 mt-2 max-w-40">
                                        {dashboardCardFetchStatus ===
                                        FetchStatus.SUCCEEDED ? (
                                            <React.Fragment>
                                                {dashboardCard?.total_users ??
                                                    0}
                                            </React.Fragment>
                                        ) : (
                                            <DashboardLineLoader></DashboardLineLoader>
                                        )}
                                    </div>

                                    <div className="flex gap-10">
                                        <div className="flex gap-2 mt-5">
                                            <div className="text-sm flex-col flex items-start">
                                                <p className="flex items-center gap-2">
                                                    <Icon
                                                        icon="prime:circle-on"
                                                        color="#9334ea"
                                                        width="0.5rem"
                                                        height="0.5rem"
                                                    />
                                                    {dashboardCard?.total_active_users ??
                                                        0}
                                                </p>
                                                <p>Aktif</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-5">
                                            <div className="text-sm flex-col flex items-start">
                                                <p className="flex items-center gap-2">
                                                    <Icon
                                                        icon="prime:circle-on"
                                                        color="#f87315"
                                                        width="0.5rem"
                                                        height="0.5rem"
                                                    />
                                                    {dashboardCard?.total_blocked_users ??
                                                        0}
                                                </p>
                                                <p>Pasif</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card
                                className="w-full p-4 border-0 dark:border-0 "
                                shadow="sm"
                            >
                                <CardBody className="w-full">
                                    <div className="flex gap-2 justify-between items-center">
                                        <div>Toplam Şirket</div>
                                        <Tooltip
                                            id="total_sale"
                                            content="Toplam şirket sayısını gösterir"
                                            color="foreground"
                                        >
                                            <Icon
                                                data-tooltip-id="total_sale"
                                                icon="mdi:company"
                                                width="1.5rem"
                                                height="1.5rem"
                                            />
                                        </Tooltip>
                                    </div>
                                    <div className="text-2xl font-medium leading-8 text-black dark:text-white text-opacity-90 mt-2 max-w-40">
                                        {dashboardCardFetchStatus ===
                                        FetchStatus.SUCCEEDED ? (
                                            <React.Fragment>
                                                {dashboardCard?.total_comapanies ??
                                                    0}
                                            </React.Fragment>
                                        ) : (
                                            <DashboardLineLoader></DashboardLineLoader>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>

                            <Card
                                className="w-full p-4 border-0 dark:border-0 text-white bg-primary-500"
                                shadow="sm"
                            >
                                <CardBody className="w-full">
                                    <div className="flex gap-2 justify-between items-center">
                                        <div>Toplam Geri Bildirim</div>
                                        <Tooltip
                                            id="total_sale"
                                            content="Toplam şirket sayısını gösterir"
                                            color="foreground"
                                        >
                                            <Icon
                                                icon="fluent:person-feedback-28-regular"
                                                width="1.5rem"
                                                height="1.5rem"
                                            />
                                        </Tooltip>
                                    </div>
                                    <div className="text-2xl font-medium leading-8 text-white dark:text-white text-opacity-90 mt-2 max-w-40">
                                        {dashboardCardFetchStatus ===
                                        FetchStatus.SUCCEEDED ? (
                                            <React.Fragment>
                                                {dashboardCard?.total_comapanies ??
                                                    0}
                                            </React.Fragment>
                                        ) : (
                                            <DashboardLineLoader></DashboardLineLoader>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </section>
                </section>

                <section className="flex-wrap justify-center self-stretch pt-6 max-md:max-w-full">
                    <div className="grid grid-cols-12 gap-4">
                        {/* Left Section */}
                        <Card
                            className="col-span-12 md:col-span-8 p-4 border-0 dark:border-0"
                            shadow="sm"
                        >
                            <CardBody>
                                <div className="flex flex-col  items-start pb-4 border-solid bg-slate-100max-md:px-5 max-md:max-w-full">
                                    <div className="flex gap-5 justify-between items-center">
                                        <div className="self-stretch text-xl font-medium leading-7 text-black dark:text-white text-opacity-90">
                                            Yanıt Grafiği
                                        </div>
                                        <div>
                                            <div className="self-stretch my-auto font-light text-sm flex items-center gap-0.5">
                                                <span className="flex w-1.5 h-1.5 rounded-full me-1.5 flex-shrink-0 text-purple-500 bg-purple-600"></span>
                                                <span>{dashboard.uv}</span>
                                            </div>
                                            <span className="text-xs">
                                                {dashboard.uv_range}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="self-stretch my-auto font-light text-sm flex items-center gap-0.5">
                                                <span className="flex w-1.5 h-1.5 rounded-full me-1.5 flex-shrink-0 text-orange-600 bg-orange-500"></span>
                                                <span>{dashboard.pv} </span>
                                            </div>
                                            <span className="text-xs">
                                                {dashboard.pv_range}
                                            </span>{" "}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    {dashboardFetchStatus ==
                                    FetchStatus.SUCCEEDED ? (
                                        <DashboardChart
                                            data={dashboard}
                                        ></DashboardChart>
                                    ) : (
                                        <DashboardMultiLineLoader />
                                    )}
                                </div>
                            </CardBody>
                        </Card>

                        <Card
                            className="col-span-12 md:col-span-4 p-8 border-0 dark:border-0"
                            shadow="sm"
                        >
                            <div className="flex gap-5 justify-between pb-4 w-full">
                                <div className="text-xl font-medium leading-7 text-black dark:text-white text-opacity-90">
                                    Kritik Göstergeler
                                </div>
                                <div className="justify-center items-start px-3 py-1 text-sm leading-6 text-gray-500 rounded bg-slate-100">
                                    {SUMMARY_METHOD_INFO[method]}
                                </div>
                            </div>

                            <div className="flex flex-col  w-full text-sm leading-5 text-black dark:text-white text-opacity-90">
                                <div className="shrink-0 mt-6 h-px border-t border-solid border-zinc-950 border-opacity-10" />
                                <div className="flex gap-1.5 justify-between mt-6">
                                    <div className="flex gap-1.5 justify-between font-medium items-center">
                                        <div>Toplam Görev Sayısı</div>
                                        <Tooltip
                                            id="avg-rentacar-day"
                                            content="Toplam görev sayısını verir"
                                            color="foreground"
                                        >
                                            <Icon
                                                data-tooltip-id="avg-rentacar-day"
                                                icon="material-symbols:info-outline"
                                            />
                                        </Tooltip>
                                    </div>
                                    <div className="min-w-24">
                                        {dashboardCardFetchStatus ===
                                        FetchStatus.SUCCEEDED ? (
                                            <React.Fragment>
                                                {dashboardCard?.total_tasks ??
                                                    0}
                                            </React.Fragment>
                                        ) : (
                                            <DashboardLineLoader></DashboardLineLoader>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col  w-full text-sm leading-5 text-black dark:text-white text-opacity-90">
                                <div className="shrink-0 mt-6 h-px border-t border-solid border-zinc-950 border-opacity-10" />
                                <div className="flex gap-1.5 justify-between mt-6">
                                    <div className="flex gap-1.5 justify-between font-medium items-center">
                                        <div>Toplam Soru Sayısı</div>
                                        <Tooltip
                                            id="avg-rentacar-day"
                                            content="Toplam soru sayısını verir"
                                            color="foreground"
                                        >
                                            <Icon
                                                data-tooltip-id="avg-rentacar-day"
                                                icon="material-symbols:info-outline"
                                            />
                                        </Tooltip>
                                    </div>
                                    <div className="min-w-24">
                                        {dashboardCardFetchStatus ===
                                        FetchStatus.SUCCEEDED ? (
                                            <React.Fragment>
                                                {dashboardCard?.total_questions ??
                                                    0}
                                            </React.Fragment>
                                        ) : (
                                            <DashboardLineLoader></DashboardLineLoader>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="shrink-0 mt-6 h-px border-t border-solid border-zinc-950 border-opacity-10" />
                            <p className="mt-6">En Popüler Kullanıcılar</p>
                            <div className="mt-4">
                                {dashboardCardFetchStatus ===
                                FetchStatus.SUCCEEDED ? (
                                    <React.Fragment>
                                        <Table
                                            aria-label="Example static collection table"
                                            className="[&>div]:!p-0"
                                        >
                                            <TableHeader className="p-0">
                                                <TableColumn>{""}</TableColumn>
                                                <TableColumn>İsim</TableColumn>
                                                <TableColumn>Soru</TableColumn>
                                            </TableHeader>
                                            {dashboardCard?.top_users.length ? (
                                                <TableBody>
                                                    {dashboardCard?.top_users.map(
                                                        (user) => {
                                                            return (
                                                                <TableRow
                                                                    key={
                                                                        user.id
                                                                    }
                                                                >
                                                                    <TableCell>
                                                                        <Avatar
                                                                            src={
                                                                                user.image
                                                                            }
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            user.name
                                                                        }{" "}
                                                                        {
                                                                            user.surname
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            user.user_question_answers_count
                                                                        }
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                    )}
                                                </TableBody>
                                            ) : (
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell colSpan={3}>
                                                            No users found
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            )}
                                        </Table>
                                    </React.Fragment>
                                ) : (
                                    <DashboardLineLoader></DashboardLineLoader>
                                )}
                            </div>
                        </Card>
                    </div>
                </section>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;
