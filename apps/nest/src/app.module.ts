import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InvoicesModule } from './invoices/invoices.module';
import { BillsModule } from './bills/bills.module';

@Module({
  imports: [AuthModule, UsersModule, InvoicesModule, BillsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
