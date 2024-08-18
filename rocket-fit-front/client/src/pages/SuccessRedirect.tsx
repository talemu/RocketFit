import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import stripePaymentService from '../services/stripePaymentService';

const SuccessRedirect = () => {
    const Navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);

    useEffect(() => {
        const token = params.get('token');
        if (token) {
            const data = {
                token: token
            }
            const {request} = stripePaymentService.postItem("/getTokenInfo/", data);
            request.then((response) => {
                const data = response.data.data;
                if (data) {
                    Navigate('/register/3', {state: data});
                } else {
                    Navigate('/login');
                }
            }).catch((error) => {
                console.log(error);
                Navigate('/login');
            });
        }
        else {
            Navigate('/login');
        }
    }, [Navigate, params]);

  return (
    <div></div>
  )
}

export default SuccessRedirect
