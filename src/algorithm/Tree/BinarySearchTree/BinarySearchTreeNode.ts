import BinaryTreeNode from "../BinaryTreeNode";
import Comparator from "../../../utils/Comparator";

export default class BinarySearchTreeNode<T = any> extends BinaryTreeNode<T> {
  /**
   * 노드 값을 비교하기 위한 함수
   */
  compareFunction?: (a: T, b: T) => number;

  /**
   * 노드 값을 서로 비교하는 데 사용되는 비교기
   */
  nodeValueComparator: Comparator<T>;

  /**
   * @param {T} [value] - 노드 값
   * @param {Function} [compareFunction] - 노드 값을 비교하기 위한 함수
   */
  constructor(
    value: T = null as unknown as T,
    compareFunction?: (a: T, b: T) => number
  ) {
    super(value);

    // 이 비교기는 노드 값을 서로 비교하는 데 사용됩니다.
    this.compareFunction = compareFunction;
    this.nodeValueComparator = new Comparator(compareFunction);
  }

  /**
   * 트리에 새 값을 삽입합니다
   * @param {T} value - 삽입할 값
   * @return {BinarySearchTreeNode<T>} - 삽입된 노드 또는 기존 노드
   */
  insert(value: T): BinarySearchTreeNode<T> {
    if (this.nodeValueComparator.equal(this.value as T, null as unknown as T)) {
      this.value = value;

      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value as T)) {
      // 왼쪽에 삽입합니다.
      if (this.left) {
        return (this.left as BinarySearchTreeNode<T>).insert(value);
      }

      const newNode = new BinarySearchTreeNode<T>(value, this.compareFunction);
      this.setLeft(newNode);

      return newNode;
    }

    if (this.nodeValueComparator.greaterThan(value, this.value as T)) {
      // 오른쪽에 삽입합니다.
      if (this.right) {
        return (this.right as BinarySearchTreeNode<T>).insert(value);
      }

      const newNode = new BinarySearchTreeNode<T>(value, this.compareFunction);
      this.setRight(newNode);

      return newNode;
    }

    return this;
  }

  /**
   * 트리에서 값을 찾습니다
   * @param {T} value - 찾을 값
   * @return {BinarySearchTreeNode<T> | null} - 찾은 노드 또는 null
   */
  find(value: T): BinarySearchTreeNode<T> | null {
    // 루트를 확인합니다.
    if (this.nodeValueComparator.equal(this.value as T, value)) {
      return this;
    }

    if (
      this.nodeValueComparator.lessThan(value, this.value as T) &&
      this.left
    ) {
      // 왼쪽 노드를 확인합니다.
      return (this.left as BinarySearchTreeNode<T>).find(value);
    }

    if (
      this.nodeValueComparator.greaterThan(value, this.value as T) &&
      this.right
    ) {
      // 오른쪽 노드를 확인합니다.
      return (this.right as BinarySearchTreeNode<T>).find(value);
    }

    return null;
  }

  /**
   * 트리에 값이 포함되어 있는지 확인합니다
   * @param {T} value - 확인할 값
   * @return {boolean} - 값이 존재하면 true, 아니면 false
   */
  contains(value: T): boolean {
    return !!this.find(value);
  }

  /**
   * 트리에서 값을 제거합니다
   * @param {T} value - 제거할 값
   * @return {boolean} - 제거 성공 시 true
   */
  remove(value: T): boolean {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      throw new Error("Item not found in the tree");
    }

    const { parent } = nodeToRemove;

    if (!nodeToRemove.left && !nodeToRemove.right) {
      // 노드가 리프이므로 자식이 없습니다.
      if (parent) {
        // 노드에 부모가 있습니다. 부모에서 이 노드에 대한 포인터를 제거합니다.
        parent.removeChild(nodeToRemove);
      } else {
        // 노드에 부모가 없습니다. 현재 노드 값을 지웁니다.
        nodeToRemove.setValue(undefined as unknown as T);
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      // 노드에 두 자식이 있습니다.
      // 다음으로 큰 값(오른쪽 분기의 최소값)을 찾아
      // 현재 값 노드를 그 다음으로 큰 값으로 대체합니다.
      const nextBiggerNode = (
        nodeToRemove.right as BinarySearchTreeNode<T>
      ).findMin();
      if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
        this.remove(nextBiggerNode.value as T);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        // 다음 오른쪽 값이 다음으로 큰 값이고 왼쪽 자식이 없는 경우
        // 삭제될 노드를 오른쪽 노드로 대체합니다.
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    } else {
      // 노드에 하나의 자식만 있습니다.
      // 이 자식을 현재 노드 부모의 직접 자식으로 만듭니다.
      /** @type {BinarySearchTreeNode<T>} */
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode as BinaryTreeNode<T>);
      } else {
        BinaryTreeNode.copyNode(childNode as BinaryTreeNode<T>, nodeToRemove);
      }
    }

    // 제거된 노드의 부모를 지웁니다.
    nodeToRemove.parent = null;

    return true;
  }

  /**
   * 트리에서 최소값을 가진 노드를 찾습니다
   * @return {BinarySearchTreeNode<T>} - 최소값을 가진 노드
   */
  findMin(): BinarySearchTreeNode<T> {
    if (!this.left) {
      return this;
    }

    return (this.left as BinarySearchTreeNode<T>).findMin();
  }
}
