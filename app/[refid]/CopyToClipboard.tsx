import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

const CopyToClipboard = ({ refid }: { refid: string }) => {
    const [copied, setCopied] = useState(false);
    const address = process.env.NEXT_PUBLIC_LOCATION;

    const handleCopy = () => {
        navigator.clipboard.writeText(address + refid).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
        }).catch(err => console.error("Copy failed:", err));
    };

    return (
        <label className="input cursor-pointer flex items-center gap-2 transition-all duration-150 active:scale-95" onClick={handleCopy}>
            <p className="text-2xl">{refid}</p>
            <span className="label relative w-5 h-5">
                <FaCopy
                    className={`absolute w-5 h-5 transition-opacity duration-300 ${copied ? "opacity-0" : "opacity-100"}`}
                />
                <FaCheck
                    className={`absolute w-5 h-5 text-green-500 transition-opacity duration-300 ${copied ? "opacity-100" : "opacity-0"}`}
                />
            </span>
        </label>
    );
};

export default CopyToClipboard;