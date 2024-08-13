import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { OrdersService } from 'src/orders/orders.service';
import { PaymentService } from 'src/payment/payment.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    private subscriptionService: SubscriptionService,
    private orderService: OrdersService,
  ) {}

  @Post(':id')
  async create(@Body() details: any, @Param('id') id: string) {
    const orderID = await this.orderService.findByOrder(details.order);

    if (!orderID) {
      return {
        status: false,
        message: `Order doesn't exist`,
        data: null,
      };
    }

    //  const paymentId = await this.paymentService.getPayment(details.payment);

    let data = {
      amount: details.amount,
      order: details.order,
      paymentId: details.payment,
      package_name: orderID.description,
      user: parseInt(id),
    };

    return await this.subscriptionService.create(data);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.subscriptionService.getdetails(parseInt(id));
  }

  @Get()
  async getdetails() {
    return await this.subscriptionService.get();
  }

  // @Put(':id')
  // async update(@Body() details: any, @Param('id') id: number){
  //      return await this.subscriptionService.update(details,id);
  // }

  @Delete(':id')
  async remove(@Param() id: number) {
    return await this.subscriptionService.delete(id);
  }
}
