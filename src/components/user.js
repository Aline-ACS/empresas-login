import React, {useState, useEffect} from 'react';
import api from '../services/api';

export default () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [users, setUsers] = useState([]);  

    async function handleStoreUser() {
        await api.post('/users', {
            name,
            email,
            password,
        })
        .then((response) => setUsers([...users, response.data.user])
            )
        .catch((error) => console.log(error));
        setName('');
        setEmail('');
        setPassword('');
    }

    useEffect(() => {
        api.get('/users')
        .then((response) => setUsers(response.data.users))
        .catch((error) => console.log(error));
    }, [])

   return (
       <>
        <div>
            <h3>Cadastro de Usuários</h3>
            <label>
                Nome:
                <input value={name} onChange={e => setName(e.target.value)} type="text"></input>
            </label>
            <br></br>
            <br></br>
            <label>
                Email:
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" required></input>
            </label>
            <br></br>
            <br></br>
            <label>
                Senha:
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" required></input>
            </label>
            <br></br>
            <br></br>
            <button onClick={handleStoreUser}>Cadastrar Usuário</button>
        </div>
        <br></br>
        <div>
            <span>Usuários Cadastrados</span>
            <br></br>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => 
                        <React.Fragment key={user.uid}>
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        </React.Fragment>
                    )}
                </tbody>
            </table>
        </div>
       </>
   ); 
}