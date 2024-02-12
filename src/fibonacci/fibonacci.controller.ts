import { FibonacciService } from './fibonacci.service';
import {
  BadRequestException,
  Controller,
  Get, Param,
  Query
} from "@nestjs/common";

@Controller('/fibonacci')
export class FibonacciController {
  constructor(private readonly fibonacciService: FibonacciService) {}

  @Get()
  getFibonacci(@Query('limit') limit: string | undefined | string[]) {
    if (typeof limit === undefined) {
      throw BadRequestException;
    } else if (Array.isArray(limit)) {
      throw new BadRequestException();
    } else if (isNaN(parseInt(limit))) {
      throw new BadRequestException();
    } else {
      return this.fibonacciService.getFibonacciNumbers(
        limit
      );
    }
  }

  @Get('/:n')
  public getFibonacciN(@Param('n') n: string) {
    const nNumber = parseInt(n);
    if (nNumber < 0 || isNaN(nNumber)) {
      throw new BadRequestException();
    }
    return this.fibonacciService.getFibonacciN(n);
  }
}
