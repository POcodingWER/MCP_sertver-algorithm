# AVL 트리

## Test

```bash
pnpm test -- src/algorithm/Tree/AVLTree/test
```

## Used

AVL 트리 도구는 다음과 같은 작업을 지원합니다:

1. **AVL 트리 생성 (create)**

```
{"jsonrpc":"2.0","id":"1","method":"tools/call","params":{"name":"avl-tree","arguments":{"operation":"create"}}}
```

응답에서 반환된 `listId`를 저장하여 이후 작업에 사용해야 합니다.

2. **값 삽입 (insert)**

```
{"jsonrpc":"2.0","id":"2","method":"tools/call","params":{"name":"avl-tree","arguments":{"operation":"insert","listId":"생성된 ID","value":"50"}}}
```

3. **값 존재 여부 확인 (contains)**

```
{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"avl-tree","arguments":{"operation":"contains","listId":"생성된 ID","value":"50"}}}
```

4. **값 제거 (remove)**

```
{"jsonrpc":"2.0","id":"4","method":"tools/call","params":{"name":"avl-tree","arguments":{"operation":"remove","listId":"생성된 ID","value":"50"}}}
```

5. **트리 출력 (toString)**

```
{"jsonrpc":"2.0","id":"5","method":"tools/call","params":{"name":"avl-tree","arguments":{"operation":"toString","listId":"생성된 ID"}}}
```

6. **균형 상태 확인 (getBalance)**

```
{"jsonrpc":"2.0","id":"6","method":"tools/call","params":{"name":"avl-tree","arguments":{"operation":"getBalance","listId":"생성된 ID"}}}
```

## Description

컴퓨터 과학에서 AVL 트리(발명자 Adelson-Velsky와 Landis의 이름을 따서 명명됨)는 자가 균형 이진 검색 트리입니다. 이는 최초로 발명된 자가 균형 자료구조입니다. AVL 트리에서는 어떤 노드의 두 자식 서브트리의 높이 차이가 최대 1입니다. 만약 높이 차이가 1보다 커지면, 이 속성을 복원하기 위해 재균형 작업이 수행됩니다.

### 주요 특징

1. **자동 균형 조정**

   - 모든 노드의 왼쪽과 오른쪽 서브트리의 높이 차이가 최대 1
   - 불균형 발생 시 자동으로 회전 연산을 통해 균형 복원

2. **시간 복잡도**

   - 조회: O(log n)
   - 삽입: O(log n)
   - 삭제: O(log n)
     여기서 n은 트리의 노드 수

3. **회전 연산**

   - 왼쪽 회전 (Left Rotation)
   - 오른쪽 회전 (Right Rotation)
   - 왼쪽-오른쪽 회전 (Left-Right Rotation)
   - 오른쪽-왼쪽 회전 (Right-Left Rotation)

4. **균형 인수 (Balance Factor)**
   - 각 노드의 왼쪽 서브트리 높이 - 오른쪽 서브트리 높이
   - 허용되는 값: -1, 0, 1

### 사용 사례

1. **데이터베이스 인덱싱**

   - 빠른 데이터 검색과 정렬된 데이터 접근

2. **메모리 관리**

   - 메모리 할당/해제를 위한 효율적인 구조

3. **파일 시스템**

   - 디렉토리 구조 관리
   - 파일 인덱싱

4. **네트워크 라우팅**
   - IP 주소 검색
   - 라우팅 테이블 관리

AVL 트리에 여러 요소를 삽입하는 과정을 보여주는 애니메이션. 왼쪽, 오른쪽, 왼쪽-오른쪽, 오른쪽-왼쪽 회전을 포함합니다.

![AVL 트리](https://upload.wikimedia.org/wikipedia/commons/f/fd/AVL_Tree_Example.gif)

균형 인수(녹색)가 표시된 AVL 트리

![AVL 트리](https://upload.wikimedia.org/wikipedia/commons/a/ad/AVL-tree-wBalance_K.svg)

## 참고 자료

- [위키피디아](https://en.wikipedia.org/wiki/AVL_tree)
- [Tutorials Point](https://www.tutorialspoint.com/data_structures_algorithms/avl_tree_algorithm.htm)
- [BTech](http://btechsmartclass.com/DS/U5_T2.html)
- [YouTube에서 AVL 트리 삽입 보기](https://www.youtube.com/watch?v=rbg7Qf8GkQ4&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=12&)
- [AVL 트리 대화형 시각화](https://www.cs.usfca.edu/~galles/visualization/AVLtree.html)
