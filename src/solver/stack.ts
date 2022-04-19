export class Stack<T> {
  private readonly stack: T[] = [];

  peek(): T | undefined {
    return this.stack[this.stack.length - 1];
  }

  push(...args: T[]) {
    return this.stack.push(...args);
  }

  pop() {
    return this.stack.pop();
  }

  get length() {
    return this.stack.length;
  }
}
