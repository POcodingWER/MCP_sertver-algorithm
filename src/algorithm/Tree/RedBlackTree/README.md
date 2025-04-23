# Red–Black Tree

## Test

```bash
pnpm test -- src/algorithm/Tree/BinarySearchTree/test
```

## Used

레드-블랙 트리 도구는 다음과 같은 작업을 지원합니다:

1. **레드-블랙 트리 생성 (create)**

```
{"jsonrpc":"2.0","id":"1","method":"tools/call","params":{"name":"red-black-tree","arguments":{"operation":"create"}}}
```

응답에서 반환된 `listId`를 저장하여 이후 작업에 사용해야 합니다.

2. **값 삽입 (insert)**

```
{"jsonrpc":"2.0","id":"2","method":"tools/call","params":{"name":"red-black-tree","arguments":{"operation":"insert","listId":"생성된 ID","value":"50"}}}
```

3. **값 존재 여부 확인 (contains)**

```
{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"red-black-tree","arguments":{"operation":"contains","listId":"생성된 ID","value":"50"}}}
```

4. **값 제거 (remove)**

```
{"jsonrpc":"2.0","id":"4","method":"tools/call","params":{"name":"red-black-tree","arguments":{"operation":"remove","listId":"생성된 ID","value":"50"}}}
```

5. **트리 출력 (toString)**

```
{"jsonrpc":"2.0","id":"5","method":"tools/call","params":{"name":"red-black-tree","arguments":{"operation":"toString","listId":"생성된 ID"}}}
```

6. **노드 색상 확인**

- **노드가 빨간색인지 확인 (isNodeRed)**

```
{"jsonrpc":"2.0","id":"6","method":"tools/call","params":{"name":"red-black-tree","arguments":{"operation":"isNodeRed","listId":"생성된 ID","value":"50"}}}
```

- **노드가 검은색인지 확인 (isNodeBlack)**

```
{"jsonrpc":"2.0","id":"7","method":"tools/call","params":{"name":"red-black-tree","arguments":{"operation":"isNodeBlack","listId":"생성된 ID","value":"50"}}}
```

- **노드에 색상이 지정되어 있는지 확인 (isNodeColored)**

```
{"jsonrpc":"2.0","id":"8","method":"tools/call","params":{"name":"red-black-tree","arguments":{"operation":"isNodeColored","listId":"생성된 ID","value":"50"}}}
```

### 주요 활용 분야

1. 데이터베이스 인덱싱

   - 자동 균형 조정으로 안정적인 검색 성능 보장
   - 대용량 데이터 처리에 적합

2. 운영체제

   - 프로세스 스케줄링
   - 메모리 관리

3. 네트워킹

   - 패킷 라우팅 테이블
   - 네트워크 트래픽 관리

4. 실시간 시스템

   - 예측 가능한 성능이 필요한 응용 프로그램
   - 최악의 경우에도 O(log n) 성능 보장

5. 파일 시스템
   - 디렉토리 구조 관리
   - 파일 시스템 메타데이터 관리

## Description

레드-블랙 트리는 컴퓨터 과학에서 자가 균형 이진 검색 트리의 일종입니다. 이진 트리의 각 노드는 추가적인 비트를 가지고 있으며, 이 비트는 일반적으로 노드의 색상(빨간색 또는 검은색)으로 해석됩니다. 이러한 색상 비트는 삽입 및 삭제 작업 중에 트리가 대략적으로 균형을 유지하도록 보장하는 데 사용됩니다.

균형은 특정 속성을 만족하는 방식으로 트리의 각 노드를 두 가지 색상 중 하나로 칠함으로써 유지되며, 이러한 속성들은 최악의 경우에도 트리가 얼마나 불균형해질 수 있는지를 제한합니다. 트리가 수정되면 새로운 트리는 색상 속성을 복원하기 위해 재배열되고 다시 색칠됩니다. 이러한 속성들은 재배열 및 재색칠이 효율적으로 수행될 수 있도록 설계되었습니다.

트리의 균형은 완벽하지 않지만, 트리 내 전체 요소 수가 `n`일 때 `O(log n)` 시간 내에 검색을 보장할 수 있을 정도로 충분합니다. 삽입 및 삭제 작업과 함께 트리 재배열 및 재색칠도 `O(log n)` 시간 내에 수행됩니다.

레드-블랙 트리의 예:

![레드-블랙 트리](https://upload.wikimedia.org/wikipedia/commons/6/66/Red-black_tree_example.svg)

## 속성

이진 검색 트리에 부과되는 요구 사항 외에도 레드-블랙 트리는 다음 조건을 만족해야 합니다:

- 각 노드는 빨간색 또는 검은색입니다.
- 루트는 검은색입니다. 이 규칙은 때때로 생략됩니다. 루트는 항상 빨간색에서 검은색으로 변경될 수 있지만 반드시 그 반대는 아니기 때문에, 이 규칙은 분석에 거의 영향을 미치지 않습니다.
- 모든 리프 노드(NIL)는 검은색입니다.
- 노드가 빨간색이면 그 자식 노드들은 모두 검은색입니다.
- 주어진 노드에서 그 노드의 모든 자손 NIL 노드까지의 모든 경로에는 동일한 수의 검은색 노드가 포함됩니다.

몇 가지 정의: 루트에서 노드까지의 검은색 노드 수는 해당 노드의 **검은색 깊이(black depth)**입니다; 루트에서 리프까지의 모든 경로에 있는 균일한 검은색 노드 수는 레드-블랙 트리의 **검은색 높이(black-height)**라고 합니다.

이러한 제약 조건들은 레드-블랙 트리의 중요한 속성을 강제합니다: _루트에서 가장 먼 리프까지의 경로는 루트에서 가장 가까운 리프까지의 경로보다 두 배 이상 길지 않습니다_. 결과적으로 트리는 대략적으로 높이 균형이 맞춰집니다. 값 삽입, 삭제, 검색과 같은 작업은 최악의 경우 트리의 높이에 비례하는 시간이 필요하므로, 이론적인 높이의 상한은 레드-블랙 트리가 일반 이진 검색 트리와 달리 최악의 경우에도 효율적일 수 있게 합니다.

## 삽입 중 균형 유지

### 삼촌 노드가 빨간색인 경우

![레드-블랙 트리 균형 유지](https://www.geeksforgeeks.org/wp-content/uploads/redBlackCase2.png)

### 삼촌 노드가 검은색인 경우

- 좌-좌 케이스 (`p`는 `g`의 왼쪽 자식이고 `x`는 `p`의 왼쪽 자식)
- 좌-우 케이스 (`p`는 `g`의 왼쪽 자식이고 `x`는 `p`의 오른쪽 자식)
- 우-우 케이스 (`p`는 `g`의 오른쪽 자식이고 `x`는 `p`의 오른쪽 자식)
- 우-좌 케이스 (`p`는 `g`의 오른쪽 자식이고 `x`는 `p`의 왼쪽 자식)

#### 좌-좌 케이스 (g, p, x 참조)

![레드-블랙 트리 균형 유지](https://www.geeksforgeeks.org/wp-content/uploads/redBlackCase3a1.png)

#### 좌-우 케이스 (g, p, x 참조)

![레드-블랙 트리 균형 유지](https://www.geeksforgeeks.org/wp-content/uploads/redBlackCase3d.png)

#### 우-우 케이스 (g, p, x 참조)

![레드-블랙 트리 균형 유지](https://www.geeksforgeeks.org/wp-content/uploads/redBlackCase3c.png)

#### 우-좌 케이스 (g, p, x 참조)

![레드-블랙 트리 균형 유지](https://www.geeksforgeeks.org/wp-content/uploads/redBlackCase3c.png)

## 참고 자료

- [위키피디아](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)
- [Tushar Roy의 레드-블랙 트리 삽입 (YouTube)](https://www.youtube.com/watch?v=UaLIHuR1t8Q&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=63)
- [Tushar Roy의 레드-블랙 트리 삭제 (YouTube)](https://www.youtube.com/watch?v=CTvfzU_uNKE&t=0s&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=64)
- [GeeksForGeeks의 레드-블랙 트리 삽입](https://www.geeksforgeeks.org/red-black-tree-set-2-insert/)
- [레드-블랙 트리 대화형 시각화](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html)
