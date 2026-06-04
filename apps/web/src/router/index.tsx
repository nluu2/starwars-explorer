import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout/AppLayout'
import PeoplePage from '../pages/PeoplePage/PeoplePage'
import FilmsPage from '../pages/FilmsPage/FilmsPage'
import PlanetsPage from '../pages/PlanetsPage/PlanetsPage'
import StarshipsPage from '../pages/StarshipsPage/StarshipsPage'
import VehiclesPage from '../pages/VehiclesPage/VehiclesPage'
import SpeciesPage from '../pages/SpeciesPage/SpeciesPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <PeoplePage /> },
      { path: 'films', element: <FilmsPage /> },
      { path: 'starships', element: <StarshipsPage /> },
      { path: 'vehicles', element: <VehiclesPage /> },
      { path: 'species', element: <SpeciesPage /> },
      { path: 'planets', element: <PlanetsPage /> },
    ],
  },
])
