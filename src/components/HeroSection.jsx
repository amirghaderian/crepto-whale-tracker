import { motion } from "framer-motion";
const HeroSection = () => {
  return (
    <motion.section
      className="text-center py-20 bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-5xl font-bold">Crepto Whale Tracker</h2>
      <p className="mt-4 text-lg">Track the Biggest crepto transactions in real-time!</p>
    </motion.section>
  );
};

export default HeroSection;
