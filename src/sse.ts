import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import { createServer } from "./createServer";

const { server } = createServer();

const app = express();

// 세션별로 transport를 저장하는 Map으로 변경
const transports = new Map<string, SSEServerTransport>();

app.get("/sse", async (req, res) => {
  const transport = new SSEServerTransport("/messages", res);
  await server.connect(transport);

  // 세션 ID 로깅
  const sessionId = transport.sessionId;
  console.log(`새 SSE 연결 생성: 세션 ID = ${sessionId}`);

  // 세션 ID를 키로 transport 저장
  transports.set(sessionId, transport);
});

app.post("/messages", async (req, res) => {
  // 요청의 sessionId 파라미터에서 세션 ID 추출
  console.log("세션 🆔:", req.query.sessionId);

  // 원시 요청 데이터 로깅을 위한 이벤트 리스너
  let rawData = "";
  req.on("data", (chunk) => {
    rawData += chunk;
  });

  req.on("end", () => {
    try {
      // console.log("원시 요청 데이터:", rawData);
      if (rawData) {
        console.log("파싱된 요청 데이터:", JSON.parse(rawData));
      }
    } catch (e) {
      console.error("요청 데이터 파싱 오류:", e);
    }
  });

  const sessionId = req.query.sessionId as string;
  if (!sessionId || !transports.has(sessionId)) {
    res.status(400).send("SSE connection not established");
    return;
  }

  const transport = transports.get(sessionId)!;
  await transport.handlePostMessage(req, res);
});

// 서버 시작
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
