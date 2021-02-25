import { Hub } from "./utils";
import { sample_nodes } from "./utils";
import * as zmq from "zeromq";
import readline from "readline";

// // socket to talk to clients
// const requestor = new zmq.Request();

// const sendMsg = async (msg: string): Promise<void> => {
//   await requestor.send(msg);
// };

// const ping = async (workerbee: WorkerBee) => {
//   await workerbee.requestor.send(JSON.stringify({ id: workerbee.id, request: "ping" }));
//   let msgs: string[] = [];
//   for await (const reply of requestor) {
//     msgs.push(JSON.stringify(reply));
//   }
// };

// const manage = async (workerbees: WorkerBee[]) => {
//   console.log("Cortana initiated...checking worker states");

//   //let requestors: {id: number, requestor: zmq.Request}[] = [];
//   workerbees.forEach((workerbee) => {
//     //get requestor
//     workerbee.requestor = new zmq.Request();

//     //connect requestor
//     workerbee.requestor.connect(workerbee.socket);

//     //get requestor uptime
//     workerbee.ping = ping(workerbee);
//   });

//   console.log(workerbees);
// };

// manage(workerbees);

// process.on("SIGINT", function () {
//   // requestor.disconnect("tcp://127.0.0.1:1234");
//   requestor.close();
// });

(async () => {
  function terminate(): void {
    //close all sockets - do later
    console.log("terminating network connections and shutting down Hub");
    cortana.disconnect();
    process.exit(0);
  }

  const cortana = new Hub(sample_nodes);
  cortana.connect();
  console.log(await cortana.status());

  setInterval(() => {}, 1 << 30);
})();
