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
  }
];

export default AppRoutes;
