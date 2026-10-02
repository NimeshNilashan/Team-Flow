import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskPriority, TaskStatus } from '../generated/prisma/enums';

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService){}

    async create(createTasksDto: CreateTaskDto){
        return this.prisma.task.create({
            data: createTasksDto,
        })
    }
    // Get all the tasks with all fields
    // async findAll() {
    //     return this.prisma.task.findMany({
    //         include: {
    //         assignee: true,
    //         },
    //     });
    // }

    // select only specific fields
    async findAll(){
        return this.prisma.task.findMany({
            select: {
                id: true,
                title: true,
                status: true,
                priority: true,
                assignee: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
    } 

    // Filter tasks results
    async findFiltered(
        status?: TaskStatus,
        priority?: TaskPriority,
        assigneeId?: number
    ){
        return this.prisma.task.findMany({
            where: {
                ...(status !== undefined ? {status} : {}),
                ...(priority !== undefined ? {priority} : {}),
                ...(assigneeId !== undefined ? {assigneeId} : {}),
            }
        })
    }

    //find newest
    async findLatest(){
        return this.prisma.task.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    

    //Pagination
    async findPages(
        page: number,
        limit: number,
        status?: TaskStatus,
        priority?: TaskPriority,
        assigneeId?: number,
        
    ){
        // Getting total tasks count
        //const total = await this.prisma.task.count();
        const [total, tasks] = await Promise.all([
            this.prisma.task.count({
                where: {
                    ...(status !== undefined ? {status} : {}),
                    ...(priority !== undefined ? {priority} : {}),
                    ...(assigneeId !== undefined ? {assigneeId} : {}),
                }
            }), // Total Tasks Count
            this.prisma.task.findMany({
                where: {
                ...(status !== undefined ? {status} : {}),
                ...(priority !== undefined ? {priority} : {}),
                ...(assigneeId !== undefined ? {assigneeId} : {}),
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip: (page - 1) * limit, // skip these tasks
                take: limit, // return the next tasks (task count = limit)
                
            })
        ])

        return {
            data: tasks,
            total: total,
            page: page,
            limit: limit,
            totalPages: Math.ceil(total/limit) // rounds a decimal number up to the next largest whole integer. 
        }
    }
}
