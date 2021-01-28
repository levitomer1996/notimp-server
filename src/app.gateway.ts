import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';


@WebSocketGateway(4001)
export class AppGateWay implements OnGatewayConnection {
  @WebSocketServer()
  wss;
  private logger = new Logger('Socket io');

  handleConnection(client) {
    this.logger.log('New client connected');
    client.emit('connect', 'Successfully connected to server');
    this.wss.emit('connnection', 'Successfully connected to server');
    this.wss.on('client', data => this.logger.log(data));
  }
  handleDisconnect(client) {
    this.logger.log(client.id + ' is disconnected');
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }
}
