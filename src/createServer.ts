import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { ToolHandlers, ToolName, ToolSchemas } from "./tool";
import { zodToJsonSchema } from "zod-to-json-schema";

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
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    const tools = [
      {
        name: ToolName.ECHO,
        description: "입력된 메시지를 그대로 반환합니다",
        inputSchema: zodToJsonSchema(ToolSchemas[ToolName.ECHO]),
      },
    ];

    return { tools };
  });

  // 도구 호출 핸들러
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    if (name === ToolName.ECHO) {
      return ToolHandlers[ToolName.ECHO](args);
    }
    throw new Error(`알 수 없는 도구: ${name}`);
  });

  return { server };
}
