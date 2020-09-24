import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [companies, setCompanies] = useState([]);

    async function handleStoreCompany() {
        await api.post('/companies', {
            name, 
            address
        })
        .then((response) => setCompanies([...companies, response.data.company]))
        .catch((error) => console.log(error));
        setName('');
        setAddress('');
    }

    async function handleDeleteCompany(uid) {
        await api.delete(`/companies/${uid}`)
        .then(response => {
            setCompanies(companies.filter(company => company.uid !== uid));
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        api.get('/companies')
        .then((response) => setCompanies(response.data.companies))
        .catch((error) => console.log(error));
    }, [])

    return(
        <>
            <div>
                <h3>Cadastro de Empresas</h3>
                <label>
                    Nome:
                    <input value={name} onChange={e => setName(e.target.value)}></input>
                </label>
                <br></br>
                <br></br>
                <label>
                    Endereço:
                    <input value={address} onChange={e => setAddress(e.target.value)}></input>
                </label>
                <br></br>
                <br></br>
                <button onClick={handleStoreCompany}>Cadastrar Empresa</button>
            </div>
            <br></br>
            <br></br>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Empresa</th>
                            <th>Endereço</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            {companies.map((company) => 
                                <React.Fragment  key={company.uid}>
                                    <tr>
                                        <td>{company.name}</td>
                                        <td>{company.address}</td>
                                        <td><span><button onClick={e => handleDeleteCompany(company.uid)}>Excluir</button></span></td>
                                    </tr>
                                </React.Fragment>
                            )}
                    </tbody>
                </table>
            </div>
        </>
    );
}