/**
 * Tokens is an object with properties ath, atl, current_price, id, name, symbol, high_24h, low_24h,
 * and owned, where ath, atl, current_price, high_24h, low_24h, and owned are numbers and id, name, and
 * symbol are strings.
 * @property {number} ath - All time high
 * @property {number} atl - all time low
 * @property {number} current_price - The current price of the token
 * @property {string} id - The unique identifier for the token.
 * @property {string} name - The name of the token
 * @property {string} symbol - The symbol of the token
 * @property {number} high_24h - The highest price the token has been in the last 24 hours
 * @property {number} low_24h - The lowest price of the token in the last 24 hours
 * @property {number} owned - number;
 */

export type Tokens = {
    ath: number;
    atl: number;
    current_price: number;
    id: string;
    name: string;
    symbol: string;
    high_24h: number;
    low_24h: number;
    owned: number;
};