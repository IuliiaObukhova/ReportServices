import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const databaseData=[
    ['Bill Brown','brown@123.com'],
    ['Alice Smith', 'alice.smith@23.com'],
    ['Emma Johnson', 'emma.johnson@98.com'],
    ['Michael Brown', 'michael.brown@78.com'],
    ['Sophia Davis', 'sophia.davis@11.com'],
    ['William Wilson', 'william.wilson@25.com'],
    ['Olivia Martinez', 'olivia.martinez@36.com'],
    ['James Garcia', 'james.garcia@98.com'],
    ['Isabella Lee', 'isabella.lee@78.com'],
    ['Benjamin Harris', 'benjamin.harris@321.com']
];
async function main() {
  // Create new user
  if(await prisma.user.count()==0){
    for (let usr of databaseData){

        const newUser = await prisma.user.create({
            data: {
              name: usr[0],
              email: usr[1],
            },
          });
          console.log('Created new user:', newUser);
    }
    
  }
  

  // Fetch all users
  const allUsers = await prisma.user.findMany();
  console.log('All users:', allUsers);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


const app = express();
app.use(express.json());

// Endpoint to provide data for report generation
app.get('/data', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  const users = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  res.json(users);
});

const portNumber = 10000;
app.listen(portNumber, () => {
  console.log('Requester running on port '+portNumber);
});
