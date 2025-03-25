"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "../slices/transactionSlice";
import { motion } from "framer-motion";

const WalletActivity = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.transactions);
  const searchQuery = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const filteredTransactions = data.filter((tx) =>
    tx.from.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.section className="max-w-3xl mx-auto p-4 bg-white shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        تراکنش‌ها
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-center mt-4">در حال بارگذاری...</p>}
      {!loading && filteredTransactions.length > 0 ? (
        <ul className="mt-4">
          {filteredTransactions.slice(0, 10).map((tx) => (
            <li
              key={tx.hash}
              className="flex justify-between p-2 border-b border-gray-400"
            >
              <span className="truncate">{tx.from}</span>
              <span className="font-bold">
                {(tx.value / 1e18).toFixed(4)} ETH
              </span>
              <span>{new Date(tx.timeStamp * 1000).toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">هیچ تراکنشی یافت نشد.</p>
      )}
    </motion.section>
  );
};

export default WalletActivity;
