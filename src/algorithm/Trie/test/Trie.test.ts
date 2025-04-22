import Trie from "../Trie";

describe("Trie", () => {
  it("트라이를 생성해야 합니다", () => {
    const trie = new Trie();

    expect(trie).toBeDefined();
    // head는 private이므로 직접 접근하지 않고 메서드를 통해 테스트
    expect(trie.getLastCharacterNode("")).toBeDefined();
  });

  it("트라이에 단어를 추가해야 합니다", () => {
    const trie = new Trie();

    trie.addWord("cat");

    // head와 내부 노드들은 private이므로 suggestNextCharacters와 doesWordExist로 테스트
    expect(trie.suggestNextCharacters("")).toEqual(["c"]);
    expect(trie.suggestNextCharacters("c")).toEqual(["a"]);
    expect(trie.doesWordExist("cat")).toBeTruthy();

    trie.addWord("car");
    expect(trie.suggestNextCharacters("")).toEqual(["c"]);
    expect(trie.suggestNextCharacters("c")).toEqual(["a"]);
    expect(trie.suggestNextCharacters("ca")).toEqual(["t", "r"]);
    expect(trie.doesWordExist("cat")).toBeTruthy();
    expect(trie.doesWordExist("car")).toBeTruthy();
  });

  it("다음 문자를 제안해야 합니다", () => {
    const trie = new Trie();

    trie.addWord("cat");
    trie.addWord("cats");
    trie.addWord("car");
    trie.addWord("caption");

    expect(trie.suggestNextCharacters("ca")).toEqual(["t", "r", "p"]);
    expect(trie.suggestNextCharacters("cat")).toEqual(["s"]);
    expect(trie.suggestNextCharacters("cab")).toBeNull();
  });

  it("단어가 존재하는지 확인해야 합니다", () => {
    const trie = new Trie();

    trie.addWord("cat");
    trie.addWord("cats");
    trie.addWord("car");
    trie.addWord("caption");

    expect(trie.doesWordExist("cat")).toBeTruthy();
    expect(trie.doesWordExist("cap")).toBeTruthy();
    expect(trie.doesWordExist("call")).toBeFalsy();
  });
});
