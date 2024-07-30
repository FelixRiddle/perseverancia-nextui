export type MessageType = "success" | "error" | "warning" | "info";

export default interface Message {
	id: number;
	type: MessageType;
	message: string;
	error?: boolean;
}
