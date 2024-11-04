import React from "react";
import {
    Card,
    Button,
    CardBody,
    CardHeader,
    Divider,
    Spinner,
} from "@nextui-org/react";
import UserSelect from "./partial/UserSelect";
import TypeSelect from "./partial/TypeSelect";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchActivities } from "../core/api/activite.request";
import {
    IActiviteResponseP,
    ISelectedUser,
} from "../core/models/activite.interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useSearchParams } from "react-router-dom";
import moment from "moment";

export default function ViewActivite() {
    const [selectedUsers, setSelectedUsers] = React.useState<number[]>([]);
    const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
    const [activities, setActivities] = React.useState<IActiviteResponseP[]>(
        []
    );
    const [hasMore, setHasMore] = React.useState(true);
    const [skip, setSkip] = React.useState(1);
    const take = 10;
    const [fetchStatus, setFetchStatus] = React.useState("idle");
    const [searchParams] = useSearchParams();

    React.useEffect(() => {
        const userParam = searchParams.get("users");
        if (userParam) {
            try {
                const userArray = JSON.parse(userParam) as ISelectedUser[];
                setSelectedUsers(userArray.map((item) => item.id));
            } catch (error) {
                console.error("Failed to parse users from query params", error);
            }
        }

        const typesString = searchParams.get("types");
        console.log(typesString);
        if (typesString?.length) {
            const types = typesString.split(",");
            setSelectedTypes(types);
        } else {
            setSelectedTypes([]);
        }
    }, [searchParams]);

    const fetchMoreActivities = (localSkip = 1) => {
        if (fetchStatus === "loading") return;
        setFetchStatus("loading");
        fetchActivities(
            { skip: localSkip, take, sort: "desc" },
            selectedUsers,
            selectedTypes
        )
            .then((res) => {
                setFetchStatus("succeeded");
                setActivities((prev) => [...prev, ...res.items]);
                setSkip((prev) => prev + 1);
                setHasMore(res.items.length > 0);
            })
            .catch(() => {
                setFetchStatus("failed");
            });
    };

    React.useEffect(() => {
        if (selectedUsers.length > 0) {
            setSkip(1);
            setActivities([]);
            fetchMoreActivities();
        }
    }, [selectedUsers, selectedTypes]); // selectedUsers ve selectedTypes değiştiğinde aktiviteleri tekrar yükle

    return (
        <Card shadow="sm">
            <CardHeader className="px-10 flex-col justify-start items-start pt-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Zaman Çizelgesi
                </h3>
                <p className="text-gray-500 font-light text-sm mt-1">
                    Kullanıcıların uygulamada hangi işlemleri yaptığını
                    görebilir ve filtreleyebilirsiniz.
                </p>
            </CardHeader>
            <Divider></Divider>
            <CardBody className="p-10 activites">
                <div className="mb-16 flex justify-between gap-6">
                    <div className="w-full">
                        <UserSelect />
                    </div>
                    <div className="w-full">
                        <TypeSelect />
                    </div>
                </div>

                {!selectedUsers.length ? (
                    <p className="text-gray-500 font-light text-sm mt-1 items-center flex justify-center flex-col gap-5">
                        <Icon icon="hugeicons:user-group" width={"30px"} />
                        Aktiviteleri görüntülemek için kullanıcı seçmelisiniz.
                    </p>
                ) : (
                    <InfiniteScroll
                        scrollThreshold={0.9}
                        dataLength={activities.length}
                        next={() => fetchMoreActivities(skip)}
                        hasMore={hasMore}
                        loader={<Spinner color="primary" />}
                        className="p-5"
                        endMessage={
                            <p className="text-center text-gray-500 text-sm">
                                {activities.length
                                    ? "Tüm aktiviteler yüklendi."
                                    : "Aktivite bulunamadı."}
                            </p>
                        }
                    >
                        {activities.map((activity) => (
                            <ol
                                key={activity.id}
                                className="relative border-s border-gray-200 dark:border-gray-700"
                            >
                                <li className="mb-10 ms-6">
                                    <span className="absolute flex items-center justify-center w-7 h-7 bg-primary-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
                                        <Icon
                                            className="text-primary-800 dark:text-primary-500"
                                            icon="akar-icons:save"
                                        />
                                    </span>
                                    <h3 className="flex items-center mb-1 text-md font-semibold text-gray-900 dark:text-white">
                                        {activity.user.name}{" "}
                                        {activity.user.surname}
                                    </h3>
                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                        {moment(activity.created_at).format(
                                            "DD MMM YYYY, HH:mm"
                                        )}
                                    </time>
                                    <p
                                        className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
                                        dangerouslySetInnerHTML={{
                                            __html: activity?.description ?? "",
                                        }}
                                    />

                                    {activity?.project_id ? (
                                        <Link
                                            to={`/projeler/detay/${activity.project_id}`}
                                        >
                                            <Button
                                                size="sm"
                                                variant="bordered"
                                            >
                                                Projeyi Görüntüle
                                            </Button>
                                        </Link>
                                    ) : null}
                                </li>
                            </ol>
                        ))}
                    </InfiniteScroll>
                )}
            </CardBody>
        </Card>
    );
}
