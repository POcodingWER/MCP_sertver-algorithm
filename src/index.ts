#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./createServer";

async function main() {
  const transport = new StdioServerTransport();
  const { server } = createServer();

  console.log("MCP 서버가 stdio 모드로 시작되었습니다...");
  await server.connect(transport);

  process.on("SIGINT", async () => {
    await server.close();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error("서버 오류:", error);
  process.exit(1);
});
