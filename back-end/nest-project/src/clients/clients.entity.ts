/* eslint-disable prettier/prettier */
import { ArticlesClients } from 'src/articles-clients/articles-clients.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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
}
