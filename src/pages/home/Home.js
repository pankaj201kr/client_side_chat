import "./style.css"
import { useNavigate } from 'react-router-dom';
const Home = ({ username, setUsername, room, setRoom, socket }) => {
    const navigate = useNavigate();
    const joinRoom = () => {
        if (room !== '' && username !== '') {
            socket.emit('join_room', { username, room });
        };
        navigate('/chat', { replace: true });
    };
    return (
        <div className="container">
            <div className="formContainer">
                <h1>{`Chat Room`}</h1>
                <input className="input" placeholder='Username...'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <select className="input"
                    onChange={(e) => setRoom(e.target.value)}
                >
                    <option>-- Select Room --</option>
                    <option value='Room1'>Room1</option>
                    <option value='Room2'>Room2</option>
                    <option value='Room3'>Room3</option>
                    <option value='Room4'>Room4</option>

                </select>
                <button className='btn btn-secondary' style={{ width: '100%' }} onClick={joinRoom} >Join Room</button>
            </div>
        </div >
    );
};

export default Home;