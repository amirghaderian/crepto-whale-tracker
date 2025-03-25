import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

const WalletActivity = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10; 

  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
  const apiKey = "5DPV55YBPCQKAF2CW2SE86R9SWXTVR8GKP";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`
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

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const nextPage = () => {
    if (indexOfLastTransaction < transactions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <motion.section
      className="max-w-3xl mx-auto p-4 bg-white shadow-lg mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        تراکنش‌ها
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-center mt-4">در حال بارگذاری...</p>}
      {!loading && (
        <>
          <ul className="mt-4">
            {currentTransactions.length > 0
              ? currentTransactions.map((tx) => (
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

          <div className="flex justify-between mt-4">
            <button
              onClick={nextPage}
              disabled={indexOfLastTransaction >= transactions.length}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              بعدی
            </button>
            <span>صفحه {currentPage}</span>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              قبلی
            </button>
          </div>
        </>
      )}
    </motion.section>
  );
};

export default WalletActivity;
