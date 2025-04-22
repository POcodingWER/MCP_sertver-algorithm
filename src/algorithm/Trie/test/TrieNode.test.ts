import TrieNode from "../TrieNode";

describe("TrieNode", () => {
  it("트라이 노드를 생성해야 합니다", () => {
    const trieNode = new TrieNode("c", true);

    // private 속성은 직접 접근하지 않고 toString()으로 테스트
    expect(trieNode.toString()).toBe("c*");
  });

  it("자식 노드를 추가해야 합니다", () => {
    const trieNode = new TrieNode("c");

    trieNode.addChild("a", true);
    trieNode.addChild("o");

    expect(trieNode.toString()).toBe("c:a,o");
  });

  it("자식 노드를 가져와야 합니다", () => {
    const trieNode = new TrieNode("c");

    trieNode.addChild("a");
    trieNode.addChild("o");

    const childA = trieNode.getChild("a");
    const childO = trieNode.getChild("o");

    expect(childA?.toString()).toBe("a");
    expect(childO?.toString()).toBe("o");
    expect(trieNode.getChild("b")).toBeNull(); // undefined가 아닌 null 반환
  });

  it("특정 자식 노드가 있는지 확인해야 합니다", () => {
    const trieNode = new TrieNode("c");

    trieNode.addChild("a");
    trieNode.addChild("o");

    expect(trieNode.hasChild("a")).toBeTruthy();
    expect(trieNode.hasChild("o")).toBeTruthy();
    expect(trieNode.hasChild("b")).toBeFalsy();
  });

  it("다음 자식 노드들을 제안해야 합니다", () => {
    const trieNode = new TrieNode("c");

    trieNode.addChild("a");
    trieNode.addChild("o");

    expect(trieNode.suggestChildren()).toEqual(["a", "o"]);
  });
});
