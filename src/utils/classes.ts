import { NNode } from "../types.ts";

export class Node {
  _id: number;
  _status: object;
  _description: string;
  static _latest_id: number;

  constructor(description: string) {
    this._id = Node.incrementId();
    this._status = { active: false, connections: 0 };
    this._description = description;
  }

  ping(): Promise<any> | void {
    //ping other nodes in the network
    return;
  }

  connect(): Promise<any> | void {
    //connect node to the network
    return;
  }

  disconnect(): Promise<any> | void {
    //disconnect node from the network
    return;
  }

  request(): Promise<any> | void {
    //Submit a request to connections on the network
    return;
  }

  static incrementId(): number {
    if (!this._latest_id) {
      this._latest_id = 1;
    } else this._latest_id++;
    return this._latest_id;
  }

  async status(): Promise<any> {
    //report the node status
  }
}

//Supervisory node in the network
export class Hub extends Node {
  _supervises: NNode[];
  _status: object;

  constructor(description: string, supervises: NNode[]) {
    super(description);
    this._supervises = supervises;
    this._status = { active: false, connections: 0 };
  }

  async ping(): Promise<Buffer[][]> {
    const req: Promise<void>[] = [];
    this._supervises.forEach(async (node) => {
      if (node.requestor) {
        req.push(node.requestor.send(JSON.stringify({ id: node.id, request: "ping" })));
      } else {
        console.log(`no request mechanism specified for node ${node.name}`);
      }
    });
    //resolve all async ping requests
    await Promise.all(req);

    //resolve and return all async pong receipts
    const rep: Buffer[][] = await Promise.all(
      this._supervises.map((node) => node.requestor.receive())
    );
    return rep;
  }

  connect(): void {
    this._supervises.forEach((node) => {
      node.requestor.connect(node.socket);
    });
    console.log(`connected to all nodes`);
  }

  disconnect(): void {
    this._supervises.forEach((node) => {
      node.requestor.disconnect(node.socket);
    });
    console.log(`disconnected from all nodes`);
  }

  async request(): Promise<any> {
    return 0;
  }

  async status(): Promise<object> {
    const pong_replies = await this.ping();
    return {
      active: pong_replies.length > 0 ? true : false,
      connections: pong_replies.map((b) => b.toString()),
    };
  }
}
