import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EnquiriesService } from './enquiry.service';
import { userEnquiry } from './createEnquiry';

@Controller('enquiries')
export class EnquiriesController {
  constructor(private enquiryService: EnquiriesService) {}

  @Post('enquiry')
  async createEnquires(@Body() enquiry: userEnquiry) {
    return await this.enquiryService.createEnquiry(enquiry);
  }

  @Get('enquiry/:id')
  async getById(@Param() id: any) {
    return await this.enquiryService.getById(id);
  }

  @Put('enquiry/:id')
  async updateById(@Body() packages: userEnquiry, id: any) {
    return await this.enquiryService.updateById(packages, id);
  }

  @Delete('enquiry/:id')
  async delete(@Param() id: any) {
    return await this.enquiryService.delete(id);
  }
}
