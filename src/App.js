import "./App.css";
import PriceChart from "./components/PriceChart";
import Navbar from "./components/Navbar";
import Markets from "./components/Markets";
import Portfolio from "./components/Portfolio";
import Exchange from "./components/Exchange";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <>
      <Navbar />
      <div className="px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-4 gap-2 p-2">
          <div className="grid-cols-3 md:col-span-3 sm:grid-cols-3 container-fluid col-span-3">
            <SearchBar />
            <PriceChart />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Portfolio />
              <Exchange />
            </div>
          </div>
          <div className="col-span-1">
          <Markets />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
