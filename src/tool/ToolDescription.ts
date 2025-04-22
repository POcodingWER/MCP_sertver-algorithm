import zodToJsonSchema from "zod-to-json-schema";
import { ToolName, ToolSchemas } from "./ToolSchemas";

// 도구 목록 설명
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
  {
    name: ToolName.HASH_TABLE,
    description:
      "해시 테이블 자료구조를 관리하고 조작합니다." +
      "사용법:" +
      '1) create 작업으로 시작하여 listId를 얻음 (예: operation: "create")' +
      "2) 얻은 listId를 이후 모든 작업에 사용" +
      '3) set/get/delete/has/getKeys: 해시 테이블에 값 설정/조회/삭제/확인/키 조회 (예: operation: "set", listId: "hash_123", key: "some key", value: "some value")' +
      '4) toString: 해시 테이블의 내용 문자열로 반환 (예: operation: "toString", listId: "hash_123")',
    inputSchema: zodToJsonSchema(ToolSchemas[ToolName.HASH_TABLE]),
  },
  {
    name: ToolName.HEAP,
    description:
      "힙 자료구조를 관리하고 조작합니다." +
      "사용법:" +
      '1) create 작업으로 시작하여 listId를 얻음 (예: operation: "create")' +
      "2) 얻은 listId를 이후 모든 작업에 사용" +
      '3) add: 힙에 새로운 값을 추가 (예: operation: "add", listId: "heap_123", value: "10")' +
      '4) peek: 최상위(최소) 값을 조회 (제거하지 않음) (예: operation: "peek", listId: "heap_123")' +
      '5) poll: 최상위(최소) 값을 제거하고 반환 (예: operation: "poll", listId: "heap_123")' +
      '6) find: 특정 값의 존재 여부와 위치를 검색 (예: operation: "find", listId: "heap_123", value: "10")' +
      '7) remove: 특정 값을 힙에서 제거 (예: operation: "remove", listId: "heap_123", value: "10")' +
      '8) toString: 힙의 전체 내용을 문자열로 반환 (예: operation: "toString", listId: "heap_123")',
    inputSchema: zodToJsonSchema(ToolSchemas[ToolName.HEAP]),
  },
  {
    name: ToolName.PRIORITY_QUEUE,
    description:
      "우선순위 큐 자료구조를 관리하고 조작합니다." +
      "사용법:" +
      '1) create 작업으로 시작하여 listId를 얻음 (예: operation: "create")' +
      "2) 얻은 listId를 이후 모든 작업에 사용" +
      '3) add: 우선순위 큐에 새로운 값을 추가 (예: operation: "add", listId: "priority_queue_123", value: "some value", priority: "10")' +
      '4) remove: 특정 값을 우선순위 큐에서 제거 (예: operation: "remove", listId: "priority_queue_123", value: "some value")' +
      '5) changePriority: 특정 값의 우선순위를 변경 (예: operation: "changePriority", listId: "priority_queue_123", value: "some value", priority: "20")' +
      '6) findByValue: 특정 값의 존재 여부와 위치를 검색 (예: operation: "findByValue", listId: "priority_queue_123", value: "some value")' +
      '7) hasValue: 특정 값의 존재 여부를 확인 (예: operation: "hasValue", listId: "priority_queue_123", value: "some value")' +
      '8) compareValue: 두 값을 비교 (예: operation: "compareValue", listId: "priority_queue_123", value1: "some value", value2: "some value")',
    inputSchema: zodToJsonSchema(ToolSchemas[ToolName.PRIORITY_QUEUE]),
  },
  {
    name: ToolName.TRIE,
    description:
      "트라이 자료구조를 관리하고 조작합니다." +
      "사용법:" +
      '1) create 작업으로 시작하여 listId를 얻음 (예: operation: "create")' +
      "2) 얻은 listId를 이후 모든 작업에 사용" +
      '3) addWord: 트라이에 단어를 추가 (예: operation: "addWord", listId: "trie_123", word: "some word")' +
      '4) suggestNextCharacters: 트라이에서 다음 문자를 제안 (예: operation: "suggestNextCharacters", listId: "trie_123", word: "some word")' +
      '5) doesWordExist: 트라이에서 단어의 존재 여부를 확인 (예: operation: "doesWordExist", listId: "trie_123", word: "some word")',
    inputSchema: zodToJsonSchema(ToolSchemas[ToolName.TRIE]),
  },
];
