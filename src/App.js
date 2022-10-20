import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './component/Navigation';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Movies" element={<Movies/>} />
        <Route path="/Movies/:movie_id" element={<MovieDetail/>} />
      </Routes>
     
    </div>
  );
}

export default App;
