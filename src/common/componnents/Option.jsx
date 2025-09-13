import React from 'react';
import PropTypes from 'prop-types';

const Option = ({couleur,text,navigate}) => {
    return (
        <div style={{cursor:'pointer'}} onClick={navigate}>
            <div style={{ width: 350, height: 182, marginRight: 10, borderRadius: 10, background: couleur, textAlign: 'center' }}>
                {/* <Link to={'/mon-equipe'}>mon-equipe</Link> */}
                <div className="d-flex justify-content-between items-center px-5 pt-4">
                    <img alt="Questions icon" aria-hidden="true" src="https://assets-aws.teamtailor-cdn.com/assets/connect/cards/questions-d15b28bf6f299eeb54c3e959e40d873490a9b9c5177ac53f79d0c03cef24e68a.svg" width={28} height={28} />
                    <div className="font-semibold text-base text-white">2
                        / 8</div>
                </div>
                <div className="text-white text-xl font-semibold leading-tight text-center mt-24" style={{ fontSize: 18, marginTop: 90 }}>
                    {/* Consulter  <span className="text-amber-500">votre</span>profil */}
                    {text}
                </div>

            </div>  
        </div>
    );
}

Option.propTypes = {};

export default Option;