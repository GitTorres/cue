import { NNode } from "../types.ts";

export class Hub {
  _network_id: number;
  _nodes: NNode[] | NNode;
  _status: object;
  static _latest_id: number;

  constructor(nodes: NNode[]) {
    this._network_id = Hub.incrementId();
    this._nodes = nodes;
    this._status = { active: false, connections: 0 };
  }

  async ping(): Promise<void> {
    //confirm which sockets are available
    if ("forEach" in this._nodes) {
      this._nodes.forEach(async (node) => {
        if (node.requestor !== undefined) {
          console.log(`Pinging node ${node.name}`);
          await node.requestor.send(JSON.stringify({ id: node.id, request: "ping" }));
          for await (const msg of node.requestor) {
            console.log(JSON.stringify(msg));
          }
        } else {
          console.log(`no connection to node ${node.name}`);
        }
      });
    } else {
      if (this._nodes.requestor !== undefined) {
        await this._nodes.requestor.send(JSON.stringify({ id: this._nodes.id, request: "ping" }));
        const msg = await this._nodes.requestor.receive();
        console.log(JSON.stringify(msg));
      }
    }
  }

  connect() {
    if ("forEach" in this._nodes) {
      this._nodes.forEach((node) => {
        node.requestor.bind(node.socket);
        console.log(`connected to node ${node.name}`);
      });
    } else {
      this._nodes.requestor.bind(this._nodes.socket);
      console.log(`connected to node ${this._nodes.name}`);
    }
  }

  disconnect() {
    return 0;
  }

  request() {
    return 0;
  }

  static incrementId(): number {
    if (!this._latest_id) {
      this._latest_id = 1;
    } else this._latest_id++;
    return this._latest_id;
  }

  // get status() {
  //   const active_connections = this.ping();
  //   return {
  //     active: active_connections > 0 ? true : false,
  //     connections: active_connections,
  //   };
  // }
}
