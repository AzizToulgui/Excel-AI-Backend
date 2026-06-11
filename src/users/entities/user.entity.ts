import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  city: string;

  @Column({ name: 'company_position', nullable: true })
  companyPosition: string;

  @Column({ name: 'on_ermis', default: 'No' })
  onERMIS: string;

  @Column({ name: 'contact_person', nullable: true })
  contactPerson: string;

  @Column('text', { array: true, default: [] })
  previousCourses: string[];

  @Column('text', { array: true, default: [] })
  notifications: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
