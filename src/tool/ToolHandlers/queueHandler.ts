import { ToolSchemas, ToolName } from "../ToolSchemas";
import { createResponse, getListById, validateValueParam } from "./handlers";
import Queue from "../../algorithm/Queue/Queue";

const queueStore: Map<string, Queue<any>> = new Map();

export const queueHandler = async (
  args: Record<string, unknown> | undefined
) => {
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
};
