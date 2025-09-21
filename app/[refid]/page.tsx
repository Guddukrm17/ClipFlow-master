'use client'

import React, { useCallback, useEffect } from 'react'
import { useParams } from "next/navigation";
import { MdSave } from "react-icons/md";
import { FaCopy } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import CopyToClipboard from './CopyToClipboard';
import post_text from '../api_requests/post_text';
import get_text from '../api_requests/get_text';
import UploadFile from './UploadFile';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const Page = () => {
    const params = useParams();
    const refid = params?.refid as string;
    const [text, setText] = React.useState<string>('');
    const [fileUrl, setFileUrl] = React.useState<string>('None');
    const [saved, setSaved] = React.useState<boolean>(false);
    const [copied, setCopied] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);

    const handleSave = async () => {
        if (text !== '') {
            const res = await post_text(refid, text);
            if (res.success) {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000); // Reset icon after 2 seconds
            }
            else {
                toast.error(res.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        } else {
            toast.error('No text Entered!', {
                position: "bottom-right",
                autoClose: 5000,
                closeOnClick: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

    const handleCopy = () => {
        if (text !== '') {
            navigator.clipboard.writeText(text).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
            }).catch(err => {
                console.log(err);
                toast.error('copy Failed!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "dark",
                    transition: Bounce,
                })
            }
            );
        } else {
            toast.error('No text to copy!', {
                position: "bottom-right",
                autoClose: 5000,
                closeOnClick: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

    // Use useCallback to memoize handleRefresh
    const handleRefresh = useCallback(() => {
        get_text(refid).then(res => {
            setLoading(false);
            if (res.success) {
                setText(res.data.text);
                setFileUrl(res.data.fileUrl);
            }
        });
    }, [refid]); // Only change if refid changes

    // Now useEffect will not re-run unnecessarily
    useEffect(() => {
        handleRefresh();
    }, [handleRefresh]);

    return (
        <>
            <div className='flex gap-10 flex-col items-center h-[calc(100vh-100px)] py-10'>
                <div>
                    <p>Link to this clipboard</p>
                    <CopyToClipboard refid={refid} />

                </div>
                <div className='w-[80%] max-w-4xl'>
                    {
                        loading ?
                            <div className="bg-base-300 border-transparent outline-none ring-0 
                                            focus:outline-none focus:border-transparent 
                                            focus-visible:outline-none focus-visible:ring-0 
                                            resize-none w-full h-72 rounded-sm flex justify-center items-center">
                                <span className="loading loading-dots loading-xl"></span>
                            </div>
                            :
                            <textarea
                                className="textarea bg-base-300 border-transparent outline-none ring-0 
                                            focus:outline-none focus:border-transparent 
                                            focus-visible:outline-none focus-visible:ring-0 resize-none
                                            w-full h-72 "
                                placeholder="Type here ..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                    }
                    <div className='flex flex-col sm:flex-row gap-2 mt-3 px-2.5 sm:items-center sm:justify-between'>
                        <div className='flex gap-2'>
                            <button className='btn btn-primary flex-1 sm:w-auto' onClick={handleSave} disabled={loading}>
                                {
                                    saved ?
                                        <FaCheck className={`w-5 h-5 text-green-500 transition-opacity duration-300 ${saved ? "opacity-100" : "opacity-0"}`} />
                                        :
                                        <MdSave className={`w-5 h-5 transition-opacity duration-300 ${saved ? "opacity-0" : "opacity-100"}`} />
                                }
                                Save
                            </button>
                            <button className='btn btn-secondary flex-1 sm:w-auto' onClick={handleCopy} disabled={loading}>
                                {
                                    copied ?
                                        <FaCheck className={`w-5 h-5 text-green-500 transition-opacity duration-300 ${copied ? "opacity-100" : "opacity-0"}`} />
                                        :
                                        <FaCopy className={`w-5 h-5 transition-opacity duration-300 ${copied ? "opacity-0" : "opacity-100"}`} />
                                }
                                Copy
                            </button>
                        </div>
                        <button className='btn btn-ghost' onClick={handleRefresh} disabled={loading}>
                            <IoMdRefresh className='w-6 h-6' />Refresh
                        </button>
                    </div>
                </div>
                <UploadFile refid={refid} fileUrl={fileUrl} setFileUrl={setFileUrl} loading={loading} />
            </div>
            <ToastContainer />
        </>
    )
}

export default Page