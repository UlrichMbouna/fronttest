import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faChartLine, faEllipsisV, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

export default function MatchesTable() {
  const [matches, setMatches] = useState([]);
  const [message, setMessage] = useState('');
    const data = useParams();
    console.log("test",data);
    
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`http://localhost:3000/match/student/${data.id}`);
        if (response.ok) {
          const data = await response.json();
          setMatches(data);
        } else {
          setMessage('Erreur lors de la récupération des correspondances.');
        }
      } catch (error) {
        setMessage('Erreur réseau ou serveur.');
      }
    };

    fetchMatches();
  }, [data]);

  return (
    <div className="container mt-5">
      <div className='mt-5 card' style={{ padding: "1.7rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)" }}>
        <div className='d-flex justify-content-between mb-3'>
          <div className='d-flex' style={{ fontWeight: 600, marginBottom: "1.2rem", alignItems: 'center' }}>
            <FontAwesomeIcon icon={faUserFriends} className='me-2' style={{ color: '#4361ee', fontSize: '1.3rem', margin: 0 }} />
            <h3 style={{ fontWeight: 600 }}>Matches Tuteurs</h3>
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
                <th>Score</th>
                <th>Disponibilités</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <motion.tr key={match.tutor.id} className="cursor-pointer transition-colors">
                  <td>
                    <div className='d-flex align-center'>
                      <img 
                        src={`https://randomuser.me/api/portraits/men/${match.tutor.id}.jpg`} 
                        alt={match.tutor.fullName} 
                        style={{ width: 42, height: 42, borderRadius: '50%', marginRight: 12, objectFit: 'cover', border: '2px solid white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} 
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#2d3748' }}>{match.tutor.fullName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{match.tutor.experienceYears}</td>
                  <td>{match.tutor.subjects.join(', ')}</td>
                  <td>{match.tutor.levels.join(', ')}</td>
                  <td className="font-semibold">{match.score}</td>
                  <td>
                    {match.tutor.availabilities.length > 0
                      ? match.tutor.availabilities
                          .map(av => `${av.dayOfWeek} ${av.startTime.slice(0,5)}-${av.endTime.slice(0,5)}`)
                          .join(', ')
                      : 'Aucune'}
                  </td>
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
