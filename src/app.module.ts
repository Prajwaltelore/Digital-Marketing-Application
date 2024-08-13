import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './entities/user.entity';
import { Packages } from './entities/packages.entity';
import { enquiries } from './entities/enquiry.entity';
import { Countries } from './entities/countries.entity';
import { States } from './entities/states.entity';
import { Cities } from './entities/cities.entity';
import { AuthModule } from './auth/auth.module';
import { EnquiryModule } from './enquiry/enquiry.module';
import { PackagesModule } from './packages/packages.module';
import { CitiesModule } from './cities/cities.module';
import { CountriesModule } from './countries/countries.module';
import { StatesModule } from './states/states.module';
import { OrdersModule } from './orders/orders.module';
import { Orders } from './entities/orders.entity';
import { Payment } from './entities/payment.entity';
import { RazorpayModule } from './razorpay/razorpay.module';
import { PaymentModule } from './payment/payment.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { Subscription } from './entities/subscriptions.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'agency1',
      entities: [
        User,
        enquiries,
        Packages,
        Orders,
        Payment,
        Subscription,
        Countries,
        States,
        Cities,
      ],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    EnquiryModule,
    PackagesModule,
    OrdersModule,
    CitiesModule,
    CountriesModule,
    StatesModule,
    RazorpayModule,
    PaymentModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
