import { clarity } from 'react-microsoft-clarity';

export function useMicrosoftClarity() {
  const initialize = (projectId: string) => {
    if (!clarity.hasStarted()) {
      clarity.init(projectId);
    }
  };

  const consent = () => {
    clarity.consent();
  };

  return {
    initialize,
    consent,
  };
}
