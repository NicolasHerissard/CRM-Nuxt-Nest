/* eslint-disable prettier/prettier */
import { Appointments } from 'src/appointments/appointments.entity';
import { ArticlesClients } from 'src/articles-clients/articles-clients.entity';
import { Auth } from 'src/auth/auth.entity';
import { Devis } from 'src/devis/devis.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  company: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text', nullable: true, name: 'client_comments' })
  comments: string;

  @Column({ 
    type: 'enum', 
    enum: ['Nouveau', 'En cours', 'Perdu', 'Gagné'], 
    default: 'Nouveau' 
  })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP', 
    onUpdate: 'CURRENT_TIMESTAMP' 
  })
  updated_at: Date;

  @OneToMany(() => ArticlesClients, (articlesClients) => articlesClients.client)
  clientArticles: ArticlesClients[];

  @OneToMany(() => Appointments, (appointment) => appointment.client)
  appointments: Appointments[];

  @ManyToOne(() => Auth, (auth) => auth.client)
  auths: Auth;

  @OneToOne(() => Devis, (devis) => devis.client)
  devis: Devis;
}
