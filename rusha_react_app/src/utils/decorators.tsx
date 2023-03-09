import React from 'react';
import staticVariables from './static';
import { useNavigate } from 'react-router-dom';

export function authenticate<T>(WrappedComponent: React.FC<T>): React.FC<T> {
  
  return function(props: any) {
    let navigate = useNavigate();
    React.useEffect(() => {
      if (!localStorage.getItem(staticVariables.rushaToken)) {
        navigate('/login');
      }

    
  });

    return <WrappedComponent {...props} />;
  }
}