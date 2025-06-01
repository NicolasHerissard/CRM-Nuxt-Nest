/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Appointments } from './appointments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from 'src/clients/clients.entity';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(Appointments)
        private appointmentRepository: Repository<Appointments>,

        @InjectRepository(Clients)
        private clientRepository: Repository<Clients>,
    ) {}

    async createAppointment(data: { title: string; start: string; end?: string; clientId: number }): Promise<Appointments> {
        const client = await this.clientRepository.findOneBy({ id: data.clientId });
        if (!client) {
            throw new NotFoundException(`Client avec l'ID ${data.clientId} non trouvé.`);
        }

        const appointment = this.appointmentRepository.create({
            title: data.title,
            start: new Date(data.start),
            end: data.end ? new Date(data.end) : null,
            client: client,
        });

        return await this.appointmentRepository.save(appointment);
    }

    async getAppointments(): Promise<Appointments[]> {
        return await this.appointmentRepository.find({ relations: ['client'] });
    }
}
