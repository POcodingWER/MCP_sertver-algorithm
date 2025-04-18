# Linked List

## Test

```bash
pnpm test -- src/tool/linked_list/test
```

## Used

연결 리스트 도구는 다음과 같은 작업을 지원합니다:

1. **리스트 생성 (create)**

```
{"jsonrpc":"2.0","id":"1","method":"tools/call","params":{"name":"linked-list","arguments":{"operation":"create"}}}
```

응답에서 반환된 `listId`를 저장하여 이후 작업에 사용해야 합니다.

2. **값 추가 - 리스트 끝에 (append)**

```
{"jsonrpc":"2.0","id":"2","method":"tools/call","params":{"name":"linked-list","arguments":{"operation":"append","listId":"생성된 ID","value":"데이터1"}}}
```

3. **값 추가 - 리스트 앞에 (prepend)**

```
{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"linked-list","arguments":{"operation":"prepend","listId":"생성된 ID","value":"데이터2"}}}
```

4. **값 찾기 (find)**

```
{"jsonrpc":"2.0","id":"4","method":"tools/call","params":{"name":"linked-list","arguments":{"operation":"find","listId":"생성된 ID","value":"데이터1"}}}
```

5. **값 삭제 (delete)**

```
{"jsonrpc":"2.0","id":"5","method":"tools/call","params":{"name":"linked-list","arguments":{"operation":"delete","listId":"생성된 ID","value":"데이터1"}}}
```

6. **전체 리스트 조회 (toArray)**

```
{"jsonrpc":"2.0","id":"6","method":"tools/call","params":{"name":"linked-list","arguments":{"operation":"toArray","listId":"생성된 ID"}}}
```

### 사용 시나리오 예시

1. 리스트 생성 후 여러 값 추가하기:

```
# 새 리스트 생성
{"jsonrpc":"2.0","id":"1","method":"tools/call","params":{"name":"linked-list","arguments":{"operation":"create"}}}
# 응답: {"jsonrpc":"2.0","id":"1","result":{"content":[{"type":"text","text":"새 연결 리스트가 생성되었습니다. ID: 생성된 ID"}],"metadata":{"listId":"생성된 ID"}}}

# 값 추가 (append)
{"jsonrpc":"2.0","id":"2","method":"tools/call","params":{"name":"linked-list","arguments":{"operation":"append","listId":"생성된 ID","value":"사과"}}}

# 값 추가 (prepend)
{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"linked-list","arguments":{"operation":"prepend","listId":"생성된 ID","value":"바나나"}}}

# 리스트 조회
{"jsonrpc":"2.0","id":"4","method":"tools/call","params":{"name":"linked-list","arguments":{"operation":"toArray","listId":"생성된 ID"}}}
# 응답: {"jsonrpc":"2.0","id":"4","result":{"content":[{"type":"text","text":"연결 리스트의 내용: [\"바나나\",\"사과\"]"}],"metadata":{"values":["바나나","사과"]}}}
```

2. 값 검색 및 삭제:

```
# 값 찾기
{"jsonrpc":"2.0","id":"5","method":"tools/call","params":{"name":"linked-list","arguments":{"operation":"find","listId":"list_1708661234_a7b3c9d","value":"사과"}}}
# 응답: {"jsonrpc":"2.0","id":"5","result":{"content":[{"type":"text","text":"연결 리스트에서 '사과' 값을 찾았습니다."}],"metadata":{"value":"사과"}}}

# 값 삭제
{"jsonrpc":"2.0","id":"6","method":"tools/call","params":{"name":"linked-list","arguments":{"operation":"delete","listId":"list_1708661234_a7b3c9d","value":"사과"}}}

# 삭제 후 리스트 조회
{"jsonrpc":"2.0","id":"7","method":"tools/call","params":{"name":"linked-list","arguments":{"operation":"toArray","listId":"list_1708661234_a7b3c9d"}}}
# 응답: {"jsonrpc":"2.0","id":"7","result":{"content":[{"type":"text","text":"연결 리스트의 내용: [\"바나나\"]"}],"metadata":{"values":["바나나"]}}}
```

## Description

컴퓨터 과학에서 연결 리스트는 선형적인 데이터 요소들의 모음으로,
물리적 메모리 배치가 아닌 각 요소가 다음 요소를 가리키는 방식으로
순서가 정해집니다. 이는 일련의 순서를 나타내는 노드들의 그룹으로
구성된 자료구조입니다. 가장 단순한 형태에서 각 노드는 데이터와
다음 노드를 가리키는 참조(즉, 링크)로 구성됩니다. 이러한 구조는
순회 중 시퀀스의 어느 위치에서든 요소를 효율적으로 삽입하거나
제거할 수 있게 해줍니다. 더 복잡한 변형은 추가적인 링크를 가지며,
임의의 요소 참조로부터 효율적인 삽입이나 제거가 가능합니다.
연결 리스트의 단점은 접근 시간이 선형적이며(파이프라이닝이 어려움)
빠른 접근, 예를 들어 임의 접근이 불가능하다는 것입니다. 배열은
연결 리스트에 비해 더 나은 캐시 지역성을 가집니다.

![Linked List](https://upload.wikimedia.org/wikipedia/commons/6/6d/Singly-linked-list.svg)

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Linked_list)
- [YouTube](https://www.youtube.com/watch?v=njTh_OwMljA&index=2&t=1s&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8)
