import { ToolName, ToolSchemas } from "../ToolSchemas";
import AvlTree from "../../algorithm/Tree/AVLTree/AVLTree";
import { createResponse, getListById, validateValueParam } from "./handlers";

const avlTreeStore: Map<string, AvlTree<string>> = new Map();

export const avlTreeHandler = async (
  args: Record<string, unknown> | undefined
) => {
  const validatedArgs = ToolSchemas[ToolName.AVL_TREE].parse(args);
  const { operation, value, listId } = validatedArgs;

  switch (operation) {
    case "create": {
      const newListId = `avl_tree_${Math.floor(Math.random() * 1000)}`;
      const newTree = new AvlTree<string>();
      avlTreeStore.set(newListId, newTree);

      return createResponse(`새 AVL 트리가 생성되었습니다. ID: ${newListId}`, {
        listId: newListId,
      });
    }
    case "insert": {
      validateValueParam(value, "insert");
      const tree = getListById(avlTreeStore, listId, ToolName.AVL_TREE);
      tree.insert(value as string);

      return createResponse(`AVL 트리에 '${value}' 값이 삽입되었습니다.`);
    }
    case "contains": {
      validateValueParam(value, "contains");
      const tree = getListById(avlTreeStore, listId, ToolName.AVL_TREE);
      const exists = tree.contains(value as string);

      return createResponse(
        exists
          ? `AVL 트리에 '${value}' 값이 존재합니다.`
          : `AVL 트리에 '${value}' 값이 존재하지 않습니다.`
      );
    }
    case "remove": {
      validateValueParam(value, "remove");
      const tree = getListById(avlTreeStore, listId, ToolName.AVL_TREE);
      const removed = tree.remove(value as string);

      return createResponse(
        removed
          ? `AVL 트리에서 '${value}' 값이 제거되었습니다.`
          : `AVL 트리에서 '${value}' 값을 찾을 수 없습니다.`
      );
    }
    case "toString": {
      const tree = getListById(avlTreeStore, listId, ToolName.AVL_TREE);
      return createResponse(tree.toString());
    }
    case "getBalance": {
      const tree = getListById(avlTreeStore, listId, ToolName.AVL_TREE);
      return createResponse(`AVL 트리의 균형 상태: ${tree.root.balanceFactor}`);
    }
    default: {
      return createResponse("잘못된 작업입니다.");
    }
  }
};
