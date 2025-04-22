import LinkedList from "../LinkedList/LinkedList";

// 해시 테이블 크기는 충돌 횟수에 직접적인 영향을 미칩니다.
// 해시 테이블 크기가 클수록 충돌이 적게 발생합니다.
// 충돌 처리 방식을 보여주기 위해 해시 테이블 크기를 작게 설정했습니다.

const defaultHashTableSize = 32;

interface HashNode<K, V> {
  key: K;
  value: V;
}

export default class HashTable<K extends string, V> {
  private buckets: LinkedList<HashNode<K, V>>[];
  private keys: { [key: string]: number };

  /**
   * @param {number} hashTableSize - 해시 테이블의 크기
   */
  constructor(hashTableSize = defaultHashTableSize) {
    // 지정된 크기의 해시 테이블을 생성하고 각 버킷을 빈 연결 리스트로 채웁니다.
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList<HashNode<K, V>>());

    // 모든 실제 키를 빠르게 추적하기 위한 객체입니다.
    this.keys = {};
  }

  /**
   * 키 문자열을 해시 숫자로 변환합니다.
   *
   * @param {K} key - 해시할 키
   * @return {number} - 해시된 값
   */
  private hash(key: K): number {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    );

    // 해시 숫자를 해시 테이블 크기에 맞게 조정합니다.
    return hash % this.buckets.length;
  }

  /**
   * 키-값 쌍을 해시 테이블에 설정합니다.
   *
   * @param {K} key - 저장할 키
   * @param {V} value - 저장할 값
   */
  set(key: K, value: V): void {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({
      callback: (nodeValue: HashNode<K, V>) => nodeValue.key === key,
    });

    if (!node) {
      // 새 노드를 삽입합니다.
      bucketLinkedList.append({ key, value });
    } else {
      // 기존 노드의 값을 업데이트합니다.
      node.value.value = value;
    }
  }

  /**
   * 키에 해당하는 값을 삭제합니다.
   *
   * @param {K} key - 삭제할 키
   * @return {boolean} - 삭제 성공 여부
   */
  delete(key: K): boolean {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({
      callback: (nodeValue: HashNode<K, V>) => nodeValue.key === key,
    });

    if (node) {
      return bucketLinkedList.delete(node.value) !== null;
    }

    return false;
  }

  /**
   * 키에 해당하는 값을 가져옵니다.
   *
   * @param {K} key - 검색할 키
   * @return {V | undefined} - 찾은 값 또는 undefined
   */
  get(key: K): V | undefined {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({
      callback: (nodeValue: HashNode<K, V>) => nodeValue.key === key,
    });

    return node ? node.value.value : undefined;
  }

  /**
   * 키가 존재하는지 확인합니다.
   *
   * @param {K} key - 확인할 키
   * @return {boolean} - 키 존재 여부
   */
  has(key: K): boolean {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  /**
   * 모든 키 목록을 반환합니다.
   *
   * @return {K[]} - 키 배열
   */
  getKeys(): K[] {
    return Object.keys(this.keys) as K[];
  }
}
