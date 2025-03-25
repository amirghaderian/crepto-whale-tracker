import { useState } from "react";
import Hero from "./components/HeroSection";
import SearchBar from "./components/SearchBar";
import WalletActivity from "./components/WalletActivity";
const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="">
      <Hero />
      <SearchBar onSearch={setSearchQuery} />
      <WalletActivity searchQuery={searchQuery} />
    </div>
  );
};

export default App;
