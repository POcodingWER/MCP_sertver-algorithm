import { ToolName, ToolSchemas } from "./ToolSchemas";

import LinkedList from "../algorithm/LinkedList/LinkedList";
import DoublyLinkedList from "../algorithm/DoublyLinkedList/DoublyLinkedList";
import Queue from "../algorithm/Queue/Queue";
import Stack from "../algorithm/Stack/Stack";
import HashTable from "../algorithm/hashTable/HashTable";
import Heap from "../algorithm/Heap/Heap";
import PriorityQueue from "../algorithm/PriorityQueue/PriorityQueue";

// 연결 리스트를 저장하는 인메모리 저장소
const listStore: Map<string, LinkedList<any>> = new Map();
const doublyListStore: Map<string, DoublyLinkedList<any>> = new Map();
const queueStore: Map<string, Queue<any>> = new Map();
const stackStore: Map<string, Stack<any>> = new Map();
const hashTableStore: Map<string, HashTable<any, any>> = new Map();
const heapStore: Map<string, Heap<any>> = new Map();
const priorityQueueStore: Map<string, PriorityQueue<any>> = new Map();

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
  // 큐 도구: 큐 구현
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
  // 스택 도구: 스택 구현
  [ToolName.STACK]: async (args: Record<string, unknown> | undefined) => {
    const validatedArgs = ToolSchemas[ToolName.STACK].parse(args);
    const { operation, value, listId } = validatedArgs;

    switch (operation) {
      case "create": {
        const newListId = `stack_${Math.floor(Math.random() * 1000)}`;
        const newStack = new Stack();
        stackStore.set(newListId, newStack);

        return createResponse(`새 스택이 생성되었습니다. ID: ${newListId}`, {
          listId: newListId,
        });
      }
      case "isEmpty": {
        const stack = getListById(stackStore, listId, ToolName.STACK);
        const isEmpty = stack.isEmpty();

        return createResponse(
          isEmpty ? "스택이 비어있습니다." : "스택이 비어있지 않습니다.",
          { isEmpty }
        );
      }

      case "push": {
        validateValueParam(value, "push");
        const stack = getListById(stackStore, listId, ToolName.STACK);
        stack.push(value);

        return createResponse(
          `스택에 '${JSON.stringify(value)}' 값이 추가되었습니다.`
        );
      }

      case "pop": {
        const stack = getListById(stackStore, listId, ToolName.STACK);
        const poppedValue = stack.pop();

        return createResponse(
          poppedValue
            ? `스택에서 '${JSON.stringify(poppedValue)}' 값이 제거되었습니다.`
            : "스택이 비어있습니다.",
          poppedValue ? { poppedValue } : undefined
        );
      }

      case "peek": {
        const stack = getListById(stackStore, listId, ToolName.STACK);
        const peekedValue = stack.peek();

        return createResponse(
          peekedValue
            ? `스택의 맨 위 값: ${JSON.stringify(peekedValue)}`
            : "스택이 비어있습니다.",
          peekedValue ? { peekedValue } : undefined
        );
      }

      case "toArray": {
        const stack = getListById(stackStore, listId, ToolName.STACK);
        const array = stack.toArray();

        return createResponse(`스택의 내용: ${JSON.stringify(array)}`, {
          array,
        });
      }

      default:
        throw new Error(
          `지원하지 않는 작업: ${operation}. 가능한 작업: create, push, pop, peek, isEmpty, toString`
        );
    }
  },
  // 해시 테이블 도구: 해시 테이블 구현
  [ToolName.HASH_TABLE]: async (args: Record<string, unknown> | undefined) => {
    const validatedArgs = ToolSchemas[ToolName.HASH_TABLE].parse(args);
    const { operation, key, value, listId } = validatedArgs;

    switch (operation) {
      case "create": {
        const newListId = `hash_table_${Math.floor(Math.random() * 1000)}`;
        const newHashTable = new HashTable();
        hashTableStore.set(newListId, newHashTable);

        return createResponse(
          `새 해시 테이블이 생성되었습니다. ID: ${newListId}`,
          {
            listId: newListId,
          }
        );
      }

      case "set": {
        if (!key) throw new Error("set 작업에는 'key' 파라미터가 필요합니다.");
        if (!value)
          throw new Error("set 작업에는 'value' 파라미터가 필요합니다.");

        const hashTable = getListById(
          hashTableStore,
          listId,
          ToolName.HASH_TABLE
        );
        hashTable.set(key, value);

        return createResponse(
          `해시 테이블에 키 '${key}'에 대한 값 '${value}'이(가) 설정되었습니다.`
        );
      }

      case "get": {
        if (!key) throw new Error("get 작업에는 'key' 파라미터가 필요합니다.");

        const hashTable = getListById(
          hashTableStore,
          listId,
          ToolName.HASH_TABLE
        );
        const retrievedValue = hashTable.get(key);

        return createResponse(
          retrievedValue
            ? `해시 테이블에서 키 '${key}'의 값 '${retrievedValue}'을(를) 찾았습니다.`
            : `해시 테이블에서 키 '${key}'를 찾을 수 없습니다.`,
          retrievedValue ? { retrievedValue } : undefined
        );
      }

      case "delete": {
        if (!key)
          throw new Error("delete 작업에는 'key' 파라미터가 필요합니다.");

        const hashTable = getListById(
          hashTableStore,
          listId,
          ToolName.HASH_TABLE
        );
        const deleted = hashTable.delete(key);

        return createResponse(
          deleted
            ? `해시 테이블에서 키 '${key}'가 삭제되었습니다.`
            : `해시 테이블에서 키 '${key}'를 찾을 수 없습니다.`,
          deleted ? { deleted } : undefined
        );
      }

      case "has": {
        if (!key) throw new Error("has 작업에는 'key' 파라미터가 필요합니다.");

        const hashTable = getListById(
          hashTableStore,
          listId,
          ToolName.HASH_TABLE
        );
        const hasKey = hashTable.has(key);

        return createResponse(
          hasKey
            ? `해시 테이블에 키 '${key}'가 존재합니다.`
            : `해시 테이블에 키 '${key}'가 존재하지 않습니다.`,
          { hasKey }
        );
      }

      case "getKeys": {
        const hashTable = getListById(
          hashTableStore,
          listId,
          ToolName.HASH_TABLE
        );
        const keys = hashTable.getKeys();

        return createResponse(
          `해시 테이블의 키 목록: ${JSON.stringify(keys)}`,
          {
            keys,
          }
        );
      }

      default:
        throw new Error(
          `지원하지 않는 작업: ${operation}. 가능한 작업: create, set, get, delete, has, getKeys`
        );
    }
  },
  // 힙 도구: 힙 구현
  [ToolName.HEAP]: async (args: Record<string, unknown> | undefined) => {
    const validatedArgs = ToolSchemas[ToolName.HEAP].parse(args);
    const { operation, value, listId } = validatedArgs;

    switch (operation) {
      case "create": {
        const newListId = `heap_${Math.floor(Math.random() * 1000)}`;
        // 기본 비교 함수 추가 - 숫자나 문자열 비교 가능
        const newHeap = new Heap<number | string>((a, b) => {
          if (typeof a === "number" && typeof b === "number") {
            return a - b;
          }
          return String(a).localeCompare(String(b));
        });
        heapStore.set(newListId, newHeap);

        return createResponse(`새 힙이 생성되었습니다. ID: ${newListId}`, {
          listId: newListId,
        });
      }

      case "add": {
        validateValueParam(value, "add");
        const heap = getListById(heapStore, listId, ToolName.HEAP);
        // 숫자 문자열인 경우 숫자로 변환
        const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
        heap.add(parsedValue);

        return createResponse(
          `힙에 '${JSON.stringify(parsedValue)}' 값이 추가되었습니다.`
        );
      }

      case "poll": {
        const heap = getListById(heapStore, listId, ToolName.HEAP);
        const polledValue = heap.poll();

        return createResponse(
          polledValue !== null
            ? `힙에서 '${JSON.stringify(polledValue)}' 값이 제거되었습니다.`
            : "힙이 비어있습니다.",
          polledValue !== null ? { polledValue } : undefined
        );
      }

      case "find": {
        validateValueParam(value, "find");
        const heap = getListById(heapStore, listId, ToolName.HEAP);
        // 숫자 문자열인 경우 숫자로 변환
        const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
        const foundIndices = heap.find(parsedValue);

        return createResponse(
          foundIndices.length > 0
            ? `힙에서 '${JSON.stringify(
                parsedValue
              )}' 값을 찾았습니다. 인덱스: ${foundIndices.join(", ")}`
            : `힙에서 '${JSON.stringify(parsedValue)}' 값을 찾을 수 없습니다.`,
          { foundIndices }
        );
      }

      case "remove": {
        validateValueParam(value, "remove");
        const heap = getListById(heapStore, listId, ToolName.HEAP);
        // 숫자 문자열인 경우 숫자로 변환
        const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
        heap.remove(parsedValue);

        return createResponse(
          `힙에서 '${JSON.stringify(parsedValue)}' 값이 제거되었습니다.`
        );
      }

      case "toString": {
        const heap = getListById(heapStore, listId, ToolName.HEAP);
        const heapString = heap.toString();

        return createResponse(`힙의 내용: ${heapString}`);
      }

      case "peek": {
        const heap = getListById(heapStore, listId, ToolName.HEAP);
        const peekedValue = heap.peek();

        return createResponse(
          peekedValue !== null
            ? `힙의 최상위 값: ${JSON.stringify(peekedValue)}`
            : "힙이 비어있습니다.",
          peekedValue !== null ? { peekedValue } : undefined
        );
      }

      default:
        throw new Error(
          `지원하지 않는 작업: ${operation}. 가능한 작업: create, add, poll, find, remove, toString, peek`
        );
    }
  },
  // 우선순위 큐 도구: 우선순위 큐 구현
  [ToolName.PRIORITY_QUEUE]: async (
    args: Record<string, unknown> | undefined
  ) => {
    const validatedArgs = ToolSchemas[ToolName.PRIORITY_QUEUE].parse(args);
    const { operation, value, listId, priority } = validatedArgs;

    switch (operation) {
      case "create": {
        const newListId = `priority_queue_${Math.floor(Math.random() * 1000)}`;
        const newPriorityQueue = new PriorityQueue();
        priorityQueueStore.set(newListId, newPriorityQueue);

        return createResponse(
          `새 우선순위 큐가 생성되었습니다. ID: ${newListId}`,
          {
            listId: newListId,
          }
        );
      }

      case "add": {
        validateValueParam(value, "add");
        validateValueParam(priority, "add");
        const priorityQueue = getListById(
          priorityQueueStore,
          listId,
          ToolName.PRIORITY_QUEUE
        );
        priorityQueue.add(value, priority);

        return createResponse(
          `우선순위 큐에 '${JSON.stringify(value)}' 값이 추가되었습니다.`
        );
      }

      case "remove": {
        validateValueParam(value, "remove");
        const priorityQueue = getListById(
          priorityQueueStore,
          listId,
          ToolName.PRIORITY_QUEUE
        );
        priorityQueue.remove(value);

        return createResponse(
          `우선순위 큐에서 '${JSON.stringify(value)}' 값이 제거되었습니다.`
        );
      }

      case "changePriority": {
        validateValueParam(value, "changePriority");
        if (priority === undefined)
          throw new Error(
            "changePriority 작업에는 'priority' 파라미터가 필요합니다."
          );
        const priorityQueue = getListById(
          priorityQueueStore,
          listId,
          ToolName.PRIORITY_QUEUE
        );
        priorityQueue.changePriority(value, priority);

        return createResponse(
          `우선순위 큐에서 '${JSON.stringify(
            value
          )}' 값의 우선순위가 변경되었습니다.`
        );
      }

      case "findByValue": {
        validateValueParam(value, "findByValue");
        const priorityQueue = getListById(
          priorityQueueStore,
          listId,
          ToolName.PRIORITY_QUEUE
        );
        const foundIndices = priorityQueue.findByValue(value);

        return createResponse(
          foundIndices.length > 0
            ? `우선순위 큐에서 '${JSON.stringify(
                value
              )}' 값을 찾았습니다. 인덱스: ${foundIndices.join(", ")}`
            : `우선순위 큐에서 '${JSON.stringify(
                value
              )}' 값을 찾을 수 없습니다.`,
          { foundIndices }
        );
      }

      case "hasValue": {
        validateValueParam(value, "hasValue");
        const priorityQueue = getListById(
          priorityQueueStore,
          listId,
          ToolName.PRIORITY_QUEUE
        );
        const hasValue = priorityQueue.hasValue(value);

        return createResponse(
          hasValue
            ? `우선순위 큐에 '${JSON.stringify(value)}' 값이 존재합니다.`
            : `우선순위 큐에 '${JSON.stringify(
                value
              )}' 값이 존재하지 않습니다.`,
          { hasValue }
        );
      }

      case "compareValue": {
        if (!validatedArgs.value1)
          throw new Error(
            "compareValue 작업에는 'value1' 파라미터가 필요합니다."
          );
        if (!validatedArgs.value2)
          throw new Error(
            "compareValue 작업에는 'value2' 파라미터가 필요합니다."
          );

        const priorityQueue = getListById(
          priorityQueueStore,
          listId,
          ToolName.PRIORITY_QUEUE
        );
        const result = priorityQueue["compareValue"](
          validatedArgs.value1,
          validatedArgs.value2
        );

        let comparison;
        if (result < 0) comparison = "보다 작습니다";
        else if (result > 0) comparison = "보다 큽니다";
        else comparison = "와(과) 같습니다";

        return createResponse(
          `'${validatedArgs.value1}'은(는) '${validatedArgs.value2}'${comparison}.`,
          { result }
        );
      }

      default:
        throw new Error(
          `지원하지 않는 작업: ${operation}. 가능한 작업: create, add, remove, changePriority, findByValue, hasValue, compareValue`
        );
    }
  },
};
