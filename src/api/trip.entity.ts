import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  distance: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'date' })
  date: Date;
}
