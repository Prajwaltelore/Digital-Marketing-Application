import { Dependencies, Injectable } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import axios from 'axios';
import * as crypto from 'crypto';
import { Payment } from 'src/entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  // private secretKey:string = process.env.RAZORPAY_KEY_ID;
  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
  ) {}

  async verifySignature(paymentData: any, id: string) {
    //  const pay_id = parseInt(id);
    try {
      let paymentDetails = {
        amount: paymentData.amount,
        currency: paymentData.currency,
      };

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.razorpay.com/v1/payments/' + id,
        headers: {
          Authorization:
            'Basic cnpwX3Rlc3RfRVZ2cGJPUkwybUNIYmY6OURQSzBncDJnWUpSeU91SHRMTG51MkRC',
        },
      };

      const response = await axios.request(config);

      if (response.status) {
        console.log('Payment is created successfully');

        let data = {
          amount: parseInt(response.data.amount),
          first_ip: paymentData.first_ip,
          last_ip: paymentData.last_ip,
          order: response.data.order_id,
          payment: response.data.id,
          payment_time: response.data.created_at,
          status: response.data.status,
          user: parseInt(paymentData.user),
        };

        const result = await this.paymentRepository.save(data);
        console.log(result);
        console.log('Payment details saved');

        if (result) {
          return {
            status: true,
            message: 'Payment details saved',
            data: result,
          };
        } else {
          return {
            status: false,
            message: 'Payment details not saved',
            data: null,
          };
        }
      } else {
        console.log('Payment is not created');
      }
      // if (result) {
      //   return {
      //     status: true,
      //     message: "Payment details saved",
      //     data: {
      //       status: response.data.status,
      //       order: response.data.order_id,
      //       payment_time: response.data.created_at,
      //     },
      //   };
      // }
      // else {
      //   return {
      //     status: false,
      //     message: "Payment details not saved",
      //     data: null
      //   };
      // }
    } catch (error) {
      return {
        status: false,
        message: 'Error creating payment',
        data: error,
      };
    }
  }

  async getPayment(payment: string) {
    const result = await this.paymentRepository.find({
      where: { payment: payment },
    });
    if (result) {
      return {
        status: true,
        message: 'Payment details found',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Payment details not found',
        data: null,
      };
    }
  }

  async update(details: string, id: any) {
    const Id = await this.paymentRepository.findOneBy({ id: id });
    if (!Id) {
      return {
        status: false,
        message: 'Id not present',
        data: null,
      };
    }
    const result = await this.paymentRepository.update(details, id);
    if (result) {
      return {
        status: true,
        message: 'Payment details updated',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Payment details not updated',
        data: null,
      };
    }
  }

  async getdetails() {
    const result = await this.paymentRepository.find();
    if (result) {
      return {
        status: true,
        message: 'Payment details found',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Payment details not found',
        data: null,
      };
    }
  }

  async remove(id: number) {
    const result = await this.paymentRepository.delete(id);
    if (result) {
      return {
        status: true,
        message: 'Payment details deleted',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Payment details not deleted',
        data: null,
      };
    }
  }
}
