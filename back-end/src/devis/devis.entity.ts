/* eslint-disable prettier/prettier */

import { Auth } from "src/auth/auth.entity";
import { Clients } from "src/clients/clients.entity";
import { DevisItems } from "src/devis-items/devis-items.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Devis {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Clients, (clients) => clients.devis)
    client: Clients;

    @OneToOne(() => Auth, (auth) => auth.devis)
    auth: Auth;

    @Column()
    status: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => DevisItems, (devisItems) => devisItems.devis)
    items: DevisItems[];
}