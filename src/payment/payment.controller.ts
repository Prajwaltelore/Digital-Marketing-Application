import {
  Body,
  Controller,
  Delete,
  Dependencies,
  Get,
  Ip,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { OrdersService } from 'src/orders/orders.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private orderService: OrdersService,
  ) {}

  @Post(':payment_id')
  async saveDetails(
    @Body() details: any,
    @Param('payment_id') payment_id: string,
    @Ip() ip,
  ) {
    const orderID = await this.orderService.findByOrder(details.order_id);

    if (!orderID) {
      return {
        status: false,
        message: `Order doesn't exist`,
        data: null,
      };
    }

    let data = {
      amount: orderID.amount,
      currency: orderID.currency,
      first_ip: ip,
      last_ip: ip,
      user: details.user.id,
    };

    return await this.paymentService.verifySignature(data, payment_id);
  }

  // @Get(':user')
  // async getDetails(@Param('user') id:number){
  //     return await this.paymentService.getPayment(id);
  // }

  @Get()
  async getdetails() {
    return await this.paymentService.getdetails();
  }

  @Put()
  async update(@Body() details: any, @Param() id: number) {
    return await this.paymentService.update(details, id);
  }

  @Delete()
  async remove(@Param() id: number) {
    return await this.paymentService.remove(id);
  }
}
