import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faChartLine, faEllipsisV, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function StudentsListe() {
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Récupération des étudiants depuis le backend
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:3000/students', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStudents(data);
                } else {
                    setMessage('Erreur lors de la récupération des étudiants.');
                }
            } catch (error) {
                setMessage('Erreur réseau ou serveur.');
            }
        };

        fetchStudents();
    }, []);
    const naviagte = useNavigate();


    const handlenavigate = (data) => {
        naviagte(`/liste/${data.id}`);
    }

    return (
        <div className="container mt-5">

            <div className='mt-5 card' style={{ padding: "1.7rem", borderRadius: "12px", boxShadow: " 0 4px 12px rgba(0, 0, 0, 0.08)" }}>
                <div className='d-flex justify-content-between  mb-3'>
                    <div className='d-flex' style={{ fontWeight: 600, marginBottom: "1.2rem", alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faUserFriends} className='me-2' style={{ color: '#4361ee', fontSize: '1.3rem', margin: 0 }} />
                        <h3 style={{ fontWeight: 600 }}>Liste des etudiants</h3>
                    </div>
                    <div className='d-flex ' style={{ fontWeight: 600, marginBottom: "1.2rem", alignItems: 'center' }}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="button">Search</button>
                        </form>

                    </div>
                </div>

                <div className="overflow-x-auto">
                    <p className="text-red-500">{message}</p>
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th>Étudiant</th>
                                <th>Niveau</th>
                                <th>Matières</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <motion.tr key={student.id} className="cursor-pointer transition-colors" >
                                    <td>
                                        <div className='d-flex align-center'>
                                            <img
                                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                                alt={student.fullName}
                                                style={{ width: 42, height: 42, borderRadius: '50%', marginRight: 12, objectFit: 'cover', border: '2px solid white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                                            />
                                            <div>
                                                <div style={{ fontWeight: 600, color: '#2d3748' }}>{student.fullName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{student.level}</td>
                                    <td>{student.subjects.join(', ')}</td>
                                    <td>
                                        <div className='d-flex gap-1'>
                                            <button className="btn btn-primary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }} onClick={() => handlenavigate(student)}
                                            >
                                                <FontAwesomeIcon icon={faEye}  />
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
