import './App.css';

import Koszyk from './components/koszyk/Koszyk';
import NowyKoszyk from './components/koszyk/NowyKoszyk';

import Licznik from './components/liczniki/Licznik';
import NowyLicznik from './components/liczniki/NowyLicznik';

import Formularz from './components/formularze/Formularz';
import Haslo from './components/formularze/Haslo';
import Logowanie from './components/formularze/Przycisk';

import Ternary from './components/inne/Ternary';
import Aktualizacja from './components/inne/Aktualizacja';

import Studenci from './components/studenci/Studenci';
import StudentManager from './components/studenci/StudentManager';

import LicznikZEfektami from './components/efekty/LicznikZEfektami';
import Tytul from './components/efekty/Tytul';
import Odliczanie from './components/efekty/Odliczanie';

import Komentarz from './components/produkty/Komentarz';
import Komentarze from './components/produkty/Komentarze';
import type { Comment, User } from './components/produkty/comment';

// Przykładowe dane do testu 7.1
const przykladowyUser: User = { id: 67, username: 'test', fullName: 'Testowy Użytkownik' };
const przykladowyKomentarz: Comment = {
  id: 942,
  body: 'To jest przykładowy komentarz do zadania 7.1.',
  postId: 22,
  likes: 999,
  user: przykladowyUser,
};

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
      <Licznik />
      <NowyLicznik />

       {/* ============================================================
        ZADANIE 3: FORMULARZE
        ============================================================
      */}
      <h2>Zadanie 3: Formularze (3.1 - 3.3)</h2>
      <Formularz />
      <Haslo />
      <Logowanie />

        {/* ============================================================
        ZADANIE 4: INNE
        ============================================================
      */}
      <h2>Zadanie 4: Inne (4.1, 4.2)</h2>
      <Ternary />
      <Aktualizacja />

      {/* ============================================================
        SEKCJA TESTOWA ZADANIA 5: STUDENCI
        ============================================================
      */}
      <h2>Zadanie 5: Studenci (5.1, 5.2)</h2>
      
      <Studenci />
      <StudentManager />

      {/* ============================================================
        SEKCJA TESTOWA ZADANIA 6: EFEKTY
        ============================================================
      */}
      <h2>✨ Zadanie 6: Efekty (6.1 - 6.3)</h2>
      
      <LicznikZEfektami />
      <Tytul />
      <Odliczanie />

      {/* ============================================================
        SEKCJA TESTOWA ZADANIA 7: PRODUKTY
        ============================================================
      */}
      <h2>Zadanie 7: Produkty (7.1, 7.2)</h2>
      
      <h3>Zadanie 7.1 (Przykładowy Komentarz)</h3>
      <Komentarz commentData={przykladowyKomentarz} />

      <h3>Zadanie 7.2 (Pobrane Komentarze)</h3>
      <Komentarze />

    </div>
  );
}

export default App;