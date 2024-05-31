import { Expose } from 'class-transformer';
import { IsMimeType } from 'class-validator';

export class GetImageUploadUrlDTO {
  @IsMimeType()
  @Expose({ name: 'mime_type' })
  mimeType: string;
}
