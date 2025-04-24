/**
 * @param {number} number - 검사할 숫자
 * @return {boolean} - 2의 거듭제곱인지 여부
 */
export default function isPowerOfTwoBitwise(number: number): boolean {
  // 1 (2^0)은 가장 작은 2의 거듭제곱입니다.
  if (number < 1) {
    return false;
  }

  /*
   * 2의 거듭제곱은 이진수로 다음과 같이 표현됩니다:
   * 1: 0001
   * 2: 0010
   * 4: 0100
   * 8: 1000
   *
   * 항상 정확히 1개의 비트만 설정되어 있습니다. 유일한 예외는 부호가 있는 정수입니다.
   * 예: 8비트 부호 있는 정수 -128은 다음과 같이 표현됩니다:
   * 10000000
   *
   * 따라서 숫자가 0보다 큰지 확인한 후, 비트 연산 트릭을 사용하여
   * 오직 하나의 비트만 설정되어 있는지 테스트할 수 있습니다.
   */
  return (number & (number - 1)) === 0;
}
