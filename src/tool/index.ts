import { ToolName, ToolSchemas } from "./ToolSchemas";
import { priorityQueueHandler } from "./ToolHandlers/priorityQueueHandler";
import { heapHandler } from "./ToolHandlers/heapHandler";
import { hashTableHandler } from "./ToolHandlers/hashTableHandler";
import { stackHandler } from "./ToolHandlers/stackHandler";
import { queueHandler } from "./ToolHandlers/queueHandler";
import { doublyLinkedListHandler } from "./ToolHandlers/doublyLinkedListHandler";
import { linkedListHandler } from "./ToolHandlers/linkedListHandler";

// 도구 호출 핸들러
export const ToolHandlers = {
  [ToolName.ECHO]: async (args: Record<string, unknown> | undefined) => {
    const validatedArgs = ToolSchemas[ToolName.ECHO].parse(args);
    return {
      content: [
        {
          type: "text",
          text: validatedArgs.message,
        },
      ],
    };
  },
  [ToolName.LINKED_LIST]: linkedListHandler,
  [ToolName.DOUBLY_LINKED_LIST]: doublyLinkedListHandler,
  [ToolName.QUEUE]: queueHandler,
  [ToolName.STACK]: stackHandler,
  [ToolName.HASH_TABLE]: hashTableHandler,
  [ToolName.HEAP]: heapHandler,
  [ToolName.PRIORITY_QUEUE]: priorityQueueHandler,
};
