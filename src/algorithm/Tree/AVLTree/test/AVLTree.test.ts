import AvlTree from "../AVLTree";

describe("AvlTree", () => {
  it("단순 좌-좌 회전을 수행해야 함", () => {
    const tree = new AvlTree();

    tree.insert(4);
    tree.insert(3);
    tree.insert(2);

    expect(tree.toString()).toBe("2,3,4");
    expect(tree.root.value).toBe(3);
    expect(tree.root.height).toBe(1);

    tree.insert(1);

    expect(tree.toString()).toBe("1,2,3,4");
    expect(tree.root.value).toBe(3);
    expect(tree.root.height).toBe(2);

    tree.insert(0);

    expect(tree.toString()).toBe("0,1,2,3,4");
    expect(tree.root.value).toBe(3);
    expect(tree.root.left?.value).toBe(1);
    expect(tree.root.height).toBe(2);
  });

  it("복잡한 좌-좌 회전을 수행해야 함", () => {
    const tree = new AvlTree();

    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(10);

    expect(tree.root.value).toBe(30);
    expect(tree.root.height).toBe(2);
    expect(tree.toString()).toBe("10,20,30,40");

    tree.insert(25);
    expect(tree.root.value).toBe(30);
    expect(tree.root.height).toBe(2);
    expect(tree.toString()).toBe("10,20,25,30,40");

    tree.insert(5);
    expect(tree.root.value).toBe(20);
    expect(tree.root.height).toBe(2);
    expect(tree.toString()).toBe("5,10,20,25,30,40");
  });

  it("단순 우-우 회전을 수행해야 함", () => {
    const tree = new AvlTree();

    tree.insert(2);
    tree.insert(3);
    tree.insert(4);

    expect(tree.toString()).toBe("2,3,4");
    expect(tree.root.value).toBe(3);
    expect(tree.root.height).toBe(1);

    tree.insert(5);

    expect(tree.toString()).toBe("2,3,4,5");
    expect(tree.root.value).toBe(3);
    expect(tree.root.height).toBe(2);

    tree.insert(6);

    expect(tree.toString()).toBe("2,3,4,5,6");
    expect(tree.root.value).toBe(3);
    expect(tree.root.right?.value).toBe(5);
    expect(tree.root.height).toBe(2);
  });

  it("복잡한 우-우 회전을 수행해야 함", () => {
    const tree = new AvlTree();

    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(50);

    expect(tree.root.value).toBe(30);
    expect(tree.root.height).toBe(2);
    expect(tree.toString()).toBe("20,30,40,50");

    tree.insert(35);
    expect(tree.root.value).toBe(30);
    expect(tree.root.height).toBe(2);
    expect(tree.toString()).toBe("20,30,35,40,50");

    tree.insert(55);
    expect(tree.root.value).toBe(40);
    expect(tree.root.height).toBe(2);
    expect(tree.toString()).toBe("20,30,35,40,50,55");
  });

  it("좌-우 회전을 수행해야 함", () => {
    const tree = new AvlTree();

    tree.insert(30);
    tree.insert(20);
    tree.insert(25);

    expect(tree.root.height).toBe(1);
    expect(tree.root.value).toBe(25);
    expect(tree.toString()).toBe("20,25,30");
  });

  it("우-좌 회전을 수행해야 함", () => {
    const tree = new AvlTree();

    tree.insert(30);
    tree.insert(40);
    tree.insert(35);

    expect(tree.root.height).toBe(1);
    expect(tree.root.value).toBe(35);
    expect(tree.toString()).toBe("30,35,40");
  });

  it("균형 잡힌 트리를 생성해야 함: 케이스 #1", () => {
    // @see: https://www.youtube.com/watch?v=rbg7Qf8GkQ4&t=839s
    const tree = new AvlTree();

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);

    expect(tree.root.value).toBe(2);
    expect(tree.root.height).toBe(1);
    expect(tree.toString()).toBe("1,2,3");

    tree.insert(6);

    expect(tree.root.value).toBe(2);
    expect(tree.root.height).toBe(2);
    expect(tree.toString()).toBe("1,2,3,6");

    tree.insert(15);

    expect(tree.root.value).toBe(2);
    expect(tree.root.height).toBe(2);
    expect(tree.toString()).toBe("1,2,3,6,15");

    tree.insert(-2);

    expect(tree.root.value).toBe(2);
    expect(tree.root.height).toBe(2);
    expect(tree.toString()).toBe("-2,1,2,3,6,15");

    tree.insert(-5);

    expect(tree.root.value).toBe(2);
    expect(tree.root.height).toBe(2);
    expect(tree.toString()).toBe("-5,-2,1,2,3,6,15");

    tree.insert(-8);

    expect(tree.root.value).toBe(2);
    expect(tree.root.height).toBe(3);
    expect(tree.toString()).toBe("-8,-5,-2,1,2,3,6,15");
  });

  it("균형 잡힌 트리를 생성해야 함: 케이스 #2", () => {
    // @see https://www.youtube.com/watch?v=7m94k2Qhg68
    const tree = new AvlTree();

    tree.insert(43);
    tree.insert(18);
    tree.insert(22);
    tree.insert(9);
    tree.insert(21);
    tree.insert(6);

    expect(tree.root.value).toBe(18);
    expect(tree.root.height).toBe(2);
    expect(tree.toString()).toBe("6,9,18,21,22,43");

    tree.insert(8);

    expect(tree.root.value).toBe(18);
    expect(tree.root.height).toBe(2);
    expect(tree.toString()).toBe("6,8,9,18,21,22,43");
  });

  it("좌-우 회전을 수행하고 좌-우 노드를 안전하게 유지해야 함", () => {
    const tree = new AvlTree();

    tree.insert(30);
    tree.insert(15);
    tree.insert(40);
    tree.insert(10);
    tree.insert(18);
    tree.insert(35);
    tree.insert(45);
    tree.insert(5);
    tree.insert(12);

    expect(tree.toString()).toBe("5,10,12,15,18,30,35,40,45");
    expect(tree.root.height).toBe(3);

    tree.insert(11);

    expect(tree.toString()).toBe("5,10,11,12,15,18,30,35,40,45");
    expect(tree.root.height).toBe(3);
  });

  it("우-좌 회전을 수행하고 우-좌 노드를 안전하게 유지해야 함", () => {
    const tree = new AvlTree();

    tree.insert(30);
    tree.insert(15);
    tree.insert(40);
    tree.insert(10);
    tree.insert(18);
    tree.insert(35);
    tree.insert(45);
    tree.insert(42);
    tree.insert(47);

    expect(tree.toString()).toBe("10,15,18,30,35,40,42,45,47");
    expect(tree.root.height).toBe(3);

    tree.insert(43);

    expect(tree.toString()).toBe("10,15,18,30,35,40,42,43,45,47");
    expect(tree.root.height).toBe(3);
  });

  it("노드 제거를 시도할 때 오류를 발생시켜야 함", () => {
    const removeNodeAvlTree = () => {
      const tree = new AvlTree();

      tree.remove(1);
    };

    expect(removeNodeAvlTree).toThrowError();
  });
});
