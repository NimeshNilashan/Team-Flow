import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskPriority, TaskStatus } from '../generated/prisma/enums';

@Controller('tasks')
export class TasksController {

    constructor(private readonly taskService: TasksService){}
    
    @Get()
    findAll(){
        return this.taskService.findAll()
    }
    
    // Filter tasks by fields
    @Get('filter')
    findFiltered(
        @Query('status') status?: TaskStatus,
        @Query('priority') priority?: TaskPriority,
        @Query('assigneeId') assigneeId?: string
    ){
        return this.taskService.findFiltered(
            status, 
            priority,
            assigneeId !== undefined ? Number(assigneeId) : undefined
        )
    }

    @Get('latest')
    findLatest(){
        return this.taskService.findLatest()
    }

    @Get('pages')
    findPages(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('status') status?: TaskStatus,
        @Query('priority') priority?: TaskPriority,
        @Query('assigneeId') assigneeId?: string
    ){
        return this.taskService.findPages(
            Number(page),
            Number(limit),
            status, 
            priority,
            assigneeId !== undefined ? Number(assigneeId) : undefined
        )
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto){
        return this.taskService.create(createTaskDto)
    }
}
