import { ToolSchemas, ToolName } from "../ToolSchemas";
import { createResponse, getListById } from "./handlers";
import HashTable from "../../algorithm/hashTable/HashTable";

const hashTableStore: Map<string, HashTable<any, any>> = new Map();

export const hashTableHandler = async (
  args: Record<string, unknown> | undefined
) => {
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
      if (!key) throw new Error("delete 작업에는 'key' 파라미터가 필요합니다.");

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

      return createResponse(`해시 테이블의 키 목록: ${JSON.stringify(keys)}`, {
        keys,
      });
    }

    default:
      throw new Error(
        `지원하지 않는 작업: ${operation}. 가능한 작업: create, set, get, delete, has, getKeys`
      );
  }
};
