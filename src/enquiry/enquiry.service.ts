import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { enquiries } from 'src/entities/enquiry.entity';
import { userEnquiry } from './createEnquiry';

@Injectable()
@Dependencies(getRepositoryToken(enquiries))
export class EnquiriesService {
  constructor(private enquiryRepository) {
    this.enquiryRepository = enquiryRepository;
  }

  async createEnquiry(enquiryDetails: userEnquiry) {
    const result = await this.enquiryRepository.save(enquiryDetails);
    if (result) {
      return {
        status: true,
        message: 'Enquiry received succesfully',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Enquiry not received',
        data: null,
      };
    }
  }

  async getById(id: any) {
    const result = await this.enquiryRepository.findOneBy({ id: id });
    if (result) {
      return {
        status: true,
        message: 'Enquiry details found',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Enquiry details not found',
        data: null,
      };
    }
  }

  async updateById(packageDetails: userEnquiry, id: number) {
    const result = await this.enquiryRepository.update(id, packageDetails);
    if (result) {
      return {
        status: true,
        message: 'Enquiry details updated',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Enquiry details not updated',
        data: null,
      };
    }
  }

  async delete(id: any) {
    const result = await this.enquiryRepository.delete(id);
    if (result) {
      return {
        status: true,
        message: 'Enquiry details deleted',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Enquiry details not deleted',
        data: null,
      };
    }
  }
}
