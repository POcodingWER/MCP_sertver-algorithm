/**
 * @param {number} number - 검사할 숫자
 * @return {boolean} - 2의 거듭제곱인지 여부
 */
export default function isPowerOfTwo(number: number): boolean {
  // 1 (2^0)은 가장 작은 2의 거듭제곱입니다.
  if (number < 1) {
    return false;
  }

  // 숫자를 나머지 없이 2로 여러 번 나눌 수 있는지 확인합니다.
  let dividedNumber = number;
  while (dividedNumber !== 1) {
    if (dividedNumber % 2 !== 0) {
      // 나머지가 0이 아닌 경우, 이 숫자는 2의 거듭제곱의 결과가 아닙니다.
      return false;
    }

    dividedNumber /= 2;
  }

  return true;
}
