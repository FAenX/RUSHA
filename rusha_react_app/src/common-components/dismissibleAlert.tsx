import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface Props {
    /**
     * @param {boolean} show
     * @param {string} message
     * @param {function} onClose
     * */
    show: boolean,
    message: string,
    onClose: () => void

}

function DismissibleAlert(props: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  if (show) {
    return (
      <Alert variant="danger" onClose={props.onClose} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
            {props.message}
        </p>
      </Alert>
    );
  }
  return <></>;
}

export {DismissibleAlert};