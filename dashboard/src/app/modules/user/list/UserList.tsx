import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import { deleteUser, fetchUsers } from "../core/api/user.request";
import { IUserResponseP } from "../core/models/user.interface";
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
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { swal } from "@base/components/common/swal/SwalAlert";
import toast from "react-hot-toast";
import {
    hasPermission,
    hasPermissionMany,
} from "@base/helpers/permissions/permission.helper";

const UserList = () => {
    const [userListResponse, setUserListResponse] = React.useState<
        PageableResponseModel<IUserResponseP> | undefined
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
    const [tableAction, setTableAction] = React.useState<string>("");

    React.useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetchUsers({ skip, take, sort, filter })
            .then((res) => {
                setFetchStatus(FetchStatus.SUCCEEDED);
                setUserListResponse(res);
            })
            .catch(() => {
                setFetchStatus(FetchStatus.FAILED);
            });
    }, [skip, take, sort, filter, tableAction]);

    const columns: IColumn[] = [
        {
            key: "image",
            label: "Resim",
            customCell: (row) => (
                <Avatar
                    as="div"
                    color="default"
                    showFallback
                    src={row?.image}
                    size="sm"
                    isBordered
                />
            ),
        },
        {
            key: "name",
            label: "Ad",
            filterType: EFilterType.SELECT,
        },
        {
            key: "surname",
            label: "Soyad",
            filterType: EFilterType.SELECT,
        },
        {
            key: "email",
            label: "E-posta",
            filterType: EFilterType.SELECT,
            customCell: (row) => (
                <div>
                    {row.name}
                    <br />
                    {row.email}
                </div>
            ),
        },
        {
            key: "phone",
            label: "Telefon",
            filterType: EFilterType.SELECT,
        },
        {
            key: "role",
            label: "Rolü",
            type: EColumnType.CHIP,
            config: {
                chip: {
                    color: {
                        1: "success",
                        2: "secondary",
                        3: "warning",
                    },
                    text: {
                        1: "Normal Kullanıcı",
                        2: "Moderatör",
                        3: "Gözlemci",
                    },
                    variant: "bordered",
                },
            },
            filterOptions: [
                {
                    label: "Normal Kullanıcı",
                    value: 1,
                },
                {
                    label: "Moderatör",
                    value: 2,
                },
                {
                    label: "Gözlemci",
                    value: 3,
                },
            ],
            filterType: EFilterType.STATIC_SELECT,
        },
        {
            key: "is_blocked",
            label: "Hesap Durumu",
            type: EColumnType.CHIP,
            config: {
                chip: {
                    color: {
                        true: "danger",
                        false: "success",
                    },
                    text: {
                        true: "Engellendi",
                        false: "Aktif",
                    },
                    variant: "bordered",
                },
            },
            filterOptions: [
                {
                    name: "is_blocked",
                    label: "Engellendi",
                    value: true,
                },
                {
                    name: "is_blocked",
                    label: "Aktif",
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

    if (hasPermissionMany(`${ERole.USER_UPDATE},${ERole.USER_DELETE}`)) {
        columns.push({
            type: EColumnType.OPERATIONS,
            label: "İşlemler",
            operations: [
                {
                    name: "edit",
                    icon: <Icon icon="carbon:view-filled" />,
                    text: "Görüntüle",
                    handle: (id: number) => {
                        navigate(`/kullanicilar/detay/${id}`);
                    },
                    role: ERole.USER_VIEW,
                },
                {
                    name: "edit",
                    icon: <Icon icon="tabler:clock-hour-2-filled" />,
                    text: "Aktiviteler",
                    handle: (id: number, row: IUserResponseP) => {
                        const users = JSON.stringify([
                            {
                                id: id,
                                name: row.name,
                                surname: row.surname,
                            },
                        ]);
                        navigate(`/aktiviteler?users=${users}`);
                    },
                    role: ERole.USER_VIEW,
                },
                {
                    name: "edit",
                    icon: <Icon icon="fluent:edit-48-filled" />,
                    text: "Düzenle",
                    handle: (id: number) => {
                        navigate(`/kullanicilar/duzenle/${id}`);
                    },
                    role: ERole.USER_UPDATE,
                },
                {
                    name: "delete",
                    icon: <Icon icon="ic:round-delete" />,
                    text: "Sil",
                    handle: (id) => {
                        swal.fire({
                            title: "Kullanıcıyı silmek istediğinize emin misiniz?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Evet",
                            cancelButtonText: "Hayır",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                deleteUser(id).then(() => {
                                    toast.success(
                                        "Kullanıcı başarıyla silindi"
                                    );
                                    setTableAction(`delete_${id}`);
                                });
                            }
                        });
                    },
                    role: ERole.USER_DELETE,
                },
            ],
        });
    }

    if (fetchStatus === FetchStatus.IDLE) return <Loader />;

    return (
        userListResponse && (
            <DynamoTable
                filterPath="user"
                title="Kullanıcılar"
                meta={userListResponse?.meta}
                columns={columns}
                rows={userListResponse.items}
                loadStatus={fetchStatus}
                headerContent={
                    <React.Fragment>
                        {hasPermission(ERole.ADMIN_CREATE) ? (
                            <Tooltip content="Kullanıcı Ekle">
                                <Button
                                    size="sm"
                                    color="default"
                                    isIconOnly
                                    onClick={() => {
                                        navigate("/kullanicilar/ekle");
                                    }}
                                >
                                    <Icon
                                        icon="lets-icons:add-round"
                                        width="1.2rem"
                                        height="1.2rem"
                                    />
                                </Button>
                            </Tooltip>
                        ) : null}
                    </React.Fragment>
                }
                searchColumns={[
                    { id: "name", type: "string" },
                    { id: "surname", type: "string" },
                    { id: "email", type: "string" },
                    { id: "phone", type: "string" },
                ]}
            />
        )
    );
};

export default UserList;
