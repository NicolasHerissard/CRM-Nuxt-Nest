/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
    constructor(
        private appointmentService: AppointmentsService
    ) {}

    @Post('/create')
    @HttpCode(201)
    async createAppointment(@Body() body: { title: string; start: string; end?: string; clientId: number }) {
        return this.appointmentService.createAppointment(body);
    }

    @Get('/')
    @HttpCode(200)
    async getAppointments() {
        return this.appointmentService.getAppointments();
    }
}