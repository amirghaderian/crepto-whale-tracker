"use client";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../slices/searchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      className="w-full p-2 border border-gray-400"
      placeholder="جستجوی تراکنش‌ها..."
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
    />
  );
};

export default SearchBar;
