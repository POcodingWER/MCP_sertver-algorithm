# Priority Queue (우선순위 큐)

## Test

```bash
pnpm test -- src/algorithm/PriorityQueue/test
```

## Used

우선순위 큐 도구는 다음과 같은 작업을 지원합니다:

1. **우선순위 큐 생성 (create)**

```
{"jsonrpc":"2.0","id":"1","method":"tools/call","params":{"name":"priority_queue","arguments":{"operation":"create"}}}
```

응답에서 반환된 `listId`를 저장하여 이후 작업에 사용해야 합니다.

2. **우선순위 큐에 요소 추가 (add)**

```
{"jsonrpc":"2.0","id":"2","method":"tools/call","params":{"name":"priority_queue","arguments":{"operation":"add","listId":"생성된 ID","value":"작업1","priority":1}}}
```

3. **우선순위 큐에서 요소 제거 (remove)**

```
{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"priority_queue","arguments":{"operation":"remove","listId":"생성된 ID","value":"작업1"}}}
```

4. **우선순위 변경 (changePriority)**

```
{"jsonrpc":"2.0","id":"4","method":"tools/call","params":{"name":"priority_queue","arguments":{"operation":"changePriority","listId":"생성된 ID","value":"작업1","priority":2}}}
```

5. **값으로 검색 (findByValue)**

```
{"jsonrpc":"2.0","id":"5","method":"tools/call","params":{"name":"priority_queue","arguments":{"operation":"findByValue","listId":"생성된 ID","value":"작업1"}}}
```

6. **값 존재 여부 확인 (hasValue)**

```
{"jsonrpc":"2.0","id":"6","method":"tools/call","params":{"name":"priority_queue","arguments":{"operation":"hasValue","listId":"생성된 ID","value":"작업1"}}}
```

7. **값 비교 (compareValue)**

```
{"jsonrpc":"2.0","id":"7","method":"tools/call","params":{"name":"priority_queue","arguments":{"operation":"compareValue","listId":"생성된 ID","value1":"작업1","value2":"작업2"}}}
```

### 주요 활용 분야

1. 프로세스 스케줄링

   - 운영체제에서 CPU 프로세스 관리
   - 높은 우선순위의 프로세스를 먼저 실행

2. 이벤트 처리 시스템

   - 긴급한 이벤트를 우선적으로 처리
   - 실시간 시스템에서의 이벤트 관리

3. 네트워크 트래픽 관리

   - QoS(Quality of Service) 구현
   - 중요한 패킷을 우선적으로 처리

4. 작업 스케줄링

   - 프린터 대기열 관리
   - 백그라운드 작업 vs 포그라운드 작업 관리

5. 알고리즘
   - 다익스트라 최단 경로 알고리즘
   - A\* 경로 탐색 알고리즘
   - 허프만 코딩

## Description

컴퓨터 과학에서 우선순위 큐는 일반적인 큐나 스택 자료구조와 비슷하지만,
각 요소가 "우선순위"를 가지고 있는 추상 자료형입니다.
우선순위 큐에서는 우선순위가 높은 요소가 우선순위가 낮은 요소보다
먼저 처리됩니다. 두 요소의 우선순위가 같다면, 큐에 들어온 순서대로
처리됩니다.

우선순위 큐는 주로 힙으로 구현되지만, 개념적으로는 힙과 구별됩니다.
우선순위 큐는 "리스트"나 "맵"처럼 추상적인 개념입니다. 리스트가
연결 리스트나 배열로 구현될 수 있는 것처럼, 우선순위 큐도 힙이나
정렬되지 않은 배열 등 다양한 방법으로 구현될 수 있습니다.

우선순위 큐의 표현

![Priority Queue](https://upload.wikimedia.org/wikipedia/commons/3/38/Max-Heap.svg)

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Priority_queue)
- [YouTube](https://www.youtube.com/watch?v=wptevk0bshY&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=6)
