/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Auth } from 'src/auth/auth.entity'
import { Repository } from 'typeorm'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          if(req && req.cookies) {
            return req.cookies['auth_token'];
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: "uytrdfgh98765hbnk",
    })
  }

  async validate(payload: { username: string, id: number }) {
      const user = await this.authRepository.findOne({ where: { username: payload.username } })
      if(!user) {
          throw new UnauthorizedException();
      }

      return user;
  }
}
