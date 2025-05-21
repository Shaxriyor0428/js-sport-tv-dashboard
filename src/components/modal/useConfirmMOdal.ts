import { useState } from "react";

export const useConfirmModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

    const openModal = (message: string, onConfirmAction: () => void) => {
        setMessage(message);
        setOnConfirm(() => onConfirmAction);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setOnConfirm(null);
    };

    return { isOpen, message, openModal, closeModal, onConfirm };
};
