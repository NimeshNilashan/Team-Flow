import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    //find all users
    async findAll(){
        return this.prisma.user.findMany()
    }

    //Find users by ID
    async findById(id: number){
        return this.prisma.user.findUnique({
            where: {
                id,
            }
        })
    }

    //find users by email
    async findByEmail(email: string){
        return this.prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    //find users by Name
    async findByName(name: string){
        return this.prisma.user.findMany({
            where: {
                name
            }
        })
    }

    //filter users by name AND email
    async findFiltered(name:string, email: string){
        return this.prisma.user.findMany({
            where: {
                // AND: [
                //     {name},
                //     {email}
                // ]
                name,
                email
            }
        })
    }

    //create users
    async create(createUserDto: CreateUserDto){
        return this.prisma.user.create({
            data: createUserDto
        })
    }
}
