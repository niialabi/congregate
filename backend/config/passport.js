import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import 'dotenv/config';

// In-memory user stub. Replace with a database query (e.g., Members.findByPk).
const users = [
  { id: 1, username: 'admin', password: 'password', role: 'admin' },
  { id: 2, username: 'worker', password: 'password', role: 'worker' },
];

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // Find the user specified in token
      const user = users.find(u => u.id === jwt_payload.userId);

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
  );
};
