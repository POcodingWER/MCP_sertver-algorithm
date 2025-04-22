import Heap from "../Heap/Heap";
import Comparator from "../../utils/Comparator";

// 최소 힙과 동일하지만 요소를 비교할 때
// 요소의 값이 아닌 우선순위를 고려합니다.
export default class PriorityQueue<T> extends Heap<T> {
  private priorities: { [key: string]: number };
  protected compare: Comparator<T>;

  constructor() {
    super();
    this.priorities = {};
    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  /**
   * @param {T} item 추가할 아이템
   * @param {number} [priority] 우선순위
   * @return {PriorityQueue<T>} 우선순위 큐 인스턴스
   */
  add(item: T, priority: number = 0): PriorityQueue<T> {
    this.priorities[String(item)] = priority;
    super.add(item);

    return this;
  }

  /**
   * @param {T} item 제거할 아이템
   * @param {Comparator<T>} [customFindingComparator] 사용자 정의 비교 함수
   * @return {PriorityQueue<T>} 우선순위 큐 인스턴스
   */
  remove(item: T, customFindingComparator?: Comparator<T>): PriorityQueue<T> {
    super.remove(item, customFindingComparator);
    delete this.priorities[String(item)];

    return this;
  }

  /**
   * @param {T} item 우선순위를 변경할 아이템
   * @param {number} priority 새로운 우선순위
   * @return {PriorityQueue<T>} 우선순위 큐 인스턴스
   */
  changePriority(item: T, priority: number): PriorityQueue<T> {
    this.remove(item, new Comparator(this.compareValue));
    this.add(item, priority);

    return this;
  }

  /**
   * @param {T} item 찾을 아이템
   * @return {number[]} 찾은 아이템의 인덱스 배열
   */
  findByValue(item: T): number[] {
    return this.find(item, new Comparator(this.compareValue));
  }

  /**
   * @param {T} item 확인할 아이템
   * @return {boolean} 아이템이 존재하는지 여부
   */
  hasValue(item: T): boolean {
    return this.findByValue(item).length > 0;
  }

  /**
   * @param {T} a 첫 번째 아이템
   * @param {T} b 두 번째 아이템
   * @return {number} 비교 결과
   */
  private comparePriority(a: T, b: T): number {
    if (this.priorities[String(a)] === this.priorities[String(b)]) {
      return 0;
    }

    return this.priorities[String(a)] < this.priorities[String(b)] ? -1 : 1;
  }

  /**
   * @param {T} a 첫 번째 아이템
   * @param {T} b 두 번째 아이템
   * @return {number} 비교 결과
   */
  private compareValue(a: T, b: T): number {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }
}
