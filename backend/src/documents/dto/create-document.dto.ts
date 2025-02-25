export class CreateDocumentDto {
  readonly title: string;
  readonly description?: string;
  readonly fileUrl: string;
  readonly uploadedBy: string;
  readonly createdAt?: Date;
}

