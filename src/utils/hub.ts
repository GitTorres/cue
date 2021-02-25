import { NNode } from "../types.ts";

export class Hub {
  _network_id: number;
  _nodes: NNode[];
  _status: object;
  static _latest_id: number;

  constructor(nodes: NNode[]) {
    this._network_id = Hub.incrementId();
    this._nodes = nodes;
    this._status = { active: false, connections: 0 };
  }

  async ping(): Promise<Buffer[][]> {
    const req: Promise<void>[] = [];
    this._nodes.forEach(async (node) => {
      if (node.requestor) {
        req.push(node.requestor.send(JSON.stringify({ id: node.id, request: "ping" })));
      } else {
        console.log(`no request mechanism specified for node ${node.name}`);
      }
    });
    const req_resolve: void[] = await Promise.all(req);
    const rep: Buffer[][] = await Promise.all(this._nodes.map((node) => node.requestor.receive()));
    return rep;
  }

  connect() {
    this._nodes.forEach((node) => {
      node.requestor.connect(node.socket);
    });
    console.log(`connected to all nodes`);
  }

  disconnect() {
    this._nodes.forEach((node) => {
      node.requestor.disconnect(node.socket);
    });
    console.log(`disconnected from all nodes`);
  }

  async request() {
    return 0;
  }

  static incrementId(): number {
    if (!this._latest_id) {
      this._latest_id = 1;
    } else this._latest_id++;
    return this._latest_id;
  }

  async status() {
    const pong_replies = await this.ping();
    return {
      active: pong_replies.length > 0 ? true : false,
      connections: pong_replies.map((b) => b.toString()),
    };
  }
}
