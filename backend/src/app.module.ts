import { Module } from '@nestjs/common';
import { TrackingModule } from './tracking/tracking.module';
import { DocumentsModule } from './documents/documents.module';
import { NotificationsModule } from 
'./notifications/notifications.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ComplianceModule } from './compliance/compliance.module';

@Module({
  imports: [
    TrackingModule,
    DocumentsModule,
    NotificationsModule,
    AnalyticsModule,
    ComplianceModule
  ],
})
export class AppModule {}

