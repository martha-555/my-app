import { useEffect, useState } from "react";

const ErrorComponent = () => {

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        window.navigator.onLine? setErrorMessage('Упс...Щось пішло не так(('): setErrorMessage('Здається, у тебе зник інтернет')
      },[window.navigator.onLine]);

      return (
        <div> {errorMessage} </div>
      )
}

export default ErrorComponent