import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class enquiries {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  email: string;

  @Column()
  @IsString()
  subject: string;

  @Column()
  @IsString()
  message: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
