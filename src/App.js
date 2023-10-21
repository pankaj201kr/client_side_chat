
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import io from 'socket.io-client';
import Home from './pages/home/Home';
import Chat from './pages/chat/Chat';


const socket = io.connect('http://13.51.238.123:4000/');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home
            username={username}
            setUsername={setUsername}
            room={room}
            setRoom={setRoom}
            socket={socket}
          />} />
          <Route
            path='/chat'
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
