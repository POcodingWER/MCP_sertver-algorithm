import { ToolSchemas, ToolName } from "../ToolSchemas";
import { createResponse, getListById, validateValueParam } from "./handlers";
import DoublyLinkedList from "../../algorithm/DoublyLinkedList/DoublyLinkedList";

const doublyListStore: Map<string, DoublyLinkedList<any>> = new Map();

export const doublyLinkedListHandler = async (
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
          : `연결 리스트에서 '${JSON.stringify(value)}' 값을 찾을 수 없습니다.`,
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
          : `연결 리스트에서 '${JSON.stringify(value)}' 값을 찾을 수 없습니다.`,
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
};
