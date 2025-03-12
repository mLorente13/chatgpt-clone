import { useEffect, useState } from "react";
import { getModels, sendMessageToApi, getChatMessages, uploadFile, updateChat } from "../api/api";
import { Link, useNavigate, useParams } from "react-router";

export default function Chat() {
	const navigate = useNavigate();
	const [models, setModels] = useState([]);
	const [currentModel, setCurrentModel] = useState(null);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState({ role: "user", content: "" });
	const params = useParams();

	useEffect(() => {
		getModels().then((data) => {
			setModels(data.data);
			setCurrentModel(data.data[0].id);
		});
		getChatMessages(params.id).then((data) => {
			if (Object.keys(data.chat).length === 0) {
				setMessages([]);
			} else {
				setMessages([...data.chat.history.messages]);
			}
		});
	}, [params.id]);

	function sendMessage(updatedMessages) {
		if (message) {
			setMessage("");
			sendMessageToApi(updatedMessages, currentModel).then((data) => {
				setMessages([...updatedMessages, data.choices[0].message]);
				updateChat(params.id, [...updatedMessages, data.choices[0].message]);
			});
			updateChat(params.id, updatedMessages, currentModel);
		}
	}

	return (
		<div className="flex flex-col items-center justify-between h-screen w-full">
			<header className="flex items-center justify-between w-full p-4 bg-gray-100">
				<Link to="/" className="text-blue-500">
					Back to Homepage{" "}
				</Link>
				<h1 className="text-2xl font-bold">{currentModel}</h1>
				<select onChange={(e) => setCurrentModel(e.target.value)}>
					{models.map((model) => (
						<option value={model.id} key={model.id}>
							{model.name}
						</option>
					))}
				</select>
			</header>
			<div className="w-3/4 flex flex-col items-start">
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`${
							msg.role === "user" ? "bg-blue-200 mr-auto " : "bg-green-200 ml-auto"
						} p-2 m-2 rounded-xl`}
					>
						{msg.content}
					</div>
				))}
			</div>
			<form className="w-11/12">
				<input
					onChange={(e) => {
						const newMessage = {
							role: "user",
							content: e.target.value,
						};
						setMessage(newMessage);
					}}
					type="text"
					className="rounded-t-xl w-full bg-gray-100 p-2"
					placeholder="¿Como puedo ayudarte hoy?"
				/>
				<div className="w-full flex items-center bg-gray-100 rounded-b-xl">
					<input
						type="file"
						className="p-2"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (!file) return;

							const formData = new FormData();
							formData.append("file", file);

							uploadFile(formData)
								.then((data) => console.log(data))
								.catch((err) => console.error("Upload failed:", err));
						}}
					/>

					<button
						onClick={(e) => {
							e.preventDefault();
							const updatedMessages = [...messages, message];
							setMessages(updatedMessages);
							sendMessage(updatedMessages);
						}}
						className="bg-white rounded-full p-2"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="icon icon-tabler icons-tabler-outline icon-tabler-send-2"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
							<path d="M6.5 12h14.5" />
						</svg>
					</button>
				</div>
			</form>
		</div>
	);
}
