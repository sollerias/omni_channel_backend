/**
 * File: rateLimiterMemory.js
 * -----------------
 * Обработка запросов с клиента для предотвращения DDOS-атак.
 */
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  // For production
  // points: 6, // 6 requests
  // For tests:
  points: 10,
  duration: 1, // per 1 second by IP
});

const rateLimiterMemoryMiddleware = (req, res, next) => {
  // console.log('rateLimiter: ', req.ip);
  rateLimiter.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests');
    });
};
module.exports = rateLimiterMemoryMiddleware;
