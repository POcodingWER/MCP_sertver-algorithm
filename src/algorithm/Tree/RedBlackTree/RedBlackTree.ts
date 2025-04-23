import BinarySearchTree from "../BinarySearchTree/BinarySearchTree";
import BinarySearchTreeNode from "../BinarySearchTree/BinarySearchTreeNode";

// 레드-블랙 트리 노드의 가능한 색상들
const RED_BLACK_TREE_COLORS = {
  red: "red",
  black: "black",
} as const;

// 노드의 메타 정보에서 색상 속성 이름
const COLOR_PROP_NAME = "color";

// 색상 타입 정의
type NodeColor =
  (typeof RED_BLACK_TREE_COLORS)[keyof typeof RED_BLACK_TREE_COLORS];

export default class RedBlackTree<T = any> extends BinarySearchTree<T> {
  /**
   * 값을 트리에 삽입합니다
   * @param {T} value - 삽입할 값
   * @return {BinarySearchTreeNode<T>} - 삽입된 노드
   */
  insert(value: T): BinarySearchTreeNode<T> {
    const insertedNode = super.insert(value);

    // 루트 노드인 경우
    if (this.nodeComparator.equal(insertedNode, this.root)) {
      // 루트는 항상 검은색이어야 합니다
      this.makeNodeBlack(insertedNode);
    } else {
      // 새로 삽입된 모든 노드는 빨간색으로 설정합니다
      this.makeNodeRed(insertedNode);
    }

    // 모든 조건을 확인하고 노드의 균형을 맞춥니다
    this.balance(insertedNode);

    return insertedNode;
  }

  /**
   * 값을 트리에서 제거합니다
   * @param {T} value - 제거할 값
   * @return {boolean} - 제거 성공 여부
   */
  remove(value: T): boolean {
    throw new Error(
      `${value} 값을 제거할 수 없습니다. 제거 메서드는 아직 구현되지 않았습니다`
    );
  }

  /**
   * 노드의 균형을 맞춥니다
   * @param {BinarySearchTreeNode<T>} node - 균형을 맞출 노드
   */
  balance(node: BinarySearchTreeNode<T>): void {
    // 루트 노드인 경우 균형을 맞출 필요가 없습니다
    if (this.nodeComparator.equal(node, this.root)) {
      return;
    }

    // 부모가 검은색이면 균형을 맞출 필요가 없습니다
    if (this.isNodeBlack(node.parent as BinarySearchTreeNode<T>)) {
      return;
    }

    const grandParent = node.parent?.parent as BinarySearchTreeNode<T>;

    if (node.uncle && this.isNodeRed(node.uncle as BinarySearchTreeNode<T>)) {
      // 노드의 삼촌이 빨간색이면 색상 변경(RECOLORING)이 필요합니다

      // 부모와 삼촌을 검은색으로 변경합니다
      this.makeNodeBlack(node.uncle as BinarySearchTreeNode<T>);
      this.makeNodeBlack(node.parent as BinarySearchTreeNode<T>);

      if (!this.nodeComparator.equal(grandParent, this.root)) {
        // 루트가 아닌 조부모는 빨간색으로 변경합니다
        this.makeNodeRed(grandParent);
      } else {
        // 조부모가 루트인 경우 아무것도 하지 않습니다
        // 루트는 이미 방금 검은색으로 변경한 두 개의 형제 노드를 가지고 있기 때문입니다
        return;
      }

      // 색상이 변경된 조부모에 대해 추가 검사를 수행합니다
      this.balance(grandParent);
    } else if (
      !node.uncle ||
      this.isNodeBlack(node.uncle as BinarySearchTreeNode<T>)
    ) {
      // 노드의 삼촌이 검은색이거나 없는 경우 회전(ROTATIONS)이 필요합니다

      if (grandParent) {
        // 회전 후 받게 될 새로운 조부모
        let newGrandParent: BinarySearchTreeNode<T>;

        if (
          this.nodeComparator.equal(
            grandParent.left as BinarySearchTreeNode<T>,
            node.parent as BinarySearchTreeNode<T>
          )
        ) {
          // 왼쪽 케이스
          if (
            this.nodeComparator.equal(
              node.parent!.left as BinarySearchTreeNode<T>,
              node
            )
          ) {
            // 왼쪽-왼쪽 케이스
            newGrandParent = this.leftLeftRotation(grandParent);
          } else {
            // 왼쪽-오른쪽 케이스
            newGrandParent = this.leftRightRotation(grandParent);
          }
        } else {
          // 오른쪽 케이스
          if (
            this.nodeComparator.equal(
              node.parent!.right as BinarySearchTreeNode<T>,
              node
            )
          ) {
            // 오른쪽-오른쪽 케이스
            newGrandParent = this.rightRightRotation(grandParent);
          } else {
            // 오른쪽-왼쪽 케이스
            newGrandParent = this.rightLeftRotation(grandParent);
          }
        }

        // 새 조부모가 부모가 없으면 루트로 설정합니다
        if (newGrandParent && newGrandParent.parent === null) {
          this.root = newGrandParent;

          // 루트를 검은색으로 변경합니다
          this.makeNodeBlack(this.root as BinarySearchTreeNode<T>);
        }

        // 새 조부모가 레드-블랙 트리 규칙을 위반하지 않는지 확인합니다
        this.balance(newGrandParent);
      }
    }
  }

  /**
   * 왼쪽-왼쪽 케이스 (p는 g의 왼쪽 자식이고 x는 p의 왼쪽 자식입니다)
   * @param {BinarySearchTreeNode<T>} grandParentNode - 조부모 노드
   * @return {BinarySearchTreeNode<T>} - 새 루트 노드
   */
  leftLeftRotation(
    grandParentNode: BinarySearchTreeNode<T>
  ): BinarySearchTreeNode<T> {
    // 조부모 노드의 부모를 기억합니다
    const grandGrandParent = grandParentNode.parent as BinarySearchTreeNode<T>;

    // 우리의 조부모 노드가 어떤 형제 유형인지 확인합니다(왼쪽 또는 오른쪽)
    let grandParentNodeIsLeft: boolean = false;
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(
        grandGrandParent.left as BinarySearchTreeNode<T>,
        grandParentNode
      );
    }

    // 조부모 노드의 왼쪽 노드를 기억합니다
    const parentNode = grandParentNode.left as BinarySearchTreeNode<T>;

    // 부모의 오른쪽 노드를 기억합니다. 이것을 조부모의 왼쪽 서브트리로 이동할 것이기 때문입니다
    const parentRightNode = parentNode.right;

    // 조부모 노드를 부모 노드의 오른쪽 자식으로 만듭니다
    parentNode.setRight(grandParentNode);

    // 자식의 오른쪽 서브트리를 조부모의 왼쪽 서브트리로 이동합니다
    grandParentNode.setLeft(parentRightNode);

    // 조부모 노드 위치에 부모 노드를 배치합니다
    if (grandGrandParent) {
      if (grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode);
      } else {
        grandGrandParent.setRight(parentNode);
      }
    } else {
      // 부모 노드를 루트로 만듭니다
      parentNode.parent = null;
    }

    // 조부모와 부모 노드의 색상을 교환합니다
    this.swapNodeColors(parentNode, grandParentNode);

    // 새 루트 노드를 반환합니다
    return parentNode;
  }

  /**
   * 왼쪽-오른쪽 케이스 (p는 g의 왼쪽 자식이고 x는 p의 오른쪽 자식입니다)
   * @param {BinarySearchTreeNode<T>} grandParentNode - 조부모 노드
   * @return {BinarySearchTreeNode<T>} - 새 루트 노드
   */
  leftRightRotation(
    grandParentNode: BinarySearchTreeNode<T>
  ): BinarySearchTreeNode<T> {
    // 왼쪽 및 왼쪽-오른쪽 노드를 기억합니다
    const parentNode = grandParentNode.left as BinarySearchTreeNode<T>;
    const childNode = parentNode.right as BinarySearchTreeNode<T>;

    // 왼쪽 자식 서브트리를 잃지 않기 위해 자식 왼쪽 노드를 기억해야 합니다
    // 나중에 부모의 오른쪽 서브트리에 재할당됩니다
    const childLeftNode = childNode.left;

    // 부모 노드를 자식 노드의 왼쪽 자식으로 만듭니다
    childNode.setLeft(parentNode);

    // 자식의 왼쪽 서브트리를 부모의 오른쪽 서브트리로 이동합니다
    parentNode.setRight(childLeftNode);

    // 왼쪽 노드 위치에 왼쪽-오른쪽 노드를 배치합니다
    grandParentNode.setLeft(childNode);

    // 이제 왼쪽-왼쪽 회전을 수행할 준비가 되었습니다
    return this.leftLeftRotation(grandParentNode);
  }

  /**
   * 오른쪽-오른쪽 케이스 (p는 g의 오른쪽 자식이고 x는 p의 오른쪽 자식입니다)
   * @param {BinarySearchTreeNode<T>} grandParentNode - 조부모 노드
   * @return {BinarySearchTreeNode<T>} - 새 루트 노드
   */
  rightRightRotation(
    grandParentNode: BinarySearchTreeNode<T>
  ): BinarySearchTreeNode<T> {
    // 조부모 노드의 부모를 기억합니다
    const grandGrandParent = grandParentNode.parent as BinarySearchTreeNode<T>;

    // 우리의 조부모 노드가 어떤 형제 유형인지 확인합니다(왼쪽 또는 오른쪽)
    let grandParentNodeIsLeft: boolean = false;
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(
        grandGrandParent.left as BinarySearchTreeNode<T>,
        grandParentNode
      );
    }

    // 조부모 노드의 오른쪽 노드를 기억합니다
    const parentNode = grandParentNode.right as BinarySearchTreeNode<T>;

    // 부모의 왼쪽 노드를 기억합니다. 이것을 조부모의 오른쪽 서브트리로 이동할 것이기 때문입니다
    const parentLeftNode = parentNode.left;

    // 조부모 노드를 부모 노드의 왼쪽 자식으로 만듭니다
    parentNode.setLeft(grandParentNode);

    // 부모의 모든 왼쪽 노드를 조부모의 오른쪽 서브트리로 이동합니다
    grandParentNode.setRight(parentLeftNode);

    // 조부모 노드 위치에 부모 노드를 배치합니다
    if (grandGrandParent) {
      if (grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode);
      } else {
        grandGrandParent.setRight(parentNode);
      }
    } else {
      // 부모 노드를 루트로 만듭니다
      parentNode.parent = null;
    }

    // 조부모와 부모 노드의 색상을 교환합니다
    this.swapNodeColors(parentNode, grandParentNode);

    // 새 루트 노드를 반환합니다
    return parentNode;
  }

  /**
   * 오른쪽-왼쪽 케이스 (p는 g의 오른쪽 자식이고 x는 p의 왼쪽 자식입니다)
   * @param {BinarySearchTreeNode<T>} grandParentNode - 조부모 노드
   * @return {BinarySearchTreeNode<T>} - 새 루트 노드
   */
  rightLeftRotation(
    grandParentNode: BinarySearchTreeNode<T>
  ): BinarySearchTreeNode<T> {
    // 오른쪽 및 오른쪽-왼쪽 노드를 기억합니다
    const parentNode = grandParentNode.right as BinarySearchTreeNode<T>;
    const childNode = parentNode.left as BinarySearchTreeNode<T>;

    // 오른쪽 자식 서브트리를 잃지 않기 위해 자식 오른쪽 노드를 기억해야 합니다
    // 나중에 부모의 왼쪽 서브트리에 재할당됩니다
    const childRightNode = childNode.right;

    // 부모 노드를 자식 노드의 오른쪽 자식으로 만듭니다
    childNode.setRight(parentNode);

    // 자식의 오른쪽 서브트리를 부모의 왼쪽 서브트리로 이동합니다
    parentNode.setLeft(childRightNode);

    // 부모 노드 위치에 자식 노드를 배치합니다
    grandParentNode.setRight(childNode);

    // 이제 오른쪽-오른쪽 회전을 수행할 준비가 되었습니다
    return this.rightRightRotation(grandParentNode);
  }

  /**
   * 노드를 빨간색으로 만듭니다
   * @param {BinarySearchTreeNode<T>} node - 색상을 변경할 노드
   * @return {BinarySearchTreeNode<T>} - 색상이 변경된 노드
   */
  makeNodeRed<N extends BinarySearchTreeNode<T>>(node: N): N {
    node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.red as unknown as T);

    return node;
  }

  /**
   * 노드를 검은색으로 만듭니다
   * @param {BinarySearchTreeNode<T>} node - 색상을 변경할 노드
   * @return {BinarySearchTreeNode<T>} - 색상이 변경된 노드
   */
  makeNodeBlack<N extends BinarySearchTreeNode<T>>(node: N): N {
    node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.black as unknown as T);

    return node;
  }

  /**
   * 노드가 빨간색인지 확인합니다
   * @param {BinarySearchTreeNode<T>} node - 확인할 노드
   * @return {boolean} - 노드가 빨간색인지 여부
   */
  isNodeRed(node: BinarySearchTreeNode<T>): boolean {
    return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.red;
  }

  /**
   * 노드가 검은색인지 확인합니다
   * @param {BinarySearchTreeNode<T>} node - 확인할 노드
   * @return {boolean} - 노드가 검은색인지 여부
   */
  isNodeBlack(node: BinarySearchTreeNode<T>): boolean {
    return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.black;
  }

  /**
   * 노드에 색상이 지정되어 있는지 확인합니다
   * @param {BinarySearchTreeNode<T>} node - 확인할 노드
   * @return {boolean} - 노드에 색상이 지정되어 있는지 여부
   */
  isNodeColored(node: BinarySearchTreeNode<T>): boolean {
    return this.isNodeRed(node) || this.isNodeBlack(node);
  }

  /**
   * 두 노드의 색상을 교환합니다
   * @param {BinarySearchTreeNode<T>} firstNode - 첫 번째 노드
   * @param {BinarySearchTreeNode<T>} secondNode - 두 번째 노드
   */
  swapNodeColors(
    firstNode: BinarySearchTreeNode<T>,
    secondNode: BinarySearchTreeNode<T>
  ): void {
    const firstColor = firstNode.meta.get(COLOR_PROP_NAME);
    const secondColor = secondNode.meta.get(COLOR_PROP_NAME);

    firstNode.meta.set(COLOR_PROP_NAME, secondColor as unknown as T);
    secondNode.meta.set(COLOR_PROP_NAME, firstColor as unknown as T);
  }
}
