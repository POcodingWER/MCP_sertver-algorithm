import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

// 도구 이름 열거형
export enum ToolName {
  ECHO = "echo",
  LINKED_LIST = "linked-list",
  DOUBLY_LINKED_LIST = "doubly-linked-list",
  QUEUE = "queue",
  STACK = "stack",
}

// 도구 스키마 정의
export const ToolSchemas = {
  [ToolName.ECHO]: z.object({
    message: z.string().describe("메시지를 에코합니다"),
  }),
  [ToolName.LINKED_LIST]: z.object({
    operation: z
      .enum(["create", "append", "prepend", "delete", "find", "toArray"])
      .describe(
        "수행할 작업 - 먼저 create로 시작하고 반환된 listId를 저장해야 함"
      ),
    value: z
      .string()
      .optional()
      .describe("작업에 사용할 값 (append, prepend, delete, find 작업에 필수)"),
    listId: z
      .string()
      .optional()
      .describe(
        "연결 리스트 식별자 (create 제외한 모든 작업에 필수, create에서 반환됨)"
      ),
  }),
  [ToolName.DOUBLY_LINKED_LIST]: z.object({
    operation: z
      .enum([
        "create",
        "append",
        "prepend",
        "delete",
        "find",
        "toArray",
        "toArrayReverse",
      ])
      .describe(
        "수행할 작업 - 먼저 create로 시작하고 반환된 listId를 저장해야 함"
      ),
    value: z
      .string()
      .optional()
      .describe("작업에 사용할 값 (append, prepend, delete, find 작업에 필수)"),
    listId: z.string(),
  }),
  [ToolName.QUEUE]: z.object({
    operation: z
      .enum(["create", "isEmpty", "peek", "enqueue", "dequeue", "toString"])
      .describe(
        "수행할 작업 - 먼저 create로 시작하고 반환된 listId를 저장해야 함"
      ),
    value: z
      .string()
      .optional()
      .describe("작업에 사용할 값 (enqueue, dequeue, peek 작업에 필수)"),
    listId: z.string(),
  }),
  [ToolName.STACK]: z.object({
    operation: z
      .enum(["create", "isEmpty", "peek", "push", "pop", "toArray"])
      .describe(
        "수행할 작업 - 먼저 create로 시작하고 반환된 listId를 저장해야 함"
      ),
    value: z
      .string()
      .optional()
      .describe("작업에 사용할 값 (push, pop, peek 작업에 필수)"),
    listId: z.string(),
  }),
};

export const ToolListDescription = [
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
  {
    name: ToolName.DOUBLY_LINKED_LIST,
    description:
      "이중 연결 리스트 자료구조를 관리하고 조작합니다." +
      "사용법:" +
      '1) create 작업으로 시작하여 listId를 얻음 (예: operation: "create")' +
      "2) 얻은 listId를 이후 모든 작업에 사용" +
      '3) append/prepend: 리스트에 값 추가 (예: operation: "append", listId: "list_123", value: "some value")' +
      '4) delete/find: 값 삭제/검색 (예: operation: "find", listId: "list_123", value: "some value")' +
      '5) toArray: 전체 리스트 조회 (예: operation: "toArray", listId: "list_123")' +
      '6) toArrayReverse: 역순 전체 리스트 조회 (예: operation: "toArrayReverse", listId: "list_123")',
    inputSchema: zodToJsonSchema(ToolSchemas[ToolName.DOUBLY_LINKED_LIST]),
  },
  {
    name: ToolName.QUEUE,
    description:
      "큐 자료구조를 관리하고 조작합니다." +
      "사용법:" +
      '1) create 작업으로 시작하여 listId를 얻음 (예: operation: "create")' +
      "2) 얻은 listId를 이후 모든 작업에 사용" +
      '3) enqueue/dequeue: 큐에 값 추가/제거 (예: operation: "enqueue", listId: "queue_123", value: "some value")' +
      '4) peek: 큐의 맨 앞 값 조회 (예: operation: "peek", listId: "queue_123")' +
      '5) isEmpty: 큐가 비어있는지 확인 (예: operation: "isEmpty", listId: "queue_123")' +
      '6) toString: 큐의 내용 문자열로 반환 (예: operation: "toString", listId: "queue_123")',
    inputSchema: zodToJsonSchema(ToolSchemas[ToolName.QUEUE]),
  },
  {
    name: ToolName.STACK,
    description:
      "스택 자료구조를 관리하고 조작합니다." +
      "사용법:" +
      '1) create 작업으로 시작하여 listId를 얻음 (예: operation: "create")' +
      "2) 얻은 listId를 이후 모든 작업에 사용" +
      '3) push/pop: 스택에 값 추가/제거 (예: operation: "push", listId: "stack_123", value: "some value")' +
      '4) peek: 스택의 맨 위 값 조회 (예: operation: "peek", listId: "stack_123")' +
      '5) isEmpty: 스택이 비어있는지 확인 (예: operation: "isEmpty", listId: "stack_123")' +
      '6) toArray: 전체 스택 조회 (예: operation: "toArray", listId: "stack_123")',
    inputSchema: zodToJsonSchema(ToolSchemas[ToolName.STACK]),
  },
];
