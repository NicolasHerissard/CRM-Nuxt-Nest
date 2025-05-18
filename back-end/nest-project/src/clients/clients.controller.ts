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
    async findAll(): Promise<Clients[]> {
        return this.clientsService.findAll();
    }

    @Post('create')
    @HttpCode(201)
    async createClient(@Body() client: Clients): Promise<Clients> {
        return this.clientsService.createClient(client);
    }

    @Get('count')
    @HttpCode(200)
    async countClients(): Promise<number> {
        return this.clientsService.countClients();
    }

    @Get('search')
    @HttpCode(200)
    async findClientByName(@Query('name') name: string, @Query('status') status: string) {
        if (!name) {
            return this.clientsService.findAll();
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
