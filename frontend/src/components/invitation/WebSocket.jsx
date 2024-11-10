import { useEffect, useRef } from 'react';

export const useWebSocket = (onMessage) => {
    const socketRef = useRef(null);

    useEffect(() => {
        // Connect to the WebSocket server
        socketRef.current = new WebSocket('ws://localhost:3000');

        socketRef.current.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        socketRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (onMessage) {
                onMessage(message); // Call the callback with the WebSocket message
            }
        };

        socketRef.current.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => {
            socketRef.current.close();
        };
    }, [onMessage]);

    return socketRef.current;
};
