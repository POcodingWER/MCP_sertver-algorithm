import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { ToolHandlers } from "./tool";
import { ToolName } from "./tool/ToolSchemas";
import { ToolListDescription } from "./tool/ToolDescription";

// 서버 생성 함수
export function createServer() {
  const server = new Server(
    {
      name: "mcp-server-algorithm",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // 도구 목록 핸들러
  //{"jsonrpc":"2.0","id":"1","method":"tools/list","params":{}}
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    const tools = ToolListDescription;
    return { tools };
  });

  // 도구 호출 핸들러
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    // 도구 이름에 따라 해당 핸들러 호출
    if (Object.values(ToolName).includes(name as ToolName)) {
      return ToolHandlers[name as ToolName](args);
    }
    throw new Error(`알 수 없는 도구: ${name}`);
  });

  return { server };
}
