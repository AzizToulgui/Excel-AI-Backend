import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SpreadsheetRowDto {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  email?: string;

  phone?: string;
  city?: string;
  companyPosition?: string;
  onERMIS?: string;
  contactPerson?: string;

  @IsArray()
  previousCourses: string[] = [];

  @IsArray()
  notifications: string[] = [];
}

export class ImportUsersDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpreadsheetRowDto)
  rows?: SpreadsheetRowDto[];
}
