# 트리

## Test

```bash
pnpm test -- src/algorithm/Tree/test
```

- [이진 검색 트리](binary-search-tree)
- [AVL 트리](avl-tree)
- [레드-블랙 트리](red-black-tree)
- [세그먼트 트리](segment-tree) - 최소/최대/합 범위 쿼리 예제 포함
- [펜윅 트리](fenwick-tree) (이진 인덱스 트리)

컴퓨터 과학에서 트리는 널리 사용되는 추상 자료형(ADT) 또는 이를 구현한 자료구조로,
계층적 트리 구조를 모방합니다. 루트 값과 부모 노드를 가진 자식들의 서브트리로
구성되며, 연결된 노드들의 집합으로 표현됩니다.

트리 자료구조는 재귀적으로(지역적으로) 정의될 수 있습니다.
루트 노드에서 시작하여 각 노드는 값과 자식 노드들에 대한 참조 목록으로
구성된 자료구조입니다. 이때 중복된 참조가 없어야 하며,
어떤 참조도 루트를 가리키지 않아야 한다는 제약이 있습니다.

단순 비정렬 트리에서, 이 다이어그램의 7이라는 레이블이 붙은 노드는
2와 6이라는 레이블이 붙은 두 개의 자식을 가지고 있으며,
2라는 레이블이 붙은 하나의 부모를 가집니다.
최상단의 루트 노드는 부모가 없습니다.

![트리](https://upload.wikimedia.org/wikipedia/commons/f/f7/Binary_tree.svg)

## 참고 자료

- [위키피디아](<https://en.wikipedia.org/wiki/Tree_(data_structure)>)
- [유튜브](https://www.youtube.com/watch?v=oSWTXtMglKE&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=8)
