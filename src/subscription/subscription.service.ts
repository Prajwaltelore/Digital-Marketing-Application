import { Dependencies, Get, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Subscription } from 'src/entities/subscriptions.entity';
import { startOfMonth , endOfMonth } from 'date-fns';

@Injectable()
@Dependencies(getRepositoryToken(Subscription))
export class SubscriptionService {
  constructor(private subscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository;
  }

  async create(details: any) {
    try {
      let data = {
        amount: details.amount,
        order: details.order,
        paymentId: details.paymentId,
        package_name: details.package_name,
        user: details.user,
        status: true,
        start_date: getStartOfMonth(),
        end_date: getEndOfMonth(),
      };

      if (data) {
        const result = await this.subscriptionRepository.save(data);
        if (result) {
          return {
            status: true,
            message: 'Subscription created',
            data: result,
          };
        } else {
          return {
            status: false,
            message: 'Subscription not created',
            data: null,
          };
        }
      } else {
        return {
          status: false,
          message: 'Details not present',
          data: null,
        };
      }
    } catch (err) {
      return {
        status: false,
        message: 'Error creating Subscription',
        data: err,
      };
    }
  }

  async getdetails(user: number) {
    const result = await this.subscriptionRepository.find({
      where: { user: user },
    });
    if (result) {
      console.log('Subscription details found');
      console.log(result);
      return {
        status: true,
        message: 'Subscription details found',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Subscription details not found',
        data: null,
      };
    }
  }

  async get() {
    const result = await this.subscriptionRepository.find();
    if (result) {
      return {
        status: true,
        message: 'Subscription details found',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Subscription details not found',
        data: null,
      };
    }
  }

  // async update(details : any,id:number){
  //     return await this.subscriptionService.update(id,details);
  // }

  async delete(id: number) {
    const result = await this.subscriptionRepository.delete(id);
    if (result) {
      return {
        status: true,
        message: 'Subscription details deleted',
        data: result,
      };
    } else {
      return {
        status: true,
        message: 'Subscription details not deleted',
        data: null,
      };
    }
  }
}
function getStartOfMonth(): Date {
  const currentDate = new Date();
  const startDateOfMonth = startOfMonth(currentDate);
  return startDateOfMonth;
}

function getEndOfMonth(): Date {
  const currentDate = new Date();
  const lastDateOfMonth = endOfMonth(currentDate);
  return lastDateOfMonth;
}
