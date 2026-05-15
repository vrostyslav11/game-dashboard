import { PrismaClient, Role, ScoreStrategy } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { GAME_SETTINGS_ID } from '../src/game/game-settings.constants';

const prisma = new PrismaClient();

const BCRYPT_ROUNDS = 10;

const ADMIN = {
  email: 'admin@example.com',
  username: 'admin',
  password: 'Admin123!',
};

const PLAYER = {
  email: 'player@example.com',
  username: 'player',
  password: 'Player123!',
};

async function main(): Promise<void> {
  const [adminPasswordHash, playerPasswordHash] = await Promise.all([
    bcrypt.hash(ADMIN.password, BCRYPT_ROUNDS),
    bcrypt.hash(PLAYER.password, BCRYPT_ROUNDS),
  ]);

  await prisma.user.upsert({
    where: { email: ADMIN.email },
    update: {},
    create: {
      email: ADMIN.email,
      username: ADMIN.username,
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: PLAYER.email },
    update: {},
    create: {
      email: PLAYER.email,
      username: PLAYER.username,
      passwordHash: playerPasswordHash,
      role: Role.USER,
    },
  });

  await prisma.gameSettings.upsert({
    where: { id: GAME_SETTINGS_ID },
    update: {},
    create: {
      id: GAME_SETTINGS_ID,
      durationSeconds: 10,
      activeStrategy: ScoreStrategy.LATEST,
      maxClicksPerSecond: 15,
      isGameEnabled: true,
    },
  });

  console.log('Seed complete.');
  console.log(`  Admin  -> ${ADMIN.email} / ${ADMIN.password}`);
  console.log(`  Player -> ${PLAYER.email} / ${PLAYER.password}`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
