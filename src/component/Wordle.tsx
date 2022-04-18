import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import classNames from "classnames";

import { GameBoard } from "./GameBoard";
import { Keyboard } from "./Keyboard";
import { generateRandomAnswer } from "../domain/WordGenerator";
import { answerState } from "../recoil/atoms";
import { useAnswerCheck } from "../hooks/useAnswerCheck";

export const Wordle = () => {
  const setAnswer = useSetRecoilState(answerState);
  const answerCheck = useAnswerCheck();

  useEffect(() => {
    setAnswer(generateRandomAnswer());
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const wordleAnswerCheck = (text: string) => {
    try {
      const isAnswer = answerCheck(text);

      if (!isAnswer) {
        return;
      }

      if (confirm("정답을 맞추셨습니다. 다시 하시겠습니까?")) {
        location.reload();
      }
    } catch (e) {
      return alert((e as Error).message);
    }
  };

  function handleKeyDown(e: KeyboardEvent) {
    wordleAnswerCheck(e.key.toUpperCase());
  }

  function handleOnClickKey(text: string) {
    wordleAnswerCheck(text);
  }

  return (
    <div className={classNames("gameContainer")}>
      <GameBoard />
      <Keyboard onClickKey={handleOnClickKey} />
    </div>
  );
};
