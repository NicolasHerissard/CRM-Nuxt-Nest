/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from './clients.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Clients)
        private clientsRepository: Repository<Clients>,
    ) {}

    public async findAll(): Promise<Clients[]> {
        return await this.clientsRepository.find();
    }

    public async createClient(client: Clients): Promise<Clients> {
        return await this.clientsRepository.save(client);
    }

    public async countClients(): Promise<number> {
        return await this.clientsRepository.count();
    }

    public async findClientByName(name: string): Promise<Clients[]> {
        return await this.clientsRepository.createQueryBuilder('clients')
            .where('clients.name LIKE :name', { name: `%${name}%` })
            .getMany();
    }

    public async findClientByStatus(status: string): Promise<Clients[]> {
        return await this.clientsRepository.createQueryBuilder('clients')
            .where('clients.status = :status', { status })
            .getMany();
    }
}
