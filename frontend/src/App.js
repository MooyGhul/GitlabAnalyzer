import ScoreBoard from './components/ScoreBoard';
import Header from './components/Header';
import UrlToken from './components/UrlToken';

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