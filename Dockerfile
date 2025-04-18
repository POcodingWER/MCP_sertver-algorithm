FROM node:20-alpine AS builder

WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json .
RUN npm install -g pnpm
RUN pnpm install

# 소스 코드 복사 및 dist 폴더 생성
COPY . .
RUN mkdir -p dist

# ts-node를 사용하여 TypeScript 직접 실행을 위한 준비
FROM node:20-alpine

WORKDIR /app

# 실행 환경으로 필요한 파일만 복사
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app/tsconfig.node.json .
COPY --from=builder /app/node_modules ./node_modules

# ts-node로 직접 실행
CMD ["npx", "ts-node", "src/index.ts"] 