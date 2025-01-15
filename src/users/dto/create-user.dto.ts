import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@mail.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @ApiProperty({ description: 'The role of the user', example: 'user' })
  role: string;
}
