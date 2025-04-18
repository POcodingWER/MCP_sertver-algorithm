import LinkedListNode from "../node";

describe("LinkedListNode", () => {
  it("값을 가진 리스트 노드를 생성해야 합니다", () => {
    const node = new LinkedListNode<number>(1);

    expect(node.value).toBe(1);
    expect(node.next).toBeNull();
  });

  it("객체를 값으로 가진 리스트 노드를 생성해야 합니다", () => {
    interface NodeValue {
      value: number;
      key: string;
    }

    const nodeValue: NodeValue = { value: 1, key: "test" };
    const node = new LinkedListNode<NodeValue>(nodeValue);

    expect(node.value.value).toBe(1);
    expect(node.value.key).toBe("test");
    expect(node.next).toBeNull();
  });

  it("노드들을 서로 연결해야 합니다", () => {
    const node2 = new LinkedListNode<number>(2);
    const node1 = new LinkedListNode<number>(1, node2);

    expect(node1.next).toBeDefined();
    expect(node2.next).toBeNull();
    expect(node1.value).toBe(1);
    expect(node1.next!.value).toBe(2);
  });

  it("노드를 문자열로 변환해야 합니다", () => {
    const node = new LinkedListNode<number | string>(1);

    expect(node.toString()).toBe("1");

    node.value = "string value";
    expect(node.toString()).toBe("string value");
  });

  it("커스텀 문자열 변환기로 노드를 문자열로 변환해야 합니다", () => {
    interface NodeValue {
      value: number;
      key: string;
    }

    const nodeValue: NodeValue = { value: 1, key: "test" };
    const node = new LinkedListNode<NodeValue>(nodeValue);
    const toStringCallback = (value: NodeValue): string =>
      `value: ${value.value}, key: ${value.key}`;

    expect(node.toString(toStringCallback)).toBe("value: 1, key: test");
  });
});
