import "./App.css";
import { version } from "./version";
import Block from "./components/block";
import Toolbar from "./components/toolbar";

function App() {
  return (
    <main className="">
      <Block>
        <div>my article</div>
      </Block>
      <Toolbar />
      <div className="fixed right-0 bottom-0 mr-12 mb-2 text-zinc-300">
        {version}
      </div>
    </main>
  );
}

export default App;
