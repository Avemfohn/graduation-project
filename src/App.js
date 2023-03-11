import "./App.css";
import React, {useContext} from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import Nlp from "./components/Nlp";
import DataContext from "./contexts/dataContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useContext(DataContext);
  return (
    <QueryClientProvider client={new QueryClient()}>
      <div className="App">
        <Nlp />
      </div>
    </QueryClientProvider>
  );
}

export default App;
