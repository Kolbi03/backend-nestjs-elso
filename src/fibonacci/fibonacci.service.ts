import { Injectable } from '@nestjs/common';

@Injectable()
export class FibonacciService {
  getFibonacciNumbers(n: string) {
    const fibListA: number[] = [];

    const nNumber = parseInt(n);
    for (let i = 0; i < nNumber; i++) {
      if (i === 0 || i === 1) {
        fibListA.push(i);
      } else {
        fibListA.push(fibListA[i - 2] + fibListA[i - 1]);
      }
    }
    return fibListA;
  }

  getFibonacciN(n: string) {
    const list = this.getFibonacciNumbers(n);
    return list[list.length - 1];
  }
}
