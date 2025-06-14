/* eslint-disable prettier/prettier */
import { Clients } from 'src/clients/clients.entity';
import { Devis } from 'src/devis/devis.entity';
import { HistoriqueConnexion } from 'src/historique-connexion/historique-connexion.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column({default: 0})
    role: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => Clients, (clients) => clients.auths)
    client: Clients[];

    @OneToMany(() => HistoriqueConnexion, (historiqueConnexion) => historiqueConnexion.auth)
    historiqueConnexions: HistoriqueConnexion[];

    @OneToOne(() => Devis, (devis) => devis.auth)
    devis: Devis;
}