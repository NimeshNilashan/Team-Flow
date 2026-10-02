import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { TaskStatus, TaskPriority } from "../../generated/prisma/enums"

export class CreateTaskDto {
    @IsString()
    title: string
    @IsEnum(TaskStatus)
    status: TaskStatus
    @IsEnum(TaskPriority)
    priority: TaskPriority
    @IsString()
    description: string
    @IsNumber()
    @IsOptional()
    assigneeId? : number
}
