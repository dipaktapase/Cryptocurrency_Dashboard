import "./App.css";
import Navbar from "./components/Navbar";
import Markets from "./components/Markets";

function App() {
  return (
    <div>
      <Navbar />

      <div className="min-h-screen lfex items-center border border-t-4">
        <div className="flex-1 mx-auto  mx-28 py-5 ">
          <ul className="grid grid-cols-8 grid-rows-3 gap-4 grid-flow-col px-10 py-6 bg-red-50 m-6">
            <li className="col-start-1 col-span-5 row-start-1 row-span-2 bg-white"><div className="h-auto">1</div></li>
            <li className="col-start-7 col-span-2 row-start-1 row-span-3 p-4 bg-white"><div><Markets /></div></li>
            <li className="col-start-1 col-end-6 flex row-start-3 gap-4 ">
              <div className="w-1/2 bg-white">
                4
              </div>
              <div className="w-1/2 bg-white">
                5
              </div>
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
