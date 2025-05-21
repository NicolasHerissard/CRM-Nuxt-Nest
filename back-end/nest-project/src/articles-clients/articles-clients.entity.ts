/* eslint-disable prettier/prettier */
import { Articles } from 'src/articles/articles.entity';
import { Clients } from 'src/clients/clients.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArticlesClients {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Clients, (client) => client.clientArticles, { onDelete: 'CASCADE' })
    client: Clients;

  @ManyToOne(() => Articles, (article) => article.articlesClients, { onDelete: 'CASCADE' })
    article: Articles;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}