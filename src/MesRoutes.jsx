import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './common/page/home';
import TutorForm from './common/page/TutorForm';
import StudentForm from './common/page/StudentForm';
import StudentsListe from './common/page/ListeStudent';
import Createdatestudent from './common/page/createavailidedate';
import MatchesTable from './common/page/ListeDIsponiliteprof';
import TutorsListe from './common/page/ListeProf';

const MesRoutes = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" Component={Home} />
            <Route path="/prof" Component={TutorForm} />
            <Route path="/student" Component={StudentForm} />
            <Route path="/students" Component={StudentsListe} />
            <Route path="/cree" Component={Createdatestudent} />
            <Route path="/liste/:id" Component={MatchesTable} />
            <Route path="/TutorsListe" Component={TutorsListe} />

            </Routes>
        </Router>
    );
};
export default MesRoutes;