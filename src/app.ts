import { Hub } from "./utils";
import { sample_nodes } from "./utils";

(async () => {
  function terminate(): void {
    console.log("terminating network connections and shutting down Hub");
    cortana.disconnect();
    process.exit(0);
  }

  const cortana = new Hub("main controller", sample_nodes);
  cortana.connect();
  console.log(await cortana.status());

  setInterval(() => {}, 1 << 30);

  process.on("SIGINT", function () {
    terminate();
  });
})();
