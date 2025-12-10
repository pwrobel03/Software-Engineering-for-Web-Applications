import React, { useState } from 'react';
import type { Student } from './student';
import Dodawanie from './Dodawanie';

// Domyślna tablica dla stanu (skopiowana z 5.1)
const InitialStudents: Student[] = [
 { imie: 'Jan', nazwisko: 'Małek', rocznik: 1999 },
  { imie: 'Piotr', nazwisko: 'Nowak', rocznik: 2000 },
  { imie: 'Anna', nazwisko: 'Cieślik', rocznik: 2001 },
];

const StudentManager: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(InitialStudents);

  // Funkcja do dodawania nowego studenta
  const handleAddStudent = (newStudent: Student) => {
    setStudents(prevStudents => [...prevStudents, newStudent]);
  };

  return (
    <div className="task-section">
      <h3>StudentManager (Zadanie 5.2 - Zarządzanie stanem i dodawanie)</h3>
      
      {/* Tabela wyświetlająca studentów ze stanu */}
      <table className='counter-display students-table'>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {/* Użycie stanu 'students' do renderowania */}
          {students.map((student, index) => (
            <tr key={index} style={{ borderBottom: '1px dashed #ccc' }}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Komponent do dodawania studentów */}
      <Dodawanie onAddStudent={handleAddStudent} />
      
    </div>
  );
};

export default StudentManager;