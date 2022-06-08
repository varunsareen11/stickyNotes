import Header from "./shared/Header/Header";
import Sidebar from "./shared/Sidebar/Sidebar";
import ManagementSystem from "./pages/ManagementSystem/ManagementSystem";

const App = () => {
  return (
    <>
      <div className="app">
        <Header />
        <Sidebar />
        <ManagementSystem />
      </div>
    </>
  );
};

export default App;
