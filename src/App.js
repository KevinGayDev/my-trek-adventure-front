import { lazy, Suspense, createContext, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/App.css";

const Home = lazy(() => import("./views/Home"));
const Error = lazy(() => import("./views/Error"));
const ParcoursView = lazy(() => import("./views/ParcoursView"));
const TreksView = lazy(()=> import("./views/TreksView"));
const SingleParcoursView = lazy(() => import("./views/SingleParcoursView"));
const SingleGuideView = lazy(() => import("./views/SingleGuideView"));
const GuidesView = lazy(() => import("./views/GuidesView"));
const ClientsView = lazy(() => import("./views/ClientsView"));

const AdminsView = lazy(() => import("./views/AdminsView"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <Home />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "/parcours/",
    element: (
      <Suspense>
        <ParcoursView />
      </Suspense>
    )
  },
  {
    path: "/parcours-page/:slug",
    element: (
      <Suspense>
        <SingleParcoursView />
      </Suspense>
    )
  },
  {
    path: "/treks",
    element: (
      <Suspense>
        <TreksView />
      </Suspense>
    )
  },
  {
    path: "/guides",
    element: (
      <Suspense>
        <GuidesView />
      </Suspense>
    )
  },
  {
    path: "/guides-page/:slug",
    element: (
      <Suspense>
        <SingleGuideView />
      </Suspense>
    )
  },
  {
    path: "/clients",
    element: (
      <Suspense>
        <ClientsView />
      </Suspense>
    )
  },
  {
    path: "/administrator",
    element: (
      <Suspense>
        <AdminsView />
      </Suspense>
    )
  },
  {
    path: "/treks/",
    element: (
      <Suspense>
        <TreksView />
      </Suspense>
    )
  },
]);

export const UserConnect = createContext();

function App() {

  useEffect(() => {
    getUser();
  }, []);

  const [userLog, setUserLog] = useState([]);

  async function getUser() {
    const token = localStorage.getItem("token");
    console.log("token " + token);
    if (!token)
    {
      setUserLog(null);
    }
    const options = {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
      },
    };
      const result = await fetch(`http://127.0.0.1:3001/login/userinfos`, options);
      let data = await result.json();
      console.log("data");
      console.log(data);
      if (data.message !== "Token invalide") {
        setUserLog(data);
      }
  }

  function disconnect()
  {
    setUserLog(null); 
    localStorage.removeItem("token");
  }

  return (
    <div className="App">
      <UserConnect.Provider value={{ userLog, setUserLog, getUser, disconnect }}>
        <RouterProvider router={router} />
      </UserConnect.Provider>
    </div>
  );
}

export default App;
