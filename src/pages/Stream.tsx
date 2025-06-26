import { Power, PowerOff } from "lucide-react";
import ConfirmModal from "../components/modal/ConfirmModal";
import { Button } from "../components/ui/button"
import useStore from "../context/store";
import { useGetCheckStream } from "../hooks/admin/stream/check-stream";
import { useStopStream } from "../hooks/admin/stream/end-stream";
import { useStartStream } from "../hooks/admin/stream/start-stream";
import { useConfirmModal } from "../components/modal/useConfirmMOdal";
import { useGetFree } from "../hooks/free/free.get";
import { useUpdateFree } from "../hooks/free/free.update";
import PlayerStream from "../components/PlayerStream";
import { useState } from "react";
import Spinner from "../components/spinner/Spinner";

const Stream = () => {
    const role = useStore((s) => s.role);

    const { data: streamStatus } = useGetCheckStream();
    const { isOpen: isConfirmOpen, message, openModal, closeModal, onConfirm } = useConfirmModal();
    const { data: freeData } = useGetFree();
    const [videoLoaded, setVideoLoaded] = useState(false);

    const startStream = useStartStream();
    const stopStream = useStopStream();

    const isStreamActive = streamStatus?.stream === "yoniq";
    const { mutate: updateFree } = useUpdateFree();


    const handleUpdate = (id: string) => {
        openModal(
            `Ishonchingiz komilmi, rostdan ham ${freeData?.free ? "pullik tarifga o'tmoqchimisiz?" : "bepul tarifga o'tmoqchimisiz?"
            }`,
            () => {
                updateFree({ id, free: !freeData?.free });
            }
        );
    };

    return (
        <div>
            {role === "superadmin" && (
                <div className="mb-10 flex flex-col items-center gap-6">
                    <Button
                        onClick={() => handleUpdate(freeData?.id as string)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 text-lg"
                    >
                        <span>Tomosha qilish</span>
                        <span
                            className={`font-bold ${freeData?.free ? "text-green-300" : "text-red-300"
                                }`}
                        >
                            {freeData?.free ? "Bepul" : "Pullik"}
                        </span>
                    </Button>

                    {/* Stream Control Section */}
                    <div className="flex flex-col items-center gap-4 bg-white rounded-2xl shadow-md p-6 w-full max-w-md">
                        <p className="text-lg font-medium text-gray-800 flex items-center gap-2">
                            <span
                                className={`w-3 h-3 rounded-full ${isStreamActive ? "bg-green-500" : "bg-red-500"
                                    }`}
                            ></span>
                            Hozirgi holat: {isStreamActive ? "🟢 YONIQ" : "🔴 O'CHIQ"}
                        </p>
                        <div className="flex gap-4">
                            <Button
                                onClick={() => startStream.mutate()}
                                disabled={isStreamActive}
                                className={`flex items-center gap-2 ${isStreamActive
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-700"
                                    } text-white font-medium py-2 px-4 rounded-lg transition-all duration-200`}
                            >
                                <Power size={18} />
                                Streamni Yoqish
                            </Button>
                            <Button
                                onClick={() => stopStream.mutate()}
                                disabled={!isStreamActive}
                                className={`flex items-center gap-2 ${!isStreamActive
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-red-600 hover:bg-red-700"
                                    } text-white font-medium py-2 px-4 rounded-lg transition-all duration-200`}
                            >
                                <PowerOff size={18} />
                                Streamni O'chirish
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-center items-center relative">
                {!videoLoaded && (
                    <div className="absolute flex justify-center items-center bg-black/50 rounded-2xl w-full max-w-4xl h-[500px]">
                        <Spinner />
                    </div>
                )}
                <PlayerStream
                    src="https://stream.jsporttv.com/live/stream.m3u8"
                    autoPlay
                    muted
                    className="rounded-2xl shadow-lg"
                    onLoadedMetadata={() => setVideoLoaded(true)}
                />
            </div>

            <ConfirmModal
                isOpen={isConfirmOpen}
                message={message}
                onConfirm={onConfirm}
                closeModal={closeModal}
            />
        </div>
    )
}

export default Stream