const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Programming & Development" },
        { name: "Business & Entrepreneurship" },
        { name: "Creative Arts & Design" },
        { name: "Language Learning" },
        { name: "Personal Development" },
        { name: "Health & Wellness" },
        { name: "STEM (Science, Technology, Engineering, Mathematics)" },
        { name: "Humanities & Social Sciences" },
        { name: "Test Preparation" },
        { name: "Career-Specific Skills" },
      ],
    });

    console.log("Success!");
  } catch (err) {
    throw err;
  } finally {
    await database.$disconnect();
  }
}

main();
