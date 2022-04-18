import { ReactNode } from "react";
import { Letter } from "../domain/Letter";

export type ReactComponent = { children: ReactNode };

export type LetterStateType = "FAIL" | "SUCCESS" | "INCLUDE" | "" | undefined;

export type KeyboardButtonType = {
  text: string;
  state: LetterStateType;
};

export type KeyboardProps = {
  onClickKey: (key: string) => void;
};

export type GameColConstruct = { letter: Letter };
