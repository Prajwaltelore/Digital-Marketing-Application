import { Module } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { RazorpayController } from './razorpay.controller';
import { PackagesModule } from 'src/packages/packages.module';

@Module({
  imports: [PackagesModule],
  providers: [RazorpayService],
  controllers: [RazorpayController],
})
export class RazorpayModule {}
