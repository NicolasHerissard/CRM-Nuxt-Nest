/* eslint-disable prettier/prettier */

import { Devis } from "src/devis/devis.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DevisItems {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Devis, (devis) => devis.items)
    devis: Devis;

    @Column()
    description: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })    
    updated_at: Date;
}