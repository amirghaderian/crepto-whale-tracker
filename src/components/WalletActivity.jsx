import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

const WalletActivity = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const walletAddress = "0xd43af983D17b293C5Bf73b0731B48A55De9aC134";
  const apiKey = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
        );
        if (response.data.status === "1") {
          setTransactions(response.data.result);
        } else {
          setError("خطا در دریافت داده‌ها از اتراسکن.");
        }
      } catch (err) {
        setError("خطا در ارتباط با سرور.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [walletAddress, apiKey]);

  return (
    <motion.section
      className="max-w-3xl mx-auto p-4 bg-white shadow-lg mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-2xl font-bold text-gray-800">تراکنش‌ها</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-center">در حال بارگذاری...</p>}
      {!loading && (
        <ul className="mt-4">
          {transactions.length > 0
            ? transactions.map((tx) => (
                <li
                  key={tx.hash}
                  className="flex justify-between p-2 border-b border-gray-400"
                >
                  <span className="truncate">{tx.from}</span>
                  <span className="font-bold">
                    {(tx.value / 1e18).toFixed(4)} ETH
                  </span>
                  <span>
                    {new Date(tx.timeStamp * 1000).toLocaleTimeString()}
                  </span>
                </li>
              ))
            : !error && (
                <p className="text-gray-500">هیچ تراکنشی یافت نشد.</p>
              )}
        </ul>
      )}
    </motion.section>
  );
};

export default WalletActivity;
