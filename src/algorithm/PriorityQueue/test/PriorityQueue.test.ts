import PriorityQueue from "../PriorityQueue";

describe("우선순위 큐", () => {
  it("기본 우선순위 큐를 생성해야 함", () => {
    const priorityQueue = new PriorityQueue();

    expect(priorityQueue).toBeDefined();
  });

  it("큐에 아이템을 삽입하고 우선순위를 지켜야 함", () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    expect(priorityQueue.peek()).toBe(10);

    priorityQueue.add(5, 2);
    expect(priorityQueue.peek()).toBe(10);

    priorityQueue.add(100, 0);
    expect(priorityQueue.peek()).toBe(100);
  });

  it("우선순위를 고려하여 큐에서 poll 해야 함", () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    expect(priorityQueue.poll()).toBe(100);
    expect(priorityQueue.poll()).toBe(200);
    expect(priorityQueue.poll()).toBe(10);
    expect(priorityQueue.poll()).toBe(5);
  });

  it("내부 노드의 우선순위를 변경할 수 있어야 함", () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    priorityQueue.changePriority(100, 10);
    priorityQueue.changePriority(10, 20);

    expect(priorityQueue.poll()).toBe(200);
    expect(priorityQueue.poll()).toBe(5);
    expect(priorityQueue.poll()).toBe(100);
    expect(priorityQueue.poll()).toBe(10);
  });

  it("루트 노드의 우선순위를 변경할 수 있어야 함", () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    priorityQueue.changePriority(200, 10);
    priorityQueue.changePriority(10, 20);

    expect(priorityQueue.poll()).toBe(100);
    expect(priorityQueue.poll()).toBe(5);
    expect(priorityQueue.poll()).toBe(200);
    expect(priorityQueue.poll()).toBe(10);
  });

  it("노드 추가와 함께 우선순위를 변경할 수 있어야 함", () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    priorityQueue.changePriority(200, 10);
    priorityQueue.changePriority(10, 20);

    priorityQueue.add(15, 15);

    expect(priorityQueue.poll()).toBe(100);
    expect(priorityQueue.poll()).toBe(5);
    expect(priorityQueue.poll()).toBe(200);
    expect(priorityQueue.poll()).toBe(15);
    expect(priorityQueue.poll()).toBe(10);
  });

  it("우선순위 큐에서 값으로 검색이 가능해야 함", () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);
    priorityQueue.add(15, 15);

    expect(priorityQueue.hasValue(70)).toBeFalsy();
    expect(priorityQueue.hasValue(15)).toBeTruthy();
  });
});
