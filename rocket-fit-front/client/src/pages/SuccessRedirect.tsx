import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const SuccessRedirect = () => {
    const Navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);

    useEffect(() => {
        const email = params.get('email');
        const username = params.get('username');
        const password = params.get('password');

        if (email && username && password) {
            const data = {
                email: email,
                username: username,
                password: password
            };
            console.log("Triggered")
            Navigate('/register/3', { state: data });
        } else {
            Navigate('/login');
        }
      }, [Navigate, params]);

  return (
    <div></div>
  )
}

export default SuccessRedirect
