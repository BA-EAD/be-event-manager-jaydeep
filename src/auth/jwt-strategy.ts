import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt, } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignorExpiretion:false,
            secretOrKey:'SECRET'
        })
    }
    async validate(payLoad:any){
        return{
            id:payLoad.sub,
            name:payLoad.name,
            role:payLoad.role

        }
    }
}