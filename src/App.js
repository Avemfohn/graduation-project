import './App.css';
import {QueryClientProvider, QueryClient} from "react-query";
import Nlp from "./components/Nlp";

function App() {

  return (
    <QueryClientProvider client={new QueryClient()}>
    <div className="App">
        <Nlp />
    </div>
    </QueryClientProvider>
  );
}

export default App;
