import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as userActions from '../../store/user/actions';
import api from '../../services/api';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword]  =useState('');

    const dispatch = useDispatch();

    async function handleLogin() {
        try {
            const response = await api.post('/login', {
                email,
                password,
            });

            if(response.data.token) {
                dispatch(userActions.login(response.data));
            }
        } catch (error) {
            console.log('Erro ao tentar logar!!')
        }
    }

    return(
        <div>
            <form>
                <h2>Insira seus dados para logar</h2>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"/>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha"/>
                <button type="button" onClick={() => handleLogin()}>LOGAR</button>
            </form>
        </div>
    );
}