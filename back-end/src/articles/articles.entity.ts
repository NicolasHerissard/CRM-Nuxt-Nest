/* eslint-disable prettier/prettier */
import { ArticlesClients } from 'src/articles-clients/articles-clients.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Articles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'double' })
    priceHT: number;

    @Column({ type: 'double' })
    tva: number;

    @Column({ type: 'double' })
    priceTTC: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ 
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP', 
        onUpdate: 'CURRENT_TIMESTAMP' 
    })
    updated_at: Date;

    @OneToMany(() => ArticlesClients, (articlesClients) => articlesClients.article)
    articlesClients: ArticlesClients[];
}