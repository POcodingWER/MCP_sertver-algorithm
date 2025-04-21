import LinkedList from "../LinkedList";

describe("LinkedList", () => {
  it("빈 연결 리스트를 생성해야 합니다", () => {
    const linkedList = new LinkedList<number>();
    expect(linkedList.toString()).toBe("");
  });

  it("연결 리스트에 노드를 추가해야 합니다", () => {
    const linkedList = new LinkedList<number>();

    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();

    linkedList.append(1);
    linkedList.append(2);

    expect(linkedList.toString()).toBe("1,2");
  });

  it("연결 리스트의 앞에 노드를 추가해야 합니다", () => {
    const linkedList = new LinkedList<number>();

    linkedList.prepend(2);
    expect(linkedList.head!.toString()).toBe("2");
    expect(linkedList.tail!.toString()).toBe("2");

    linkedList.append(1);
    linkedList.prepend(3);

    expect(linkedList.toString()).toBe("3,2,1");
  });

  it("값에 따라 연결 리스트에서 노드를 삭제해야 합니다", () => {
    const linkedList = new LinkedList<number>();

    expect(linkedList.delete(5)).toBeNull();

    linkedList.append(1);
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(4);
    linkedList.append(5);

    expect(linkedList.head!.toString()).toBe("1");
    expect(linkedList.tail!.toString()).toBe("5");

    const deletedNode = linkedList.delete(3);
    expect(deletedNode!.value).toBe(3);
    expect(linkedList.toString()).toBe("1,1,2,4,5");

    linkedList.delete(3);
    expect(linkedList.toString()).toBe("1,1,2,4,5");

    linkedList.delete(1);
    expect(linkedList.toString()).toBe("2,4,5");

    expect(linkedList.head!.toString()).toBe("2");
    expect(linkedList.tail!.toString()).toBe("5");

    linkedList.delete(5);
    expect(linkedList.toString()).toBe("2,4");

    expect(linkedList.head!.toString()).toBe("2");
    expect(linkedList.tail!.toString()).toBe("4");

    linkedList.delete(4);
    expect(linkedList.toString()).toBe("2");

    expect(linkedList.head!.toString()).toBe("2");
    expect(linkedList.tail!.toString()).toBe("2");

    linkedList.delete(2);
    expect(linkedList.toString()).toBe("");
  });

  it("연결 리스트의 마지막 노드를 삭제해야 합니다", () => {
    const linkedList = new LinkedList<number>();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.head!.toString()).toBe("1");
    expect(linkedList.tail!.toString()).toBe("3");

    const deletedNode1 = linkedList.deleteTail();

    expect(deletedNode1!.value).toBe(3);
    expect(linkedList.toString()).toBe("1,2");
    expect(linkedList.head!.toString()).toBe("1");
    expect(linkedList.tail!.toString()).toBe("2");

    const deletedNode2 = linkedList.deleteTail();

    expect(deletedNode2!.value).toBe(2);
    expect(linkedList.toString()).toBe("1");
    expect(linkedList.head!.toString()).toBe("1");
    expect(linkedList.tail!.toString()).toBe("1");

    const deletedNode3 = linkedList.deleteTail();

    expect(deletedNode3!.value).toBe(1);
    expect(linkedList.toString()).toBe("");
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it("연결 리스트의 첫 번째 노드를 삭제해야 합니다", () => {
    const linkedList = new LinkedList<number>();

    expect(linkedList.deleteHead()).toBeNull();

    linkedList.append(1);
    linkedList.append(2);

    expect(linkedList.head!.toString()).toBe("1");
    expect(linkedList.tail!.toString()).toBe("2");

    const deletedNode1 = linkedList.deleteHead();

    expect(deletedNode1!.value).toBe(1);
    expect(linkedList.toString()).toBe("2");
    expect(linkedList.head!.toString()).toBe("2");
    expect(linkedList.tail!.toString()).toBe("2");

    const deletedNode2 = linkedList.deleteHead();

    expect(deletedNode2!.value).toBe(2);
    expect(linkedList.toString()).toBe("");
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it("연결 리스트에 객체를 저장하고 출력할 수 있어야 합니다", () => {
    interface NodeValue {
      value: number;
      key: string;
    }

    const linkedList = new LinkedList<NodeValue>();

    const nodeValue1: NodeValue = { value: 1, key: "key1" };
    const nodeValue2: NodeValue = { value: 2, key: "key2" };

    linkedList.append(nodeValue1).prepend(nodeValue2);

    const nodeStringifier = (value: NodeValue): string =>
      `${value.key}:${value.value}`;

    expect(linkedList.toString(nodeStringifier)).toBe("key2:2,key1:1");
  });

  it("값으로 노드를 찾아야 합니다", () => {
    const linkedList = new LinkedList<number>();

    expect(linkedList.find({ value: 5 })).toBeNull();

    linkedList.append(1);
    expect(linkedList.find({ value: 1 })).toBeDefined();

    linkedList.append(2).append(3);

    const node = linkedList.find({ value: 2 });

    expect(node!.value).toBe(2);
    expect(linkedList.find({ value: 5 })).toBeNull();
  });

  it("콜백으로 노드를 찾아야 합니다", () => {
    interface NodeValue {
      value: number;
      key: string;
    }

    const linkedList = new LinkedList<NodeValue>();

    linkedList
      .append({ value: 1, key: "test1" })
      .append({ value: 2, key: "test2" })
      .append({ value: 3, key: "test3" });

    const node = linkedList.find({
      callback: (value: NodeValue) => value.key === "test2",
    });

    expect(node).toBeDefined();
    expect(node!.value.value).toBe(2);
    expect(node!.value.key).toBe("test2");
    expect(
      linkedList.find({ callback: (value: NodeValue) => value.key === "test5" })
    ).toBeNull();
  });

  it("사용자 정의 비교 함수로 노드를 찾아야 합니다", () => {
    interface NodeValue {
      value: number;
      customValue: string;
    }

    const comparatorFunction = (a: NodeValue, b: NodeValue) => {
      if (a.customValue === b.customValue) {
        return 0;
      }

      return a.customValue < b.customValue ? -1 : 1;
    };

    const linkedList = new LinkedList<NodeValue>(comparatorFunction);

    linkedList
      .append({ value: 1, customValue: "test1" })
      .append({ value: 2, customValue: "test2" })
      .append({ value: 3, customValue: "test3" });

    const node = linkedList.find({
      value: { value: 2, customValue: "test2" },
    });

    expect(node).toBeDefined();
    expect(node!.value.value).toBe(2);
    expect(node!.value.customValue).toBe("test2");
    expect(
      linkedList.find({ value: { value: 2, customValue: "test5" } })
    ).toBeNull();
  });
});
