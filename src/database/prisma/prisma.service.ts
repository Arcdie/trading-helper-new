import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.connect();
    this.setGlobals();
  }

  async connect() {
    await this.$connect();
  }

  async disconnect() {
    await this.$disconnect();
  }

  setGlobals() {
    BigInt.prototype['toJSON'] = function () {
      return parseInt(this.toString());
    };
  }
}
