import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import Layout from './Layout';
import NotFound from './routes/404';
import Home from './routes/Home';
import Snake from './components/game/snake/Snake';
import Apple from './components/game/apple/Apple';
import Hole_board from './components/game/Hole-board/Hole_board';

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
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
