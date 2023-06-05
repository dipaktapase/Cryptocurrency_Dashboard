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
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-2">
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

    // <div>
    //   <Navbar />
    //   <div className="min-h-screen flex items-center border border-t-4">
    //     <div className="flex-1 mx-auto  mx-28 py-5 ">
    //       <ul className="grid grid-cols-8 grid-rows-3 gap-4 grid-flow-col px-10 py-6 bg-red-50 m-6">
    //         <li className="col-start-1 col-span-5 row-start-1 row-span-2 bg-white rounded-md">
    //           <div className="h-auto">

    //             <PriceChart />
    //           </div>
    //         </li>
    //         <li className="col-start-7 col-span-2 row-start-1 row-span-3 p-4 bg-white rounded-md">
    //           <div>
    //             <Markets />
    //           </div>
    //         </li>
    //         <li className="col-start-1 col-end-6 flex row-start-3 gap-4 ">
    //           <div className="w-1/2 bg-white">
    //             <Portfolio />
    //           </div>
    //           <div className="w-1/2 bg-white">
    //             <Exchange />
    //           </div>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>

    // <div>
    //   <Navbar />

    //   <div className="min-h-screen flex items-center border border-t-4">
    //     <div className="flex grid grid-cols-3 md:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 gap-2">
    //       <div className="">
    //         <div className=" md:col-span-2 bg-white">
    //           <div className="h-auto">
    //             <SearchBar />
    //             <PriceChart />
    //           </div>
    //         </div>
    //         <div className="md:col-span-2 flex flex-wrap gap-4">
    //           <div className="w-full md:w-1/2 bg-white">
    //             <Portfolio />
    //           </div>
    //           <div className="w-full md:w-1/2 bg-white">
    //             <Exchange />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //         <div className="md:col-span-1 bg-white mdgrid-cols-1">
    //           <div><Markets /></div>
    //         </div>
    //   </div>
    // </div>
  );
}

export default App;
