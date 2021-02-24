import { Request } from "zeromq";

export interface WorkerBee {
  id: number;
  name: string;
  socket: string;
  requestor: any | void;
  ping: Promise<void> | number;
}
