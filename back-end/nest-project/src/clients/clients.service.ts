/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from './clients.entity';
import { Repository } from 'typeorm';
import { Auth } from 'src/auth/auth.entity';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Clients)
        private clientsRepository: Repository<Clients>,

        @InjectRepository(Auth)
        private authsRepository: Repository<Auth>,
    ) {}
    
    public async findClientsByIdUser(id: number): Promise<Clients[]> {
        return await this.clientsRepository.createQueryBuilder('clients')
            .leftJoin('clients.auths', 'auths')
            .where('auths.id = :id', { id })
            .getMany();
    }

    public async createClient(name: string, email: string, phone: string, company: string, address: string, comments: string, status: string, authsId: number): Promise<Clients> {
        
        const auth = await this.authsRepository.findOne({ where: { id: authsId } });
        
        const newClient = await this.clientsRepository.create({
            name,
            email,
            phone,
            company,
            address,
            comments,
            status,
            auths: auth,
        })

        return await this.clientsRepository.save(newClient);
    }

    public async countClients(id: number): Promise<number> {
        return await this.clientsRepository.count({where: {auths: {id}}});
    }

    public async findClientByName(name: string, status: string): Promise<Clients[]> {
        return await this.clientsRepository.createQueryBuilder('clients')
            .where('clients.name LIKE :name AND clients.status = :status', { name: `%${name}%`, status: status })
            .getMany();
    }

    public async findClientByStatus(status: string): Promise<Clients[]> {
        return await this.clientsRepository.createQueryBuilder('clients')
            .where('clients.status = :status', { status })
            .getMany();
    }
}
