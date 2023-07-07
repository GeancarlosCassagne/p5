import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Clients } from './clients.interface';
import { GasolineService } from '../gasoline/gasoline.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Gasoline } from 'src/gasoline/gasoline.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  private clients: Clients = {};

  constructor(
    @InjectRepository(Gasoline)
    private readonly gasolineRepository: Repository<Gasoline>,
    private readonly gasolineService: GasolineService,
  ) {}

  async registerClient(client: Socket, name: string) {
    console.log('Attempt to login: ', name);
    const gasoline = await this.gasolineService.findOneByName(name);
    if (!gasoline) throw new Error(`Gasoline ${name} not found`);
    if (this.findClientByName(name)) {
      console.error(`Gasoline ${name} already logged in`);
      throw new Error(`Gasoline ${name} already logged in`);
    }

    this.clients[client.id] = { socket: client, user: gasoline };
  }

  removeClient(clientId: string) {
    delete this.clients[clientId];
  }

  getClients() {
    return Object.values(this.clients).map((client) => client.user.name);
  }

  getClientName(clientId: string) {
    return this.clients[clientId].user.name;
  }

  private findClientByName(name: string) {
    return Object.values(this.clients).find(
      (client) => client.user.name === name,
    );
  }
}
