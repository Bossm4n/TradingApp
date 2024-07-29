import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './webpages/Login';
import TradingPage from './webpages/TradingPage';
import Home from './webpages/Home';
import Signup from './webpages/Signup'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/trading" element={<TradingPage/>}/>
      </Routes>
    </div>
  );
}

export default App;