import BinaryTreeNode from "../BinaryTreeNode";

describe("BinaryTreeNode", () => {
  it("노드를 생성할 수 있어야 한다", () => {
    const node = new BinaryTreeNode<number | null>();

    expect(node).toBeDefined();

    expect(node.value).toBeNull();
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();

    const leftNode = new BinaryTreeNode<number>(1);
    const rightNode = new BinaryTreeNode<number>(3);
    const rootNode = new BinaryTreeNode<number>(2);

    rootNode.setLeft(leftNode).setRight(rightNode);

    expect(rootNode.value).toBe(2);
    expect(rootNode.left?.value).toBe(1);
    expect(rootNode.right?.value).toBe(3);
  });

  it("부모 노드를 설정할 수 있어야 한다", () => {
    const leftNode = new BinaryTreeNode<number>(1);
    const rightNode = new BinaryTreeNode<number>(3);
    const rootNode = new BinaryTreeNode<number>(2);

    rootNode.setLeft(leftNode).setRight(rightNode);

    expect(rootNode.parent).toBeNull();
    expect(rootNode.left?.parent?.value).toBe(2);
    expect(rootNode.right?.parent?.value).toBe(2);
    expect(rootNode.right?.parent).toEqual(rootNode);
  });

  it("노드를 순회할 수 있어야 한다", () => {
    const leftNode = new BinaryTreeNode<number>(1);
    const rightNode = new BinaryTreeNode<number>(3);
    const rootNode = new BinaryTreeNode<number>(2);

    rootNode.setLeft(leftNode).setRight(rightNode);

    expect(rootNode.traverseInOrder()).toEqual([1, 2, 3]);

    expect(rootNode.toString()).toBe("1,2,3");
  });

  it("자식 노드를 제거할 수 있어야 한다", () => {
    const leftNode = new BinaryTreeNode<number>(1);
    const rightNode = new BinaryTreeNode<number>(3);
    const rootNode = new BinaryTreeNode<number>(2);

    rootNode.setLeft(leftNode).setRight(rightNode);

    expect(rootNode.traverseInOrder()).toEqual([1, 2, 3]);

    expect(rootNode.left && rootNode.removeChild(rootNode.left)).toBeTruthy();
    expect(rootNode.traverseInOrder()).toEqual([2, 3]);

    expect(rootNode.right && rootNode.removeChild(rootNode.right)).toBeTruthy();
    expect(rootNode.traverseInOrder()).toEqual([2]);

    expect(rootNode.right && rootNode.removeChild(rootNode.right)).toBeFalsy();
    expect(rootNode.traverseInOrder()).toEqual([2]);
  });

  it("자식 노드를 교체할 수 있어야 한다", () => {
    const leftNode = new BinaryTreeNode<number>(1);
    const rightNode = new BinaryTreeNode<number>(3);
    const rootNode = new BinaryTreeNode<number>(2);

    rootNode.setLeft(leftNode).setRight(rightNode);

    expect(rootNode.traverseInOrder()).toEqual([1, 2, 3]);

    const replacementNode = new BinaryTreeNode<number>(5);
    rightNode.setRight(replacementNode);

    expect(rootNode.traverseInOrder()).toEqual([1, 2, 3, 5]);

    expect(
      rootNode.right &&
        rootNode.right.right &&
        rootNode.replaceChild(rootNode.right, rootNode.right.right)
    ).toBeTruthy();
    expect(rootNode.right?.value).toBe(5);
    expect(rootNode.right?.right).toBeNull();
    expect(rootNode.traverseInOrder()).toEqual([1, 2, 5]);

    expect(
      rootNode.right &&
        rootNode.right.right &&
        rootNode.replaceChild(rootNode.right, rootNode.right.right)
    ).toBeFalsy();
    expect(rootNode.traverseInOrder()).toEqual([1, 2, 5]);

    expect(
      rootNode.right && rootNode.replaceChild(rootNode.right, replacementNode)
    ).toBeTruthy();
    expect(rootNode.traverseInOrder()).toEqual([1, 2, 5]);

    expect(
      rootNode.left && rootNode.replaceChild(rootNode.left, replacementNode)
    ).toBeTruthy();
    expect(rootNode.traverseInOrder()).toEqual([5, 2, 5]);

    expect(
      rootNode.replaceChild(
        new BinaryTreeNode<number>(),
        new BinaryTreeNode<number>()
      )
    ).toBeFalsy();
  });

  it("노드의 높이를 계산할 수 있어야 한다", () => {
    const root = new BinaryTreeNode<number>(1);
    const left = new BinaryTreeNode<number>(3);
    const right = new BinaryTreeNode<number>(2);
    const grandLeft = new BinaryTreeNode<number>(5);
    const grandRight = new BinaryTreeNode<number>(6);
    const grandGrandLeft = new BinaryTreeNode<number>(7);

    expect(root.height).toBe(0);
    expect(root.balanceFactor).toBe(0);

    root.setLeft(left).setRight(right);

    expect(root.height).toBe(1);
    expect(left.height).toBe(0);
    expect(root.balanceFactor).toBe(0);

    left.setLeft(grandLeft).setRight(grandRight);

    expect(root.height).toBe(2);
    expect(left.height).toBe(1);
    expect(grandLeft.height).toBe(0);
    expect(grandRight.height).toBe(0);
    expect(root.balanceFactor).toBe(1);

    grandLeft.setLeft(grandGrandLeft);

    expect(root.height).toBe(3);
    expect(left.height).toBe(2);
    expect(grandLeft.height).toBe(1);
    expect(grandRight.height).toBe(0);
    expect(grandGrandLeft.height).toBe(0);
    expect(root.balanceFactor).toBe(2);
  });

  it("오른쪽 노드의 높이도 계산할 수 있어야 한다", () => {
    const root = new BinaryTreeNode<number>(1);
    const right = new BinaryTreeNode<number>(2);

    root.setRight(right);

    expect(root.height).toBe(1);
    expect(right.height).toBe(0);
    expect(root.balanceFactor).toBe(-1);
  });

  it("왼쪽과 오른쪽 노드를 null로 설정할 수 있어야 한다", () => {
    const root = new BinaryTreeNode<number>(2);
    const left = new BinaryTreeNode<number>(1);
    const right = new BinaryTreeNode<number>(3);

    root.setLeft(left);
    root.setRight(right);

    expect(root.left?.value).toBe(1);
    expect(root.right?.value).toBe(3);

    root.setLeft(null);
    root.setRight(null);

    expect(root.left).toBeNull();
    expect(root.right).toBeNull();
  });

  it("객체를 값으로 가지는 노드를 생성할 수 있어야 한다", () => {
    const obj1 = { key: "object_1", toString: () => "object_1" };
    const obj2 = { key: "object_2" };

    const node1 = new BinaryTreeNode<typeof obj1>(obj1);
    const node2 = new BinaryTreeNode<typeof obj2>(obj2);

    node1.setLeft(node2);

    expect(node1.value).toEqual(obj1);
    expect(node2.value).toEqual(obj2);
    expect(node1.left?.value).toEqual(obj2);

    node1.removeChild(node2);

    expect(node1.value).toEqual(obj1);
    expect(node2.value).toEqual(obj2);
    expect(node1.left).toBeNull();

    expect(node1.toString()).toBe("object_1");
    expect(node2.toString()).toBe("[object Object]");
  });

  it("노드에 메타 정보를 추가할 수 있어야 한다", () => {
    const redNode = new BinaryTreeNode<number>(1);
    const blackNode = new BinaryTreeNode<number>(2);

    redNode.meta.set("color", "red" as any);
    blackNode.meta.set("color", "black" as any);

    expect(redNode.meta.get("color")).toBe("red");
    expect(blackNode.meta.get("color")).toBe("black");
  });

  it("오른쪽 삼촌 노드를 감지할 수 있어야 한다", () => {
    const grandParent = new BinaryTreeNode<string>("grand-parent");
    const parent = new BinaryTreeNode<string>("parent");
    const uncle = new BinaryTreeNode<string>("uncle");
    const child = new BinaryTreeNode<string>("child");

    expect(grandParent.uncle).not.toBeDefined();
    expect(parent.uncle).not.toBeDefined();

    grandParent.setLeft(parent);

    expect(parent.uncle).not.toBeDefined();
    expect(child.uncle).not.toBeDefined();

    parent.setLeft(child);

    expect(child.uncle).not.toBeDefined();

    grandParent.setRight(uncle);

    expect(parent.uncle).not.toBeDefined();
    expect(child.uncle).toBeDefined();
    expect(child.uncle).toEqual(uncle);
  });

  it("왼쪽 삼촌 노드를 감지할 수 있어야 한다", () => {
    const grandParent = new BinaryTreeNode<string>("grand-parent");
    const parent = new BinaryTreeNode<string>("parent");
    const uncle = new BinaryTreeNode<string>("uncle");
    const child = new BinaryTreeNode<string>("child");

    expect(grandParent.uncle).not.toBeDefined();
    expect(parent.uncle).not.toBeDefined();

    grandParent.setRight(parent);

    expect(parent.uncle).not.toBeDefined();
    expect(child.uncle).not.toBeDefined();

    parent.setRight(child);

    expect(child.uncle).not.toBeDefined();

    grandParent.setLeft(uncle);

    expect(parent.uncle).not.toBeDefined();
    expect(child.uncle).toBeDefined();
    expect(child.uncle).toEqual(uncle);
  });

  it("노드의 값을 설정할 수 있어야 한다", () => {
    const node = new BinaryTreeNode<string>("initial_value");

    expect(node.value).toBe("initial_value");

    node.setValue("new_value");

    expect(node.value).toBe("new_value");
  });

  it("노드를 복사할 수 있어야 한다", () => {
    const root = new BinaryTreeNode<string>("root");
    const left = new BinaryTreeNode<string>("left");
    const right = new BinaryTreeNode<string>("right");

    root.setLeft(left).setRight(right);

    expect(root.toString()).toBe("left,root,right");

    const newRoot = new BinaryTreeNode<string>("new_root");
    const newLeft = new BinaryTreeNode<string>("new_left");
    const newRight = new BinaryTreeNode<string>("new_right");

    newRoot.setLeft(newLeft).setRight(newRight);

    expect(newRoot.toString()).toBe("new_left,new_root,new_right");

    BinaryTreeNode.copyNode(root, newRoot);

    expect(root.toString()).toBe("left,root,right");
    expect(newRoot.toString()).toBe("left,root,right");
  });
});
