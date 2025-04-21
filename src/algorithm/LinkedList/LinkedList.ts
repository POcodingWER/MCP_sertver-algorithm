import LinkedListNode from "./LinkedListNode";
import Comparator from "../../utils/Comparator";

export default class LinkedList<T> {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;
  compare: Comparator<T>;

  /**
   * @param {Function} [comparatorFunction] 비교 함수
   */
  constructor(comparatorFunction?: (a: T, b: T) => number) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator<T>(comparatorFunction);
  }

  /**
   * 연결 리스트의 맨 앞에 새로운 노드 추가
   * @param {*} value 추가할 값
   * @return {LinkedList} 연결 리스트 인스턴스
   */
  prepend(value: T): LinkedList<T> {
    // 새로운 노드를 헤드로 만듦
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // 테일이 없다면 새로운 노드를 테일로 지정
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * 연결 리스트의 맨 뒤에 새로운 노드 추가
   * @param {*} value 추가할 값
   * @return {LinkedList} 연결 리스트 인스턴스
   */
  append(value: T): LinkedList<T> {
    const newNode = new LinkedListNode(value);

    // 헤드가 없다면 새로운 노드를 헤드로 지정
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // 새로운 노드를 연결 리스트의 끝에 연결
    this.tail!.next = newNode;
    this.tail = newNode;

    return this;
  }

  /**
   * 주어진 값을 가진 노드 삭제
   * @param {*} value 삭제할 값
   * @return {LinkedListNode} 삭제된 노드
   */
  delete(value: T): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // 헤드를 삭제해야 하는 경우 두 번째 노드를 헤드로 만듦
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // 다음 노드를 삭제해야 하는 경우 다음다음 노드를 다음 노드로 만듦
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // 테일을 삭제해야 하는지 확인
    if (this.tail && this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  /**
   * 주어진 값이나 콜백 함수로 노드 찾기
   * @param {Object} findParams 검색 매개변수
   * @param {*} findParams.value 찾을 값
   * @param {function} [findParams.callback] 검색 콜백 함수
   * @return {LinkedListNode} 찾은 노드
   */
  find({
    value = undefined,
    callback = undefined,
  }: {
    value?: T;
    callback?: (value: T) => boolean;
  }): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    let currentNode: LinkedListNode<T> | null = this.head;

    while (currentNode) {
      // 콜백이 지정된 경우 콜백으로 노드 찾기
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // 값이 지정된 경우 값으로 비교
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * 마지막 노드 삭제
   * @return {LinkedListNode} 삭제된 노드
   */
  deleteTail(): LinkedListNode<T> | null {
    if (this.head === this.tail) {
      // 연결 리스트에 노드가 하나만 있는 경우
      const deletedTail = this.tail;
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // 연결 리스트에 여러 노드가 있는 경우
    const deletedTail = this.tail;

    // 마지막 노드로 이동하여 마지막 이전 노드의 next 링크 삭제
    let currentNode = this.head;
    while (currentNode && currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  /**
   * 첫 번째 노드 삭제
   * @return {LinkedListNode} 삭제된 노드
   */
  deleteHead(): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  /**
   * 연결 리스트를 배열로 변환
   * @return {LinkedListNode[]} 노드 배열
   */
  toArray(): LinkedListNode<T>[] {
    const nodes: LinkedListNode<T>[] = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * 연결 리스트를 문자열로 변환
   * @param {function} [callback] 문자열 변환 콜백 함수
   * @return {string} 변환된 문자열
   */
  toString(callback?: (value: T) => string): string {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }
}
