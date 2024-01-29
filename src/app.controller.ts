import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('MATH_SERVICE') private client: ClientProxy,
    @Inject('NOTIF_SERVICE') private clientNotif: ClientProxy
    ) {}

  @Get()
  async getHello() {
    let data=  await this.client.send('summation', [1,2,3,4,5,6,7,8,9,10,11]).toPromise();
    let notifResponse=await this.clientNotif.emit('notify', data).toPromise()
    console.log(notifResponse)
    return data
  
  }
}
