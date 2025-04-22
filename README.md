# MCP_sertver-algorithm

알고리즘 MCP를 구현해보자

## stdio 테스트 서버 구현

```bash
npm i

#도커로 이미지생성
docker build -t mcp-algorithm .

#mcp 추가
"mcpServers": {
 "algorithm-stdio": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "-v",
        "--rm",
        "mcp-algorithm"
      ]
    }
}
```

## sse 테스트 서버 구현

```bash
npm i

#server 실행
npm run sse

#mcp 추가
"mcpServers": {
 "algorithm-local": {
      "url": "http://localhost:3333/sse"
    }
}

```
