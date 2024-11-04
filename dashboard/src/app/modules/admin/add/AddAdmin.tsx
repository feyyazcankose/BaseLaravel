import { useFormik } from "formik";
import { IAdminCreateRequest } from "../core/models/admin.interface";
import * as Yup from "yup";
import { addAdmin } from "../core/api/admin.request";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import ReactPhoneInput from "@base/components/common/inputs/PhoneInput";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useFormContext } from "@base/context/FormContext";
import { useEffect } from "react";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Ad alanı zorunludur"),
    surname: Yup.string().required("Soyad alanı zorunludur"),
    phone: Yup.string().required("Telefon alanı zorunludur"),
    email: Yup.string()
        .email("Geçerli bir email adresi giriniz")
        .required("Email alanı zorunludur"),
    password: Yup.string().required("Şifre alanı zorunludur"),
    password_confirmation: Yup.string()
        .required("Şifre tekrarı alanı zorunludur")
        .oneOf([Yup.ref("password")], "Şifreler uyuşmuyor"),
});

const AddAdmin = () => {
    const navigate = useNavigate();
    const { formRef, setHandleSubmit, clearHandleSubmit, setBackUrl } =
        useFormContext();
    const formik = useFormik({
        initialValues: {
            email: "",
            surname: "",
            phone: "",
            phone_code: "",
            name: "",
            password: "",
            password_confirmation: "",
        } as IAdminCreateRequest,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            addAdmin(values).then(() => {
                toast.success("Yönetici başarıyla eklendi");
                clearHandleSubmit();
                navigate("/yoneticiler");
            });
        },
    });

    useEffect(() => {
        setHandleSubmit(() => formik.handleSubmit);
        setBackUrl("/yoneticiler");
    }, [formik.handleSubmit]);

    return (
        <>
            <form onSubmit={formik.handleSubmit} ref={formRef}>
                <div className="flex justify-between mb-8">
                    <div className="flex gap-1 items-center ">
                        <Link
                            to="/yoneticiler"
                            className="hover:bg-[#d4d4d4] p-2 rounded-lg cursor-pointer"
                        >
                            <Icon icon="ph:arrow-left-bold" />
                        </Link>
                        <h2 className="text-[1.25rem] font-bold">
                            Yeni yönetici
                        </h2>
                    </div>
                </div>
                <div className="pb-3 grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="lg:col-span-8 md:col-span-12 col-span-12">
                        <Card
                            className="w-full p-4 border-1 dark:border-0"
                            shadow="sm"
                        >
                            <CardHeader className="flex gap-3 p-0">
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium">
                                        Yönetici genel bilgiler
                                    </p>
                                </div>
                            </CardHeader>
                            <CardBody className="overflow-y-clip px-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-normal text-gray-600 dark:text-gray-300 "
                                        >
                                            Ad
                                        </label>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="John"
                                            variant="bordered"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.touched.name &&
                                            formik.errors.name && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {formik.errors.name}
                                                </p>
                                            )}
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-normal text-gray-600 dark:text-gray-300 "
                                        >
                                            Soyad
                                        </label>
                                        <Input
                                            type="text"
                                            id="surname"
                                            name="surname"
                                            variant="bordered"
                                            placeholder="Do"
                                            value={formik.values.surname}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.touched.surname &&
                                            formik.errors.surname && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {formik.errors.surname}
                                                </p>
                                            )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-normal text-gray-600 dark:text-gray-300 "
                                        >
                                            E-posta
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
                                            Telefon Numarası
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
                    </div>
                    <div className="lg:col-span-4 md:col-span-12 col-span-12">
                        <Card
                            className="w-full p-4 border-1 dark:border-0"
                            shadow="sm"
                        >
                            <CardHeader className="flex gap-3 p-0">
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium">
                                        Yönetici şifre belirleme
                                    </p>
                                </div>
                            </CardHeader>
                            <CardBody className="overflow-y-clip px-0">
                                <div className="grid grid-cols-1 md:grid-cols-1">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-normal text-gray-600 dark:text-gray-300 "
                                        >
                                            Şifre*
                                        </label>
                                        <Input
                                            type="password"
                                            id="password"
                                            name="password"
                                            variant="bordered"
                                            placeholder="****"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.touched.password &&
                                            formik.errors.password && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {formik.errors.password}
                                                </p>
                                            )}
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="password_confirmation"
                                            className="block mb-2 text-sm font-normal text-gray-600 dark:text-gray-300 "
                                        >
                                            Şifre Doğrulama*
                                        </label>
                                        <Input
                                            type="password"
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            variant="bordered"
                                            placeholder="*****"
                                            value={
                                                formik.values
                                                    .password_confirmation
                                            }
                                            onChange={formik.handleChange}
                                        />
                                        {formik.touched.password_confirmation &&
                                            formik.errors
                                                .password_confirmation && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {
                                                        formik.errors
                                                            .password_confirmation
                                                    }
                                                </p>
                                            )}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddAdmin;
