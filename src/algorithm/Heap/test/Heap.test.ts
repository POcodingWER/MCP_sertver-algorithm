import Comparator from "../../../utils/Comparator";
import Heap from "../Heap";

describe("heap", () => {
  it("빈 최소 힙을 생성해야 함", () => {
    const heap = new Heap();

    expect(heap).toBeDefined();
    expect(heap.peek()).toBeNull();
    expect(heap.isEmpty()).toBeTruthy();
  });

  it("힙에 아이템을 추가하고 위로 힙화해야 함", () => {
    const heap = new Heap();

    heap.add(5);
    expect(heap.isEmpty()).toBeFalsy();
    expect(heap.peek()).toBe(5);
    expect(heap.toString()).toBe("5");

    heap.add(3);
    expect(heap.peek()).toBe(3);
    expect(heap.toString()).toBe("3,5");

    heap.add(10);
    expect(heap.peek()).toBe(3);
    expect(heap.toString()).toBe("3,5,10");

    heap.add(1);
    expect(heap.peek()).toBe(1);
    expect(heap.toString()).toBe("1,3,10,5");

    heap.add(1);
    expect(heap.peek()).toBe(1);
    expect(heap.toString()).toBe("1,1,10,5,3");

    expect(heap.poll()).toBe(1);
    expect(heap.toString()).toBe("1,3,10,5");

    expect(heap.poll()).toBe(1);
    expect(heap.toString()).toBe("3,5,10");

    expect(heap.poll()).toBe(3);
    expect(heap.toString()).toBe("5,10");
  });

  it("힙에서 아이템을 추출하고 아래로 힙화해야 함", () => {
    const heap = new Heap();

    heap.add(5);
    heap.add(3);
    heap.add(10);
    heap.add(11);
    heap.add(1);

    expect(heap.toString()).toBe("1,3,10,11,5");

    expect(heap.poll()).toBe(1);
    expect(heap.toString()).toBe("3,5,10,11");

    expect(heap.poll()).toBe(3);
    expect(heap.toString()).toBe("5,11,10");

    expect(heap.poll()).toBe(5);
    expect(heap.toString()).toBe("10,11");

    expect(heap.poll()).toBe(10);
    expect(heap.toString()).toBe("11");

    expect(heap.poll()).toBe(11);
    expect(heap.toString()).toBe("");

    expect(heap.poll()).toBeNull();
    expect(heap.toString()).toBe("");
  });

  it("오른쪽 가지를 통해서도 아래로 힙화해야 함", () => {
    const heap = new Heap();

    heap.add(3);
    heap.add(12);
    heap.add(10);

    expect(heap.toString()).toBe("3,12,10");

    heap.add(11);
    expect(heap.toString()).toBe("3,11,10,12");

    expect(heap.poll()).toBe(3);
    expect(heap.toString()).toBe("10,11,12");
  });

  it("힙에서 아이템의 인덱스를 찾을 수 있어야 함", () => {
    const heap = new Heap();

    heap.add(3);
    heap.add(12);
    heap.add(10);
    heap.add(11);
    heap.add(11);

    expect(heap.toString()).toBe("3,11,10,12,11");

    expect(heap.find(5)).toEqual([]);
    expect(heap.find(3)).toEqual([0]);
    expect(heap.find(11)).toEqual([1, 4]);
  });

  it("아래로 힙화하며 힙에서 아이템을 제거할 수 있어야 함", () => {
    const heap = new Heap();

    heap.add(3);
    heap.add(12);
    heap.add(10);
    heap.add(11);
    heap.add(11);

    expect(heap.toString()).toBe("3,11,10,12,11");

    expect(heap.remove(3).toString()).toEqual("10,11,11,12");
    expect(heap.remove(3).peek()).toEqual(10);
    expect(heap.remove(11).toString()).toEqual("10,12");
    expect(heap.remove(3).peek()).toEqual(10);
  });

  it("위로 힙화하며 힙에서 아이템을 제거할 수 있어야 함", () => {
    const heap = new Heap();

    heap.add(3);
    heap.add(10);
    heap.add(5);
    heap.add(6);
    heap.add(7);
    heap.add(4);
    heap.add(6);
    heap.add(8);
    heap.add(2);
    heap.add(1);

    expect(heap.toString()).toBe("1,2,4,6,3,5,6,10,8,7");
    expect(heap.remove(8).toString()).toEqual("1,2,4,6,3,5,6,10,7");
    expect(heap.remove(7).toString()).toEqual("1,2,4,6,3,5,6,10");
    expect(heap.remove(1).toString()).toEqual("2,3,4,6,10,5,6");
    expect(heap.remove(2).toString()).toEqual("3,6,4,6,10,5");
    expect(heap.remove(6).toString()).toEqual("3,5,4,10");
    expect(heap.remove(10).toString()).toEqual("3,5,4");
    expect(heap.remove(5).toString()).toEqual("3,4");
    expect(heap.remove(3).toString()).toEqual("4");
    expect(heap.remove(4).toString()).toEqual("");
  });

  it("사용자 정의 비교 함수로 힙에서 아이템을 제거할 수 있어야 함", () => {
    const heap = new Heap<string>();
    heap.add("dddd");
    heap.add("ccc");
    heap.add("bb");
    heap.add("a");

    expect(heap.toString()).toBe("a,bb,ccc,dddd");

    const comparator = new Comparator<string>((a, b) => {
      if (a.length === b.length) {
        return 0;
      }

      return a.length < b.length ? -1 : 1;
    });

    heap.remove("hey", comparator);
    expect(heap.toString()).toBe("a,bb,dddd");
  });
});
