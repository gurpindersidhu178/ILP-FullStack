import { Module } from '@nestjs/common';
import { TrackingModule } from './tracking/tracking.module';
import { DocumentsModule } from './documents/documents.module';
import { NotificationsModule } from 
'./notifications/notifications.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ComplianceModule } from './compliance/compliance.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { SearchModule } from './search/search.module';
import { VendorModule } from './vendor/vendor.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TrackingModule,
    DocumentsModule,
    NotificationsModule,
    AnalyticsModule,
    ComplianceModule,
    MarketplaceModule,
    SearchModule,
    VendorModule,
    OrdersModule
  ],
})
export class AppModule {}

