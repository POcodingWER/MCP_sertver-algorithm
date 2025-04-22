import { ToolName, ToolSchemas } from "../ToolSchemas";
import Trie from "../../algorithm/Trie/Trie";
import { createResponse, getListById, validateValueParam } from "./handlers";

const trieStore: Map<string, Trie> = new Map();

export const trieHandler = async (
  args: Record<string, unknown> | undefined
) => {
  const validatedArgs = ToolSchemas[ToolName.TRIE].parse(args);
  const { operation, word, listId } = validatedArgs;

  switch (operation) {
    case "create": {
      const newListId = `trie_${Math.floor(Math.random() * 1000)}`;
      const newTrie = new Trie();
      trieStore.set(newListId, newTrie);

      return createResponse(`새 트라이가 생성되었습니다. ID: ${newListId}`, {
        listId: newListId,
      });
    }
    case "addWord": {
      validateValueParam(word, "addWord");
      const trie = getListById(trieStore, listId, ToolName.TRIE);
      trie.addWord(word as string);

      return createResponse(`트라이에 '${word}' 단어가 추가되었습니다.`);
    }
    case "suggestNextCharacters": {
      validateValueParam(word, "suggestNextCharacters");
      const trie = getListById(trieStore, listId, ToolName.TRIE);
      const nextCharacters = trie.suggestNextCharacters(word as string);

      return createResponse(
        nextCharacters
          ? `다음 문자: ${nextCharacters.join(", ")}`
          : "단어가 존재하지 않습니다."
      );
    }
    case "doesWordExist": {
      validateValueParam(word, "doesWordExist");
      const trie = getListById(trieStore, listId, ToolName.TRIE);
      const exists = trie.doesWordExist(word as string);

      return createResponse(
        exists ? "단어가 존재합니다." : "단어가 존재하지 않습니다."
      );
    }
    default: {
      return createResponse("잘못된 작업입니다.");
    }
  }
};
