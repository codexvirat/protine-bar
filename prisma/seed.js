const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function main() {
  console.log("Starting database seed...");
  
  // Clean existing products
  await db.product.deleteMany();

  const products = [
    {
      id: "aesthetic-blueprint",
      name: "Aesthetic Blueprint",
      slug: "aesthetic-blueprint",
      description: "Precision-engineered post-workout formula. Restores high-energy phosphagen ATP reservoirs and establishes critical muscle nitrogen levels while blunting sympathetic cortisol markers. Formulated without synthetic sugars or bloating fibers for optimal physical restoration.",
      price: 399.00,
      images: "/images/glacial-mint.png",
      flavor: "Glacial Mint & Crisp Dark Cacao",
      stock: 120,
      category: "anabolic",
      subscriptionAvailable: true
    },
    {
      id: "collagen-glow",
      name: "Collagen Glow",
      slug: "collagen-glow",
      description: "A fusion of advanced beauty science and muscle recovery. Delivers low-molecular-weight marine collagen peptides alongside pure whey isolate to rebuild connective tissues, hydrate joint structures, and promote skin elasticity while regulating systemic stress.",
      price: 399.00,
      images: "/images/collagen-glow.png",
      flavor: "Rich Madagascan Vanilla & Almond Butter",
      stock: 85,
      category: "glow",
      subscriptionAvailable: true
    }
  ];

  for (const product of products) {
    await db.product.upsert({
      where: { id: product.id },
      update: product,
      create: product
    });
  }

  console.log("Database seeded successfully with 2 formulations!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
