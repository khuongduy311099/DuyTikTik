import axios from "axios";
import VideoCard from "../components/VideoCard";
import {Video} from "../types";
import NoResult from "./../components/NoResult";

interface IProps {
    videos: Video[];
}

export default function Home({videos}: IProps) {
    return (
        <div className="flex flex-col gap-10 videos h-full">
            {videos.length ? (
                videos.map((video: Video, i: number) => (
                    <VideoCard post={video} key={video._id} />
                ))
            ) : (
                <div>
                    <NoResult text="No result" />
                </div>
            )}
        </div>
    );
}

export const getServerSideProps = async () => {
    const {data} = await axios.get(`http://localhost:3000/api/post`);

    return {
        props: {
            videos: data,
        },
    };
};
