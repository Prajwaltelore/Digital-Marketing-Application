import { IsDate, IsEmail, IsInt, Max, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Min(3)
  firstname: string;

  @Column({ nullable: false })
  @Min(3)
  lastname: string;

  @Column({ unique: true, nullable: false })
  @Min(10)
  @Max(10)
  mobile: string;

  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @IsDate()
  dob: Date;

  @Column({ nullable: false })
  @Min(3)
  @Max(12)
  password: string;

  @Column({ nullable: true })
  country: number;

  @Column({ nullable: true })
  state: number;

  @Column({ nullable: true })
  city: number;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  username: any;
}
