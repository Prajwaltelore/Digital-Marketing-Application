import { Controller, Get, Post } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { PackagesService } from 'src/packages/packages.service';

@Controller('razorpay')
export class RazorpayController {
  constructor(
    private razorpayService: RazorpayService,
    private packageService: PackagesService,
  ) {}

  @Post()
  async getOrder(id: number) {
    const packageInfo = await this.packageService.findById(id);

    const orderDetails = {
      amount: packageInfo.price,
      currency: 'INR',
    };

    const order = await this.razorpayService.createOrder(
      orderDetails.amount,
      orderDetails.currency,
    );
    console.log(order);
    return { order };
  }
}
