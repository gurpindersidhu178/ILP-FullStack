import { Injectable } from '@nestjs/common';
import { Document } from './interfaces/document.interface';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  private readonly documents: Document[] = [];

  create(createDocumentDto: CreateDocumentDto): Document {
    const newDocument: Document = {
      id: (this.documents.length + 1).toString(),
      title: createDocumentDto.title,
      description: createDocumentDto.description,
      fileUrl: createDocumentDto.fileUrl,
      uploadedBy: createDocumentDto.uploadedBy,
      createdAt: new Date(),
    };
    this.documents.push(newDocument);
    return newDocument;
  }

  findAll(): Document[] {
    return this.documents;
  }

  findOne(id: string): Document | undefined {
    return this.documents.find(doc => doc.id === id);
  }

  update(id: string, updateDocumentDto: UpdateDocumentDto): Document | 
undefined {
    const document = this.findOne(id);
    if (document) {
      Object.assign(document, updateDocumentDto);
    }
    return document;
  }

  remove(id: string): boolean {
    const index = this.documents.findIndex(doc => doc.id === id);
    if (index !== -1) {
      this.documents.splice(index, 1);
      return true;
    }
    return false;
  }
}

