import { sample_nodes } from "../utils";
import { NNode } from "../types.ts";

//Needs to be updated to use the new Node class!!

async function start(nodes: NNode): Promise<void> {
  await nodes.receiver.bind(nodes.socket);

  for await (const msg_one of nodes.receiver) {
    const now = new Date(Date.now()).toISOString();
    console.log(`${now}: request: ${msg_one.toString()} \n`);
    nodes.receiver.send(`pong1: ${now}`);
  }
  setInterval(() => {}, 1 << 30);
}

(async () => {
  start(sample_nodes[0]);
})();
