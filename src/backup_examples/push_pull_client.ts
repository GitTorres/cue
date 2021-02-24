import * as zmq from "zeromq";

const sock = new zmq.Pull();

const doWork = async (): Promise<void> => {
  sock.connect("tcp://127.0.0.1:1234");
  console.log("Worker connected to server");
  for await (const msg of sock) {
    const now = new Date(Date.now()).toISOString();
    console.log(`${now}: task ${msg.toString()} start \n`);
    console.log(`${now}: task ${msg.toString()} end \n`);
  }
};

doWork();
