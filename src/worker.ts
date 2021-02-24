import * as zmq from "zeromq";

const responder = new zmq.Reply();

function successCallback() {
  console.log("Success binding to socket");
}

function failureCallback() {
  console.error("Failure to bind to socket: ");
}

const doWork = async (): Promise<void> => {
  await responder.bind("tcp://127.0.0.1:1234");

  for await (const msg of responder) {
    const now = new Date(Date.now()).toISOString();
    const request = JSON.stringify(msg);
    // console.log(JSON.parse(request));
    console.log(`${now}: message received: ${msg.toString()} \n`);
    console.log("slapping Mark...done.  Informing Brain.");
    responder.send("slap complete.");
  }
};

process.on("SIGINT", function () {
  responder.close();
});

doWork();
