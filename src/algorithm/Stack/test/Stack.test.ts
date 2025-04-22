import Stack from "../Stack";

// 테스트용 인터페이스 정의
interface TestItem {
  value: string;
  key: string;
}

describe("Stack(스택)", () => {
  it("빈 스택을 생성해야 합니다", () => {
    const stack = new Stack<number>();
    expect(stack).not.toBeNull();
    expect(stack.linkedList).not.toBeNull();
  });

  it("스택에 데이터를 push해야 합니다", () => {
    const stack = new Stack<number>();

    stack.push(1);
    stack.push(2);

    expect(stack.toString()).toBe("1,2");
  });

  it("스택의 맨 위 데이터를 확인해야 합니다(peek)", () => {
    const stack = new Stack<number>();

    expect(stack.peek()).toBeNull();

    stack.push(1);
    stack.push(2);

    expect(stack.peek()).toBe(2);
    expect(stack.peek()).toBe(2);
  });

  it("스택이 비어있는지 확인해야 합니다", () => {
    const stack = new Stack<number>();

    expect(stack.isEmpty()).toBeTruthy();

    stack.push(1);

    expect(stack.isEmpty()).toBeFalsy();
  });

  it("스택에서 데이터를 pop해야 합니다", () => {
    const stack = new Stack<number>();

    stack.push(1);
    stack.push(2);

    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBeNull();
    expect(stack.isEmpty()).toBeTruthy();
  });

  it("객체를 스택에 push하고 pop할 수 있어야 합니다", () => {
    const stack = new Stack<TestItem>();

    stack.push({ value: "test1", key: "key1" });
    stack.push({ value: "test2", key: "key2" });

    const stringifier = (value: TestItem) => `${value.key}:${value.value}`;

    expect(stack.toString(stringifier)).toBe("key1:test1,key2:test2");
    expect(stack.pop()!.value).toBe("test2");
    expect(stack.pop()!.value).toBe("test1");
  });

  it("스택을 배열로 변환할 수 있어야 합니다", () => {
    const stack = new Stack<number>();

    expect(stack.peek()).toBeNull();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.toArray()).toEqual([3, 2, 1]);
  });
});
