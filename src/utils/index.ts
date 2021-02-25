import { NNode } from "../types.ts";
import { Request, Reply } from "zeromq";
export { Hub } from "./classes";

export const sample_nodes: NNode[] = [
  {
    id: 1,
    name: "fetchPolySnap",
    socket: "tcp://127.0.0.1:8001",
    requestor: new Request(),
    receiver: new Reply(),
    pong: 0,
  },
  {
    id: 2,
    name: "savePolySnap",
    socket: "tcp://127.0.0.1:8002",
    requestor: new Request(),
    receiver: new Reply(),
    pong: 0,
  },
  {
    id: 3,
    name: "processPolySnap",
    socket: "tcp://127.0.0.1:8003",
    requestor: new Request(),
    receiver: new Reply(),
    pong: 0,
  },
];
