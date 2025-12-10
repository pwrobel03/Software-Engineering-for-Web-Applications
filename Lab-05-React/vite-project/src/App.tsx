import './App.css';
import Koszyk from './components/koszyk/Koszyk';
import NowyKoszyk from './components/koszyk/NowyKoszyk';

function App() {
  return (
    <div className="container">
      <div className='header'>
        <span>⭐</span>
        <h1> Rozwiązania zadań z Reacta <br/> z wykorzystaniem Vite i TypeScript</h1>
        <span>⭐</span>
      </div>

      {/* ============================================================
        ZADANIE 1: KOSZYK
        ============================================================
      */}
      <h2>Zadanie 1: Koszyk (1.1, 1.2)</h2>
      <Koszyk />
      <NowyKoszyk />

      {/* ============================================================
        ZADANIE 2: LICZNIKI
        ============================================================
      */}
      <h2>Zadanie 2: Liczniki (2.1, 2.2)</h2>


    </div>
  );
}

export default App;