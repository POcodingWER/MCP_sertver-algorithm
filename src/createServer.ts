import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// 도구 스키마 정의
const EchoSchema = z.object({
  message: z.union([z.string(), z.number()]).describe("메시지를 에코합니다"),
});

// 도구 이름 열거형
enum ToolName {
  ECHO = "echo",
}

// 서버 생성 함수
export function createServer() {
  const server = new Server(
    {
      name: "my-first-mcp-server",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  /** 도구 목록 핸들러
   *    {"jsonrpc":"2.0","id":1,"method":"tools/list"}
   */
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    const tools = [
      {
        name: ToolName.ECHO,
        description: "입력된 메시지를 그대로 반환합니다",
        inputSchema: zodToJsonSchema(EchoSchema),
      },
    ];

    return { tools };
  });

  /** 도구 호출 핸들러
   *    {"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"echo","arguments":{"message":"안녕하세요"}}}
   */
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    if (name === ToolName.ECHO) {
      const validatedArgs = EchoSchema.parse(args);
      return {
        content: [
          {
            type: "text",
            text: `에코: ${validatedArgs.message}`,
          },
        ],
      };
    }

    throw new Error(`알 수 없는 도구: ${name}`);
  });

  // 서버 객체 반환
  return { server };
}
