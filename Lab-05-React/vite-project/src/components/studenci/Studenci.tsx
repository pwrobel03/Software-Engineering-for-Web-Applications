import React from 'react';
import type { Student } from './student';

// Zadeklarowana tablica Students z użyciem interfejsu Student[]
const Students: Student[] = [
  { imie: 'Jan', nazwisko: 'Małek', rocznik: 1999 },
  { imie: 'Piotr', nazwisko: 'Nowak', rocznik: 2000 },
  { imie: 'Anna', nazwisko: 'Cieślik', rocznik: 2001 },
];

const Studenci: React.FC = () => {
  return (
    <div className="task-section">
      <h3>Lista studentów (Zadanie 5.1 - Statyczna tablica)</h3>
      <table className='counter-display students-table'>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {/* Użycie funkcji map do renderowania wierszy tabeli */}
          {Students.map((student, index) => (
            <tr key={index} style={{ borderBottom: '1px dashed #ccc' }}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Studenci;