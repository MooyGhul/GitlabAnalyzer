import ScoreBoard from './components/ScoreBoard';
import Header from './components/Header';
import Chats from './components/Chats';


function App(props) {

  return (
    <div>
      <Header
        pageTitle="Overview"
      />
      <ScoreBoard />
      <br/><br/><br/>
      <Chats />
    </div>
  );
}

export default App;