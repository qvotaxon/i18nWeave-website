import { clarity } from 'react-microsoft-clarity';

export function useMicrosoftClarity() {
  const initialize = (projectId: string) => {
    clarity.hasStarted() || clarity.init('nxvf26q0wz');
  };

  const consent = () => {
    clarity.consent();
  };

  return {
    initialize,
    consent,
  };
}
