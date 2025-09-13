// src/common/page/TutorsListe.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faChartLine, faEllipsisV, faUserFriends } from "@fortawesome/free-solid-svg-icons";

export default function TutorsListe() {
  const [tutors, setTutors] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch('http://localhost:3000/tutors', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setTutors(data);
        } else {
          setMessage('Erreur lors de la récupération des tuteurs.');
        }
      } catch (error) {
        setMessage('Erreur réseau ou serveur.');
      }
    };

    fetchTutors();
  }, []);

  return (
    <div className="container mt-5">
      <div className='mt-5 card' style={{ padding: "1.7rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)" }}>
        <div className='d-flex justify-content-between mb-3'>
          <div className='d-flex' style={{ fontWeight: 600, marginBottom: "1.2rem", alignItems: 'center' }}>
            <FontAwesomeIcon icon={faUserFriends} className='me-2' style={{ color: '#4361ee', fontSize: '1.3rem', margin: 0 }} />
            <h3 style={{ fontWeight: 600 }}>Liste des Tuteurs</h3>
          </div>
          <div className='d-flex' style={{ fontWeight: 600, marginBottom: "1.2rem", alignItems: 'center' }}>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="button">Search</button>
            </form>
          </div>
        </div>

        <div className="overflow-x-auto">
          {message && <p className="text-red-500">{message}</p>}
          <table className="table w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th>Tuteur</th>
                <th>Expérience (ans)</th>
                <th>Matières</th>
                <th>Niveaux</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((tutor) => (
                <motion.tr key={tutor.id} className="cursor-pointer transition-colors">
                  <td>
                    <div className='d-flex align-center'>
                      <img 
                        src={`https://randomuser.me/api/portraits/men/${tutor.id}.jpg`} 
                        alt={tutor.fullName} 
                        style={{ width: 42, height: 42, borderRadius: '50%', marginRight: 12, objectFit: 'cover', border: '2px solid white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} 
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#2d3748' }}>{tutor.fullName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{tutor.experienceYears}</td>
                  <td>{tutor.subjects.join(', ')}</td>
                  <td>{tutor.levels.join(', ')}</td>
                  <td>
                    <div className='d-flex gap-1'>
                      <button className="btn btn-primary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="btn btn-secondary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}>
                        <FontAwesomeIcon icon={faChartLine} />
                      </button>
                      <button className="btn btn-outline" style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
