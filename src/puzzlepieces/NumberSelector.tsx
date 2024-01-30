export default function NumberSelector({
  currentSelectedDigit,
  numberSelectViaButton,
}: {
  currentSelectedDigit: number;
  numberSelectViaButton: (num: number) => void;
}) {
  const numberSelectors = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="gameBoard ">
      {numberSelectors.map((num) => {
        return (
          <div
            className={
              num === currentSelectedDigit
                ? "gameCell cellSelector currentlySelected"
                : "gameCell cellSelector"
            }
            key={num}
            onClick={() => {
              numberSelectViaButton(num);
            }}
          >
            {num}
          </div>
        );
      })}
    </div>
  );
}
