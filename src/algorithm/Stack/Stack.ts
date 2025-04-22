import LinkedList from "../LinkedList/LinkedList";

export default class Stack<T> {
  linkedList: LinkedList<T>;

  constructor() {
    this.linkedList = new LinkedList<T>();
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.linkedList.tail;
  }

  /**
   * @return {*}
   */
  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.linkedList.tail?.value;
  }

  /**
   * @param {*} value
   */
  push(value: T) {
    this.linkedList.append(value);
  }

  /**
   * @return {*}
   */
  pop() {
    const removedTail = this.linkedList.deleteTail();
    return removedTail ? removedTail.value : null;
  }

  /**
   * @return {*[]}
   */
  toArray() {
    return this.linkedList
      .toArray()
      .map((linkedListNode) => linkedListNode.value)
      .reverse();
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback?: (value: T) => string) {
    return this.linkedList.toString(callback);
  }
}
