import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class States {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
