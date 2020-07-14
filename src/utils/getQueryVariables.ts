import { useLocation, useParams } from 'react-router-dom';
import { LinkOrderByInput } from '../generated/graphql';

const useQueryVariables = () => {
  const { pathname } = useLocation();
  const { page } = useParams();

  const skip = pathname.includes('new') ? (parseInt(page, 10) - 1) * 10 : 0;
  const first = pathname.includes('new') ? 10 : 50;
  const orderBy = pathname.includes('new') ? 'createdAt_DESC' as LinkOrderByInput.CreatedAtDesc : null;
  return {
    first,
    skip,
    orderBy,
  };
};

export default useQueryVariables;
