import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import React from "react";
import { IFeedbackResponseP } from "@app/modules/feedback/core/models/feedback.interface";
import { FetchStatus } from "@base/enums/api.enum";
import { getFeedback } from "@app/modules/feedback/core/api/feedback.request";
import Loader from "@base/layout/components/loader/Loader";
import zmoment from "@base/helpers/enhencers/Moment";

const ViewFeedback = ({
    isOpen,
    onOpenChange,
    feedbackId,
}: {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    feedbackId: number;
}) => {
    const [feedback, setFeedback] = React.useState<IFeedbackResponseP | null>(
        null
    );
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
        FetchStatus.IDLE
    );

    React.useEffect(() => {
        if (feedbackId) {
            setFetchStatus(FetchStatus.LOADING);
            getFeedback(feedbackId).then((res) => {
                setFeedback(res.data);
                setFetchStatus(FetchStatus.SUCCEEDED);
            });
        }
    }, [feedbackId]);

    if (fetchStatus !== FetchStatus.SUCCEEDED) return <Loader />;

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <form>
                                <ModalHeader className="flex flex-col gap-1">
                                    {feedback?.user.name}{" "}
                                    {feedback?.user.surname}
                                    <p className="font-light text-sm">
                                        {feedback?.created_at
                                            ? zmoment(
                                                  feedback.created_at
                                              ).fromNow()
                                            : ""}
                                    </p>
                                </ModalHeader>
                                <ModalBody>
                                    <div className="flex flex-col gap-5 mb-4">
                                        {feedback?.message}
                                    </div>
                                </ModalBody>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ViewFeedback;
