/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointments } from './appointments.entity';
import { Clients } from 'src/clients/clients.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointments, Clients]),
  ],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
