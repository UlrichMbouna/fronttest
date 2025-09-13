import React , { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
 
const Createdatestudent = () => {
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [ownerType, setOwnerType] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [message, setMessage] = useState('');
  
    const [students, setStudents] = useState([]);
    const [tutors, setTutors] = useState([]);
  
    // Charger les étudiants et tuteurs pour le select
    useEffect(() => {
      const fetchData = async () => {
        try {
          const studentsRes = await fetch('http://localhost:3000/students');
          const tutorsRes = await fetch('http://localhost:3000/tutors');
          setStudents(await studentsRes.json());
          setTutors(await tutorsRes.json());
        } catch (err) {
          console.error('Erreur lors du chargement des propriétaires:', err);
        }
      };
      fetchData();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!dayOfWeek || !startTime || !endTime || !ownerType || !ownerId) {
        setMessage('Veuillez remplir tous les champs.');
        return;
      }
  
      const availabilityData = {
        dayOfWeek,
        startTime,
        endTime,
        ownerType,
        ownerId: Number(ownerId),
      };
  
      try {
        const response = await fetch('http://localhost:3000/availabilities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(availabilityData),
        });
  
        if (response.ok) {
          setMessage('Disponibilité créée avec succès !');
          setDayOfWeek('');
          setStartTime('');
          setEndTime('');
          setOwnerType('');
          setOwnerId('');
        } else {
          const errData = await response.json();
          setMessage(`Erreur: ${errData.error || 'Serveur'}`);
        }
      } catch (error) {
        setMessage(`Erreur réseau: ${error.message}`);
      }
    };
  
    return (
      <div className="container mt-5">
        <h2>Créer une disponibilité</h2>
        {message && <div className="alert alert-info">{message}</div>}
  
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Jour de la semaine</label>
            <select
              className="form-select"
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              required
            >
              <option value="">Sélectionnez un jour</option>
              {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
  
          <div className="mb-3">
            <label className="form-label">Heure de début</label>
            <input
              type="time"
              className="form-control"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
  
          <div className="mb-3">
            <label className="form-label">Heure de fin</label>
            <input
              type="time"
              className="form-control"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
  
          <div className="mb-3">
            <label className="form-label">Type de propriétaire</label>
            <select
              className="form-select"
              value={ownerType}
              onChange={(e) => { setOwnerType(e.target.value); setOwnerId(''); }}
              required
            >
              <option value="">Sélectionnez un type</option>
              <option value="STUDENT">Étudiant</option>
              <option value="TUTOR">Tuteur</option>
            </select>
          </div>
  
          {ownerType && (
            <div className="mb-3">
              <label className="form-label">{ownerType === 'STUDENT' ? 'Étudiant' : 'Tuteur'}</label>
              <select
                className="form-select"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                required
              >
                <option value="">Sélectionnez {ownerType === 'STUDENT' ? 'un étudiant' : 'un tuteur'}</option>
                {(ownerType === 'STUDENT' ? students : tutors).map(owner => (
                  <option key={owner.id} value={owner.id}>{owner.fullName}</option>
                ))}
              </select>
            </div>
          )}
  
          <button type="submit" className="btn btn-primary">
            Créer la disponibilité
          </button>
        </form>
      </div>
    );
  };
  
 
 
export default Createdatestudent;