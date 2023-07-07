import { Socket } from 'socket.io';
import { Gasoline } from '../gasoline/gasoline.entity';

export interface Clients {
  [id: string]: {
    socket: Socket;
    user: Gasoline;
  };
}
