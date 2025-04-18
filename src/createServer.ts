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
  //{"jsonrpc":"2.0","id":"1","method":"tools/list","params":{}}
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    const tools = [
      {
        name: ToolName.ECHO,
        description: "입력된 메시지를 그대로 반환합니다",
        inputSchema: zodToJsonSchema(ToolSchemas[ToolName.ECHO]),
      },
      {
        name: ToolName.LINKED_LIST,
        description:
          "연결 리스트 자료구조를 관리하고 조작합니다." +
          "사용법:" +
          '1) create 작업으로 시작하여 listId를 얻음 (예: operation: "create")' +
          "2) 얻은 listId를 이후 모든 작업에 사용" +
          '3) append/prepend: 리스트에 값 추가 (예: operation: "append", listId: "list_123", value: "some value")' +
          '4) delete/find: 값 삭제/검색 (예: operation: "find", listId: "list_123", value: "some value")' +
          '5) toArray: 전체 리스트 조회 (예: operation: "toArray", listId: "list_123")',
        inputSchema: zodToJsonSchema(ToolSchemas[ToolName.LINKED_LIST]),
      },
    ];

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
