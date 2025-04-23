# Binary Search Tree (이진 검색트리)

## Test

```bash
pnpm test -- src/algorithm/Tree/BinarySearchTree/test
```

## Used

이진 검색 트리 도구는 다음과 같은 작업을 지원합니다:

1. **이진 검색 트리 생성 (create)**

```
{"jsonrpc":"2.0","id":"1","method":"tools/call","params":{"name":"binary-search-tree","arguments":{"operation":"create"}}}
```

응답에서 반환된 `listId`를 저장하여 이후 작업에 사용해야 합니다.

2. **값 삽입 (insert)**

```
{"jsonrpc":"2.0","id":"2","method":"tools/call","params":{"name":"binary-search-tree","arguments":{"operation":"insert","listId":"생성된 ID","value":"50"}}}
```

3. **값 존재 여부 확인 (contains)**

```
{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"binary-search-tree","arguments":{"operation":"contains","listId":"생성된 ID","value":"50"}}}
```

4. **값 제거 (remove)**

```
{"jsonrpc":"2.0","id":"4","method":"tools/call","params":{"name":"binary-search-tree","arguments":{"operation":"remove","listId":"생성된 ID","value":"50"}}}
```

5. **트리 출력 (toString)**

```
{"jsonrpc":"2.0","id":"5","method":"tools/call","params":{"name":"binary-search-tree","arguments":{"operation":"toString","listId":"생성된 ID"}}}
```

### 주요 활용 분야

1. 데이터베이스 인덱싱

   - 빠른 데이터 검색
   - 범위 쿼리 처리

2. 파일 시스템

   - 디렉토리 구조 관리
   - 파일 검색

3. 게임 개발

   - 공간 분할
   - 충돌 감지

4. 우선순위 처리

   - 이벤트 스케줄링
   - 작업 우선순위 관리

5. 통계 분석
   - 정렬된 데이터 유지
   - 중앙값, 최대값, 최소값 빠른 검색

## Description

컴퓨터 과학에서 이진 검색 트리(BST)는 때로 정렬된 이진 트리라고도 불리며,
메모리에 "항목"(숫자, 이름 등)을 저장하는 특별한 유형의 컨테이너입니다.
이진 검색 트리는 항목의 빠른 조회, 추가 및 제거를 가능하게 하며,
동적 항목 집합이나 키로 항목을 찾을 수 있는 조회 테이블
(예: 이름으로 사람의 전화번호 찾기)을 구현하는 데 사용할 수 있습니다.

이진 검색 트리는 키를 정렬된 순서로 유지하므로 조회 및
다른 작업에서 이진 검색의 원리를 사용할 수 있습니다.
트리에서 키를 찾거나 새 키를 삽입할 위치를 찾을 때,
루트에서 리프까지 트리를 순회하면서 트리의 노드에 저장된 키와
비교하고, 그 비교 결과에 따라 왼쪽 또는 오른쪽 서브트리에서
검색을 계속할지 결정합니다. 평균적으로 이는 각 비교가 트리의
약 절반을 건너뛸 수 있게 해주므로, 각 조회, 삽입 또는 삭제 작업은
트리에 저장된 항목 수의 로그에 비례하는 시간이 소요됩니다.
이는 (정렬되지 않은) 배열에서 키로 항목을 찾는 데 필요한 선형 시간보다
훨씬 효율적이지만, 해시 테이블의 해당 작업보다는 느립니다.

크기가 9이고 깊이가 3인 이진 검색 트리로, 루트에 8이 있습니다.
리프 노드는 그림에 표시되지 않았습니다.

![이진 검색 트리](https://upload.wikimedia.org/wikipedia/commons/d/da/Binary_search_tree.svg)

## 참고 자료

- [위키피디아](https://en.wikipedia.org/wiki/Binary_search_tree)
- [YouTube에서 BST 삽입 보기](https://www.youtube.com/watch?v=wcIRPqTR3Kc&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=9&t=0s)
- [BST 대화형 시각화](https://www.cs.usfca.edu/~galles/visualization/BST.html)
