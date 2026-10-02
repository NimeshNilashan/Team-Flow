import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    // GET /users
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    //Find by ID
    @Get('id/:id')
    findById(@Param('id') id: string){
        return this.usersService.findById(Number(id))
    }

    //Find users by Name
    @Get('name/:name')
    findByName(@Param('name') name: string){
        return this.usersService.findByName(name)
    }
    
    //find users by email
    @Get('email/:email')
    findByEmail(@Param('email') email: string){
        return this.usersService.findByEmail(email)
    }

    //Filter users using name and email
    @Get('filter')
    findFiltered(
        @Query('name') name: string,
        @Query('email') email: string
    ){
        return this.usersService.findFiltered(name, email)
    }

    // Create users
    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto);
    }
}
