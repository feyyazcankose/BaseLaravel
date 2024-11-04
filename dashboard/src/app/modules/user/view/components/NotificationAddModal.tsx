import NotificationAdd from "@app/modules/user/view/components/partial/NotificationAdd";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";

type Props = {
    id: number;
    onOpenChange: (isOpen: boolean) => void;
    isOpen: boolean;
};

export default function NotificationAddModal({
    id,
    isOpen,
    onOpenChange,
}: Props) {
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <NotificationAdd
                                    id={id}
                                    onClose={onClose}
                                ></NotificationAdd>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
