import HashTable from "../hashTable/HashTable";
import Comparator from "../../utils/Comparator";

/**
 * 이진 트리의 노드를 표현하는 클래스
 */
export default class BinaryTreeNode<T = any> {
  left: BinaryTreeNode<T> | null;
  right: BinaryTreeNode<T> | null;
  parent: BinaryTreeNode<T> | null;
  value: T | null;
  meta: HashTable<string, T>;
  nodeComparator: Comparator<BinaryTreeNode<T>>;

  /**
   * 이진 트리 노드 생성자
   * @param value - 노드의 값
   */
  constructor(value: T | null = null) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;

    // 노드와 관련된 메타 정보를 저장하는 해시 테이블
    this.meta = new HashTable();

    // 노드 간 비교를 위한 비교자
    this.nodeComparator = new Comparator();
  }

  /**
   * 왼쪽 서브트리의 높이를 반환
   */
  get leftHeight(): number {
    if (!this.left) {
      return 0;
    }

    return this.left.height + 1;
  }

  /**
   * 오른쪽 서브트리의 높이를 반환
   */
  get rightHeight(): number {
    if (!this.right) {
      return 0;
    }

    return this.right.height + 1;
  }

  /**
   * 현재 노드를 루트로 하는 트리의 높이를 반환
   */
  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  /**
   * 균형 인수를 반환 (왼쪽 서브트리 높이 - 오른쪽 서브트리 높이)
   */
  get balanceFactor(): number {
    return this.leftHeight - this.rightHeight;
  }

  /**
   * 부모의 형제 노드(삼촌 노드)를 반환
   */
  get uncle(): BinaryTreeNode<T> | undefined {
    // 부모가 없으면 삼촌도 없음
    if (!this.parent) {
      return undefined;
    }

    // 조부모가 없으면 삼촌도 없음
    if (!this.parent.parent) {
      return undefined;
    }

    // 조부모가 두 자식을 모두 가지고 있지 않으면 삼촌이 없음
    if (!this.parent.parent.left || !this.parent.parent.right) {
      return undefined;
    }

    // 현재 노드의 부모가 조부모의 왼쪽 자식인 경우
    if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
      // 오른쪽 자식이 삼촌
      return this.parent.parent.right;
    }

    // 왼쪽 자식이 삼촌
    return this.parent.parent.left;
  }

  /**
   * 노드의 값을 설정
   */
  setValue(value: any): BinaryTreeNode {
    this.value = value;
    return this;
  }

  /**
   * 왼쪽 자식 노드를 설정
   */
  setLeft(node: BinaryTreeNode | null): BinaryTreeNode {
    // 기존 왼쪽 자식의 부모 참조 제거
    if (this.left) {
      this.left.parent = null;
    }

    // 새로운 왼쪽 자식 설정
    this.left = node;

    // 새로운 왼쪽 자식의 부모를 현재 노드로 설정
    if (this.left) {
      this.left.parent = this;
    }

    return this;
  }

  /**
   * 오른쪽 자식 노드를 설정
   */
  setRight(node: BinaryTreeNode | null): BinaryTreeNode {
    // 기존 오른쪽 자식의 부모 참조 제거
    if (this.right) {
      this.right.parent = null;
    }

    // 새로운 오른쪽 자식 설정
    this.right = node;

    // 새로운 오른쪽 자식의 부모를 현재 노드로 설정
    if (this.right) {
      this.right.parent = this;
    }

    return this;
  }

  /**
   * 자식 노드를 제거
   */
  removeChild(nodeToRemove: BinaryTreeNode): boolean {
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
      this.left = null;
      return true;
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
      this.right = null;
      return true;
    }

    return false;
  }

  /**
   * 자식 노드를 다른 노드로 교체
   */
  replaceChild(
    nodeToReplace: BinaryTreeNode,
    replacementNode: BinaryTreeNode
  ): boolean {
    if (!nodeToReplace || !replacementNode) {
      return false;
    }

    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.left = replacementNode;
      return true;
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.right = replacementNode;
      return true;
    }

    return false;
  }

  /**
   * 소스 노드의 값과 자식들을 대상 노드로 복사
   */
  static copyNode(
    sourceNode: BinaryTreeNode,
    targetNode: BinaryTreeNode
  ): void {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }

  /**
   * 중위 순회를 수행하여 노드 값들의 배열을 반환
   */
  traverseInOrder(): any[] {
    let traverse: any[] = [];

    // 왼쪽 서브트리 순회
    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder());
    }

    // 현재 노드 값 추가
    traverse.push(this.value);

    // 오른쪽 서브트리 순회
    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder());
    }

    return traverse;
  }

  /**
   * 노드를 문자열로 변환 (중위 순회 결과를 문자열로 반환)
   */
  toString(): string {
    return this.traverseInOrder().toString();
  }
}
