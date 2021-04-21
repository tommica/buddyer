const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const userData = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    friendedBy: {
      create: [
        {
        name: 'Alice2',
        email: 'alice2@prisma.io',
        }
      ]
    },
    friendedTo: {
      create: [
        {
        name: 'Alice3',
        email: 'alice3@prisma.io',
        }
      ]
    }
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    position: 'CEO'
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
