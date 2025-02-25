export interface Document {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  uploadedBy: string;
  createdAt: Date;
}

