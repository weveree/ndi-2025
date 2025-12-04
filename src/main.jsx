import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import Layout from './Layout';
import NotFound from './routes/404';
import Home from './routes/Home';
import Snake from './components/game/Snake';
import Apple from './components/game/Apple';
import Hole_board from './components/game/Hole_board';
import TrainLevel from './components/game/TrainLevel';
import DuckTrainLevel from './components/game/DuckTrainLevel';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/snake" element={<Snake />} />
          <Route path="/apple" element={<Apple />} />
          <Route path="/hole_board" element={<Hole_board />} />
          <Route path="/train_level" element={<TrainLevel />} />
          <Route path="/duck_train_level" element={<DuckTrainLevel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
