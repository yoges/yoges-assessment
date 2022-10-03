import { Outlet, ReactLocation, Router } from "react-location";
import { ReactLocationSimpleCache } from "react-location-simple-cache";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Loader from "./Loader";
import { getData } from "../services/services";

const routeCache = new ReactLocationSimpleCache();
const location = new ReactLocation();

function App() {
  return (  
    // eslint-disable-next-line no-unreachable
    <Router
      location={location}
      routes={[
        { 
          path: "/", 
          element: <Home />,
          loader: routeCache.createLoader(
            async () => {
              let { data } = await getData();
              return {
                posts: data.posts,
              };
            },
            {
              maxAge: 1000 * 10, // 10 seconds
            }
          ),
          pendingElement: async () => <Loader />,
          pendingMs: 500
        },
        {
          path: "detail",
          element: <Detail />,
          loader: routeCache.createLoader(
            async () => {
              let { data } = await getData();
              return {
                countries: data,
              };
            },
            {
              maxAge: 1000 * 10, // 10 seconds
            }
          ),
          pendingElement: async () => <Loader />,
          pendingMs: 500, // 2 seconds
        },
      ]}
    >
        <Outlet /> {/* Start rendering router matches */}
    </Router>
  )
}

export default App;
