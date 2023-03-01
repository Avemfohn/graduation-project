import logo from './logo.svg';
import './App.css';
import NLP from './nlp/Nlp';
import Nlp from "./nlp/Nlp";

function App() {

  const options = {
  method: 'GET',
  url: 'https://textapis.p.rapidapi.com/ner/display',
  params: {text: 'An October post from Dylan that may be saving you a Google search.'},
  headers: {
    'X-RapidAPI-Key': 'e73227c5ddmshc121d17db204b3cp16eefbjsnd100d785f109',
    'X-RapidAPI-Host': 'textapis.p.rapidapi.com'
  }
};

  return (
    <div className="App">
      <Nlp />
    </div>
  );
}

export default App;
