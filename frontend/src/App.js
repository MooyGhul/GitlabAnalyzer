import ScoreBoard from './components/ScoreBoard';
import Header from './components/Header';
import Charts from './components/Charts';
import './App.css';

function App(props) {

  return (
    <div>
      <Header
        pageTitle="Overview"
      />
      <br/><br/><br/>
      <ScoreBoard />
      <br/><br/><br/>
      <Charts />
    </div>
  );
}

export default App;