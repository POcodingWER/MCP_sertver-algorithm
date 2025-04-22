# 해시 테이블 (Hash Table)

## 테스트

```bash
pnpm test -- src/algorithm/hashTable/test
```

## 사용법

해시 테이블 도구는 다음과 같은 작업을 지원합니다:

1. **해시 테이블 생성 (create)**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "tools/call",
  "params": {
    "name": "hash-table",
    "arguments": {
      "operation": "create"
    }
  }
}
```

응답에서 반환된 `tableId`를 저장하여 이후 작업에 사용해야 합니다.

2. **값 설정 (set)**

```json
{
  "jsonrpc": "2.0",
  "id": "2",
  "method": "tools/call",
  "params": {
    "name": "hash-table",
    "arguments": {
      "operation": "set",
      "listId": "생성된 ID",
      "key": "name",
      "value": "홍길동"
    }
  }
}
```

3. **값 조회 (get)**

```json
{
  "jsonrpc": "2.0",
  "id": "3",
  "method": "tools/call",
  "params": {
    "name": "hash-table",
    "arguments": {
      "operation": "get",
      "listId": "생성된 ID",
      "key": "name"
    }
  }
}
```

4. **값 삭제 (delete)**

```json
{
  "jsonrpc": "2.0",
  "id": "4",
  "method": "tools/call",
  "params": {
    "name": "hash-table",
    "arguments": {
      "operation": "delete",
      "listId": "생성된 ID",
      "key": "name"
    }
  }
}
```

5. **키 존재 여부 확인 (has)**

```json
{
  "jsonrpc": "2.0",
  "id": "5",
  "method": "tools/call",
  "params": {
    "name": "hash-table",
    "arguments": {
      "operation": "has",
      "listId": "생성된 ID",
      "key": "name"
    }
  }
}
```

6. **모든 키 조회 (getKeys)**

```json
{
  "jsonrpc": "2.0",
  "id": "6",
  "method": "tools/call",
  "params": {
    "name": "hash-table",
    "arguments": {
      "operation": "getKeys",
      "listId": "생성된 ID"
    }
  }
}
```

## 설명

컴퓨팅에서 해시 테이블(해시 맵)은 키를 값에 매핑할 수 있는 구조인
연관 배열 추상 자료형을 구현하는 자료구조입니다. 해시 테이블은
해시 함수를 사용하여 버킷 또는 슬롯의 배열에 대한 인덱스를 계산하고,
이를 통해 원하는 값을 찾을 수 있습니다.

이상적으로는 해시 함수가 각 키를 고유한 버킷에 할당해야 하지만,
대부분의 해시 테이블 설계는 불완전한 해시 함수를 사용합니다.
이로 인해 해시 함수가 둘 이상의 키에 대해 동일한 인덱스를 생성하는
해시 충돌이 발생할 수 있습니다. 이러한 충돌은 어떤 방식으로든
처리되어야 합니다.

![Hash Table](https://upload.wikimedia.org/wikipedia/commons/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg)

Hash collision resolved by separate chaining.

![Hash Collision](https://upload.wikimedia.org/wikipedia/commons/d/d0/Hash_table_5_0_1_1_1_1_1_LL.svg)

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Hash_table)
- [YouTube](https://www.youtube.com/watch?v=shs0KM3wKv8&index=4&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8)
