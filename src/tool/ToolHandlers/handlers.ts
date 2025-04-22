export const validateValueParam = (value: unknown, operation: string): void => {
  if (value === undefined) {
    throw new Error(`${operation} 작업에는 'value' 파라미터가 필요합니다.`);
  }
};

export const getListById = <T>(
  store: Map<string, T>,
  listId: string | undefined,
  toolName: string
): T => {
  if (!listId || !store.has(listId)) {
    throw new Error(
      `유효한 리스트 ID가 필요합니다. 먼저 '${toolName}' 도구의 'create' 작업을 호출하여 listId를 얻으세요.`
    );
  }
  return store.get(listId)!;
};

/**
 * 표준 응답 객체 생성 함수
 * @param message 반환할 메시지 텍스트
 * @param metadata 추가 메타데이터 (선택적)
 * @returns 표준화된 응답 객체
 */
export const createResponse = (
  message: string,
  metadata?: Record<string, any>
) => {
  return {
    content: [
      {
        type: "text",
        text: message,
      },
    ],
    ...(metadata && { metadata }),
  };
};
