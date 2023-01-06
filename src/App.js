import './App.css';
import Game from './components/game';

document.addEventListener('contextmenu', event => event.preventDefault());

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Minesweeper
        </h1>
        <Game
          width={30}
          height={16}
          bombInitialCount={99}
        >
        </Game>
      </header>
    </div>
  );
}

export default App;
