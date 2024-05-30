import { Expose } from 'class-transformer';
import { IsMimeType, IsString } from 'class-validator';

export class GetImageUploadUrlDTO {
  @IsString()
  @Expose({ name: 'file_name' })
  fileName: string;

  @IsMimeType()
  @Expose({ name: 'mime_type' })
  mimeType: string;
}
