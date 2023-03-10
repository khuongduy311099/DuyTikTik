import React from "react";
import {useRouter} from "next/router";
import {topics} from "../utils/constants";
import Link from "next/link";
const Discover = () => {
    const router = useRouter();
    const currentTopic = router?.query?.topic;

    const activeToppicStyle =
        "xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]";

    const topicStyle =
        "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";
    return (
        <div className="xl:border-b-2 xl:border-gray-2 pb-6">
            <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
                Popular Topics
            </p>
            <div className="w-full flex gap-3 flex-wrap">
                {topics.map((topic) => (
                    <Link href={`/?topic=${topic.name}`} key={topic?.name}>
                        <div
                            className={
                                currentTopic === topic?.name
                                    ? activeToppicStyle
                                    : topicStyle
                            }
                        >
                            <span className="font-bold text-2xl xl:text-md">
                                {topic?.icon}
                            </span>
                            <span className="font-medium text-md hidden xl:block capitalize">
                                {topic?.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Discover;
