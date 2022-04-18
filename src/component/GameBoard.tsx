import { useRecoilValue } from "recoil";
import { wordsState } from "../recoil/atoms";
import classNames from "classnames";
import { GameColConstruct, ReactComponent } from "../@types";

export const GameBoard = () => {
  const words = useRecoilValue(wordsState);

  const GameRow = ({ children }: ReactComponent) => {
    return <div className={classNames("wordRow")}>{children}</div>;
  };

  const GameCol = ({ letter }: GameColConstruct) => {
    return <div className={classNames("wordCol", letter.checkResult)}>{letter.text}</div>;
  };

  return (
    <div id="gameStage">
      {words.map((word, rowIndex) => (
        <GameRow key={rowIndex}>
          {word.letters.map((letter, colIndex) => (
            <GameCol key={colIndex} letter={letter} />
          ))}
        </GameRow>
      ))}
    </div>
  );
};
