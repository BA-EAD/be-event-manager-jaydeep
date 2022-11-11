import { Global, Module } from '@nestjs/common';
// import { AccountModule } from '../api/account/account.module';
// import { AccountService } from '../api/account/account.service';
// import { AccountSchemaModule } from '../api/account/schemas/account-schema.module';
import { PermissionMiddleware } from './permission.middleware';
import { PreauthMiddleware } from './preauth.middleware';

@Global()
@Module({
  // imports: [AccountModule, AccountSchemaModule],
  imports: [],
  // providers: [PreauthMiddleware, PermissionMiddleware, AccountService],
  providers: [PreauthMiddleware, PermissionMiddleware],
  exports: [PreauthMiddleware, PermissionMiddleware],
})
export class AuthModule {}
