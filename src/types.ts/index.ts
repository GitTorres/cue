// import { Request } from "zeromq";

export interface NNode {
  id: number;
  name: string;
  socket: string;
  requestor: any | void;
  receiver: any | void;
  pong: Promise<void> | number;
}
