import { useFormik } from "formik";
import {
    IUserResponseP,
    IUserUpdateRequest,
} from "../core/models/user.interface";
import * as Yup from "yup";
import { getUser, updateUser } from "../core/api/user.request";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import {
    Card,
    CardBody,
    CardHeader,
    DatePicker,
    Input,
    Select,
    SelectItem,
} from "@nextui-org/react";
import ReactPhoneInput from "@base/components/common/inputs/PhoneInput";
import moment from "moment";
import FileBrowserModal from "@app/modules/file-manager/components/modals/FileBrowserModal";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useFormContext } from "@base/context/FormContext";
import React, { useEffect } from "react";
import { parseDate } from "@internationalized/date";
import { FetchStatus } from "@base/enums/api.enum";
import Loader from "@base/layout/components/loader/Loader";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Ad alanı zorunludur"),
    surname: Yup.string().required("Soyad alanı zorunludur"),
    phone: Yup.string().required("Telefon alanı zorunludur"),
    role: Yup.string().required("Kullanıcı rolü zorunludur."),
    email: Yup.string()
        .email("Geçerli bir email adresi giriniz")
        .required("Email alanı zorunludur"),
});

const EditUser = () => {
    const navigate = useNavigate();
    const { formRef, setHandleSubmit, clearHandleSubmit, setBackUrl } =
        useFormContext();
    const { id: userId } = useParams();
    const [user, setUser] = React.useState<IUserResponseP | null>(null);
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
        FetchStatus.IDLE
    );

    useEffect(() => {
        if (userId) {
            setFetchStatus(FetchStatus.LOADING);
            getUser(parseInt(userId)).then((res) => {
                setUser(res.data);
                setFetchStatus(FetchStatus.SUCCEEDED);
            });
        }
    }, [userId]);

    const formik = useFormik({
        initialValues: {
            name: user?.name,
            surname: user?.surname,
            email: user?.email,
            image: user?.image,
            phone: user?.phone,
            phone_code: user?.phone_code,
            role: user?.role,
            is_blocked: user?.is_blocked,
            birthday: user?.birthday
                ? moment(user?.birthday).format("YYYY-MM-DD")
                : "",
        } as IUserUpdateRequest,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            updateUser({
                id: parseInt(userId ?? "0"),
                data: values,
            }).then(() => {
                toast.success("Kullanıcı başarıyla eklendi");
                clearHandleSubmit();
                navigate(-1);
            });
        },
    });

    useEffect(() => {
        setHandleSubmit(() => formik.handleSubmit);
        setBackUrl("/kullanicilar");
    }, [formik.handleSubmit]);

    if (fetchStatus !== FetchStatus.SUCCEEDED) return <Loader />;

    return (
        <>
            <div className="flex gap-1 items-center mb-8">
                <Link
                    to="/kullanicilar"
                    className="hover:bg-[#d4d4d4] p-2 rounded-lg cursor-pointer"
                >
                    <Icon icon="ph:arrow-left-bold" />
                </Link>
                <h2 className="text-[1.25rem] font-bold">
                    Kullanıcı Düzenleme
                </h2>
            </div>{" "}
            <form onSubmit={formik.handleSubmit} ref={formRef}>
                <div className="pb-10 grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="lg:col-span-8 md:col-span-12 col-span-12">
                        <Card
                            className="w-full p-4 border-1 dark:border-0 mb-4"
                            shadow="sm"
                        >
                            <CardHeader className="flex gap-3 p-0">
                                <p className="text-sm font-medium">
                                    Genel bilgiler
                                </p>
                            </CardHeader>
                            <CardBody className="px-0 overflow-y-clip">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="mb-3 ">
                                        <div className="flex gap-4 items-end">
                                            <div className="w-full">
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-2 text-sm font-normal text-gray-600 dark:text-gray-300 "
                                                >
                                                    Adı*
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Jhon"
                                                    variant="bordered"
                                                    value={formik.values.name}
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                />
                                                {formik.touched.name &&
                                                    formik.errors.name && (
                                                        <p className="mt-2 text-sm text-red-500">
                                                            {formik.errors.name}
                                                        </p>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 ">
                                        <div className="flex gap-4 items-end">
                                            <div className="w-full">
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-2 text-sm font-normal text-gray-600 dark:text-gray-300 "
                                                >
                                                    Soyad*
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="surname"
                                                    name="surname"
                                                    placeholder="Do"
                                                    variant="bordered"
                                                    value={
                                                        formik.values.surname
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                />
                                                {formik.touched.surname &&
                                                    formik.errors.surname && (
                                                        <p className="mt-2 text-sm text-red-500">
                                                            {
                                                                formik.errors
                                                                    .surname
                                                            }
                                                        </p>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-normal text-gray-600 dark:text-gray-300 "
                                        >
                                            E-posta*
                                        </label>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            variant="bordered"
                                            placeholder="ornek@uplide.com"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.touched.email &&
                                            formik.errors.email && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {formik.errors.email}
                                                </p>
                                            )}
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-normal text-gray-600 dark:text-gray-300 "
                                        >
                                            Telefon Numarası*
                                        </label>
                                        <ReactPhoneInput
                                            withCode
                                            value={formik.values.phone}
                                            name="phone"
                                            onChange={(e) => {
                                                formik.setFieldValue(
                                                    "phone",
                                                    e.target.value.phone
                                                );
                                                formik.setFieldValue(
                                                    "phone_code",
                                                    "+" +
                                                        e.target.value
                                                            .phone_code
                                                );
                                            }}
                                            id="phone"
                                        />
                                        {formik.touched.phone &&
                                        formik.errors.phone ? (
                                            <p className="mt-2 text-sm text-red-500">
                                                {formik.errors.phone}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card
                            className="w-full p-4 border-1 dark:border-0"
                            shadow="sm"
                        >
                            <CardHeader className="flex gap-3 p-0">
                                <p className="text-sm font-medium">
                                    Diğer bilgiler
                                </p>
                            </CardHeader>
                            <CardBody className="px-0 overflow-y-clip">
                                <div className="w-full mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-normal text-gray-600 dark:text-gray-300 "
                                    >
                                        Kullanıcı Rolü
                                    </label>
                                    <Select
                                        value={formik.values.role}
                                        selectedKeys={[formik.values.role]}
                                        onChange={(e) =>
                                            formik.setFieldValue(
                                                `role`,
                                                parseInt(e.target.value)
                                            )
                                        }
                                        placeholder="Rol seçiniz"
                                        variant="bordered"
                                    >
                                        <SelectItem key="1" value={1}>
                                            Normal Kullanıcı
                                        </SelectItem>
                                        <SelectItem key="2" value={2}>
                                            Moderatör
                                        </SelectItem>
                                        <SelectItem key="3" value={3}>
                                            Gözlemci
                                        </SelectItem>
                                    </Select>

                                    {formik.touched.role &&
                                        formik.errors.role && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {formik.errors.role}
                                            </p>
                                        )}
                                </div>
                                <div className="w-full mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-normal text-gray-600 dark:text-gray-300 "
                                    >
                                        Doğum Tarihi
                                    </label>
                                    <DatePicker
                                        id={`birthday`}
                                        name={`birthday`}
                                        variant="bordered"
                                        showMonthAndYearPickers
                                        value={
                                            formik?.values.birthday
                                                ? parseDate(
                                                      formik.values.birthday
                                                  )
                                                : null
                                        }
                                        onChange={(e) =>
                                            formik.setFieldValue(
                                                `birthday`,
                                                e.toString()
                                            )
                                        }
                                    />
                                </div>
                                <div className="w-full mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-normal text-gray-600 dark:text-gray-300 "
                                    >
                                        Hesap Durumu
                                    </label>
                                    <Select
                                        value={
                                            formik.values.is_blocked
                                                ? "blocked"
                                                : "active"
                                        }
                                        selectedKeys={[
                                            formik.values.is_blocked
                                                ? "blocked"
                                                : "active",
                                        ]}
                                        onChange={(e) =>
                                            formik.setFieldValue(
                                                `is_blocked`,
                                                e.target.value === "blocked"
                                            )
                                        }
                                        placeholder="Rol seçiniz"
                                        variant="bordered"
                                    >
                                        <SelectItem
                                            key="active"
                                            value={"active"}
                                        >
                                            Aktif
                                        </SelectItem>
                                        <SelectItem
                                            key="blocked"
                                            value={"blocked"}
                                        >
                                            Engellendi
                                        </SelectItem>
                                    </Select>

                                    {formik.touched.role &&
                                        formik.errors.role && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {formik.errors.role}
                                            </p>
                                        )}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="lg:col-span-4 md:col-span-12 col-span-12">
                        <Card
                            className="w-full p-4 border-1 dark:border-0"
                            shadow="sm"
                        >
                            <CardHeader className="p-0">
                                <p className="text-sm font-medium">
                                    Kullanıcı Resi
                                </p>
                            </CardHeader>
                            <CardBody className="p-0 pt-2">
                                <div className="flex justify-center flex-col items-center gap-3">
                                    <FileBrowserModal
                                        setPickUrl={(value) =>
                                            formik.setFieldValue("image", value)
                                        }
                                        value={formik.values.image}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditUser;
