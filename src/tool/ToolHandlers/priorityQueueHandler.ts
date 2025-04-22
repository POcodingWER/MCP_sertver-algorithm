import { ToolSchemas, ToolName } from "../ToolSchemas";
import { createResponse, getListById, validateValueParam } from "./handlers";
import PriorityQueue from "../../algorithm/PriorityQueue/PriorityQueue";

// 우선순위 큐 인스턴스 저장소
const priorityQueueStore: Map<string, PriorityQueue<any>> = new Map();

export const priorityQueueHandler = async (
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
          : `우선순위 큐에서 '${JSON.stringify(value)}' 값을 찾을 수 없습니다.`,
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
          : `우선순위 큐에 '${JSON.stringify(value)}' 값이 존재하지 않습니다.`,
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
};
