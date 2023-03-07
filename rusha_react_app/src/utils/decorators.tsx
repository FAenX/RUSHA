import React from 'react';

export function authenticate<T>(WrappedComponent: React.FC<T>): React.FC<T> {
  return function(props: any) {
    React.useEffect(() => {
      if (!localStorage.getItem('rusha_token')) {
        window.location.href = '/login';
      }

    
  });

    return <WrappedComponent {...props} />;
  }
}