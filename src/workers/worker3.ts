import * as zmq from "zeromq";
import { sample_nodes } from "./utils";
import { NNode } from "./types.ts";

const doWork = async (nodes: NNode[]): Promise<void> => {
  // nodes[0].receiver.connect(nodes[0].socket);
  await nodes[2].receiver.bind(nodes[2].socket);
  // nodes[2].receiver.connect(nodes[2].socket);

  // const msg = await nodes[2].receiver.receive();
  // if (JSON.parse(msg.toString()).request == "ping") nodes[2].receiver.send("pong");

  // //node A
  // for await (const msg_one of nodes[0].receiver) {
  //   const now = new Date(Date.now()).toISOString();
  //   console.log(`${now}: request: ${msg_one.toString()} \n`);
  //   nodes[0].receiver.send("pong");
  // }

  //node B
  // for await (const msg_two of nodes[1].receiver) {
  //   const now = new Date(Date.now()).toISOString();
  //   console.log(`${now}: request: ${msg_two.toString()} \n`);
  //   nodes[1].receiver.send("pong");
  // }

  //node C
  for await (const msg_three of nodes[2].receiver) {
    const now = new Date(Date.now()).toISOString();
    console.log(`${now}: request: ${msg_three.toString()} \n`);
    nodes[2].receiver.send(`pong3: ${now}`);
  }

  setInterval(() => {}, 1 << 30);
};

doWork(sample_nodes);
