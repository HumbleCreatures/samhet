import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("localhost:3335", {extraHeaders: {
  userId: '112',
  connectionType: 'notification',
}});

export const SocketTest = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState<string|null>(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', (data) => {
      console.log(data);
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping', {data: 'from the client'});
  }
  return <div>
    <p>Connected: { '' + isConnected }</p>
    <p>Last pong: { lastPong || '-' }</p>
    <button onClick={ sendPing }>Send ping</button>
  </div>
};
