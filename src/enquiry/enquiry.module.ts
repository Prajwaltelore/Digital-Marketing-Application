import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { enquiries } from 'src/entities/enquiry.entity';
import { EnquiriesService } from './enquiry.service';
import { EnquiriesController } from './enquiry.controller';

@Module({
  imports: [TypeOrmModule.forFeature([enquiries])],
  controllers: [EnquiriesController],
  providers: [EnquiriesService],
})
export class EnquiryModule {}
