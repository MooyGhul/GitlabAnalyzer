import ScoreBoard from './components/ScoreBoard';
import Header from './components/Header';

function OverviewPage(props) {

  return (
    <div>
      <Header
        pageTitle="Overview"
      />

      <ScoreBoard />

    </div>
  );
}

export default OverviewPage;