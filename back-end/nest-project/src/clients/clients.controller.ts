/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Clients } from './clients.entity';

@Controller('clients')
export class ClientsController {
    constructor(
        private clientsService: ClientsService
    ) {}

    @Get()
    @HttpCode(200)
    async findAll(@Query('authsId') authsId: number): Promise<Clients[]> {
        return this.clientsService.findClientsByIdUser(authsId);
    }

    @Post('create')
    @HttpCode(201)
    async createClient(@Body() body: {  name: string, email: string, phone: string, company: string, address: string, comments: string, status: string, authsId: number }): Promise<Clients> {
        console.log(body.authsId)
        return this.clientsService.createClient(body.name, body.email, body.phone, body.company, body.address, body.comments, body.status, body.authsId);
    }

    @Get('count')
    @HttpCode(200)
    async countClients(@Query('authsId') authsId: number): Promise<number> {
        return this.clientsService.countClients(authsId);
    }

    @Get('search')
    @HttpCode(200)
    async findClientByName(@Query('name') name: string, @Query('status') status: string, @Query('authsId') authsId: number) {
        if (!name) {
            return this.clientsService.findClientsByIdUser(authsId);
        }

        name = name.replace('%', '');

        return this.clientsService.findClientByName(name, status);
    }

    @Get('status')
    @HttpCode(200)
    async findClientByStatus(@Query('status') status: string) {
        return this.clientsService.findClientByStatus(status);
    }
}
