import { v4 as uuid } from 'uuid';

export class Uuid {
  constructor() {}

  static generate() {
    return uuid();
  }
}
