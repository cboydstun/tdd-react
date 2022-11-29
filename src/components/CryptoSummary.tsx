import { Tokens } from "../models/Tokens";
import { useState } from "react";

/**
 * CryptoProps is an object with two properties, crypto and updateOwned. The crypto property is a Tokens
 * type, and the updateOwned property is a function that takes a Tokens type and a number and returns
 * nothing.
 * @property {Tokens} crypto - Tokens;
 * @property updateOwned - This is a function that will update the amount of crypto owned by the user.
 */
export type CryptoProps = {
  crypto: Tokens;
  updateOwned: (crypto: Tokens, amount: number) => void;
};

export default function CryptoSummary({
  crypto,
  updateOwned,
}: CryptoProps): JSX.Element {
  const [amount, setAmount] = useState<number>(0);

  return (
    <div>
      {/* Displaying the name of the crypto and the current price. */}
      <span>{crypto.name + " $" + crypto.current_price}</span>

      {/* An input field that takes a number. The value of the input field is set to
      the amount variable. When the input field is changed, the amount variable
      is updated to the new value. The updateOwned function is called with the
      crypto and the new amount. */}
      <input
        type="number"
        style={{ margin: 10 }}
        value={amount}
        onChange={(e) => {
          setAmount(parseFloat(e.target.value));
          updateOwned(crypto, parseFloat(e.target.value));
          //set the parents state by calling a function passed in as a prop
        }}
      ></input>
      <p>
        {/* This is a ternary operator. It is a shorthand way of writing an if
        statement. The condition is isNaN(amount). If the condition is true,
        then the first value is returned, which is ".00". If the condition is
        false, then the second value. This is a string that is the current price
        of the crypto multiplied by the amount. The toLocaleString function is
        used to format the number. */}
        {isNaN(amount)
          ? "$0.00"
          : "$" +
            (crypto.current_price * amount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
      </p>
    </div>
  );
}
