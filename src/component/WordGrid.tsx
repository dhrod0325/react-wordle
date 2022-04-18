import { useRecoilValue } from "recoil";
import { wordsState } from "../recoil/atoms";
import classNames from "classnames";
import { GameColConstruct, ReactComponent } from "../@types";

export const WordGrid = () => {
  const words = useRecoilValue(wordsState);

  const WordRow = ({ children }: ReactComponent) => {
    return <div className={classNames("wordRow")}>{children}</div>;
  };

  const WordCol = ({ letter }: GameColConstruct) => {
    return <div className={classNames("wordCol", letter.checkResult)}>{letter.text}</div>;
  };

  return (
    <div id="gameStage">
      {words.map((word, rowIndex) => (
        <WordRow key={rowIndex}>
          {word.letters.map((letter, colIndex) => (
            <WordCol key={colIndex} letter={letter} />
          ))}
        </WordRow>
      ))}
    </div>
  );
};
