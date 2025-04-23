import BinarySearchTreeNode from "./BinarySearchTreeNode";
import Comparator from "../../../utils/Comparator";

export default class BinarySearchTree<T = any> {
  /**
   * 트리의 루트 노드
   */
  root: BinarySearchTreeNode<T>;

  /**
   * 노드 비교를 위한 비교기
   */
  nodeComparator: Comparator<BinarySearchTreeNode<T>>;

  /**
   * 이진 검색 트리 생성자
   * @param {function} [nodeValueCompareFunction] - 노드 값을 비교하기 위한 함수
   */
  constructor(nodeValueCompareFunction?: (a: T, b: T) => number) {
    this.root = new BinarySearchTreeNode<T>(
      null as unknown as T,
      nodeValueCompareFunction
    );

    // 루트 노드에서 비교기를 가져옵니다.
    this.nodeComparator = this.root.nodeComparator;
  }

  /**
   * 트리에 새 값을 삽입합니다
   * @param {T} value - 삽입할 값
   * @return {BinarySearchTreeNode<T>} - 삽입된 노드
   */
  insert(value: T): BinarySearchTreeNode<T> {
    return this.root.insert(value);
  }

  /**
   * 트리에 값이 포함되어 있는지 확인합니다
   * @param {T} value - 확인할 값
   * @return {boolean} - 값이 존재하면 true, 아니면 false
   */
  contains(value: T): boolean {
    return this.root.contains(value);
  }

  /**
   * 트리에서 값을 제거합니다
   * @param {T} value - 제거할 값
   * @return {boolean} - 제거 성공 시 true
   */
  remove(value: T): boolean {
    return this.root.remove(value);
  }

  /**
   * 트리를 문자열로 변환합니다
   * @return {string} - 트리의 문자열 표현
   */
  toString(): string {
    return this.root.toString();
  }
}
