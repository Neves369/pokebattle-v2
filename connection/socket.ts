import { io } from 'socket.io-client';

export const socket = io('http://192.168.0.111:3000'); //	use the IP address of your machine