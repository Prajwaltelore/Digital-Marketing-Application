import { Dependencies, Injectable, Ip } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Orders } from 'src/entities/orders.entity';
import { usersOrder } from './dtos/createOrder';
import axios from 'axios';

@Injectable()
@Dependencies(getRepositoryToken(Orders))
export class OrdersService {
  constructor(private orderRepository) {
    this.orderRepository = orderRepository;

    // this.razorpay = new Razorpay({
    //     key_id : process.env.RAZORPAY_KEY_ID,
    //     key_secret : process.env.RAZORPAY_KEY_SECRET
    // });
  }

  async create(packageData: any) {
    try {
      var options = {
        amount: packageData.amount * 100,
        currency: packageData.currency,
        receipt: packageData.receipt,
      };

      let apiUrl = 'https://api.razorpay.com/v1/orders';
      const response = await axios.post(apiUrl, options, {
        auth: {
          username: 'rzp_test_EVvpbORL2mCHbf',
          password: '9DPK0gp2gYJRyOuHtLLnu2DB',
        },
      });
      if (response.status) {
        console.log('Order is created successfully');

        let getwayOrder = {
          order_id: response.data.id,
          amount: parseInt(response.data.amount),
          amount_paid: parseInt(response.data.amount_paid),
          amount_due: parseInt(response.data.amount_due),
          currency: response.data.currency,
          receipt: response.data.receipt,
          offer_id: '',
          status: response.status,
          attempts: parseInt(response.data.attempts),
          first_ip: packageData.first_ip,
          last_ip: packageData.last_ip,
          user: parseInt(packageData.user),
          description: packageData.description,
          package: parseInt(packageData.package),
          deleted: packageData.deleted,
          created: packageData.created,
          updated: packageData.updated,
        };
        console.log(getwayOrder);
        const result = await this.orderRepository.save(getwayOrder);
        if (result) {
          console.log('Order details saved');
          return {
            status: true,
            message: 'Order details saved',
            data: {
              order_id: response.data.id,
              package: packageData.package,
              amount: response.data.amount,
              currency: response.data.currency,
              description: packageData.description,
            },
          };
        } else {
          console.log('Order details not saved');
          return {
            status: false,
            message: 'Order details not saved',
            data: null,
          };
        }
      } else {
        console.log('Order is not created');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findByOrder(order_id: string) {
    const result = await this.orderRepository.findOneBy({ order_id: order_id });
    if (result) {
      return result;
    } else {
      return null;
    }
  }

  async update(details: string, id: any) {
    const Id = await this.orderRepository.findOneBy({ id: id });
    if (!Id) {
      return {
        status: false,
        message: 'Id not present',
        data: null,
      };
    }
    const result = await this.orderRepository.update(details, id);
    if (result) {
      return {
        status: true,
        message: 'Order details updated',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Order details not updated',
        data: null,
      };
    }
  }

  async getdetails() {
    const result = await this.orderRepository.find();
    if (result) {
      return {
        status: true,
        message: 'Order details found',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Order details not found',
        data: null,
      };
    }
  }

  async remove(id: number) {
    const result = await this.orderRepository.delete(id);
    if (result) {
      return {
        status: true,
        message: 'Order details deleted',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Order details not deleted',
        data: null,
      };
    }
  }
}
