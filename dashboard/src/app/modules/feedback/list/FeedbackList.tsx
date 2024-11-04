import React, { useState } from "react";
import { FetchStatus } from "@base/enums/api.enum";
import { fetchFeedbacks } from "../core/api/feedback.request";
import { IFeedbackResponseP } from "../core/models/feedback.interface";
import Loader from "@base/layout/components/loader/Loader";
import { PageableResponseModel } from "@app/core/models/app.interfaces";

import DynamoTable from "@base/components/common/dynamo-table/DynamoTable";
import { useSearchParams } from "react-router-dom";
import {
    EColumnType,
    EFilterType,
    IColumn,
} from "@base/components/common/dynamo-table/types/dynamo-table.types";
import { hasPermissionMany } from "@base/helpers/permissions/permission.helper";
import { ERole } from "@base/enums/role.enum";
import { Icon } from "@iconify/react/dist/iconify.js";
import ViewFeedback from "@app/modules/feedback/view/ViewFeedback";
import { useDisclosure } from "@nextui-org/react";

const FeedbackList = () => {
    const [feedbackListResponse, setFeedbackListResponse] = React.useState<
        PageableResponseModel<IFeedbackResponseP> | undefined
    >();
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
        FetchStatus.IDLE
    );
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [searchParams] = useSearchParams();
    const [selectId, setSelectId] = useState(null);
    const skip = parseInt(searchParams.get("skip") ?? "1");
    const take = parseInt(searchParams.get("take") ?? "10");
    const sort = searchParams.get("sort") ?? undefined;
    const filter = searchParams.get("filter") ?? "[]";

    React.useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetchFeedbacks({ skip, take, sort, filter })
            .then((res) => {
                setFetchStatus(FetchStatus.SUCCEEDED);
                setFeedbackListResponse(res);
            })
            .catch(() => {
                setFetchStatus(FetchStatus.FAILED);
            });
    }, [skip, take, sort, filter]);

    const columns: IColumn[] = [
        {
            key: "user.name",
            label: "Ad",
            filterType: EFilterType.SELECT,
        },
        {
            key: "user.surname",
            label: "Soyad",
            filterType: EFilterType.SELECT,
        },
        {
            key: "message",
            label: "Mesaj",
            customCell: (row) => {
                return row.message.length >= 80
                    ? row.slice(0, 80) + "..."
                    : row.message;
            },
        },
        {
            key: "star",
            label: "Yıldız",
            filterType: EFilterType.SELECT,
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

    if (hasPermissionMany(`${ERole.FEEDBACK_VIEW}`)) {
        columns.push({
            type: EColumnType.OPERATIONS,
            label: "İşlemler",
            operations: [
                {
                    name: "view",
                    icon: <Icon icon="lets-icons:view" />,
                    text: "Görüntüle",
                    handle: (id) => {
                        setSelectId(id);
                        onOpen();
                    },
                    role: ERole.COMPANY_DELETE,
                },
            ],
        });
    }

    if (fetchStatus === FetchStatus.IDLE) return <Loader />;

    return (
        feedbackListResponse && (
            <>
                <DynamoTable
                    filterPath="feedback"
                    title="Geri Bildirimler"
                    meta={feedbackListResponse?.meta}
                    columns={columns}
                    rows={feedbackListResponse.items}
                    loadStatus={fetchStatus}
                    searchColumns={[
                        { id: "user.name", type: "string" },
                        { id: "user.surname", type: "string" },
                        { id: "message", type: "string" },
                    ]}
                />

                {selectId ? (
                    <ViewFeedback
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onOpenChange={onOpenChange}
                        feedbackId={selectId}
                    />
                ) : (
                    <></>
                )}
            </>
        )
    );
};

export default FeedbackList;
