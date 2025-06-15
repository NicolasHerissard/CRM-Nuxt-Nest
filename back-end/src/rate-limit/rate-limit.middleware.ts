/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

interface RequestRecord {
  count: number;
  timestamp: number;
}

const REQUEST_LIMIT = 10;
const TIME_WINDOW = 3 * 60 * 1000; // 3 minutes en ms

const userRequests = new Map<string, RequestRecord>();

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = req.user;

    if(!user) return next()

    const userId = user["id"];
    const now = Date.now();
    const record = userRequests.get(userId);

    if(!record || now - record.timestamp > TIME_WINDOW) {
      userRequests.set(userId, { count: 1, timestamp: now });
      return next();
    }

    if(record.count >= REQUEST_LIMIT) {
      throw new UnauthorizedException('Trop de requêtes, vous avez été déconnecté automatiquement.');
    }

    record.count++
    userRequests.set(userId, record);
    next();
  }
}
