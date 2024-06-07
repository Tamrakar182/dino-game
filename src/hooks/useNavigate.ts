import { useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';

const useViewNavigate = () => {
  const navigate = useNavigate();

  const handleNavigate = useCallback((to: string) => {
    if (document.startViewTransition === undefined) return navigate({ to });
    document.startViewTransition(() => {
      navigate({ to });
    });
  }, [navigate])

  return handleNavigate;
};

export default useViewNavigate;