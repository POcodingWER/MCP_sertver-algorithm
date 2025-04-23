import BinarySearchTreeNode from "../BinarySearchTreeNode";

describe("BinarySearchTreeNode", () => {
  it("이진 검색 트리를 생성해야 함", () => {
    const bstNode = new BinarySearchTreeNode(2);

    expect(bstNode.value).toBe(2);
    expect(bstNode.left).toBeNull();
    expect(bstNode.right).toBeNull();
  });

  it("비어있는 경우 자신에게 삽입해야 함", () => {
    const bstNode = new BinarySearchTreeNode();
    bstNode.insert(1);

    expect(bstNode.value).toBe(1);
    expect(bstNode.left).toBeNull();
    expect(bstNode.right).toBeNull();
  });

  it("올바른 순서로 노드를 삽입해야 함", () => {
    const bstNode = new BinarySearchTreeNode(2);
    const insertedNode1 = bstNode.insert(1);

    expect(insertedNode1.value).toBe(1);
    expect(bstNode.toString()).toBe("1,2");
    expect(bstNode.contains(1)).toBeTruthy();
    expect(bstNode.contains(3)).toBeFalsy();

    const insertedNode2 = bstNode.insert(3);

    expect(insertedNode2.value).toBe(3);
    expect(bstNode.toString()).toBe("1,2,3");
    expect(bstNode.contains(3)).toBeTruthy();
    expect(bstNode.contains(4)).toBeFalsy();

    bstNode.insert(7);

    expect(bstNode.toString()).toBe("1,2,3,7");
    expect(bstNode.contains(7)).toBeTruthy();
    expect(bstNode.contains(8)).toBeFalsy();

    bstNode.insert(4);

    expect(bstNode.toString()).toBe("1,2,3,4,7");
    expect(bstNode.contains(4)).toBeTruthy();
    expect(bstNode.contains(8)).toBeFalsy();

    bstNode.insert(6);

    expect(bstNode.toString()).toBe("1,2,3,4,6,7");
    expect(bstNode.contains(6)).toBeTruthy();
    expect(bstNode.contains(8)).toBeFalsy();
  });

  it("중복을 삽입하지 않아야 함", () => {
    const bstNode = new BinarySearchTreeNode(2);
    bstNode.insert(1);

    expect(bstNode.toString()).toBe("1,2");
    expect(bstNode.contains(1)).toBeTruthy();
    expect(bstNode.contains(3)).toBeFalsy();

    bstNode.insert(1);

    expect(bstNode.toString()).toBe("1,2");
    expect(bstNode.contains(1)).toBeTruthy();
    expect(bstNode.contains(3)).toBeFalsy();
  });

  it("최소 노드를 찾아야 함", () => {
    const node = new BinarySearchTreeNode(10);

    node.insert(20);
    node.insert(30);
    node.insert(5);
    node.insert(40);
    node.insert(1);

    expect(node.findMin()).not.toBeNull();
    expect(node.findMin().value).toBe(1);
  });

  it("이진 검색 트리 노드에 메타 정보를 첨부할 수 있어야 함", () => {
    const node = new BinarySearchTreeNode(10);

    node.insert(20);
    const node1 = node.insert(30);
    node.insert(5);
    node.insert(40);
    const node2 = node.insert(1);

    node.meta.set("color", "red" as unknown as number);
    node1.meta.set("color", "black" as unknown as number);
    node2.meta.set("color", "white" as unknown as number);

    expect(node.meta.get("color")).toBe("red");

    expect(node.findMin()).not.toBeNull();
    expect(node.findMin().value).toBe(1);
    expect(node.findMin().meta.get("color")).toBe("white");
    expect(node.find(30)!.meta.get("color")).toBe("black");
  });

  it("노드를 찾아야 함", () => {
    const node = new BinarySearchTreeNode(10);

    node.insert(20);
    node.insert(30);
    node.insert(5);
    node.insert(40);
    node.insert(1);

    expect(node.find(6)).toBeNull();
    expect(node.find(5)).not.toBeNull();
    expect(node.find(5)!.value).toBe(5);
  });

  it("리프 노드를 제거해야 함", () => {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);
    bstRootNode.insert(5);

    expect(bstRootNode.toString()).toBe("5,10,20");

    const removed1 = bstRootNode.remove(5);
    expect(bstRootNode.toString()).toBe("10,20");
    expect(removed1).toBeTruthy();

    const removed2 = bstRootNode.remove(20);
    expect(bstRootNode.toString()).toBe("10");
    expect(removed2).toBeTruthy();
  });

  it("하나의 자식을 가진 노드를 제거해야 함", () => {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);
    bstRootNode.insert(5);
    bstRootNode.insert(30);

    expect(bstRootNode.toString()).toBe("5,10,20,30");

    bstRootNode.remove(20);
    expect(bstRootNode.toString()).toBe("5,10,30");

    bstRootNode.insert(1);
    expect(bstRootNode.toString()).toBe("1,5,10,30");

    bstRootNode.remove(5);
    expect(bstRootNode.toString()).toBe("1,10,30");
  });

  it("두 개의 자식을 가진 노드를 제거해야 함", () => {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);
    bstRootNode.insert(5);
    bstRootNode.insert(30);
    bstRootNode.insert(15);
    bstRootNode.insert(25);

    expect(bstRootNode.toString()).toBe("5,10,15,20,25,30");
    expect(bstRootNode.find(20)!.left!.value).toBe(15);
    expect(bstRootNode.find(20)!.right!.value).toBe(30);

    bstRootNode.remove(20);
    expect(bstRootNode.toString()).toBe("5,10,15,25,30");

    bstRootNode.remove(15);
    expect(bstRootNode.toString()).toBe("5,10,25,30");

    bstRootNode.remove(10);
    expect(bstRootNode.toString()).toBe("5,25,30");
    expect(bstRootNode.value).toBe(25);

    bstRootNode.remove(25);
    expect(bstRootNode.toString()).toBe("5,30");

    bstRootNode.remove(5);
    expect(bstRootNode.toString()).toBe("30");
  });

  it("부모가 없는 노드를 제거해야 함", () => {
    const bstRootNode = new BinarySearchTreeNode();
    expect(bstRootNode.toString()).toBe("");

    bstRootNode.insert(1);
    bstRootNode.insert(2);
    expect(bstRootNode.toString()).toBe("1,2");

    bstRootNode.remove(1);
    expect(bstRootNode.toString()).toBe("2");

    bstRootNode.remove(2);
    expect(bstRootNode.toString()).toBe("");
  });

  it("존재하지 않는 노드를 제거하려고 할 때 오류를 발생시켜야 함", () => {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);

    function removeNotExistingElementFromTree() {
      bstRootNode.remove(30);
    }

    expect(removeNotExistingElementFromTree).toThrow();
  });

  it("객체를 노드 값으로 사용할 수 있어야 함", () => {
    const nodeValueComparatorCallback = (a: any, b: any) => {
      const normalizedA = a || { value: null };
      const normalizedB = b || { value: null };

      if (normalizedA.value === normalizedB.value) {
        return 0;
      }

      return normalizedA.value < normalizedB.value ? -1 : 1;
    };

    const obj1 = { key: "obj1", value: 1, toString: () => "obj1" };
    const obj2 = { key: "obj2", value: 2, toString: () => "obj2" };
    const obj3 = { key: "obj3", value: 3, toString: () => "obj3" };

    const bstNode = new BinarySearchTreeNode(obj2, nodeValueComparatorCallback);
    bstNode.insert(obj1);

    expect(bstNode.toString()).toBe("obj1,obj2");
    expect(bstNode.contains(obj1)).toBeTruthy();
    expect(bstNode.contains(obj3)).toBeFalsy();

    bstNode.insert(obj3);

    expect(bstNode.toString()).toBe("obj1,obj2,obj3");
    expect(bstNode.contains(obj3)).toBeTruthy();

    expect(bstNode.findMin().value).toEqual(obj1);
  });

  it("제거된 노드를 버려야 함", () => {
    const rootNode = new BinarySearchTreeNode("foo");
    rootNode.insert("bar");
    const childNode = rootNode.find("bar");
    rootNode.remove("bar");

    expect(childNode!.parent).toBeNull();
  });
});
