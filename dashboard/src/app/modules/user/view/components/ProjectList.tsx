import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import { fetchUserProjects } from "../../core/api/user.request";
import { IUserProjectResponseP } from "../../core/models/user.interface";
import Loader from "@base/layout/components/loader/Loader";
import { PageableResponseModel } from "@app/core/models/app.interfaces";

import DynamoTable from "@base/components/common/dynamo-table/DynamoTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    EColumnType,
    EFilterType,
    IColumn,
} from "@base/components/common/dynamo-table/types/dynamo-table.types";
import { ERole } from "@base/enums/role.enum";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar } from "@nextui-org/react";
import { hasPermissionMany } from "@base/helpers/permissions/permission.helper";

type Props = {
    id: number;
    title: string;
    type: "ongoing" | "completed";
};

const ProjectList = ({ id, title, type }: Props) => {
    const [projectListResponse, setProjectListResponse] = React.useState<
        PageableResponseModel<IUserProjectResponseP> | undefined
    >();
    const navigate = useNavigate();
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
        fetchUserProjects({ skip, take, sort, filter }, id, type)
            .then((res) => {
                setFetchStatus(FetchStatus.SUCCEEDED);
                setProjectListResponse(res);
            })
            .catch(() => {
                setFetchStatus(FetchStatus.FAILED);
            });
    }, [skip, take, sort, filter]);

    const columns: IColumn[] = [
        {
            key: "cover",
            label: "Kapak",
            customCell: (row) => (
                <Avatar
                    as="div"
                    color="default"
                    showFallback
                    src={row?.cover}
                    size="sm"
                    isBordered
                />
            ),
        },
        {
            key: "title",
            label: "Başlık",
            filterType: EFilterType.SELECT,
        },
        {
            key: "questions_answer_count",
            label: "Cevap Oranı",
            customCell: (row) => (
                <p className="flex items-center gap-1">
                    {"% " +
                        Math.floor(
                            (row.questions_answer_count * 100) /
                                row?.questions_count
                        )}
                </p>
            ),
        },
        {
            key: "questions_count",
            label: "Toplam Soru",
        },
        {
            key: "questions_answer_count",
            label: "Toplam Cevaplanan Soru",
        },
        {
            key: "is_completed",
            label: "Durumu",
            config: {
                chip: {
                    color:
                        type == "completed"
                            ? {
                                  true: "success",
                                  false: "danger",
                              }
                            : {
                                  true: "success",
                                  false: "secondary",
                              },
                    text:
                        type == "completed"
                            ? {
                                  true: "Tamamlandı",
                                  false: "Bitirilemedi",
                              }
                            : {
                                  true: "Tamamlandı",
                                  false: "Devam Ediyor",
                              },
                },
            },
            type: EColumnType.CHIP,
        },

        {
            key: "start_date",
            label: "Başlangıç Tarihi",
            filterType: EFilterType.DATE,
            config: {
                date: {
                    format: "DD MMM YYYY, HH:mm",
                },
            },
            type: EColumnType.DATE,
        },
        {
            key: "end_date",
            label: "Bitiş Tarihi",
            filterType: EFilterType.DATE,
            config: {
                date: {
                    format: "DD MMM YYYY, HH:mm",
                },
            },
            type: EColumnType.DATE,
        },
    ];

    if (hasPermissionMany(`${ERole.PROJECT_UPDATE},${ERole.PROJECT_DELETE}`)) {
        columns.push({
            type: EColumnType.OPERATIONS,
            label: "İşlemler",
            operations: [
                {
                    name: "edit",
                    icon: <Icon icon="carbon:view-filled" />,
                    text: "Görüntüle",
                    handle: (id: number) => {
                        navigate(`/projeler/detay/${id}`);
                    },
                    role: ERole.PROJECT_UPDATE,
                },
            ],
        });
    }

    if (fetchStatus === FetchStatus.IDLE) return <Loader />;

    return (
        projectListResponse && (
            <DynamoTable
                filterPath="project"
                title={title}
                meta={projectListResponse?.meta}
                columns={columns}
                rows={projectListResponse.items}
                loadStatus={fetchStatus}
                searchColumns={[{ id: "title", type: "string" }]}
            />
        )
    );
};

export default ProjectList;
