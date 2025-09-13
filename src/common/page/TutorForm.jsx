import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Simuler les enums
const subjectsEnum = ['MATHEMATIQUES', 'PHYSIQUE', 'FRANCAIS', 'ANGLAIS', 'SVT'];


const levelsEnum = ['COLLEGE', 'LYCEE', 'High ',];
const TutorForm = () => {
  const [fullName, setFullName] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [level, setLevel] = useState('');
  const [message, setMessage] = useState('');

  // Gestion des checkbox pour les matières
  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSubjects([...subjects, value]);
    } else {
      setSubjects(subjects.filter((subj) => subj !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!level) {
      setMessage('Veuillez sélectionner un niveau.');
      return;
    }

    const tutorData = {
      fullName,
      experienceYears: Number(experienceYears),
      subjects,
      levels: [level], // Sequelize attend un tableau
    };

    try {
      const response = await fetch('http://localhost:3000/tutors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tutorData),
      });

      if (response.ok) {
        setMessage('Tuteur créé avec succès !');
        setFullName('');
        setExperienceYears('');
        setSubjects([]);
        setLevel('');
      } else {
        setMessage('Erreur lors de la création du tuteur.');
      }
    } catch (error) {
      setMessage('Erreur réseau ou serveur.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Créer un nouveau Tuteur</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom complet</label>
          <input
            type="text"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Années d'expérience</label>
          <input
            type="number"
            className="form-control"
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
            required
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label d-block">Matières</label>
          {subjectsEnum.map((subject) => (
            <div className="form-check form-check-inline" key={subject}>
              <input
                className="form-check-input"
                type="checkbox"
                value={subject}
                checked={subjects.includes(subject)}
                onChange={handleSubjectChange}
              />
              <label className="form-check-label">{subject}</label>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label className="form-label">Niveau</label>
          <select
            className="form-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
            <option value="">Sélectionnez un niveau</option>
            {levelsEnum.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Créer le tuteur
        </button>
      </form>
    </div>
  );
};

export default TutorForm;
