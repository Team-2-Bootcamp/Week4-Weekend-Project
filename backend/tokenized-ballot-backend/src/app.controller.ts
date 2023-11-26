import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MintTokenDto } from './dtos/mintToken.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('mint')
  async mintTokens(@Body() body: MintTokenDto) {
    return {result: await this.appService.mintTokenForUsers(body.address)};
  }
  @Post('getVotes')
  async getVotes(@Body() body: MintTokenDto){
    return {result: await this.appService.getVotes(body.address)}
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
}
