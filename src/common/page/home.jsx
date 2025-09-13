import React from 'react';
import Option from '../componnents/Option';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/student');
    };
    const handleConges = () => {
        navigate('/prof');
    };
    const handleperf = () => {
        navigate('/students');
    }; 
    const handleperfp = () => {
        navigate('/cree');
    }; 
    const handleperfTutorsListe = () => {
        navigate('/TutorsListe');
    }; 
    return (
        <div className='container mt-4'>
            <h2>Liste des fonctionnalite disponible dans l'application</h2>
            <div className='d-flex flex-row flex-wrap gap-2 pb-2' >
                   <Option couleur={'rgb(141,232,144)'} text={"cree un etudiant"} navigate={handleClick}/>
                   <Option couleur={'rgb(252 ,211 ,77)'} text={"cree un prof"} navigate={handleConges}/>
                   <Option couleur={'rgb(111,226,241)'} text={"liste des etudiants"} navigate={handleperf}/>
                   <Option couleur={'rgb(111,226,241)'} text={"liste des tuteurs"} navigate={handleperfTutorsListe}/>
                   <Option couleur={'rgb(111,226,241)'} text={"crees des disponibilite"} navigate={handleperfp}/>             
             </div>
        </div>
    );
}
 
export default Home;