import { ToolSchemas, ToolName } from "../ToolSchemas";
import { createResponse, getListById, validateValueParam } from "./handlers";
import Heap from "../../algorithm/Heap/Heap";

const heapStore: Map<string, Heap<any>> = new Map();

export const heapHandler = async (
  args: Record<string, unknown> | undefined
) => {
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
};
