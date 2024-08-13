import { IsBoolean, IsInt, IsString, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  @Min(3)
  amount: number;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: false })
  @IsBoolean()
  deleted: boolean;

  @Column()
  @IsString()
  start_date: string;

  @Column()
  @IsString()
  end_date: string;

  @Column()
  @IsString()
  @Min(3)
  order: string;

  @Column()
  @IsString()
  @Min(3)
  paymentId: string;

  @Column()
  @IsString()
  @Min(3)
  package_name: string;

  @Column({ default: false })
  @IsBoolean()
  premium: boolean;

  @Column()
  @IsInt()
  user: number;

  @Column()
  status: string;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
