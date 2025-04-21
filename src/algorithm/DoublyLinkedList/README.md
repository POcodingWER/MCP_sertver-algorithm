# Doubly Linked List

## Test

```bash
pnpm test -- src/algorithm/DoublyLinkedList/test
```

## Used

이중 연결 리스트 도구는 다음과 같은 작업을 지원합니다:

1. **리스트 생성 (create)**

```
{"jsonrpc":"2.0","id":"1","method":"tools/call","params":{"name":"doubly-linked-list","arguments":{"operation":"create"}}}


```

응답에서 반환된 `listId`를 저장하여 이후 작업에 사용해야 합니다.

2. **값 추가 - 리스트 끝에 (append)**

```
{"jsonrpc":"2.0","id":"2","method":"tools/call","params":{"name":"doubly-linked-list","arguments":{"operation":"append","listId":"생성된 ID","value":"데이터1"}}}


```

3. **값 추가 - 리스트 앞에 (prepend)**

```
{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"doubly-linked-list","arguments":{"operation":"prepend","listId":"생성된 ID","value":"데이터2"}}}

```

4. **값 찾기 (find)**

```
{"jsonrpc":"2.0","id":"4","method":"tools/call","params":{"name":"doubly-linked-list","arguments":{"operation":"find","listId":"생성된 ID","value":"데이터1"}}}

```

5. **값 삭제 (delete)**

```
{"jsonrpc":"2.0","id":"5","method":"tools/call","params":{"name":"doubly-linked-list","arguments":{"operation":"delete","listId":"생성된 ID","value":"데이터1"}}}

```

6. **전체 리스트 조회 (toArray)**

```
{"jsonrpc":"2.0","id":"6","method":"tools/call","params":{"name":"doubly-linked-list","arguments":{"operation":"toArray","listId":"생성된 ID"}}}

```

7. **역순으로 전체 리스트 조회 (toArrayReverse)**

```
{"jsonrpc":"2.0","id":"7","method":"tools/call","params":{"name":"doubly-linked-list","arguments":{"operation":"toArrayReverse","listId":"생성된 ID"}}}

```

## Description

컴퓨터 과학에서 **이중 연결 리스트**는 순차적으로 연결된 노드라고 불리는 레코드들의 집합으로 구성된 연결 데이터 구조입니다. 각 노드는 이전 노드와 다음 노드를 참조하는 두 개의 링크라고 불리는 필드를 포함합니다. 시작과 끝 노드의 이전과 다음 링크는 각각 리스트의 순회를 용이하게 하기 위해 일반적으로 센티널 노드나 null과 같은 종단점을 가리킵니다. 만약 하나의 센티널 노드만 있다면, 리스트는 센티널 노드를 통해 원형으로 연결됩니다. 이는 동일한 데이터 항목들로 구성되었지만 반대 방향으로 정렬된 두 개의 단일 연결 리스트로 개념화할 수 있습니다.

![이중 연결 리스트](https://upload.wikimedia.org/wikipedia/commons/5/5e/Doubly-linked-list.svg)

두 개의 노드 링크를 통해 리스트를 양방향으로 순회할 수 있습니다. 이중 연결 리스트에서 노드를 추가하거나 제거하는 것은 단일 연결 리스트에서의 동일한 작업보다 더 많은 링크 변경이 필요하지만, 순회 중에 이전 노드를 추적할 필요가 없거나 이전 노드를 찾기 위해 리스트를 순회할 필요가 없기 때문에 작업이 더 단순하고 잠재적으로 더 효율적입니다(첫 번째 노드를 제외한 노드들의 경우).

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Doubly_linked_list)
- [YouTube](https://www.youtube.com/watch?v=JdQeNxWCguQ&t=7s&index=72&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8)

```

```
