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

  async mintTokenForUsers(address: string) {
    try {
      console.log("inside mintokenforusersapi");
      const contract = this.contract;
      console.log("yes inside mintokenforusers");
      console.log(address);
      console.log(this.contract.MINTER_ROLE());
      console.log(this.wallet)
      // Check if the caller has the MINTER_ROLE
      const hasMinterRole = await contract.hasRole(contract.MINTER_ROLE(), this.wallet.address);
      if (!hasMinterRole) {
        throw new Error("You don't have the MINTER_ROLE.");
      }
      console.log("has minter role");
      
      // Mint tokens
      const mintTX = await contract.mint(address, MINT_VALUE);

      // Wait for the transaction to be mined
      await mintTX.wait();
      console.log(
        `Minted ${MINT_VALUE.toString()} decimal units to account ${
          address ?? ""
        }\n`
      );
      const balanceBN = await contract.balanceOf(
        address ?? ""
      );
      console.log(
        `Account ${
          address ?? ""
        } has ${balanceBN.toString()} decimal units of MyToken\n`
      );

      return true;
    } catch (error) {
      console.error('Error minting tokens:', error.message);
      throw error;
    }
  }
  async getVotes(address: string){
    const contract = this.contract;
    const votesAfter = await contract.getVotes(address);
    console.log(
      `Account ${address} has ${votesAfter.toString()} units of voting power after delegating\n`
    );
    return ethers.formatUnits(votesAfter);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
