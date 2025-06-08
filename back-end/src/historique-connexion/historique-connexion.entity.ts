/* eslint-disable prettier/prettier */
import { Auth } from 'src/auth/auth.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class HistoriqueConnexion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Auth , (auth) => auth.historiqueConnexions)
    auth: Auth;

    @Column()
    date: Date;

    @Column()
    ip_address: string;

    @Column()
    userAgent: string;

    @Column()
    device: string;

    @Column()
    os: string;

    @Column()
    browser: string;
}