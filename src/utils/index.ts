import { WorkerBee } from "../types.ts";

export const workerbees: WorkerBee[] = [
  { id: 1, name: "fetchPolySnap", socket: "tcp://127.0.0.1:1000", requestor: undefined, ping: 0 },
  { id: 2, name: "savePolySnap", socket: "tcp://127.0.0.1:1001", requestor: undefined, ping: 0 },
  { id: 3, name: "processPolySnap", socket: "tcp://127.0.0.1:1002", requestor: undefined, ping: 0 },
];
