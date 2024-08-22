import "./App.css";
import HelloWorld from "./HelloWorld";

function App() {
  return (
    <div className="App">
      <HelloWorld />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-500">Hello, Tailwind!</h1>
      </div>
    </div>
  );
}

export default App;
