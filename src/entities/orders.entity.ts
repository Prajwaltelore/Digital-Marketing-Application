import { IsBoolean, IsDate, IsIP, IsInt, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  amount: number;

  @Column()
  @IsInt()
  amount_paid: number;

  @Column()
  @IsInt()
  amount_due: number;

  @Column()
  @IsInt()
  attempts: number;

  @Column()
  @IsString()
  currency: string;

  @Column()
  @IsIP()
  first_ip: string;

  @Column()
  @IsIP()
  last_ip: string;

  @Column({ default: null })
  offer_id: string;

  @Column()
  @IsString()
  order_id: string;

  @Column()
  @IsInt()
  package: number;

  @Column()
  @IsString()
  receipt: string;

  @Column()
  @IsInt()
  user: number;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsInt()
  status: number;

  @Column()
  @IsBoolean()
  deleted: boolean;

  @Column()
  @IsDate()
  created: Date;

  @Column()
  @IsDate()
  updated: Date;
}
