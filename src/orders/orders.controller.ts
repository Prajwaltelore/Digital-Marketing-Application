import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { PackagesService } from 'src/packages/packages.service';
import { UsersService } from 'src/users/users.service';
import { usersOrder } from './dtos/createOrder';
import { AuthService } from 'src/auth/auth.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private packageService: PackagesService,
    private authService: AuthService,
  ) {}

  @Post(':id')
  async create(@Param('id') id: number, @Ip() ip,@Body() user:any) {
    const packageDetails = await this.packageService.findById(id);

    if (!packageDetails) {
      return {
        status: false,
        message: `Package doesn't exist`,
        data: null,
      };
    }

    const userID = await this.authService.findOne(id);
    // const userID:number = await this.authService.findOne(id);

    // let orderData: any = {
    //     package: packageDetails.id,
    //     amount: packageDetails.price,
    //     amount_due: packageDetails.price,
    //     attempts : 1,
    //     currency: 'INR',
    //     orderid: uuidv4(),
    //     first_ip : ip,
    //     last_ip : ip,
    //     user : userID.id,
    //     status : true,
    //     deleted : false
    // }
    let data = {
      amount: packageDetails.price,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      first_ip: ip,
      last_ip: ip,
      package: packageDetails.id,
      user: user.id,
      deleted: false,
      description: packageDetails.package_name,
      created: new Date(),
      updated: new Date(),
    };

    return await this.ordersService.create(data);
  }

  async findByOrder(@Param() orderId: string) {
    return await this.ordersService.findByOrder(orderId);
  }

  @Get()
  async getdetails() {
    return await this.ordersService.getdetails();
  }

  @Put()
  async update(@Body() details: any, @Param() id: number) {
    return await this.ordersService.update(details, id);
  }

  @Delete()
  async remove(@Param() id: number) {
    return await this.ordersService.remove(id);
  }
}
