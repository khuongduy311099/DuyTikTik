import Image from "next/image";
import Link from "next/link";
import React from "react";
import {AiOutlineLogout} from "react-icons/ai";
import {BiSearch} from "react-icons/bi";
import {IoMdAdd} from "react-icons/io";
import {GoogleLogin, googleLogout} from "@react-oauth/google";

import logo from "../utils/tiktik-logo.png";
import {createOrGetUser} from "../utils";
import useAuthStore from "../store/authStore";
const Navbar = () => {
    const {userProfile, addUser, removeUser} = useAuthStore();
    return (
        <div className="w-full flex justify-between item-center border-b-2 border-gray-200 py-2 px-4">
            <Link href="/">
                <div className="w-[100px] md:w-[130px]">
                    <Image
                        className="cursor-pointer "
                        src={logo}
                        alt="tiktik-logo"
                        layout="responsive"
                    />
                </div>
            </Link>
            <div>Search</div>
            <div>
                {userProfile ? (
                    <div className="flex gap-5 md;gap-10">
                        <Link href="/upload">
                            <button className="flex border-2 px-2 md:px-4 text-md fomt-semibold items-center gap-2 p-1 hover:border-black">
                                <IoMdAdd className="text-xl" />
                                <span className="hidden md:block">Upload</span>
                            </button>
                        </Link>
                        {userProfile?.image && (
                            <Link href="/">
                                <>
                                    <Image
                                        width={35}
                                        height={35}
                                        src={userProfile?.image}
                                        alt="user-avatar"
                                        className="rounded-full"
                                    />
                                </>
                            </Link>
                        )}
                        <button type="button">
                            <AiOutlineLogout
                                color="red"
                                fontSize={25}
                                onClick={() => {
                                    googleLogout();
                                    removeUser();
                                }}
                            />
                        </button>
                    </div>
                ) : (
                    <GoogleLogin
                        onSuccess={(res) => {
                            createOrGetUser(res, addUser);
                        }}
                        onError={() => console.log("err")}
                    />
                )}
            </div>
        </div>
    );
};

export default Navbar;
