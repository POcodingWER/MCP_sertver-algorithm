import { z } from "zod";

// 도구 이름 열거형
export enum ToolName {
  ECHO = "echo",
  LINKED_LIST = "linked-list",
  DOUBLY_LINKED_LIST = "doubly-linked-list",
  QUEUE = "queue",
  STACK = "stack",
  HASH_TABLE = "hash-table",
  HEAP = "heap",
  PRIORITY_QUEUE = "priority-queue",
  TRIE = "trie",
  BINARY_SEARCH_TREE = "binary-search-tree",
  AVL_TREE = "avl-tree",
  RED_BLACK_TREE = "red-black-tree",
  IS_POWER_OF_TWO = "is-power-of-two",
}

const DATA_STRUCTURE_TOOLS = {
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
  [ToolName.HASH_TABLE]: z.object({
    operation: z
      .enum(["create", "set", "get", "delete", "has", "getKeys"])
      .describe(
        "수행할 작업 - 먼저 create로 시작하고 반환된 listId를 저장해야 함"
      ),
    key: z
      .string()
      .optional()
      .describe("해시 테이블의 키 (set, get, delete, has 작업에 필수)"),
    value: z.string().optional().describe("해시 테이블의 값 (set 작업에 필수)"),
    listId: z.string(),
  }),
  [ToolName.HEAP]: z.object({
    operation: z.enum([
      "create",
      "add",
      "poll",
      "find",
      "remove",
      "toString",
      "peek",
    ]),
    value: z.number().optional().describe("힙의 값 (add, remove 작업에 필수)"),
    listId: z.string(),
  }),
  [ToolName.PRIORITY_QUEUE]: z.object({
    operation: z
      .enum([
        "create",
        "add",
        "remove",
        "changePriority",
        "findByValue",
        "hasValue",
        "compareValue",
      ])
      .describe(
        "수행할 작업 - 먼저 create로 시작하고 반환된 listId를 저장해야 함"
      ),
    value: z
      .string()
      .optional()
      .describe(
        "작업에 사용할 값 (add, remove, changePriority, findByValue, hasValue 작업에 필수)"
      ),
    value1: z.string().optional().describe("compareValue 작업의 첫 번째 값"),
    value2: z.string().optional().describe("compareValue 작업의 두 번째 값"),
    priority: z
      .number()
      .optional()
      .describe("우선순위 (add, changePriority 작업에 필수)"),
    listId: z.string(),
  }),
  [ToolName.TRIE]: z.object({
    operation: z.enum([
      "create",
      "addWord",
      "suggestNextCharacters",
      "doesWordExist",
    ]),
    word: z.string().optional().describe("추가할 단어 (addWord 작업에 필수)"),
    listId: z.string(),
  }),
};

const TREE_TOOLS = {
  [ToolName.BINARY_SEARCH_TREE]: z.object({
    operation: z.enum([
      "create",
      "insert",
      "contains",
      "remove",
      "toString",
      "getBalance",
    ]),
    value: z
      .string()
      .optional()
      .describe("값 (insert, contains, remove 작업에 필수)"),
    listId: z.string(),
  }),
  [ToolName.AVL_TREE]: z.object({
    operation: z.enum([
      "create",
      "insert",
      "contains",
      "remove",
      "toString",
      "getBalance",
    ]),
    value: z
      .string()
      .optional()
      .describe("값 (insert, contains, remove 작업에 필수)"),
    listId: z.string(),
  }),
  [ToolName.RED_BLACK_TREE]: z.object({
    operation: z.enum([
      "create",
      "insert",
      "contains",
      "remove",
      "toString",
      "getBalance",
      "isNodeRed",
      "isNodeBlack",
      "isNodeColored",
    ]),
    value: z
      .string()
      .optional()
      .describe(
        "값 (insert, contains, remove, isNodeRed, isNodeBlack, isNodeColored 작업에 필수)"
      ),
    listId: z.string(),
  }),
};
const MATH_TOOLS = {
  [ToolName.IS_POWER_OF_TWO]: z.object({
    number: z.number().describe("2의 거듭제곱인지 확인할 숫자"),
  }),
};

// 도구 스키마 정의
export const ToolSchemas = {
  [ToolName.ECHO]: z.object({
    message: z.string().describe("메시지를 에코합니다"),
  }),
  ...DATA_STRUCTURE_TOOLS,
  ...TREE_TOOLS,
  ...MATH_TOOLS,
};
