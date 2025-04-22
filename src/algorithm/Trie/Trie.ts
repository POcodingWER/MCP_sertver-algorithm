import TrieNode from "../../algorithm/Trie/TrieNode";

const HEAD_CHARACTER = "*";

export default class Trie {
  private head: TrieNode;

  constructor() {
    this.head = new TrieNode(HEAD_CHARACTER);
  }

  addWord(word: string): void {
    const characters = Array.from(word);
    let currentNode = this.head;
    for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
      const isComplete = charIndex === characters.length - 1;
      currentNode = currentNode.addChild(characters[charIndex], isComplete);
    }
  }

  suggestNextCharacters(word: string): string[] | null {
    const lastCharacter = this.getLastCharacterNode(word);

    if (!lastCharacter) {
      return null;
    }

    return lastCharacter.suggestChildren();
  }

  doesWordExist(word: string): boolean {
    return !!this.getLastCharacterNode(word);
  }

  getLastCharacterNode(word: string): TrieNode | null {
    const characters = Array.from(word);
    let currentNode = this.head;
    for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
      if (!currentNode.hasChild(characters[charIndex])) {
        return null;
      }
      currentNode = currentNode.getChild(characters[charIndex])!;
    }

    return currentNode;
  }
}
