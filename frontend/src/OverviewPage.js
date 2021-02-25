import ScoreBoard from './components/ScoreBoard';
import Header from './components/Header';
import Charts from "./components/Charts";
import DataFetching from './components/DataFetching';

function OverviewPage(props) {

  return (
      <div>
          <Header
              pageTitle="Overview"
          />
          <ScoreBoard />
          <br/><br/><br/>
          <Charts />
          <DataFetching />
      </div>
  );
}

export default OverviewPage;