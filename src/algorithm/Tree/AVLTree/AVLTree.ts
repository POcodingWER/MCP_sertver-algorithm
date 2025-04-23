import BinarySearchTree from "../BinarySearchTree/BinarySearchTree";
import BinarySearchTreeNode from "../BinarySearchTree/BinarySearchTreeNode";

export default class AvlTree<T> extends BinarySearchTree<T> {
  /**
   * 값을 트리에 삽입하고 균형을 유지합니다.
   * @param {T} value - 삽입할 값
   */
  insert(value: T): BinarySearchTreeNode<T> {
    // 일반적인 BST 삽입을 수행합니다.
    const newNode = super.insert(value);

    // 루트까지 올라가면서 균형 인수를 확인합니다.
    let currentNode = this.root.find(value) as BinarySearchTreeNode<T> | null;
    while (currentNode) {
      this.balance(currentNode);
      currentNode = currentNode.parent as BinarySearchTreeNode<T> | null;
    }

    return newNode;
  }

  /**
   * 값을 트리에서 제거합니다.
   * @param {T} value - 제거할 값
   * @return {boolean} - 제거 성공 여부
   */
  remove(value: T): boolean {
    throw new Error(
      `Can't remove ${value}. Remove method is not implemented yet`
    );
  }

  /**
   * 노드의 균형을 맞춥니다.
   * @param {BinarySearchTreeNode<T>} node - 균형을 맞출 노드
   */
  balance(node: BinarySearchTreeNode<T>): void {
    // 균형 인수가 적절하지 않으면 노드의 균형을 맞춥니다.
    if (node.balanceFactor > 1) {
      // 왼쪽 회전.
      if (node.left && node.left.balanceFactor > 0) {
        // 왼쪽-왼쪽 회전
        this.rotateLeftLeft(node);
      } else if (node.left && node.left.balanceFactor < 0) {
        // 왼쪽-오른쪽 회전.
        this.rotateLeftRight(node);
      }
    } else if (node.balanceFactor < -1) {
      // 오른쪽 회전.
      if (node.right && node.right.balanceFactor < 0) {
        // 오른쪽-오른쪽 회전
        this.rotateRightRight(node);
      } else if (node.right && node.right.balanceFactor > 0) {
        // 오른쪽-왼쪽 회전.
        this.rotateRightLeft(node);
      }
    }
  }

  /**
   * 왼쪽-왼쪽 회전을 수행합니다.
   * @param {BinarySearchTreeNode<T>} rootNode - 회전의 루트 노드
   */
  rotateLeftLeft(rootNode: BinarySearchTreeNode<T>): void {
    // 루트 노드에서 왼쪽 노드를 분리합니다.
    const leftNode = rootNode.left as BinarySearchTreeNode<T>;
    rootNode.setLeft(null);

    // 왼쪽 노드를 루트 노드의 부모의 자식으로 만듭니다.
    if (rootNode.parent) {
      rootNode.parent.setLeft(leftNode);
    } else if (rootNode === this.root) {
      // 루트 노드가 트리의 루트라면 왼쪽 노드를 새로운 루트로 만듭니다.
      this.root = leftNode as BinarySearchTreeNode<T>;
    }

    // 왼쪽 노드에 오른쪽 자식이 있다면 분리하고
    // 루트 노드의 왼쪽 자식으로 붙입니다.
    if (leftNode && leftNode.right) {
      rootNode.setLeft(leftNode.right);
    }

    // 루트 노드를 왼쪽 노드의 오른쪽에 붙입니다.
    if (leftNode) {
      leftNode.setRight(rootNode);
    }
  }

  /**
   * 왼쪽-오른쪽 회전을 수행합니다.
   * @param {BinarySearchTreeNode<T>} rootNode - 회전의 루트 노드
   */
  rotateLeftRight(rootNode: BinarySearchTreeNode<T>): void {
    // 루트 노드에서 왼쪽 노드를 분리합니다(교체될 예정).
    const leftNode = rootNode.left as BinarySearchTreeNode<T>;
    rootNode.setLeft(null);

    // 왼쪽 노드에서 오른쪽 노드를 분리합니다.
    if (leftNode) {
      const leftRightNode = leftNode.right as BinarySearchTreeNode<T>;
      leftNode.setRight(null);

      // 왼쪽-오른쪽 노드의 왼쪽 서브트리를 보존합니다.
      if (leftRightNode && leftRightNode.left) {
        leftNode.setRight(leftRightNode.left);
        leftRightNode.setLeft(null);
      }

      // 왼쪽-오른쪽 노드를 루트 노드에 붙입니다.
      rootNode.setLeft(leftRightNode);

      // 왼쪽 노드를 왼쪽-오른쪽 노드의 왼쪽 노드로 붙입니다.
      if (leftRightNode) {
        leftRightNode.setLeft(leftNode);
      }
    }

    // 왼쪽-왼쪽 회전을 수행합니다.
    this.rotateLeftLeft(rootNode);
  }

  /**
   * 오른쪽-왼쪽 회전을 수행합니다.
   * @param {BinarySearchTreeNode<T>} rootNode - 회전의 루트 노드
   */
  rotateRightLeft(rootNode: BinarySearchTreeNode<T>): void {
    // 루트 노드에서 오른쪽 노드를 분리합니다(교체될 예정).
    const rightNode = rootNode.right as BinarySearchTreeNode<T>;
    rootNode.setRight(null);

    // 오른쪽 노드에서 왼쪽 노드를 분리합니다.
    if (rightNode) {
      const rightLeftNode = rightNode.left as BinarySearchTreeNode<T>;
      rightNode.setLeft(null);

      // 오른쪽-왼쪽 노드의 오른쪽 서브트리를 보존합니다.
      if (rightLeftNode && rightLeftNode.right) {
        rightNode.setLeft(rightLeftNode.right);
        rightLeftNode.setRight(null);
      }

      // 오른쪽-왼쪽 노드를 루트 노드에 붙입니다.
      rootNode.setRight(rightLeftNode);

      // 오른쪽 노드를 오른쪽-왼쪽 노드의 오른쪽 노드로 붙입니다.
      if (rightLeftNode) {
        rightLeftNode.setRight(rightNode);
      }
    }

    // 오른쪽-오른쪽 회전을 수행합니다.
    this.rotateRightRight(rootNode);
  }

  /**
   * 오른쪽-오른쪽 회전을 수행합니다.
   * @param {BinarySearchTreeNode<T>} rootNode - 회전의 루트 노드
   */
  rotateRightRight(rootNode: BinarySearchTreeNode<T>): void {
    // 루트 노드에서 오른쪽 노드를 분리합니다.
    const rightNode = rootNode.right as BinarySearchTreeNode<T>;
    rootNode.setRight(null);

    // 오른쪽 노드를 루트 노드의 부모의 자식으로 만듭니다.
    if (rootNode.parent) {
      rootNode.parent.setRight(rightNode);
    } else if (rootNode === this.root) {
      // 루트 노드가 트리의 루트라면 오른쪽 노드를 새로운 루트로 만듭니다.
      this.root = rightNode as BinarySearchTreeNode<T>;
    }

    // 오른쪽 노드에 왼쪽 자식이 있다면 분리하고
    // 루트 노드의 오른쪽 자식으로 붙입니다.
    if (rightNode && rightNode.left) {
      rootNode.setRight(rightNode.left);
    }

    // 루트 노드를 오른쪽 노드의 왼쪽에 붙입니다.
    if (rightNode) {
      rightNode.setLeft(rootNode);
    }
  }
}
