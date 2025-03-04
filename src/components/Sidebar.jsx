import { Link, Outlet, useNavigate, useParams } from "react-router";
import { createChat, getChats, deleteChat } from "../api/api";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const params = useParams();
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getChats().then((data) => {
            setChats(data);
        });
    }, []);
    return (
        <div className="flex">
            <div className="h-screen w-1/4 bg-gray-100">
                <h1 className="text-2xl font-bold">Sidebar</h1>
                <button
                    onClick={() => {
                        createChat().then(() => {
                            getChats().then((data) => {
                                setChats(data);
                                navigate(`/chat/${data[data.length - 1].id}`);
                            });
                        });
                    }}
                >
                    New Chat
                </button>
                <div className="flex flex-col items-start gap-2">
                    {chats.map((chat) => (
                        <div className="flex gap-2 items-center" key={chat.id}>
                            <Link
                                className="flex gap-2 items-center w-full hover:bg-gray-200 rounded-md p-2"
                                to={`/chat/${chat.id}`}
                                key={chat.id}
                            >
                                <div>{chat.title}</div>
                            </Link>
                            <button
                                className="z-30 bg-red-500 text-white p-2 rounded-md cursor-pointer"
                                onClick={() => {
                                    deleteChat(chat.id);
                                    if (params.id == chat.id) {
                                        navigate("/");
                                    }
                                    setChats(
                                        chats.filter((c) => c.id !== chat.id)
                                    );
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Outlet />
        </div>
    );
}
