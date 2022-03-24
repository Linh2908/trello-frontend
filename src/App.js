import './App.scss';
import BoardContent from './conponent/BoardContent/BoardContent';
import Header from './conponent/Navbar';
import NavBoard from './conponent/NavBoard/Navboard';

function App() {
  return (
    <div className="trello_container">
      <Header/>
      <NavBoard/>
      <BoardContent/>
    </div>
  );
}

export default App;
