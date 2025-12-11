import './App.css';
import LicznikLocalStorage from './components/LicznikLocalStorage.tsx';

import BlogRouter from './components/BlogRouter.tsx';

function App() {
  return (
    <div className="container">
      <div className='header'>
          <span>⭐</span>
          <h1> Rozwiązania zadań z Reacta <br/> z wykorzystaniem Vite i TypeScript</h1>
          <span>⭐</span>
      </div>
      <h2>Zadanie 8.1: Licznik z Pamięcią (LocalStorage)</h2>
      <LicznikLocalStorage />
      
      {/* Tu będzie router dla Zadania 8.2 */}
      <h2>Zadanie 8.2: Aplikacja Blog z React Router</h2>
      <BlogRouter />
      {/* <BlogRouter /> */}
      
    </div>
  );
}

export default App;