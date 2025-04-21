# Queue

## Test

```bash
pnpm test -- src/algorithm/Queue/test
```

## Used

큐 도구는 다음과 같은 작업을 지원합니다:

1. **큐 생성 (create)**

```
{"jsonrpc":"2.0","id":"1","method":"tools/call","params":{"name":"queue","arguments":{"operation":"create"}}}
```

응답에서 반환된 `queueId`를 저장하여 이후 작업에 사용해야 합니다.

2. **큐에 요소 추가 (enqueue)**

```
{"jsonrpc":"2.0","id":"2","method":"tools/call","params":{"name":"queue","arguments":{"operation":"enqueue","queueId":"생성된 ID","value":"데이터1"}}}
```

3. **큐에서 요소 제거 (dequeue)**

```
{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"queue","arguments":{"operation":"dequeue","queueId":"생성된 ID"}}}
```

4. **큐의 첫 번째 요소 확인 (peek)**

```
{"jsonrpc":"2.0","id":"4","method":"tools/call","params":{"name":"queue","arguments":{"operation":"peek","queueId":"생성된 ID"}}}
```

5. **큐가 비어있는지 확인 (isEmpty)**

```
{"jsonrpc":"2.0","id":"5","method":"tools/call","params":{"name":"queue","arguments":{"operation":"isEmpty","queueId":"생성된 ID"}}}
```

6. **큐 내용 조회 (toString)**

```
{"jsonrpc":"2.0","id":"6","method":"tools/call","params":{"name":"queue","arguments":{"operation":"toString","queueId":"생성된 ID"}}}
```

### 사용 시나리오 예시

1. 큐 생성 후 요소 추가하기:

```
# 새 큐 생성
{"jsonrpc":"2.0","id":"1","method":"tools/call","params":{"name":"queue","arguments":{"operation":"create"}}}
# 응답: {"jsonrpc":"2.0","id":"1","result":{"content":[{"type":"text","text":"새 큐가 생성되었습니다. ID: 생성된 ID"}],"metadata":{"queueId":"생성된 ID"}}}

# 요소 추가
{"jsonrpc":"2.0","id":"2","method":"tools/call","params":{"name":"queue","arguments":{"operation":"enqueue","queueId":"생성된 ID","value":"첫 번째 항목"}}}
{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"queue","arguments":{"operation":"enqueue","queueId":"생성된 ID","value":"두 번째 항목"}}}

# 큐 내용 조회
{"jsonrpc":"2.0","id":"4","method":"tools/call","params":{"name":"queue","arguments":{"operation":"toString","queueId":"생성된 ID"}}}
# 응답: {"jsonrpc":"2.0","id":"4","result":{"content":[{"type":"text","text":"큐의 내용: [\"첫 번째 항목\",\"두 번째 항목\"]"}],"metadata":{"values":["첫 번째 항목","두 번째 항목"]}}}
```

2. 요소 제거 및 확인:

```
# 첫 번째 요소 확인
{"jsonrpc":"2.0","id":"5","method":"tools/call","params":{"name":"queue","arguments":{"operation":"peek","queueId":"생성된 ID"}}}
# 응답: {"jsonrpc":"2.0","id":"5","result":{"content":[{"type":"text","text":"큐의 첫 번째 요소: \"첫 번째 항목\""}],"metadata":{"value":"첫 번째 항목"}}}

# 요소 제거
{"jsonrpc":"2.0","id":"6","method":"tools/call","params":{"name":"queue","arguments":{"operation":"dequeue","queueId":"생성된 ID"}}}
# 응답: {"jsonrpc":"2.0","id":"6","result":{"content":[{"type":"text","text":"큐에서 제거된 요소: \"첫 번째 항목\""}],"metadata":{"value":"첫 번째 항목"}}}

# 큐가 비어있는지 확인
{"jsonrpc":"2.0","id":"7","method":"tools/call","params":{"name":"queue","arguments":{"operation":"isEmpty","queueId":"생성된 ID"}}}
# 응답: {"jsonrpc":"2.0","id":"7","result":{"content":[{"type":"text","text":"큐가 비어있지 않습니다."}],"metadata":{"isEmpty":false}}}
```

## Description

컴퓨터 과학에서 큐는 특별한 종류의 추상 자료형 또는 컬렉션입니다.
큐에서는 컬렉션의 엔티티들이 순서대로 유지되며, 컬렉션에 대한 주요(또는 유일한) 연산은
후방 터미널 위치에 엔티티를 추가하는 인큐(enqueue)와 전방 터미널 위치에서
엔티티를 제거하는 디큐(dequeue)입니다.

이러한 특성으로 인해 큐는 선입선출(FIFO, First-In-First-Out) 자료구조가 됩니다.
FIFO 자료구조에서는 큐에 가장 먼저 추가된 요소가 가장 먼저 제거됩니다.
이는 새로운 요소가 추가되면, 그 요소를 제거하기 전에 이전에 추가된 모든 요소들이
먼저 제거되어야 한다는 것을 의미합니다.

종종 peek 또는 front 연산도 포함되는데, 이는 디큐 없이 맨 앞 요소의 값을 반환합니다.
큐는 선형 자료구조의 한 예시이며, 더 추상적으로는 순차적 컬렉션이라고 할 수 있습니다.

선입선출(FIFO) 큐의 표현

![Queue](https://upload.wikimedia.org/wikipedia/commons/5/52/Data_Queue.svg)

## References

- [Wikipedia](<https://en.wikipedia.org/wiki/Queue_(abstract_data_type)>)
- [YouTube](https://www.youtube.com/watch?v=wjI1WNcIntg&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=3&)
