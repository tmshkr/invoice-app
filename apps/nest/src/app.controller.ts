import {
  Controller,
  Get,
  HttpCode,
  Request,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { InvoicesService } from './invoices/invoices.service';
import { BillsService } from './bills/bills.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private billsService: BillsService,
    private invoicesService: InvoicesService,
  ) {}

  @Post('auth/register')
  @HttpCode(201)
  async register(@Request() req) {
    const { email, password, name } = req.body;
    return this.authService.register({ email, password, name });
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('bills/:id')
  async getBillById(@Request() req, @Param() params: any) {
    return this.billsService.findOne(req.user.id, params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('bills')
  async getBills(@Request() req) {
    return this.billsService.findMany(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('bills')
  @HttpCode(201)
  async createBills(@Request() req) {
    return this.billsService.create(req.user.id, req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('invoices/:id')
  async getInvoiceById(@Request() req, @Param() params: any) {
    return this.invoicesService.findOne(req.user.id, params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('invoices')
  async getInvoices(@Request() req) {
    return this.invoicesService.findMany(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('invoices')
  @HttpCode(201)
  async createInvoices(@Request() req) {
    return this.invoicesService.create(req.user.id, req.body);
  }
}
