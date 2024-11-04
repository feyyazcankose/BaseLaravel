import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import { fetchUserNotifications } from "../../../core/api/user.request";
import { IUserNotification } from "../../../core/models/user.interface";
import Loader from "@base/layout/components/loader/Loader";
import { PageableResponseModel } from "@app/core/models/app.interfaces";

import DynamoTable from "@base/components/common/dynamo-table/DynamoTable";
import { useSearchParams } from "react-router-dom";
import {
    EColumnType,
    EFilterType,
    IColumn,
} from "@base/components/common/dynamo-table/types/dynamo-table.types";
import { Button, Tooltip } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
    id: number;
    setIsOpenNotificationAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

const NotificationList = ({ id, setIsOpenNotificationAdd }: Props) => {
    const [projectListResponse, setNotificationListResponse] = React.useState<
        PageableResponseModel<IUserNotification> | undefined
    >();
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
        FetchStatus.IDLE
    );

    const [searchParams] = useSearchParams();
    const skip = parseInt(searchParams.get("skip") ?? "1");
    const take = parseInt(searchParams.get("take") ?? "10");
    const sort = searchParams.get("sort") ?? undefined;
    const filter = searchParams.get("filter") ?? "[]";

    React.useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetchUserNotifications({ skip, take, sort, filter }, id)
            .then((res) => {
                setFetchStatus(FetchStatus.SUCCEEDED);
                setNotificationListResponse(res);
            })
            .catch(() => {
                setFetchStatus(FetchStatus.FAILED);
            });
    }, [skip, take, sort, filter]);

    const columns: IColumn[] = [
        {
            key: "title",
            label: "Başlık",
            filterType: EFilterType.SELECT,
        },
        {
            key: "content",
            label: "İçerik",
            filterType: EFilterType.SELECT,
            customCell: (row) => (
                <div>{(row?.content as string)?.substring(0, 50)}...</div>
            ),
        },
        {
            key: "is_readed",
            label: "Okuma",
            type: EColumnType.CHIP,
            config: {
                chip: {
                    color: {
                        true: "success",
                        false: "danger",
                    },
                    text: {
                        true: "Okundu",
                        false: "Okunmadı",
                    },
                    variant: "bordered",
                },
            },
            filterOptions: [
                {
                    name: "is_readed",
                    label: "Okundu",
                    value: true,
                },
                {
                    name: "is_readed",
                    label: "Okunmadı",
                    value: false,
                },
            ],
            filterType: EFilterType.STATIC_SELECT,
        },
        {
            key: "created_at",
            label: "Oluşturma Tarihi",
            filterType: EFilterType.DATE,
            config: {
                date: {
                    format: "DD MMM YYYY, HH:mm",
                },
            },
            type: EColumnType.DATE,
        },
    ];

    if (fetchStatus === FetchStatus.IDLE) return <Loader />;

    return (
        projectListResponse && (
            <DynamoTable
                filterPath="notification"
                title={"Kullanıcı Bildirimleri"}
                meta={projectListResponse?.meta}
                columns={columns}
                classNames={{
                    table: "shadow-none",
                }}
                headerContent={
                    <React.Fragment>
                        <Tooltip content="Bildirim Ekle">
                            <Button
                                size="sm"
                                color="default"
                                isIconOnly
                                onClick={() => {
                                    setIsOpenNotificationAdd(true);
                                }}
                            >
                                <Icon
                                    icon="lets-icons:add-round"
                                    width="1.2rem"
                                    height="1.2rem"
                                />
                            </Button>
                        </Tooltip>
                    </React.Fragment>
                }
                rows={projectListResponse.items}
                loadStatus={fetchStatus}
                searchColumns={[
                    { id: "title", type: "string" },
                    { id: "content", type: "string" },
                ]}
            />
        )
    );
};

export default NotificationList;
