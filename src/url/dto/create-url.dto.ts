import { IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  readonly url: string;
}
