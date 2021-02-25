import { Request, Reply } from "zeromq";

export interface NNode {
  id: number;
  name: string;
  socket: string;
  requestor: Request;
  receiver: Reply;
  pong: number;
}
