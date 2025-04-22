# Trie (트라이)

## Test

```bash
pnpm test -- src/algorithm/Trie/test
```

## Used

트라이 도구는 다음과 같은 작업을 지원합니다:

1. **트라이 생성 (create)**

```
{"jsonrpc":"2.0","id":"1","method":"tools/call","params":{"name":"trie","arguments":{"operation":"create"}}}
```

응답에서 반환된 `listId`를 저장하여 이후 작업에 사용해야 합니다.

2. **단어 추가 (addWord)**

```
{"jsonrpc":"2.0","id":"2","method":"tools/call","params":{"name":"trie","arguments":{"operation":"addWord","listId":"생성된 ID","word":"카카오"}}}
```

3. **다음 문자 추천 (suggestNextCharacters)**

```
{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"trie","arguments":{"operation":"suggestNextCharacters","listId":"생성된 ID","word":"카카오"}}}
```

4. **단어 존재 여부 확인 (doesWordExist)**

```
{"jsonrpc":"2.0","id":"4","method":"tools/call","params":{"name":"trie","arguments":{"operation":"doesWordExist","listId":"생성된 ID","word":"카카오"}}}
```

### 주요 활용 분야

1. 자동 완성 시스템

   - 검색어 자동 완성
   - 텍스트 에디터의 코드 자동 완성

2. 맞춤법 검사기

   - 사전 기반 맞춤법 검사
   - 오타 교정 시스템

3. IP 라우팅 테이블

   - 네트워크 주소 검색
   - 패킷 라우팅

4. 문자열 검색

   - 대용량 문자열 데이터베이스 검색
   - 패턴 매칭

5. 사전 구현
   - 전자 사전
   - 단어 게임

## Description

컴퓨터 과학에서 트라이(Trie)는 디지털 트리라고도 하며, 때로는
레이딕스 트리(radix tree) 또는 접두사 트리(prefix tree)라고도 합니다
(접두사로 검색이 가능하기 때문입니다). 이는 일종의 검색 트리로,
주로 문자열을 키로 사용하는 동적 집합이나 연관 배열을 저장하는 데
사용되는 정렬된 트리 자료구조입니다. 이진 검색 트리와 달리, 트리의
어떤 노드도 해당 노드와 연관된 키를 직접 저장하지 않습니다. 대신,
트리에서의 위치가 그 노드와 연관된 키를 정의합니다. 노드의 모든
자손들은 해당 노드와 연관된 문자열의 공통 접두사를 가지며, 루트는
빈 문자열과 연관됩니다. 모든 노드가 반드시 값을 가질 필요는 없으며,
주로 리프 노드와 관심 있는 키에 해당하는 일부 내부 노드에만 값이
연관됩니다. 공간 최적화된 접두사 트리 구현에 대해서는 압축 접두사
트리를 참조하세요.

![Trie](https://upload.wikimedia.org/wikipedia/commons/b/be/Trie_example.svg)

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Trie)
- [YouTube](https://www.youtube.com/watch?v=zIjfhVPRZCg&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=7&t=0s)
