import HashTable from "../HashTable";

describe("HashTable", () => {
  // 해시 테이블 크기 테스트
  it("지정된 크기로 해시 테이블을 생성해야 합니다", () => {
    const defaultHashTable = new HashTable<string, string>();
    expect((defaultHashTable as any).buckets.length).toBe(32);

    const biggerHashTable = new HashTable<string, string>(64);
    expect((biggerHashTable as any).buckets.length).toBe(64);
  });

  // 해시 생성 테스트
  it("지정된 키에 대해 올바른 해시를 생성해야 합니다", () => {
    const hashTable = new HashTable<string, string>();

    expect((hashTable as any).hash("a")).toBe(1);
    expect((hashTable as any).hash("b")).toBe(2);
    expect((hashTable as any).hash("abc")).toBe(6);
  });

  // 충돌 처리 테스트
  it("충돌이 있는 데이터의 설정, 읽기, 삭제가 가능해야 합니다", () => {
    const hashTable = new HashTable<string, string>(3);

    expect((hashTable as any).hash("a")).toBe(1);
    expect((hashTable as any).hash("b")).toBe(2);
    expect((hashTable as any).hash("c")).toBe(0);
    expect((hashTable as any).hash("d")).toBe(1);

    hashTable.set("a", "sky-old");
    hashTable.set("a", "sky");
    hashTable.set("b", "sea");
    hashTable.set("c", "earth");
    hashTable.set("d", "ocean");

    expect(hashTable.has("x")).toBeFalsy();
    expect(hashTable.has("b")).toBeTruthy();
    expect(hashTable.has("c")).toBeTruthy();

    const stringifier = (value: { key: string; value: string }) =>
      `${value.key}:${value.value}`;

    expect((hashTable as any).buckets[0].toString(stringifier)).toBe("c:earth");
    expect((hashTable as any).buckets[1].toString(stringifier)).toBe(
      "a:sky,d:ocean"
    );
    expect((hashTable as any).buckets[2].toString(stringifier)).toBe("b:sea");

    expect(hashTable.get("a")).toBe("sky");
    expect(hashTable.get("d")).toBe("ocean");
    expect(hashTable.get("x")).not.toBeDefined();

    hashTable.delete("a");

    expect(hashTable.delete("not-existing")).toBeFalsy();

    expect(hashTable.get("a")).not.toBeDefined();
    expect(hashTable.get("d")).toBe("ocean");

    hashTable.set("d", "ocean-new");
    expect(hashTable.get("d")).toBe("ocean-new");
  });

  // 객체 저장 테스트
  it("해시 테이블에 객체를 추가할 수 있어야 합니다", () => {
    interface TestObject {
      prop1: string;
      prop2: string;
    }

    const hashTable = new HashTable<string, TestObject>();

    hashTable.set("objectKey", { prop1: "a", prop2: "b" });

    const object = hashTable.get("objectKey");
    expect(object).toBeDefined();
    expect(object?.prop1).toBe("a");
    expect(object?.prop2).toBe("b");
  });

  // 실제 키 추적 테스트
  it("실제 키들을 추적해야 합니다", () => {
    const hashTable = new HashTable<string, string>(3);

    hashTable.set("a", "sky-old");
    hashTable.set("a", "sky");
    hashTable.set("b", "sea");
    hashTable.set("c", "earth");
    hashTable.set("d", "ocean");

    expect(hashTable.getKeys()).toEqual(["a", "b", "c", "d"]);
    expect(hashTable.has("a")).toBeTruthy();
    expect(hashTable.has("x")).toBeFalsy();

    hashTable.delete("a");

    expect(hashTable.has("a")).toBeFalsy();
    expect(hashTable.has("b")).toBeTruthy();
    expect(hashTable.has("x")).toBeFalsy();
  });
});
