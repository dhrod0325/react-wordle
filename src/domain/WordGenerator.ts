import { WORDS } from "../constants/WORDS";

export interface WordGenerator {
  generate(): string;
}

export class RandomWordGenerator implements WordGenerator {
  public generate(): string {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }
}

export function generateRandomAnswer() {
  const generator = new RandomWordGenerator();
  return generator.generate().toUpperCase();
}
