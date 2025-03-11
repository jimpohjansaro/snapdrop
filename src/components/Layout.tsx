import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';
import {useEffect} from 'react';

const Layout = () => {
  // jos käyttäjää ei ole, kutsu handleAutoLogin()
  const {user, handleAutoLogin} = useUserContext();
  useEffect(() => {
    if (!user) {
      handleAutoLogin();
    }
  }, []);

  return (
    <>
      <div className="justify-left flex h-20 flex-row items-center">
        <img className="h-20" src="/logo.png" alt="kuva" />
        <h1 className="pl-2 font-bold">Snapdrop</h1>
      </div>
      <div>
        <nav>
          <ul className="m-0 flex list-none justify-around rounded-3xl border-2 border-blue-500 bg-blue-400 p-0 pr-4 shadow-sm sm:justify-end">
            <li>
              <Link
                className="hover: block rounded-sm p-4 text-center transition-all duration-500 ease-in-out hover:bg-blue-500"
                to="/"
              >
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    className="hover: block rounded-sm p-4 text-center transition-all duration-500 ease-in-out hover:bg-blue-500"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover: block rounded-sm p-4 text-center transition-all duration-500 ease-in-out hover:bg-blue-500"
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover: block rounded-sm p-4 text-center transition-all duration-500 ease-in-out hover:bg-blue-500"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="hover: block rounded-sm p-4 text-center transition-all duration-500 ease-in-out hover:bg-blue-500"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
        <footer></footer>
      </div>
    </>
  );
};

export default Layout;
