import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector:Reflector,
      private jwtService:JwtService
      ){}
  canActivate(
    context: ExecutionContext
  ): boolean {
    
    const roles=this.reflector.get<any[]>('roles',context.getHandler())
    var permissions=null; // create ,delete,update,list
    roles.forEach(ele=>{
      if(typeof(ele)==='object'){
        permissions=ele
      }
    })
    var isPermitted:boolean=false;
    if(permissions.create || permissions.delete || permissions.update || permissions.list ){
      isPermitted=true
    }
    const userData=context.switchToHttp().getRequest()
   var tknString:string=userData.rawHeaders[1]                            /// get token from request
    let udata:any=this.jwtService.decode(tknString.substr(7,20000))       //// get token value
         
      var rols=roles.includes(udata.role)
      if(udata.role && rols && isPermitted){
      return true
    }else {
       return false
      
    }
  }
}
