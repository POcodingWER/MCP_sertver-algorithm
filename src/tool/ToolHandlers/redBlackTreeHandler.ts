import { ToolSchemas, ToolName } from "../ToolSchemas";
import { createResponse, getListById, validateValueParam } from "./handlers";
import RedBlackTree from "../../algorithm/Tree/RedBlackTree/RedBlackTree";

const redBlackTreeStore: Map<string, RedBlackTree<string>> = new Map();

export const redBlackTreeHandler = async (
  args: Record<string, unknown> | undefined
) => {
  const validatedArgs = ToolSchemas[ToolName.RED_BLACK_TREE].parse(args);
  const { operation, value, listId } = validatedArgs;

  switch (operation) {
    case "create": {
      const newListId = `red_black_tree_${Math.floor(Math.random() * 1000)}`;
      const newTree = new RedBlackTree<string>();
      redBlackTreeStore.set(newListId, newTree);

      return createResponse(
        `새 레드-블랙 트리가 생성되었습니다. ID: ${newListId}`,
        {
          listId: newListId,
        }
      );
    }

    case "insert": {
      validateValueParam(value, "insert");
      const tree = getListById(
        redBlackTreeStore,
        listId,
        ToolName.RED_BLACK_TREE
      );
      tree.insert(value as string);

      return createResponse(`레드-블랙 트리에 '${value}' 값이 삽입되었습니다.`);
    }

    case "contains": {
      validateValueParam(value, "contains");
      const tree = getListById(
        redBlackTreeStore,
        listId,
        ToolName.RED_BLACK_TREE
      );
      const exists = tree.contains(value as string);

      return createResponse(
        exists
          ? `레드-블랙 트리에 '${value}' 값이 존재합니다.`
          : `레드-블랙 트리에 '${value}' 값이 존재하지 않습니다.`
      );
    }

    case "remove": {
      validateValueParam(value, "remove");
      const tree = getListById(
        redBlackTreeStore,
        listId,
        ToolName.RED_BLACK_TREE
      );
      try {
        const removed = tree.remove(value as string);
        return createResponse(
          removed
            ? `레드-블랙 트리에서 '${value}' 값이 제거되었습니다.`
            : `레드-블랙 트리에서 '${value}' 값을 찾을 수 없습니다.`
        );
      } catch (error) {
        return createResponse((error as Error).message);
      }
    }

    case "toString": {
      const tree = getListById(
        redBlackTreeStore,
        listId,
        ToolName.RED_BLACK_TREE
      );
      const treeString = tree.toString();

      return createResponse(treeString);
    }

    case "getBalance": {
      const tree = getListById(
        redBlackTreeStore,
        listId,
        ToolName.RED_BLACK_TREE
      );
      return createResponse(
        `레드-블랙 트리의 균형 상태: ${tree.root?.balanceFactor ?? 0}`
      );
    }

    case "isNodeRed": {
      validateValueParam(value, "isNodeRed");
      const tree = getListById(
        redBlackTreeStore,
        listId,
        ToolName.RED_BLACK_TREE
      );
      const node = tree.root?.find(value as string);
      if (!node) {
        return createResponse(
          `레드-블랙 트리에서 '${value}' 값을 찾을 수 없습니다.`
        );
      }
      const isRed = tree.isNodeRed(node);
      return createResponse(
        isRed
          ? `'${value}' 노드는 빨간색입니다.`
          : `'${value}' 노드는 빨간색이 아닙니다.`
      );
    }

    case "isNodeBlack": {
      validateValueParam(value, "isNodeBlack");
      const tree = getListById(
        redBlackTreeStore,
        listId,
        ToolName.RED_BLACK_TREE
      );
      const node = tree.root?.find(value as string);
      if (!node) {
        return createResponse(
          `레드-블랙 트리에서 '${value}' 값을 찾을 수 없습니다.`
        );
      }
      const isBlack = tree.isNodeBlack(node);
      return createResponse(
        isBlack
          ? `'${value}' 노드는 검은색입니다.`
          : `'${value}' 노드는 검은색이 아닙니다.`
      );
    }

    case "isNodeColored": {
      validateValueParam(value, "isNodeColored");
      const tree = getListById(
        redBlackTreeStore,
        listId,
        ToolName.RED_BLACK_TREE
      );
      const node = tree.root?.find(value as string);
      if (!node) {
        return createResponse(
          `레드-블랙 트리에서 '${value}' 값을 찾을 수 없습니다.`
        );
      }
      const isColored = tree.isNodeColored(node);
      return createResponse(
        isColored
          ? `'${value}' 노드에 색상이 지정되어 있습니다.`
          : `'${value}' 노드에 색상이 지정되어 있지 않습니다.`
      );
    }

    default:
      throw new Error(
        `지원하지 않는 작업: ${operation}. 가능한 작업: create, insert, contains, remove, toString, getBalance, isNodeRed, isNodeBlack, isNodeColored`
      );
  }
};
