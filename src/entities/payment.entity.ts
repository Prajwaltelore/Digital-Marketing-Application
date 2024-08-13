import { IsIP, IsInt, IsString, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  @Min(3)
  amount: number;

  @Column()
  @IsIP()
  first_ip: string;

  @Column()
  @IsIP()
  last_ip: string;

  @Column()
  @IsString()
  @Min(3)
  order: string;

  // @Column()
  // package : string;

  @Column()
  @IsString()
  @Min(3)
  payment: string;

  @Column()
  @IsInt()
  @Min(3)
  payment_time: number;

  // @Column()
  // signature : string;

  @Column()
  status: boolean;

  @Column()
  @IsInt()
  user: number;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @Column({ nullable: false, default: false })
  deleted: boolean;
}
