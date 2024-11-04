import { addNotification } from "@app/modules/user/core/api/user.request";
import { IUserNotficationCreateRequest } from "@app/modules/user/core/models/user.interface";
import { FetchStatus } from "@base/enums/api.enum";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

type Props = {
    id: number;
    onClose: () => void;
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Başlık alanı zorunludur"),
});

const NotificationAdd = ({ id, onClose }: Props) => {
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
        FetchStatus.IDLE
    );
    const formik = useFormik({
        initialValues: {
            user_id: id,
            title: "",
            content: "",
        } as IUserNotficationCreateRequest,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (fetchStatus === FetchStatus.IDLE) {
                setFetchStatus(FetchStatus.LOADING);
                addNotification(values).then(() => {
                    toast.success("Bildirim başarıyla eklendi");
                    formik.values.title = "";
                    formik.values.content = "";
                    setFetchStatus(FetchStatus.SUCCEEDED);
                    onClose();
                    setTimeout(() => {
                        setFetchStatus(FetchStatus.IDLE);
                    }, 2000);
                });
            }
        },
    });

    return (
        <form className="my-8">
            <div className="flex gap-1 items-center mb-5">
                <h2 className="text-[1.25rem] font-bold">Yeni Bildirim</h2>
            </div>{" "}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                <div className="mb-3 ">
                    <div className="flex gap-4 items-end">
                        <div className="w-full">
                            <label
                                htmlFor="title"
                                className="block mb-2 text-sm font-normal text-gray-600 dark:text-gray-300 "
                            >
                                Başlık*
                            </label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Jhon"
                                variant="bordered"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.title && formik.errors.title && (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.title}
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
                                İçerik
                            </label>
                            <Textarea
                                type="text"
                                id="content"
                                name="content"
                                placeholder="Do"
                                variant="bordered"
                                value={formik.values.content}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.content &&
                                formik.errors.content && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {formik.errors.content}
                                    </p>
                                )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-5 gap-2">
                <Button color="danger" variant="light" onPress={onClose}>
                    İptal
                </Button>
                <Button
                    color="primary"
                    type="button"
                    onPress={() => formik.submitForm()}
                >
                    Oluştur
                </Button>
            </div>
        </form>
    );
};

export default NotificationAdd;
