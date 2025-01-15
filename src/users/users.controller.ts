import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { UserAuthGuard } from 'src/shared/guards/user.auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users') // Tag this controller for Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('/info/me')
  @UseGuards(UserAuthGuard)
  findMe(@Req() req: any) {
    const userId = req.user?.sub; // Extract user ID from req.user
    if (!userId) {
      console.error('No Id Found');
    }

    return this.usersService.findOne(userId); // Call the service with the extracted ID
  }

  @Patch('role/:id')
  @UseGuards(AdminGuard) // Restrict to admin users
  async changeRole(@Param('id') id: string, @Body('role') role: string) {
    if (!['user', 'manager', 'admin'].includes(role)) {
      throw new BadRequestException('Invalid role');
    }
    return this.usersService.changeRole(+id, role);
  }
}
