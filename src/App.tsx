import './App.css';
import Canvas from './components/Canvas';


function App() {

  return (
    <div className="App">
      <h1>お絵描きツールです。</h1>
      <p>キャンバスの大きさは横800*縦600pxです。<span>/推奨：フルスクリーン/</span></p>
      <Canvas width={800} height={600}/>
    </div>
  );
}

export default App;
