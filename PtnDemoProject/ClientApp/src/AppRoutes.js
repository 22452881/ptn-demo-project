import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import MainEntryPage from "./components/MainEntryPage";
import Configuration from "./components/Configuration"


const AppRoutes = [
  {
    index: true,
    element: <MainEntryPage />
  },
  {
    path: '/config',
    element: <Configuration />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  }
];

export default AppRoutes;
