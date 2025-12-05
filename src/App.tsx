import GameCanvas from './components/GameCanvas';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1 className="text-center text-2xl font-bold text-white mt-4">七龙珠横版格斗游戏</h1>
      <GameCanvas />
    </div>
  );
}

export default App;
