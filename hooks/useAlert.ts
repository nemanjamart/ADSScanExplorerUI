import { useContext } from 'react';
import { AlertContext } from '../providers/AlertProvider';

function useAlert() {
  const { alert, addError, addMessage, removeAlert } = useContext(AlertContext);
  return { alert, addError, addMessage, removeAlert };
}

export default useAlert;