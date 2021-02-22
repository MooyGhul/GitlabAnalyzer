import ScoreBoard from './components/ScoreBoard';
import Header from './components/Header';
import Charts from "./components/Charts";
import './App.css';

function OverviewPage(props) {

  return (
      <div>
          <Header
              pageTitle="Overview"
          />
          <ScoreBoard />
          <br/><br/><br/>
          <Charts />
      </div>
  );
}

export default OverviewPage;