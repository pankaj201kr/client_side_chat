import styles from './style.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomAndUsers = ({ socket, username, room }) => {
    const [roomUsers, setRoomUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        socket.on('chatroom_users', (data) => {
            setRoomUsers(data);
        });

        return () => socket.off('chatroom_users');
    }, [socket]);

    const leaveRoom = () => {
        const __createdtime__ = Date.now();
        socket.emit('leave_room', { username, room, __createdtime__ });
        navigate('/', { replace: true });
    };

    return (
        <div className={styles.roomAndUsersColumn}>
            <h2 className={styles.roomTitle}>{room}</h2>

            <div>
                {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users:</h5>}
                <ul className={styles.usersList}>
                    {roomUsers.length > 0 ? <li>Room Name: <strong>{roomUsers[0].room}</strong></li> : ""}
                    {roomUsers.map((user) => (
                        <div key={user.id}>

                            <li style={{ fontWeight: `${user.username === username ? 'bold' : 'normal'}`, }} >
                                {user.username}
                            </li>

                        </div>

                    )
                    )}
                </ul>
            </div>

            <button className='btn btn-outline' onClick={leaveRoom}>
                Leave
            </button>
        </div>
    );
};

export default RoomAndUsers;