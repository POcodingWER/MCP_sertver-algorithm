# Stack (스택)

## Test

```bash
pnpm test -- src/algorithm/Stack/test
```

## Used

스택 도구는 다음과 같은 작업을 지원합니다:

1. **스택 생성 (create)**

```
{"jsonrpc":"2.0","id":"1","method":"tools/call","params":{"name":"stack","arguments":{"operation":"create"}}}
```

응답에서 반환된 `stackId`를 저장하여 이후 작업에 사용해야 합니다.

2. **스택에 요소 추가 (push)**

```
{"jsonrpc":"2.0","id":"2","method":"tools/call","params":{"name":"stack","arguments":{"operation":"push","stackId":"생성된 ID","value":"데이터1"}}}
```

3. **스택에서 요소 제거 (pop)**

```
{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"stack","arguments":{"operation":"pop","stackId":"생성된 ID"}}}
```

4. **스택의 맨 위 요소 확인 (peek)**

```
{"jsonrpc":"2.0","id":"4","method":"tools/call","params":{"name":"stack","arguments":{"operation":"peek","stackId":"생성된 ID"}}}
```

5. **스택이 비어있는지 확인 (isEmpty)**

```
{"jsonrpc":"2.0","id":"5","method":"tools/call","params":{"name":"stack","arguments":{"operation":"isEmpty","stackId":"생성된 ID"}}}
```

6. **스택 내용 조회 (toString)**

```
{"jsonrpc":"2.0","id":"6","method":"tools/call","params":{"name":"stack","arguments":{"operation":"toString","stackId":"생성된 ID"}}}
```

7. **스택을 배열로 변환 (toArray)**

```
{"jsonrpc":"2.0","id":"7","method":"tools/call","params":{"name":"stack","arguments":{"operation":"toArray","stackId":"생성된 ID"}}}
```

### 사용 시나리오 예시

1. 스택 생성 후 요소 추가하기:

```
# 새 스택 생성
{"jsonrpc":"2.0","id":"1","method":"tools/call","params":{"name":"stack","arguments":{"operation":"create"}}}
# 응답: {"jsonrpc":"2.0","id":"1","result":{"content":[{"type":"text","text":"새 스택이 생성되었습니다. ID: 생성된 ID"}],"metadata":{"stackId":"생성된 ID"}}}

# 요소 추가
{"jsonrpc":"2.0","id":"2","method":"tools/call","params":{"name":"stack","arguments":{"operation":"push","stackId":"생성된 ID","value":"첫 번째 항목"}}}
{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"stack","arguments":{"operation":"push","stackId":"생성된 ID","value":"두 번째 항목"}}}

# 스택 내용 조회
{"jsonrpc":"2.0","id":"4","method":"tools/call","params":{"name":"stack","arguments":{"operation":"toString","stackId":"생성된 ID"}}}
# 응답: {"jsonrpc":"2.0","id":"4","result":{"content":[{"type":"text","text":"스택의 내용: [\"첫 번째 항목\",\"두 번째 항목\"]"}],"metadata":{"values":["첫 번째 항목","두 번째 항목"]}}}
```

2. 요소 제거 및 확인:

```
# 맨 위 요소 확인
{"jsonrpc":"2.0","id":"5","method":"tools/call","params":{"name":"stack","arguments":{"operation":"peek","stackId":"생성된 ID"}}}
# 응답: {"jsonrpc":"2.0","id":"5","result":{"content":[{"type":"text","text":"스택의 맨 위 요소: \"두 번째 항목\""}],"metadata":{"value":"두 번째 항목"}}}

# 요소 제거
{"jsonrpc":"2.0","id":"6","method":"tools/call","params":{"name":"stack","arguments":{"operation":"pop","stackId":"생성된 ID"}}}
# 응답: {"jsonrpc":"2.0","id":"6","result":{"content":[{"type":"text","text":"스택에서 제거된 요소: \"두 번째 항목\""}],"metadata":{"value":"두 번째 항목"}}}

# 스택이 비어있는지 확인
{"jsonrpc":"2.0","id":"7","method":"tools/call","params":{"name":"stack","arguments":{"operation":"isEmpty","stackId":"생성된 ID"}}}
# 응답: {"jsonrpc":"2.0","id":"7","result":{"content":[{"type":"text","text":"스택이 비어있지 않습니다."}],"metadata":{"isEmpty":false}}}
```

## Description

컴퓨터 과학에서 스택은 다음과 같은 두 가지 주요 연산을 가진 요소들의 모음을 나타내는 추상 자료형입니다:

- **push**: 컬렉션에 요소를 추가하는 연산
- **pop**: 가장 최근에 추가되고 아직 제거되지 않은 요소를 제거하는 연산

스택에서 요소들이 제거되는 순서로 인해 LIFO(Last In, First Out, 후입선출)라는 다른 이름으로도 불립니다. 추가적으로 peek 연산을 통해 스택을 수정하지 않고도 최상단 요소에 접근할 수 있습니다. 이러한 구조를 "스택"이라고 부르는 이유는 물건들을 위로 쌓아올린 물리적인 더미와 유사하기 때문입니다. 스택의 최상단에서 항목을 제거하는 것은 쉽지만, 더 깊은 곳에 있는 항목에 접근하기 위해서는 그 위에 있는 여러 항목들을 먼저 제거해야 합니다.

push와 pop 연산을 가진 스택 런타임의 간단한 표현입니다.

![Stack](https://upload.wikimedia.org/wikipedia/commons/b/b4/Lifo_stack.png)

## References

- [Wikipedia](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>)
- [YouTube](https://www.youtube.com/watch?v=wjI1WNcIntg&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=3&)
