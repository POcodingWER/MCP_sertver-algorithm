export default class DoublyLinkedListNode<T> {
  value: T;
  next: DoublyLinkedListNode<T> | null;
  previous: DoublyLinkedListNode<T> | null;

  /**
   * @param {*} value 노드에 저장할 값
   * @param {DoublyLinkedListNode} next 다음 노드에 대한 참조
   * @param {DoublyLinkedListNode} previous 이전 노드에 대한 참조
   */
  constructor(
    value: T,
    next: DoublyLinkedListNode<T> | null = null,
    previous: DoublyLinkedListNode<T> | null = null
  ) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  /**
   * 노드 값을 문자열로 변환
   * @param {function} callback 값 변환 콜백 함수
   * @return {string} 변환된 문자열
   */
  toString(callback?: (value: T) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
