/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Clients } from 'src/clients/clients.entity';

@Entity()
export class Appointments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp', nullable: true })
  end: Date;

  @ManyToOne(() => Clients, (client) => client.appointments, { onDelete: 'CASCADE' })
  client: Clients;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
