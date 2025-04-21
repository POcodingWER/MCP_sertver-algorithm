import { z } from "zod";
import LinkedList from "../algorithm/LinkedList/LinkedList";

// 도구 이름 열거형
export enum ToolName {
  ECHO = "echo",
  LINKED_LIST = "linked-list",
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
};

// 연결 리스트를 저장하는 인메모리 저장소
const listStore: Map<string, LinkedList<any>> = new Map();

// 도구 호출 핸들러
export const ToolHandlers = {
  //{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"echo","arguments":{"message":"안녕하세요"}}}
  [ToolName.ECHO]: async (args: Record<string, unknown> | undefined) => {
    const validatedArgs = ToolSchemas[ToolName.ECHO].parse(args);
    return {
      content: [
        {
          type: "text",
          text: `에코: ${validatedArgs.message}`,
        },
      ],
    };
  },

  [ToolName.LINKED_LIST]: async (args: Record<string, unknown> | undefined) => {
    const validatedArgs = ToolSchemas[ToolName.LINKED_LIST].parse(args);
    const { operation, value, listId } = validatedArgs;

    switch (operation) {
      case "create": {
        // 새 연결 리스트 생성
        const newListId = `list_${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 9)}`;
        const newList = new LinkedList();
        listStore.set(newListId, newList);

        return {
          content: [
            {
              type: "text",
              text: `새 연결 리스트가 생성되었습니다. ID: ${newListId}`,
            },
          ],
          metadata: { listId: newListId },
        };
      }

      case "append": {
        if (!listId || !listStore.has(listId)) {
          throw new Error(
            "유효한 리스트 ID가 필요합니다. 먼저 'create' 작업을 호출하여 listId를 얻으세요."
          );
        }

        if (value === undefined) {
          throw new Error(
            "추가할 값이 필요합니다. 'value' 파라미터를 지정하세요."
          );
        }

        const list = listStore.get(listId)!;
        list.append(value);

        return {
          content: [
            {
              type: "text",
              text: `연결 리스트 끝에 '${JSON.stringify(
                value
              )}' 값이 추가되었습니다.`,
            },
          ],
        };
      }

      case "prepend": {
        if (!listId || !listStore.has(listId)) {
          throw new Error(
            "유효한 리스트 ID가 필요합니다. 먼저 'create' 작업을 호출하여 listId를 얻으세요."
          );
        }

        if (value === undefined) {
          throw new Error(
            "추가할 값이 필요합니다. 'value' 파라미터를 지정하세요."
          );
        }

        const list = listStore.get(listId)!;
        list.prepend(value);

        return {
          content: [
            {
              type: "text",
              text: `연결 리스트 앞에 '${JSON.stringify(
                value
              )}' 값이 추가되었습니다.`,
            },
          ],
        };
      }

      case "delete": {
        if (!listId || !listStore.has(listId)) {
          throw new Error(
            "유효한 리스트 ID가 필요합니다. 먼저 'create' 작업을 호출하여 listId를 얻으세요."
          );
        }

        if (value === undefined) {
          throw new Error(
            "삭제할 값이 필요합니다. 'value' 파라미터를 지정하세요."
          );
        }

        const list = listStore.get(listId)!;
        const deletedNode = list.delete(value);

        return {
          content: [
            {
              type: "text",
              text: deletedNode
                ? `연결 리스트에서 '${JSON.stringify(
                    value
                  )}' 값이 삭제되었습니다.`
                : `연결 리스트에서 '${JSON.stringify(
                    value
                  )}' 값을 찾을 수 없습니다.`,
            },
          ],
        };
      }

      case "find": {
        if (!listId || !listStore.has(listId)) {
          throw new Error(
            "유효한 리스트 ID가 필요합니다. 먼저 'create' 작업을 호출하여 listId를 얻으세요."
          );
        }

        if (value === undefined) {
          throw new Error(
            "찾을 값이 필요합니다. 'value' 파라미터를 지정하세요."
          );
        }

        const list = listStore.get(listId)!;
        const foundNode = list.find({ value });

        return {
          content: [
            {
              type: "text",
              text: foundNode
                ? `연결 리스트에서 '${JSON.stringify(value)}' 값을 찾았습니다.`
                : `연결 리스트에서 '${JSON.stringify(
                    value
                  )}' 값을 찾을 수 없습니다.`,
            },
          ],
          metadata: foundNode ? { value: foundNode.value } : undefined,
        };
      }

      case "toArray": {
        if (!listId || !listStore.has(listId)) {
          throw new Error(
            "유효한 리스트 ID가 필요합니다. 먼저 'create' 작업을 호출하여 listId를 얻으세요."
          );
        }

        const list = listStore.get(listId)!;
        const nodes = list.toArray();
        const values = nodes.map((node: any) => node.value);

        return {
          content: [
            {
              type: "text",
              text: `연결 리스트의 내용: ${JSON.stringify(values)}`,
            },
          ],
          metadata: { values },
        };
      }

      default:
        throw new Error(
          `지원하지 않는 작업: ${operation}. 가능한 작업: create, append, prepend, delete, find, toArray`
        );
    }
  },
};
