import { z } from "zod";

// 도구 이름 열거형
export enum ToolName {
  ECHO = "echo",
}

// 도구 스키마 정의
export const ToolSchemas = {
  [ToolName.ECHO]: z.object({
    message: z.string().describe("메시지를 에코합니다"),
  }),
};

// 도구 호출 핸들러
export const ToolHandlers = {
  [ToolName.ECHO]: async (args: Record<string, unknown> | undefined) => {
    const validatedArgs = ToolSchemas[ToolName.ECHO].parse(args);
    return {
      content: [
        {
          type: "text",
          text: `에코: ${validatedArgs.message}`,
        },
      ],
    };
  },
};
