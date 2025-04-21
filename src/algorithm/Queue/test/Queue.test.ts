import Queue from "../Queue";

// 테스트용 인터페이스 정의
interface TestItem {
  value: string;
  key: string;
}

describe("Queue(큐)", () => {
  it("빈 큐를 생성해야 합니다", () => {
    const queue = new Queue<number>();
    expect(queue).not.toBeNull();
    expect(queue.linkedList).not.toBeNull();
  });

  it("큐에 데이터를 추가해야 합니다", () => {
    const queue = new Queue<number>();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.toString()).toBe("1,2");
  });

  it("객체를 큐에 추가하고 제거할 수 있어야 합니다", () => {
    const queue = new Queue<TestItem>();

    queue.enqueue({ value: "test1", key: "key1" });
    queue.enqueue({ value: "test2", key: "key2" });

    const stringifier = (value: TestItem) => `${value.key}:${value.value}`;

    expect(queue.toString(stringifier)).toBe("key1:test1,key2:test2");
    expect(queue.dequeue()!.value).toBe("test1");
    expect(queue.dequeue()!.value).toBe("test2");
  });

  it("큐의 맨 앞 데이터를 확인해야 합니다(peek)", () => {
    const queue = new Queue<number>();

    expect(queue.peek()).toBeNull();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.peek()).toBe(1);
    expect(queue.peek()).toBe(1);
  });

  it("큐가 비어있는지 확인해야 합니다", () => {
    const queue = new Queue<number>();

    expect(queue.isEmpty()).toBeTruthy();

    queue.enqueue(1);

    expect(queue.isEmpty()).toBeFalsy();
  });

  it("FIFO 순서대로 큐에서 데이터를 제거해야 합니다", () => {
    const queue = new Queue<number>();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBeNull();
    expect(queue.isEmpty()).toBeTruthy();
  });
});
