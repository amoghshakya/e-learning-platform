const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

// async function main() {
//   try {
//     await database.category.createMany({
//       data: [
//         { name: "Programming & Development" },
//         { name: "Business & Entrepreneurship" },
//         { name: "Creative Arts & Design" },
//         { name: "Language Learning" },
//         { name: "Personal Development" },
//         { name: "Health & Wellness" },
//         { name: "STEM (Science, Technology, Engineering, Mathematics)" },
//         { name: "Humanities & Social Sciences" },
//         { name: "Test Preparation" },
//         { name: "Career-Specific Skills" },
//         { name: "Lifestyle" },
//         { name: "Arts & Entertainment" },
//         { name: "Life Skills" },
//         { name: "Data & Analytics" },
//         { name: "Marketing & Sales" },
//       ],
//     });

//     console.log("Success!");
//   } catch (err) {
//     throw err;
//   } finally {
//     await database.$disconnect();
//   }
// }

async function main() {
  try {
    const user = await database.user.findUnique({
      where: {
        username: "shikshayatri",
        email: "shiksha@yatri.com",
        name: "ShikshaYatri",
        isInstructor: true,
      },
    });

    const coursesData = [
      {
        title: "The Fundamentals of Programming",
        lessons: [
          "Introduction to Programming",
          "Variables and Data Types",
          "Control Flow Statements",
          "Functions",
          "Object-Oriented Programming",
        ],
        category: "cltygxjb60000nthez23moeou", // Programming & Development
        thumbnail:
          "https://utfs.io/f/8a0a028e-4eb8-4ea8-9e63-62afb7aaf652-xi82t0.png",
        description:
          "Master the building blocks of programming in this comprehensive course. Learn essential concepts and create your own programs!",
      },
      {
        title: "Data Analysis with Python",
        lessons: [
          "Introduction to Python",
          "Data Manipulation with Pandas",
          "Data Visualization with Matplotlib",
          "Exploratory Data Analysis",
          "Machine Learning Fundamentals",
        ],
        category: "clu5hao040003mc4p7knkv3sc", // Data & Analytics
        thumbnail:
          "https://utfs.io/f/8a0a028e-4eb8-4ea8-9e63-62afb7aaf652-xi82t0.png",
        description:
          "Unlock the power of data analysis with Python. Learn to manipulate, visualize, and extract insights from your data.",
      },

      {
        title: "The Art of Photography",
        lessons: [
          "Camera Settings and Exposure",
          "Composition and Lighting Techniques",
          "Editing and Post-Processing",
          "Portrait Photography",
          "Landscape Photography",
        ],
        category: "clu5hao040001mc4pchemlnxj", // Arts & Entertainment
        thumbnail:
          "https://utfs.io/f/8a0a028e-4eb8-4ea8-9e63-62afb7aaf652-xi82t0.png",
        description:
          "Capture stunning photos and unleash your creativity. Learn essential photography techniques and editing skills to take your pictures to the next level!",
      },
      {
        title: "Creative Writing Masterclass",
        lessons: [
          "Developing Your Writing Voice",
          "Plot, Character, and Setting",
          "Dialogue and Point of View",
          "Genre-Specific Techniques",
          "The Publishing Process",
        ],
        category: "clu5hao040002mc4pul3tsszu", // Life Skills
        thumbnail:
          "https://utfs.io/f/8a0a028e-4eb8-4ea8-9e63-62afb7aaf652-xi82t0.png",
        description:
          "Master the art of storytelling. Develop your writing skills, craft compelling narratives, and learn the steps to get your work published!",
      },
      {
        title: "SEO Fundamentals for Beginners",
        lessons: [
          "Search Engine Optimization Explained",
          "Keyword Research and Targeting",
          "On-Page Optimization Techniques",
          "Link Building Strategies",
          "Measuring SEO Success",
        ],
        category: "cltygxjb60001nthepmzl6f8t", // Business & Entrepreneurship
        thumbnail:
          "https://utfs.io/f/8a0a028e-4eb8-4ea8-9e63-62afb7aaf652-xi82t0.png",
        description:
          "Improve your website's ranking in search results. Learn SEO strategies to increase organic traffic, attract more visitors, and grow your online presence!",
      },
      {
        title: "Financial Planning and Investing",
        lessons: [
          "Setting Financial Goals",
          "Budgeting and Money Management",
          "Understanding Investments",
          "Building a Diversified Portfolio",
          "Retirement Planning Strategies",
        ],
        category: "cltygxjb60001nthepmzl6f8t", // Business & Entrepreneurship
        thumbnail:
          "https://utfs.io/f/8a0a028e-4eb8-4ea8-9e63-62afb7aaf652-xi82t0.png",
        description:
          "Take control of your finances. Learn how to set financial goals, manage your money wisely, and make smart investment decisions for a secure future!",
      },
      {
        title: "The Science of Yoga and Meditation",
        lessons: [
          "Yoga Fundamentals and Poses",
          "Benefits of Yoga for Mind and Body",
          "Meditation Techniques for Stress Reduction",
          "Developing a Daily Yoga Practice",
          "Yoga Philosophy and Lifestyle",
        ],
        category: "clu5hao040002mc4pul3tsszu", // Life Skills
        thumbnail:
          "https://utfs.io/f/8a0a028e-4eb8-4ea8-9e63-62afb7aaf652-xi82t0.png",
        description:
          "Improve your well-being with yoga and meditation. Learn basic poses, mindfulness techniques, and how to integrate this practice into your daily life for stress reduction and inner peace!",
      },
    ];

    // Create courses with lessons for ShikshaYatri instructor
    for (const courseData of coursesData) {
      const course = await database.course.create({
        data: {
          title: courseData.title,
          thumbnail: courseData.thumbnail,
          instructor_id: "clu5hxmcn0000o5gvra8ne3fw",
          description: courseData.description,
          lessons: {
            createMany: {
              data: courseData.lessons.map((title) => ({
                title,
                position: coursesData.indexOf(courseData), // Set lesson order based on course index
              })),
            },
          },
          category_id: courseData.category,
        },
      });
    }

    console.log(`Seeding finished. Created user with ID: ${user.id}`);
  } catch (err) {
    console.error(err);
  } finally {
    database.$disconnect();
  }
}

main();
