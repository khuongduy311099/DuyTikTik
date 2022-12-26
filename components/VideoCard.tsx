import {NextPage} from "next";
import React, {useState, useEffect, useRef} from "react";
import Image from "next/image";
import Link from "next/link";
import {
    BsPlay,
    BsFillPlayFill,
    BsFillPauseFill,
    BsFillVolumeMuteFill,
} from "react-icons/bs";
import {GoVerified, GoUnmute} from "react-icons/go";

import {Video} from "./../types.d";

interface IProps {
    post: Video;
}
const VideoCard: NextPage<IProps> = ({post}) => {
    const [isHover, setisHover] = useState(false);
    const [playing, setplaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const onVideoPress = () => {
        if (playing) {
            videoRef?.current?.pause();
            setplaying(false);
        } else {
            videoRef?.current?.play();
            setplaying(true);
        }
    };
    return (
        <div className="flex flex-col border-b-2 border-gray-200 pb-6">
            <div>
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
                    <div className="md:w-16 md:h-16 w-10 h-10">
                        <Link href="/">
                            <>
                                <Image
                                    width={62}
                                    height={62}
                                    src={post?.postedBy?.image}
                                    alt="user-avatar"
                                    layout="responsive"
                                />
                            </>
                        </Link>
                    </div>
                    <Link href="/">
                        <div className="flex items-center gap-2">
                            <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                                {post.postedBy.userName}
                                <GoVerified className="text-blue-400 text-md" />
                            </p>
                            <p className="capitalize font-medium text-gray-500 hidden md:block text-xs">
                                {post.postedBy.userName}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="lg:ml-20 flex gap-4 relative">
                <div
                    onMouseEnter={() => {
                        setisHover(true);
                    }}
                    onMouseLeave={() => {
                        setisHover(false);
                    }}
                    className="rounded-3xl"
                >
                    <Link href="/">
                        <video
                            src={post.video.asset.url}
                            ref={videoRef}
                            loop
                            className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-3xl cursor-pointer bg-gray-100"
                        ></video>
                    </Link>

                    {isHover && (
                        <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10  w-[100px] md:w-[50px] p-3 ">
                            <div>
                                {!playing ? (
                                    <button
                                        onClick={onVideoPress}
                                        className="text-black text-2xl lg:text-2xl"
                                    >
                                        <BsFillPlayFill />
                                    </button>
                                ) : (
                                    <button
                                        onClick={onVideoPress}
                                        className="text-black text-2xl lg:text-2xl"
                                    >
                                        <BsFillPauseFill />
                                    </button>
                                )}
                            </div>
                            <div>
                                {muted ? (
                                    <button
                                        onClick={() =>
                                            setMuted((prev) => !prev)
                                        }
                                        className="text-black text-2xl lg:text-2xl"
                                    >
                                        <BsFillVolumeMuteFill />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            setMuted((prev) => !prev)
                                        }
                                        className="text-black text-2xl lg:text-2xl"
                                    >
                                        <GoUnmute />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
