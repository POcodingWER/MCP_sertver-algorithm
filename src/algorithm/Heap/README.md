# Heap (data-structure)

## Test

```bash
pnpm test -- src/algorithm/Heap/test
```

## Used

힙 도구는 다음과 같은 작업을 지원합니다:

1. **힙 생성 (create)**

```
{"jsonrpc":"2.0","id":"1","method":"tools/call","params":{"name":"heap","arguments":{"operation":"create"}}}
```

응답에서 반환된 `listId`를 저장하여 이후 작업에 사용해야 합니다.

2. **값 추가 (add)**

```
{"jsonrpc":"2.0","id":"2","method":"tools/call","params":{"name":"heap","arguments":{"operation":"add","listId":"생성된 ID","value":"10"}}}
```

3. **최상위 값 조회 (peek)**

```
{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"heap","arguments":{"operation":"peek","listId":"생성된 ID"}}}
```

4. **최상위 값 제거 및 반환 (poll)**

```
{"jsonrpc":"2.0","id":"4","method":"tools/call","params":{"name":"heap","arguments":{"operation":"poll","listId":"생성된 ID"}}}
```

5. **값 찾기 (find)**

```
{"jsonrpc":"2.0","id":"5","method":"tools/call","params":{"name":"heap","arguments":{"operation":"find","listId":"생성된 ID","value":"10"}}}
```

6. **값 삭제 (remove)**

```
{"jsonrpc":"2.0","id":"6","method":"tools/call","params":{"name":"heap","arguments":{"operation":"remove","listId":"생성된 ID","value":"10"}}}
```

7. **전체 힙 내용 조회 (toString)**

```
{"jsonrpc":"2.0","id":"7","method":"tools/call","params":{"name":"heap","arguments":{"operation":"toString","listId":"생성된 ID"}}}
```

## Description

컴퓨터 과학에서 힙은 아래에서 설명하는 힙 속성을 만족하는
특수한 트리 기반 자료구조입니다.

*최소 힙*에서는 `P`가 `C`의 부모 노드일 때,
`P`의 키(값)는 `C`의 키보다 작거나 같습니다.

![MinHeap](https://upload.wikimedia.org/wikipedia/commons/6/69/Min-heap.png)

*최대 힙*에서는 `P`가 `C`의 부모 노드일 때,
`P`의 키(값)는 `C`의 키보다 크거나 같습니다.

![Heap](https://upload.wikimedia.org/wikipedia/commons/3/38/Max-Heap.svg)

부모가 없는 힙의 "최상위" 노드를 루트 노드라고 합니다.

주요 특징:

- 완전 이진 트리 구조
- 최소 힙 또는 최대 힙 속성 유지
- 효율적인 삽입 및 최소/최대값 추출 (O(log n))
- 우선순위 큐 구현에 자주 사용
- 힙 정렬 알고리즘의 기반

## References

- [Wikipedia](<https://en.wikipedia.org/wiki/Heap_(data_structure)>)
- [YouTube](https://www.youtube.com/watch?v=t0Cq6tVNRBA&index=5&t=0s&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8)
