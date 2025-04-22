import Comparator from "../../utils/Comparator";

export default class Heap<T> {
  private heapContainer: T[];
  private compare: Comparator<T>;

  /**
   * @param {Function} [comparatorFunction] 비교 함수
   */
  constructor(comparatorFunction?: (a: T, b: T) => number) {
    // 힙의 배열 표현
    this.heapContainer = [];
    this.compare = new Comparator<T>(comparatorFunction);
  }

  /**
   * @param {number} parentIndex 부모 인덱스
   * @return {number} 왼쪽 자식 인덱스
   */
  getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  /**
   * @param {number} parentIndex 부모 인덱스
   * @return {number} 오른쪽 자식 인덱스
   */
  getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  /**
   * @param {number} childIndex 자식 인덱스
   * @return {number} 부모 인덱스
   */
  getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * @param {number} childIndex 자식 인덱스
   * @return {boolean} 부모가 있는지 여부
   */
  hasParent(childIndex: number): boolean {
    return this.getParentIndex(childIndex) >= 0;
  }

  /**
   * @param {number} parentIndex 부모 인덱스
   * @return {boolean} 왼쪽 자식이 있는지 여부
   */
  hasLeftChild(parentIndex: number): boolean {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * @param {number} parentIndex 부모 인덱스
   * @return {boolean} 오른쪽 자식이 있는지 여부
   */
  hasRightChild(parentIndex: number): boolean {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * @param {number} parentIndex 부모 인덱스
   * @return {T} 왼쪽 자식 값
   */
  leftChild(parentIndex: number): T {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  /**
   * @param {number} parentIndex 부모 인덱스
   * @return {T} 오른쪽 자식 값
   */
  rightChild(parentIndex: number): T {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  /**
   * @param {number} childIndex 자식 인덱스
   * @return {T} 부모 값
   */
  parent(childIndex: number): T {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  /**
   * @param {number} indexOne 첫 번째 인덱스
   * @param {number} indexTwo 두 번째 인덱스
   */
  swap(indexOne: number, indexTwo: number): void {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  /**
   * @return {T | null} 힙의 최상위 값
   */
  peek(): T | null {
    if (this.heapContainer.length === 0) {
      return null;
    }

    return this.heapContainer[0];
  }

  /**
   * @return {T | null} 제거된 최상위 값
   */
  poll(): T | null {
    if (this.heapContainer.length === 0) {
      return null;
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop()!;
    }

    const item = this.heapContainer[0];

    // 마지막 요소를 맨 앞으로 이동
    this.heapContainer[0] = this.heapContainer.pop()!;
    this.heapifyDown(0);

    return item;
  }

  /**
   * @param {T} item 추가할 아이템
   * @return {Heap} 힙 인스턴스
   */
  add(item: T): Heap<T> {
    this.heapContainer.push(item);
    this.heapifyUp(this.heapContainer.length - 1);
    return this;
  }

  /**
   * @param {T} item 제거할 아이템
   * @param {Comparator<T>} [customFindingComparator] 사용자 정의 비교 함수
   * @return {Heap} 힙 인스턴스
   */
  remove(item: T, customFindingComparator?: Comparator<T>): Heap<T> {
    // 제거할 아이템 개수 찾기
    const customComparator = customFindingComparator || this.compare;
    const numberOfItemsToRemove = this.find(item, customComparator).length;

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      // 힙이파이 과정 후 인덱스가 변경되므로 매번 제거할 아이템의 인덱스를 찾아야 함
      const indexToRemove = this.find(item, customComparator).pop()!;

      // 마지막 자식을 제거하는 경우 단순히 제거만 함
      // 이후 힙이파이가 필요하지 않음
      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        // 마지막 요소를 빈 자리로 이동
        this.heapContainer[indexToRemove] = this.heapContainer.pop()!;

        // 부모 가져오기
        const parentItem = this.hasParent(indexToRemove)
          ? this.parent(indexToRemove)
          : null;
        const leftChild = this.hasLeftChild(indexToRemove)
          ? this.leftChild(indexToRemove)
          : null;

        // 부모가 없거나 부모가 삭제할 노드보다 작으면 아래로 힙이파이
        // 그렇지 않으면 위로 힙이파이
        if (
          leftChild !== null &&
          (parentItem === null ||
            this.compare.lessThan(
              parentItem,
              this.heapContainer[indexToRemove]
            ))
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  /**
   * @param {T} item 찾을 아이템
   * @param {Comparator<T>} [customComparator] 사용자 정의 비교 함수
   * @return {number[]} 찾은 아이템의 인덱스 배열
   */
  find(item: T, customComparator?: Comparator<T>): number[] {
    const foundItemIndices: number[] = [];
    const comparator = customComparator || this.compare;

    for (
      let itemIndex = 0;
      itemIndex < this.heapContainer.length;
      itemIndex += 1
    ) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex);
      }
    }

    return foundItemIndices;
  }

  /**
   * @param {number} [customStartIndex] 시작 인덱스
   */
  heapifyUp(customStartIndex?: number): void {
    // 힙 컨테이너의 마지막 요소(배열의 마지막 또는 트리의 왼쪽 하단)를
    // 부모 요소가 현재 새로운 요소보다 작을 때까지 위로 올림
    let currentIndex = customStartIndex ?? this.heapContainer.length - 1;

    while (
      this.hasParent(currentIndex) &&
      this.compare.lessThan(
        this.heapContainer[currentIndex],
        this.parent(currentIndex)
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  /**
   * @param {number} [customStartIndex] 시작 인덱스
   */
  heapifyDown(customStartIndex?: number): void {
    // 루트 요소를 자식들과 비교하고 가장 작은 자식과 교환
    // 교환 후 다음 자식들에 대해 동일한 작업 수행
    let currentIndex = customStartIndex ?? 0;
    let nextIndex: number | null = null;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.compare.lessThan(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex)
        )
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (
        this.compare.lessThan(
          this.heapContainer[currentIndex],
          this.heapContainer[nextIndex]
        )
      ) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  /**
   * @return {boolean} 힙이 비어있는지 여부
   */
  isEmpty(): boolean {
    return !this.heapContainer.length;
  }

  /**
   * @return {string} 힙의 문자열 표현
   */
  toString(): string {
    return this.heapContainer.toString();
  }
}
