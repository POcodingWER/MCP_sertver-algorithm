import { ToolSchemas, ToolName } from "../ToolSchemas";
import { createResponse, getListById, validateValueParam } from "./handlers";
import Stack from "../../algorithm/Stack/Stack";

const stackStore: Map<string, Stack<any>> = new Map();

export const stackHandler = async (
  args: Record<string, unknown> | undefined
) => {
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
};
