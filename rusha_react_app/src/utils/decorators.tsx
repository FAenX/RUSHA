import React, { useContext } from 'react';
import staticVariables from './static';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './userProvider';
import { decodeToken } from '../backend_requests/user';

export function authenticate<T>(WrappedComponent: React.FC<T>): React.FC<T> {
      
  
  return function(props: any) {
    const {user, setUser} = useContext(UserContext);
    
    React.useEffect(() => {
      console.log("authentication decorator user :" + JSON.stringify(user));
      (async () => {
        if (!user) {
          const response  = await decodeToken()

          console.log("authentication decorator response :" + JSON.stringify(response.data));
          const userData = {
            id: response.data.id,
            projectId: response.data.project_id,
            email: response.data.email,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            rushaToken: response.data.auth_token
        }
          setUser(userData)
          
        }
      })()
      

      
      return () => {};
  });

    let navigate = useNavigate();
    const token = localStorage.getItem(staticVariables.rushaToken);
    React.useEffect(() => {
      if (!token) {
        navigate('/login');
      }

      return () => {};
  });

    return <WrappedComponent {...props} />;
  }
}