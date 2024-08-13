import { IsInt, IsString, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Packages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Min(3)
  type: string;

  @Column()
  @IsInt()
  @Min(3)
  price: number;

  @Column()
  @IsString()
  @Min(3)
  package_name: string;

  @Column()
  @IsInt()
  discount: number;

  @Column()
  @IsString()
  categories: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
