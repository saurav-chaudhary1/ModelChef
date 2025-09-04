import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './MainPages/Home';
import Navbar from './HomePages/Navbar';
import Signup from './HomePages/SignUp';
import LoginPage from './HomePages/LogIn';
import ChatPage from './MainPages/ChatPage';
import FineTune from './MainPages/FineTune';
import ModelsPage from './MainPages/ModelsPage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path='/fine-tune' element={<FineTune/>}></Route>
            <Route path='/models' element={<ModelsPage/>}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
