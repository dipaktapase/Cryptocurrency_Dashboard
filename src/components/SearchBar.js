import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import searchImg from "../assets/search.png";
import { fetchCryptoData } from "../store/interactions";

const SearchBar = () => {
  const selectedCurrency = useSelector(
    (state) => state.coinReducer.selectedCurrency
  );
  const cryptoData = useSelector((state) => state.chartReducer.cryptoData);

  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [selectedCurrency, dispatch]);

  const handleSerachChange = (e) => {
    const searchWord = e.target.value;
    setSearchText(searchWord);
    const filteredArray = cryptoData?.filter(
      (coin) => coin?.name?.toLowerCase().includes(searchWord.toLowerCase())
      // console.log('sad',filteredArray)
    );
    setSearch(searchWord === "" ? [] : filteredArray);
  };

  const handleCurrencyChange = (e) => {
    dispatch({ type: "SET_SELECTED_CURRENCY", payload: e.target.value });
  };

  const handleSearch = (coinId) => {
    dispatch({ type: "SET_SELECTED_COIN", payload: coinId });
    setSearch("");
    setSearchText("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="relative flex gap-4">
        <select
          id="currency"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          className="px-3 py-1.5 border border border-red-300 rounded-lg shadow-lg rounded-md justify-center bg-gray-50 hover:bg-gray-100 bg-opacity-30 lg:mg-auto w-36 h-10"
        >
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="jpy">JPY</option>
          <option value="aud">AUD</option>
          <option value="nzd">NZD</option>
          <option value="cad">CAD</option>
          <option value="gbp">GBP</option>
        </select>

        <form onSubmit={submitHandler} className="w-full">
          <div className="flex justify-between overflow-hidden border border border-red-300 rounded-lg shadow-lg gap-2">
            <img
              src={searchImg}
              alt="searchImg"
              className="h-6 w-6 mt-2 ml-4"
            />
            <input
              type="text"
              id="serach"
              value={searchText}
              onChange={handleSerachChange}
              // onClick={handleSearch}
              placeholder="Search by coin"
              className="flex w-full pl-4 rounded-lgw-36 h-10 focus:ring-1"
            />
          </div>
          <ul className="absolute z-20 max-h-80 w-full flex flex-col overflow-auto right-0">
            {search &&
              search?.map((coin) => (
                <li
                  key={coin.id}
                  onClick={() => handleSearch(coin.id)}
                  className="p-2 bg-white border ml-[145px] "
                >
                  {coin.name}
                </li>
              ))}
          </ul>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
