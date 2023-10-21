import styles from './style.module.css';
import { useState, useEffect, useRef } from 'react';

const Messages = ({ socket, username }) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);

    const messagesColumnRef = useRef(null);
    useEffect(() => {
        socket.on('receive_messages', (data) => {
            setMessagesReceived((state) => ([...state, data]));
        });
        return () => socket.off('receive_messages');
    }, [socket]);
    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight;
    }, [messagesRecieved]);

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    console.log(messagesRecieved, "messagesRecieved")
    return (

        <div className={styles.messagesColumn} ref={messagesColumnRef}>
            {messagesRecieved.map((msg, i) => (
                <div className={styles.message} style={{ justifyContent: msg.username === username ? "flex-end" : "flex-start" }} key={i}>
                    <div className={styles.content} style={{ backgroundColor: msg.username === username ? "rgb(0, 24, 111)" : "rgb(0, 101, 129)" }} >
                        <span className={styles.messagetext}>{msg.message}</span>
                        <span className={styles.msgMeta}>
                            {formatDateFromTimestamp(msg.__createdtime__)}
                        </span>
                        <span className={styles.messagetext}>
                            {msg.username}
                        </span>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Messages;