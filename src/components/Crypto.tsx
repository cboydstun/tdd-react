import axios from "axios";
import { useEffect, useState } from "react";
import CryptoSummary from "./CryptoSummary";
import { Tokens } from "../models/Tokens";

function Crypto() {
  const [cryptos, setCryptos] = useState<Tokens[] | null>(null);
  const [selected, setSelected] = useState<Tokens[]>([]);

  /* A hook that is called when the component is mounted. It is used to fetch data from an API. */
  useEffect(() => {
    /* Fetching data from an API. */
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    axios.get(url).then((response) => {
      setCryptos(response.data);
    });
  }, []);

  /**
   * If the crypto object exists in the selected array, update the owned property of that object with the
   * amount passed in.
   * @param {Tokens} crypto - Tokens
   * @param {number} amount - number
   */
  function updateOwned(crypto: Tokens, amount: number): void {
    let temp = [...selected];
    let tempObj = temp.find((c) => c.id === crypto.id);
    /* Updating the owned property of the object in the selected array. */
    if (tempObj) {
      tempObj.owned = amount;
      setSelected(temp);
    }
  }

  return (
    <>
      <div>
        {/* Creating a select element with an onChange event handler. When the event
        handler is called, it is finding the crypto object in the cryptos array
        that has the same id as the value of the select element. It is then
        adding that object to the selected array. */}
        <select
          onChange={(e) => {
            const c = cryptos?.find((x) => x.id === e.target.value) as Tokens;
            setSelected([...selected, c]);
          }}
          defaultValue="default"
        >
          <option value="default">Choose an option</option>

          {/* Checking if the cryptos array is null. If it is not null, it is
          mapping over the array and returning an option element for each item
          in the array. If it is null, it is returning null. */}
          {cryptos
            ? cryptos.map((crypto) => {
                return (
                  <option key={crypto.id} value={crypto.id}>
                    {crypto.name}
                  </option>
                );
              })
            : null}
        </select>
      </div>

      {/* Mapping over the selected array and returning a CryptoSummary component for each item in the array. */}
      {selected.map((s) => {
        return <CryptoSummary crypto={s} updateOwned={updateOwned} />;
      })}

      {/* Checking if the selected array is null. If it is not null, it is
      mapping over the array and returning the current price of the crypto
      multiplied by the amount owned. It is then reducing the array to a single
      value. It is then returning a string with the value of the array. If the
      selected array is null, it is returning null. */}
      {selected
        ? "Your portfolio is worth: $" +
          selected
            .map((s) => {
              if (isNaN(s.owned)) {
                return 0;
              }
              return s.current_price * s.owned;
            })
            .reduce((prev, current) => {
              return prev + current;
            }, 0)
            .toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
        : null}
    </>
  );
}

export default Crypto;
