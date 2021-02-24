import express from "express";
import * as zmq from "zeromq";
import readline from "readline";

const app = express();
const PORT = 8000;
const sock = new zmq.Push();

// app.listen(PORT, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
// });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const execjobs = async (): Promise<void> => {
  //bind to PUSH-PULL socket
  await sock.bind("tcp://127.0.0.1:1234");
  console.log("server communicating on port 1234");

  rl.question(`Enter the number of jobs to run: `, (n) => {
    exec(n);
    rl.close();
  });
};

const exec = async (n: string): Promise<void> => {
  console.log("Initating jobs");
  for (let i = 1; i <= parseInt(n); i++) {
    await sock.send(`${i}`);
  }
};

execjobs();
