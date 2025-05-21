import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: (() => void) | null;
  closeModal: () => void;
}

export const ConfirmModal = ({
  isOpen,
  message,
  onConfirm,
  closeModal,
}: ConfirmModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-sm bg-white rounded-xl shadow-lg py-6 px-6">
        <DialogHeader className="flex flex-col items-center text-center gap-2">
          <AlertTriangle className="w-10 h-10 text-yellow-500" />
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Ishonchingiz komilmi ?
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {message}
          </DialogDescription>
        </DialogHeader>
         <button onClick={closeModal}>
            <X className="w-6 h-6 absolute top-4 right-4" />
          </button>

        <div className="mt-6 flex justify-center gap-4">
          <Button
            variant="secondary"
            onClick={closeModal}
            className="px-6 py-2 border rounded-lg"
          >
            Bekor qilish
          </Button>
          <Button
            onClick={() => {
              if (onConfirm) onConfirm();
              closeModal();
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Ha, davom et
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
