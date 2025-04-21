import DoublyLinkedListNode from "../DoublyLinkedListNode";

describe("DoublyLinkedListNode", () => {
  it("값이 있는 리스트 노드를 생성해야 합니다", () => {
    const node = new DoublyLinkedListNode(1);

    expect(node.value).toBe(1);
    expect(node.next).toBeNull();
    expect(node.previous).toBeNull();
  });

  it("객체를 값으로 가지는 리스트 노드를 생성해야 합니다", () => {
    const nodeValue = { value: 1, key: "test" };
    const node = new DoublyLinkedListNode(nodeValue);

    expect(node.value.value).toBe(1);
    expect(node.value.key).toBe("test");
    expect(node.next).toBeNull();
    expect(node.previous).toBeNull();
  });

  it("노드들을 서로 연결해야 합니다", () => {
    const node2 = new DoublyLinkedListNode(2);
    const node1 = new DoublyLinkedListNode(1, node2);
    const node3 = new DoublyLinkedListNode(10, node1, node2);

    expect(node1.next).toBeDefined();
    expect(node1.previous).toBeNull();
    expect(node2.next).toBeNull();
    expect(node2.previous).toBeNull();
    expect(node3.next).toBeDefined();
    expect(node3.previous).toBeDefined();
    expect(node1.value).toBe(1);
    expect(node1.next!.value).toBe(2);
    expect(node3.next!.value).toBe(1);
    expect(node3.previous!.value).toBe(2);
  });

  it("노드를 문자열로 변환해야 합니다", () => {
    const node = new DoublyLinkedListNode<string | number>(1);

    expect(node.toString()).toBe("1");

    node.value = "string value";
    expect(node.toString()).toBe("string value");
  });

  it("커스텀 문자열 변환기를 사용하여 노드를 문자열로 변환해야 합니다", () => {
    const nodeValue = { value: 1, key: "test" };
    const node = new DoublyLinkedListNode(nodeValue);
    const toStringCallback = (value: { value: number; key: string }) =>
      `value: ${value.value}, key: ${value.key}`;

    expect(node.toString(toStringCallback)).toBe("value: 1, key: test");
  });
});
