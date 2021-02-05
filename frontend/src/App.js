import ScoreBoard from './components/ScoreBoard';
import Header from './components/Header';

function App(props) {

  return (
    <div>
      <Header
        pageTitle="Overview"
      />
      <ScoreBoard />

    </div>
  );
}

export default App;