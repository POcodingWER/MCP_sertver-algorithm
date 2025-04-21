import { z } from "zod";
import LinkedList from "../algorithm/LinkedList/LinkedList";
import DoublyLinkedList from "../algorithm/DoublyLinkedList/DoublyLinkedList";
import Queue from "../algorithm/Queue/Queue";

// 도구 이름 열거형
export enum ToolName {
  ECHO = "echo",
  LINKED_LIST = "linked-list",
  DOUBLY_LINKED_LIST = "doubly-linked-list",
  QUEUE = "queue",
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
};

// 연결 리스트를 저장하는 인메모리 저장소
const listStore: Map<string, LinkedList<any>> = new Map();
const doublyListStore: Map<string, DoublyLinkedList<any>> = new Map();
const queueStore: Map<string, Queue<any>> = new Map();

const validateValueParam = (value: unknown, operation: string): void => {
  if (value === undefined) {
    throw new Error(`${operation} 작업에는 'value' 파라미터가 필요합니다.`);
  }
};

const getListById = <T>(
  store: Map<string, T>,
  listId: string | undefined,
  toolName: string
): T => {
  if (!listId || !store.has(listId)) {
    throw new Error(
      `유효한 리스트 ID가 필요합니다. 먼저 '${toolName}' 도구의 'create' 작업을 호출하여 listId를 얻으세요.`
    );
  }
  return store.get(listId)!;
};

/**
 * 표준 응답 객체 생성 함수
 * @param message 반환할 메시지 텍스트
 * @param metadata 추가 메타데이터 (선택적)
 * @returns 표준화된 응답 객체
 */
const createResponse = (message: string, metadata?: Record<string, any>) => {
  return {
    content: [
      {
        type: "text",
        text: message,
      },
    ],
    ...(metadata && { metadata }),
  };
};

// 도구 호출 핸들러
export const ToolHandlers = {
  // 에코 도구: 입력된 메시지를 그대로 반환
  [ToolName.ECHO]: async (args: Record<string, unknown> | undefined) => {
    const validatedArgs = ToolSchemas[ToolName.ECHO].parse(args);
    return createResponse(`에코: ${validatedArgs.message}`);
  },
  //    연결 리스트 도구: 단방향 연결 리스트 구현
  [ToolName.LINKED_LIST]: async (args: Record<string, unknown> | undefined) => {
    const validatedArgs = ToolSchemas[ToolName.LINKED_LIST].parse(args);
    const { operation, value, listId } = validatedArgs;

    switch (operation) {
      case "create": {
        const newListId = `list_${Math.floor(Math.random() * 1000)}`;
        const newList = new LinkedList();
        listStore.set(newListId, newList);

        return createResponse(
          `새 연결 리스트가 생성되었습니다. ID: ${newListId}`,
          { listId: newListId }
        );
      }

      case "append": {
        validateValueParam(value, "append");
        const list = getListById(listStore, listId, ToolName.LINKED_LIST);
        list.append(value);

        return createResponse(
          `연결 리스트 끝에 '${JSON.stringify(value)}' 값이 추가되었습니다.`
        );
      }

      case "prepend": {
        validateValueParam(value, "prepend");
        const list = getListById(listStore, listId, ToolName.LINKED_LIST);
        list.prepend(value);

        return createResponse(
          `연결 리스트 앞에 '${JSON.stringify(value)}' 값이 추가되었습니다.`
        );
      }

      case "delete": {
        validateValueParam(value, "delete");
        const list = getListById(listStore, listId, ToolName.LINKED_LIST);
        const deletedNode = list.delete(value);

        return createResponse(
          deletedNode
            ? `연결 리스트에서 '${JSON.stringify(value)}' 값이 삭제되었습니다.`
            : `연결 리스트에서 '${JSON.stringify(
                value
              )}' 값을 찾을 수 없습니다.`,
          deletedNode ? { deletedValue: deletedNode.value } : undefined
        );
      }

      case "find": {
        validateValueParam(value, "find");
        const list = getListById(listStore, listId, ToolName.LINKED_LIST);
        const foundNode = list.find({ value });

        return createResponse(
          foundNode
            ? `연결 리스트에서 '${JSON.stringify(value)}' 값을 찾았습니다.`
            : `연결 리스트에서 '${JSON.stringify(
                value
              )}' 값을 찾을 수 없습니다.`,
          foundNode ? { value: foundNode.value } : undefined
        );
      }

      case "toArray": {
        const list = getListById(listStore, listId, ToolName.LINKED_LIST);
        const nodes = list.toArray();
        const values = nodes.map((node: any) => node.value);

        return createResponse(`연결 리스트의 내용: ${JSON.stringify(values)}`, {
          values,
        });
      }

      default:
        throw new Error(
          `지원하지 않는 작업: ${operation}. 가능한 작업: create, append, prepend, delete, find, toArray`
        );
    }
  },
  // 이중 연결 리스트 도구: 양방향 연결 리스트 구현
  [ToolName.DOUBLY_LINKED_LIST]: async (
    args: Record<string, unknown> | undefined
  ) => {
    const validatedArgs = ToolSchemas[ToolName.DOUBLY_LINKED_LIST].parse(args);
    const { operation, value, listId } = validatedArgs;

    switch (operation) {
      case "create": {
        const newListId = `doubly_list_${Math.floor(Math.random() * 1000)}`;
        const newList = new DoublyLinkedList();
        doublyListStore.set(newListId, newList);

        return createResponse(
          `새 연결 리스트가 생성되었습니다. ID: ${newListId}`,
          { listId: newListId }
        );
      }

      case "append": {
        validateValueParam(value, "append");
        const list = getListById(
          doublyListStore,
          listId,
          ToolName.DOUBLY_LINKED_LIST
        );
        list.append(value);

        return createResponse(
          `연결 리스트 끝에 '${JSON.stringify(value)}' 값이 추가되었습니다.`
        );
      }

      case "prepend": {
        validateValueParam(value, "prepend");
        const list = getListById(
          doublyListStore,
          listId,
          ToolName.DOUBLY_LINKED_LIST
        );
        list.prepend(value);

        return createResponse(
          `연결 리스트 앞에 '${JSON.stringify(value)}' 값이 추가되었습니다.`
        );
      }

      case "delete": {
        validateValueParam(value, "delete");
        const list = getListById(
          doublyListStore,
          listId,
          ToolName.DOUBLY_LINKED_LIST
        );
        const deletedNode = list.delete(value);

        return createResponse(
          deletedNode
            ? `연결 리스트에서 '${JSON.stringify(value)}' 값이 삭제되었습니다.`
            : `연결 리스트에서 '${JSON.stringify(
                value
              )}' 값을 찾을 수 없습니다.`,
          deletedNode ? { deletedValue: deletedNode.value } : undefined
        );
      }

      case "find": {
        validateValueParam(value, "find");
        const list = getListById(
          doublyListStore,
          listId,
          ToolName.DOUBLY_LINKED_LIST
        );
        const foundNode = list.find({ value });

        return createResponse(
          foundNode
            ? `연결 리스트에서 '${JSON.stringify(value)}' 값을 찾았습니다.`
            : `연결 리스트에서 '${JSON.stringify(
                value
              )}' 값을 찾을 수 없습니다.`,
          foundNode ? { value: foundNode.value } : undefined
        );
      }

      case "toArray": {
        const list = getListById(
          doublyListStore,
          listId,
          ToolName.DOUBLY_LINKED_LIST
        );
        const nodes = list.toArray();
        const values = nodes.map((node: any) => node.value);

        return createResponse(`연결 리스트의 내용: ${JSON.stringify(values)}`, {
          values,
        });
      }

      case "toArrayReverse": {
        const list = getListById(
          doublyListStore,
          listId,
          ToolName.DOUBLY_LINKED_LIST
        );
        const nodes = list.toArrayReverse();
        const values = nodes.map((node: any) => node.value);

        return createResponse(`연결 리스트의 내용: ${JSON.stringify(values)}`, {
          values,
        });
      }

      default:
        throw new Error(
          `지원하지 않는 작업: ${operation}. 가능한 작업: create, append, prepend, delete, find, toArray, toArrayReverse`
        );
    }
  },
  [ToolName.QUEUE]: async (args: Record<string, unknown> | undefined) => {
    const validatedArgs = ToolSchemas[ToolName.QUEUE].parse(args);
    const { operation, value, listId } = validatedArgs;

    switch (operation) {
      case "create": {
        const newListId = `queue_${Math.floor(Math.random() * 1000)}`;
        const newQueue = new Queue();
        queueStore.set(newListId, newQueue);

        return createResponse(`새 큐가 생성되었습니다. ID: ${newListId}`, {
          listId: newListId,
        });
      }

      case "isEmpty": {
        const queue = getListById(queueStore, listId, ToolName.QUEUE);
        const isEmpty = queue.isEmpty();

        return createResponse(
          isEmpty ? "큐가 비어있습니다." : "큐가 비어있지 않습니다.",
          { isEmpty }
        );
      }

      case "enqueue": {
        validateValueParam(value, "enqueue");
        const queue = getListById(queueStore, listId, ToolName.QUEUE);
        queue.enqueue(value);

        return createResponse(
          `큐에 '${JSON.stringify(value)}' 값이 추가되었습니다.`
        );
      }

      case "dequeue": {
        const queue = getListById(queueStore, listId, ToolName.QUEUE);
        const dequeuedValue = queue.dequeue();

        return createResponse(
          dequeuedValue
            ? `큐에서 '${JSON.stringify(dequeuedValue)}' 값이 제거되었습니다.`
            : "큐가 비어있습니다.",
          dequeuedValue ? { dequeuedValue } : undefined
        );
      }

      case "peek": {
        const queue = getListById(queueStore, listId, ToolName.QUEUE);
        const peekedValue = queue.peek();

        return createResponse(
          peekedValue
            ? `큐의 맨 앞 값: ${JSON.stringify(peekedValue)}`
            : "큐가 비어있습니다.",
          peekedValue ? { peekedValue } : undefined
        );
      }

      case "toString": {
        const queue = getListById(queueStore, listId, ToolName.QUEUE);
        const stringifiedQueue = queue.toString();

        return createResponse(`큐의 내용: ${stringifiedQueue}`);
      }

      default:
        throw new Error(
          `지원하지 않는 작업: ${operation}. 가능한 작업: create, enqueue, dequeue, peek, isEmpty, toString`
        );
    }
  },
};
