export enum Sender {
	SYSTEM,
	USER
}

export interface IMessage {
	timestamp: Date,
	sender: Sender,
	content: string
}