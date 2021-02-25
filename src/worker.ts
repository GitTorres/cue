import * as zmq from "zeromq";
import { sample_nodes } from "./utils";
import { NNode } from "./types.ts";

async function start(nodes: NNode[]): Promise<void> {
  await nodes[0].receiver.bind(nodes[0].socket);
  // nodes[1].receiver.connect(nodes[1].socket);
  // nodes[2].receiver.connect(nodes[2].socket);

  //node A
  for await (const msg_one of nodes[0].receiver) {
    const now = new Date(Date.now()).toISOString();
    console.log(`${now}: request: ${msg_one.toString()} \n`);
    nodes[0].receiver.send(`pong1: ${now}`);
  }
  setInterval(() => {}, 1 << 30);
}

(async () => {
  start(sample_nodes);
})();
