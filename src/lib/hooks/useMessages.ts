import { useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import Message, { MessageType } from "@/src/types/message/Message";

export default function useMessages() {
	const [messages, setMessages] = useState<Message[]>([]);
	
	/**
	 * Add message
	 */
	const addMessage = (type: MessageType, message: string) => {
		const newMessage: Message = {
			id: messages.length + 1,
			type,
			message,
		};
		
		withReactContent(Swal).fire({
			icon: type,
			title: type === "error" ? "Oops..." : "",
			text: message,
			footer: type === "error" ? '<a href="#">Why do I have this issue?</a>' : "",
		});
		
		setMessages((prevMessages) => [...prevMessages, newMessage]);
	};
	
	/**
	 * Remove message
	 */
	const removeMessage = (id: number) => {
		setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
	};
	
	return {
		addMessage,
		removeMessage,
	};
}
