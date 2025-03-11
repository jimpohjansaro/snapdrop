import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <>
      <div className="mt-2 flex h-96 w-full flex-col items-center justify-start sm:mt-4">
        <h2 className="mb-5">Profile</h2>
        <div className="flex w-auto flex-col items-center justify-center gap-2 rounded-2xl border-2 border-blue-300 bg-blue-100 p-10 shadow-md">
          {user && (
            <>
              <p>
                <b>Username:</b> {user.username}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>User level:</b> {user.level_name}
              </p>
              <p>
                <b>Registered:</b>{' '}
                {new Date(user.created_at).toLocaleString('fi-FI')}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
