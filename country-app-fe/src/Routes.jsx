import { Route, Routes } from 'react-router';
import Country from './pages/Country';
import Home from './pages/Home/index';

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Country/>} />
    </Routes>
  );
}
