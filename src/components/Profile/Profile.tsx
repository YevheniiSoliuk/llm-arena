import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../common/Loading";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    isAuthenticated && (
      <div className='flex items-center gap-2'>
        <img className='h-8 w-8 rounded-full' src={user?.picture} alt={user?.name} />
        <h2 className='text-md font-medium'>{user?.name}</h2>
      </div>
    )
  );
};
