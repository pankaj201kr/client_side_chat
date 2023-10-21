import styles from './style.module.css';
import MessagesReceived from './Message';
import SendMessage from './Send-message';
import RoomAndUsersColumn from './Room-and-users';
const Chat = ({ socket, username, room }) => {
    return (
        <div className={styles.chatContainer}>
            <RoomAndUsersColumn socket={socket} username={username} room={room} />
            <div>
                <MessagesReceived socket={socket} username={username} />
                <SendMessage socket={socket} username={username} room={room} />
            </div>
        </div>
    );
};

export default Chat;