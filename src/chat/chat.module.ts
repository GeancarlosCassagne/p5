import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { GasolineModule } from '../gasoline/gasoline.module';
import { GasolineController } from 'src/gasoline/gasoline.controller';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [GasolineModule],
})
export class ChatModule {}
