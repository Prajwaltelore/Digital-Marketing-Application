import { Injectable } from '@nestjs/common';
import Razorpay from 'razorpay';

@Injectable()
export class RazorpayService {
  // private razorpay:Razorpay;

  constructor() {
    // this.razorpay = new Razorpay({
    //     key_id : process.env.RAZORPAY_KEY_ID,
    //     key_secret : process.env.RAZORPAY_KEY_SECRET
    // })
  }

  async createOrder(amount: number, currency: string) {
    let razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: `order_${Date.now()}`,
    };
    return await razorpay.orders.create(options);
  }
}
