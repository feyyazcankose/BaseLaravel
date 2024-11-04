import NotificationList from "@app/modules/user/view/components/partial/NotificationList";
import {
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";

type Props = {
    id: number;
    onOpenChange: (isOpen: boolean) => void;
    isOpen: boolean;
    setIsOpenNotificationAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NotificationListModal({
    id,
    isOpen,
    onOpenChange,
    setIsOpenNotificationAdd,
}: Props) {
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <NotificationList
                                    id={id}
                                    setIsOpenNotificationAdd={
                                        setIsOpenNotificationAdd
                                    }
                                ></NotificationList>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    İptal
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Tamam
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
