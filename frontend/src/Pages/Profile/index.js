import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api'

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    
    useEffect(() => {
        api.get('profile', {
            headers: { 
                Authorization: ongId, 
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId])

    function handlelogout() {
        localStorage.clear();
        history.push('/')
    }

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: { 
                    Authorization: ongId, 
            }});
            setIncidents(incidents.filter( incident => incident.id !== id ));
        } catch (err){
            alert('Não foi possível deletar, tente novamente')
        }
    }
    
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem Vindo, {ongName} </span> 

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handlelogout} type="button">
                    <FiPower size={16} color="#E02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map( incident => {
                    return(
                        <li key={incidents.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>
    
                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>
    
                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                       
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="0808b3" />
                        </button>
                        </li>
                        
                    )}
                )}
                          
            </ul>

        </div>

    )
}