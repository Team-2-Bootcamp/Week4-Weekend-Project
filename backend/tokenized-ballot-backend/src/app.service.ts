import { Injectable } from '@nestjs/common';
import * as tokenJson from './assets/MyToken.json';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';

const MINT_VALUE = ethers.parseUnits('10');

@Injectable()
export class AppService {
  
  contract: ethers.Contract;
  provider: ethers.Provider;
  wallet: ethers.Wallet;

  constructor(private configService: ConfigService) {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>('RPC_ENDPOINT_URL'),
    );
    this.wallet = new ethers.Wallet(
      this.configService.get<string>('PRIVATE_KEY'),
      this.provider,
    );
    this.contract = new ethers.Contract(
      this.configService.get<string>('TOKEN_ADDRESS'),
      tokenJson.abi,
      this.wallet,
    );
  }

  async mintTokenForUsers(address: string){
    const contract = this.contract;
    const mintTX = await contract.mint(address, MINT_VALUE);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
