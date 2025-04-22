import HashTable from "../hashTable/HashTable";

export default class TrieNode {
  private character: string;
  private isCompleteWord: boolean;
  private children: HashTable<string, TrieNode>;

  constructor(character: string, isCompleteWord: boolean = false) {
    this.character = character;
    this.isCompleteWord = isCompleteWord;
    this.children = new HashTable<string, TrieNode>();
  }

  getChild(character: string): TrieNode | null {
    return this.children.get(character) || null;
  }

  addChild(character: string, isCompleteWord: boolean = false): TrieNode {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord));
    }

    return this.children.get(character)!;
  }

  hasChild(character: string): boolean {
    return this.children.has(character);
  }

  suggestChildren(): string[] {
    return [...this.children.getKeys()];
  }

  toString(): string {
    let childrenAsString = this.suggestChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` : "";
    const isCompleteString = this.isCompleteWord ? "*" : "";

    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}
