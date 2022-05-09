import { Word } from "./Word";
import { initialWordGrid } from "../constants/SETTING";

//TODO refactor
export const WordGrid = (initialWords?: Word[]) => {
  let words: Word[] = [];

  const setWords = (_words: Word[]) => {
    words = _words;
  };

  if (!initialWords) {
    setWords(initialWordGrid());
  } else {
    setWords(initialWords);
  }

  const getLetterByText = (text: string) => {
    const newWords = [...words];

    for (const word of newWords) {
      const letter = word.getLetter(text);
      if (letter != null) return letter;
    }

    return null;
  };

  const removeLetter = (row: number, col: number) => {
    const newWords = [...words];
    newWords[row] = newWords[row].setLetter(col, "");
    return newWords;
  };

  const checkWordByRow = (row: number, answer: string) => {
    const newWords = [...words];
    newWords[row] = new Word(words[row].check(new Word(answer)));
    return newWords;
  };

  const inputLetter = (row: number, col: number, letter: string) => {
    const newWords = [...words];
    newWords[row] = newWords[row].setLetter(col, letter);
    return newWords;
  };

  const inputWord = (row: number, word: Word) => {
    const newWords = [...words];
    newWords[row] = word;
    return newWords;
  };

  const isAnswer = (row: number, answer: string) => {
    const newWords = [...words];
    return newWords[row].isAnswer(new Word(answer));
  };

  return {
    getLetterByText,
    removeLetter,
    inputWord,
    checkWordByRow,
    inputLetter,
    isAnswer,
    words,
    setWords,
  };
};
