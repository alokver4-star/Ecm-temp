import mongoose from "mongoose";
import "dotenv/config";
import categoryModel from "./models/categoryModel.js";
import brandModel from "./models/brandModel.js";
import productModel from "./models/productModel.js";

import userModel from "./models/userModel.js";
import bcrypt from "bcrypt";
console.log("✅ All dependencies loaded\n");

// Clear existing data (optional - comment out if you want to keep existing data)
const clearData = async () => {
  try {
    await productModel.deleteMany({});
    await categoryModel.deleteMany({});
    await brandModel.deleteMany({});
    console.log("✅ Cleared existing data");
  } catch (error) {
    console.error("Error clearing data:", error);
  }
};

const createAdminFromEnv = async () => {
  console.log("\n🔐 Optional: Create Admin from .env");
  console.log("==============================");

  const adminName = process.env.ADMIN_NAME || "Admin";
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.log("⏭️ Skipping - Set ADMIN_EMAIL and ADMIN_PASSWORD in server/.env");
    return;
  }

  if (adminPassword.length < 8) {
    console.log("❌ ADMIN_PASSWORD too short (min 8 chars)");
    return;
  }

  try {
    const trimmedEmail = adminEmail.trim().toLowerCase();
    const existingUser = await userModel.findOne({ email: trimmedEmail });
    if (existingUser) {
      console.log(`✅ Admin exists: ${trimmedEmail}`);
      console.log("💡 Login: http://localhost:5174");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const newAdmin = new userModel({
      name: adminName.trim(),
      email: trimmedEmail,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    await newAdmin.save();
    console.log(`✅ Admin created: ${newAdmin.email}`);
    console.log("💡 Login: http://localhost:5174");
    console.log(`📝 Email: ${adminEmail}`);
    console.log(`📝 Password: ${adminPassword}`);
    console.log("⚠️ Change after first login!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};
// Seed Categories
const seedCategories = async () => {
  const categories = [
    {
      name: "Sofas & Couches",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      description: "Comfortable sofas and couches for your living room",
      isActive: true,
    },
    {
      name: "Chairs",
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
      description: "Stylish chairs for dining, office, and living spaces",
      isActive: true,
    },
    {
      name: "Tables",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      description: "Dining tables, coffee tables, and side tables",
      isActive: true,
    },
    {
      name: "Beds & Bedroom",
      image: "https://images.unsplash.com/photo-1631889993954-8cc3f1f6a0c4?w=800&h=600&fit=crop",
      description: "Beds, mattresses, and bedroom furniture",
      isActive: true,
    },
    {
      name: "Storage & Cabinets",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      description: "Wardrobes, cabinets, and storage solutions",
      isActive: true,
    },
    {
      name: "Lighting",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop",
      description: "Modern lighting fixtures and lamps",
      isActive: true,
    },
    {
      name: "Office Furniture",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      description: "Desks, office chairs, and workspace furniture",
      isActive: true,
    },
    {
      name: "Outdoor Furniture",
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
      description: "Patio sets and outdoor furniture",
      isActive: true,
    },
  ];

  try {
    const insertedCategories = await categoryModel.insertMany(categories);
    console.log(`✅ Inserted ${insertedCategories.length} categories`);
    return insertedCategories;
  } catch (error) {
    console.error("Error seeding categories:", error);
    throw error;
  }
};

// Seed Brands
const seedBrands = async () => {
  const brands = [
    {
      name: "IKEA",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop",
      description: "Affordable and modern furniture for every home",
      website: "https://www.ikea.com",
      isActive: true,
    },
    {
      name: "Ashley Furniture",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop",
      description: "Quality furniture with timeless designs",
      website: "https://www.ashleyfurniture.com",
      isActive: true,
    },
    {
      name: "West Elm",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop",
      description: "Modern furniture and home decor",
      website: "https://www.westelm.com",
      isActive: true,
    },
    {
      name: "Pottery Barn",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop",
      description: "Classic and elegant furniture collections",
      website: "https://www.potterybarn.com",
      isActive: true,
    },
    {
      name: "Herman Miller",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop",
      description: "Premium office and ergonomic furniture",
      website: "https://www.hermanmiller.com",
      isActive: true,
    },
    {
      name: "Crate & Barrel",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop",
      description: "Contemporary furniture and home accessories",
      website: "https://www.crateandbarrel.com",
      isActive: true,
    },
  ];

  try {
    const insertedBrands = await brandModel.insertMany(brands);
    console.log(`✅ Inserted ${insertedBrands.length} brands`);
    return insertedBrands;
  } catch (error) {
    console.error("Error seeding brands:", error);
    throw error;
  }
};

// Seed Products
const seedProducts = async (categories, brands) => {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const products = [
    // New Arrivals (recently created)
    {
      _type: "furniture",
      name: "Modern Leather Sofa Set",
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      ],
      price: 1299.99,
      discountedPercentage: 15,
      stock: 25,
      soldQuantity: 12,
      category: categories.find((c) => c.name === "Sofas & Couches")?.name || "Sofas & Couches",
      brand: brands.find((b) => b.name === "West Elm")?.name || "West Elm",
      badge: true,
      isAvailable: true,
      offer: false,
      description: "Luxurious 3-seater leather sofa with modern design. Features high-quality genuine leather, comfortable cushions, and sturdy wooden frame. Perfect for contemporary living rooms.",
      tags: ["leather", "modern", "comfortable", "luxury"],
      createdAt: oneWeekAgo,
    },
    {
      _type: "furniture",
      name: "Minimalist Coffee Table",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      ],
      price: 349.99,
      discountedPercentage: 10,
      stock: 40,
      soldQuantity: 8,
      category: categories.find((c) => c.name === "Tables")?.name || "Tables",
      brand: brands.find((b) => b.name === "IKEA")?.name || "IKEA",
      badge: true,
      isAvailable: true,
      offer: false,
      description: "Sleek minimalist coffee table with glass top and metal legs. Perfect centerpiece for modern living rooms.",
      tags: ["minimalist", "glass", "modern", "coffee-table"],
      createdAt: twoWeeksAgo,
    },
    {
      _type: "furniture",
      name: "Ergonomic Office Chair",
      images: [
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
      ],
      price: 599.99,
      discountedPercentage: 5,
      stock: 30,
      soldQuantity: 15,
      category: categories.find((c) => c.name === "Office Furniture")?.name || "Office Furniture",
      brand: brands.find((b) => b.name === "Herman Miller")?.name || "Herman Miller",
      badge: true,
      isAvailable: true,
      offer: false,
      description: "Premium ergonomic office chair with adjustable height, lumbar support, and 360-degree swivel. Designed for comfort during long work hours.",
      tags: ["ergonomic", "office", "comfortable", "adjustable"],
      createdAt: oneWeekAgo,
    },

    // Best Sellers (high soldQuantity)
    {
      _type: "furniture",
      name: "Classic Dining Table Set",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      ],
      price: 899.99,
      discountedPercentage: 20,
      stock: 15,
      soldQuantity: 145,
      category: categories.find((c) => c.name === "Tables")?.name || "Tables",
      brand: brands.find((b) => b.name === "Ashley Furniture")?.name || "Ashley Furniture",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Beautiful 6-seater dining table with matching chairs. Made from solid oak wood with a rich finish. Perfect for family gatherings.",
      tags: ["dining", "oak", "classic", "6-seater"],
    },
    {
      _type: "furniture",
      name: "Queen Size Platform Bed",
      images: [
        "https://images.unsplash.com/photo-1631889993954-8cc3f1f6a0c4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1631889993954-8cc3f1f6a0c4?w=800&h=600&fit=crop",
      ],
      price: 799.99,
      discountedPercentage: 25,
      stock: 20,
      soldQuantity: 198,
      category: categories.find((c) => c.name === "Beds & Bedroom")?.name || "Beds & Bedroom",
      brand: brands.find((b) => b.name === "IKEA")?.name || "IKEA",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Modern platform bed with built-in storage drawers. No box spring needed. Available in multiple finishes.",
      tags: ["bed", "queen", "platform", "storage"],
    },
    {
      _type: "furniture",
      name: "Comfortable Recliner Chair",
      images: [
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
      ],
      price: 649.99,
      discountedPercentage: 15,
      stock: 18,
      soldQuantity: 167,
      category: categories.find((c) => c.name === "Chairs")?.name || "Chairs",
      brand: brands.find((b) => b.name === "Ashley Furniture")?.name || "Ashley Furniture",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Premium recliner chair with massage function and USB charging port. Perfect for relaxation after a long day.",
      tags: ["recliner", "comfortable", "massage", "luxury"],
    },
    {
      _type: "furniture",
      name: "Sectional Sofa with Chaise",
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      ],
      price: 1899.99,
      discountedPercentage: 30,
      stock: 12,
      soldQuantity: 223,
      category: categories.find((c) => c.name === "Sofas & Couches")?.name || "Sofas & Couches",
      brand: brands.find((b) => b.name === "Pottery Barn")?.name || "Pottery Barn",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Spacious L-shaped sectional sofa with chaise lounge. Upholstered in premium fabric with deep cushions for maximum comfort.",
      tags: ["sectional", "chaise", "spacious", "comfortable"],
    },

    // Special Offers
    {
      _type: "furniture",
      name: "Modern Wardrobe Closet",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      ],
      price: 1199.99,
      discountedPercentage: 35,
      stock: 8,
      soldQuantity: 45,
      category: categories.find((c) => c.name === "Storage & Cabinets")?.name || "Storage & Cabinets",
      brand: brands.find((b) => b.name === "IKEA")?.name || "IKEA",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Large 4-door wardrobe with sliding doors and interior lighting. Ample storage space with hanging rods and shelves.",
      tags: ["wardrobe", "storage", "sliding-doors", "modern"],
    },
    {
      _type: "furniture",
      name: "Industrial Pendant Light",
      images: [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop",
      ],
      price: 199.99,
      discountedPercentage: 40,
      stock: 50,
      soldQuantity: 78,
      category: categories.find((c) => c.name === "Lighting")?.name || "Lighting",
      brand: brands.find((b) => b.name === "West Elm")?.name || "West Elm",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Stylish industrial-style pendant light with exposed bulb. Perfect for kitchen islands and dining areas.",
      tags: ["lighting", "pendant", "industrial", "modern"],
    },
    {
      _type: "furniture",
      name: "Patio Dining Set",
      images: [
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
      ],
      price: 699.99,
      discountedPercentage: 25,
      stock: 22,
      soldQuantity: 56,
      category: categories.find((c) => c.name === "Outdoor Furniture")?.name || "Outdoor Furniture",
      brand: brands.find((b) => b.name === "Crate & Barrel")?.name || "Crate & Barrel",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Weather-resistant 5-piece patio dining set with table and 4 chairs. Made from durable aluminum with UV-resistant cushions.",
      tags: ["outdoor", "patio", "weather-resistant", "dining-set"],
    },

    // Regular Products
    {
      _type: "furniture",
      name: "Executive Desk",
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      ],
      price: 549.99,
      discountedPercentage: 10,
      stock: 35,
      soldQuantity: 34,
      category: categories.find((c) => c.name === "Office Furniture")?.name || "Office Furniture",
      brand: brands.find((b) => b.name === "Herman Miller")?.name || "Herman Miller",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Spacious executive desk with drawers and cable management. Perfect for home offices and professional workspaces.",
      tags: ["desk", "office", "executive", "storage"],
    },
    {
      _type: "furniture",
      name: "Accent Armchair",
      images: [
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
      ],
      price: 449.99,
      discountedPercentage: 12,
      stock: 28,
      soldQuantity: 67,
      category: categories.find((c) => c.name === "Chairs")?.name || "Chairs",
      brand: brands.find((b) => b.name === "Pottery Barn")?.name || "Pottery Barn",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Elegant accent armchair with tufted back and button details. Available in multiple fabric options.",
      tags: ["armchair", "accent", "elegant", "tufted"],
    },
    {
      _type: "furniture",
      name: "Bookshelf with Ladder",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      ],
      price: 399.99,
      discountedPercentage: 8,
      stock: 42,
      soldQuantity: 89,
      category: categories.find((c) => c.name === "Storage & Cabinets")?.name || "Storage & Cabinets",
      brand: brands.find((b) => b.name === "IKEA")?.name || "IKEA",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Tall bookshelf with rolling ladder for easy access to top shelves. Perfect for home libraries and living rooms.",
      tags: ["bookshelf", "storage", "ladder", "tall"],
    },
    {
      _type: "furniture",
      name: "Floor Lamp with Reading Light",
      images: [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop",
      ],
      price: 179.99,
      discountedPercentage: 15,
      stock: 60,
      soldQuantity: 112,
      category: categories.find((c) => c.name === "Lighting")?.name || "Lighting",
      brand: brands.find((b) => b.name === "West Elm")?.name || "West Elm",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Adjustable floor lamp with integrated reading light. Perfect for living rooms and bedrooms.",
      tags: ["lamp", "floor", "reading", "adjustable"],
    },
    {
      _type: "furniture",
      name: "King Size Upholstered Bed",
      images: [
        "https://images.unsplash.com/photo-1631889993954-8cc3f1f6a0c4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1631889993954-8cc3f1f6a0c4?w=800&h=600&fit=crop",
      ],
      price: 1299.99,
      discountedPercentage: 20,
      stock: 10,
      soldQuantity: 76,
      category: categories.find((c) => c.name === "Beds & Bedroom")?.name || "Beds & Bedroom",
      brand: brands.find((b) => b.name === "Ashley Furniture")?.name || "Ashley Furniture",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Luxurious king-size upholstered bed with tufted headboard. Available in multiple colors and fabrics.",
      tags: ["bed", "king", "upholstered", "luxury"],
    },
    {
      _type: "furniture",
      name: "Bar Cabinet with Glass Doors",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      ],
      price: 799.99,
      discountedPercentage: 18,
      stock: 15,
      soldQuantity: 43,
      category: categories.find((c) => c.name === "Storage & Cabinets")?.name || "Storage & Cabinets",
      brand: brands.find((b) => b.name === "Crate & Barrel")?.name || "Crate & Barrel",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Elegant bar cabinet with glass doors and interior lighting. Perfect for entertaining and storing barware.",
      tags: ["cabinet", "bar", "glass-doors", "elegant"],
    },
    {
      _type: "furniture",
      name: "Dining Chairs Set of 4",
      images: [
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
      ],
      price: 299.99,
      discountedPercentage: 10,
      stock: 50,
      soldQuantity: 134,
      category: categories.find((c) => c.name === "Chairs")?.name || "Chairs",
      brand: brands.find((b) => b.name === "IKEA")?.name || "IKEA",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Set of 4 modern dining chairs with comfortable padded seats. Available in multiple colors.",
      tags: ["dining", "chairs", "set", "modern"],
    },
    {
      _type: "furniture",
      name: "Side Table with Drawer",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      ],
      price: 249.99,
      discountedPercentage: 12,
      stock: 38,
      soldQuantity: 91,
      category: categories.find((c) => c.name === "Tables")?.name || "Tables",
      brand: brands.find((b) => b.name === "West Elm")?.name || "West Elm",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Compact side table with drawer for storage. Perfect for bedrooms and living rooms.",
      tags: ["side-table", "drawer", "storage", "compact"],
    },
    {
      _type: "furniture",
      name: "Outdoor Lounge Set",
      images: [
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
      ],
      price: 899.99,
      discountedPercentage: 22,
      stock: 14,
      soldQuantity: 52,
      category: categories.find((c) => c.name === "Outdoor Furniture")?.name || "Outdoor Furniture",
      brand: brands.find((b) => b.name === "Pottery Barn")?.name || "Pottery Barn",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Comfortable 3-piece outdoor lounge set with sofa and two chairs. Weather-resistant cushions included.",
      tags: ["outdoor", "lounge", "weather-resistant", "comfortable"],
    },
    {
      _type: "furniture",
      name: "Task Chair with Headrest",
      images: [
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
      ],
      price: 429.99,
      discountedPercentage: 14,
      stock: 32,
      soldQuantity: 68,
      category: categories.find((c) => c.name === "Office Furniture")?.name || "Office Furniture",
      brand: brands.find((b) => b.name === "Herman Miller")?.name || "Herman Miller",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Comfortable task chair with adjustable headrest and lumbar support. Perfect for long work sessions.",
      tags: ["task-chair", "headrest", "ergonomic", "office"],
    },
    {
      _type: "furniture",
      name: "Chandelier Pendant Light",
      images: [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop",
      ],
      price: 349.99,
      discountedPercentage: 16,
      stock: 25,
      soldQuantity: 39,
      category: categories.find((c) => c.name === "Lighting")?.name || "Lighting",
      brand: brands.find((b) => b.name === "Crate & Barrel")?.name || "Crate & Barrel",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Elegant chandelier-style pendant light with multiple bulbs. Perfect for dining rooms and entryways.",
      tags: ["chandelier", "pendant", "elegant", "dining"],
    },
    {
      _type: "furniture",
      name: "Sleeper Sofa Bed",
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      ],
      price: 1099.99,
      discountedPercentage: 20,
      stock: 16,
      soldQuantity: 87,
      category: categories.find((c) => c.name === "Sofas & Couches")?.name || "Sofas & Couches",
      brand: brands.find((b) => b.name === "Ashley Furniture")?.name || "Ashley Furniture",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Versatile sleeper sofa that converts to a full-size bed. Perfect for guest rooms and small spaces.",
      tags: ["sofa-bed", "sleeper", "versatile", "guest-room"],
    },
    {
      _type: "furniture",
      name: "TV Stand with Storage",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      ],
      price: 449.99,
      discountedPercentage: 15,
      stock: 28,
      soldQuantity: 103,
      category: categories.find((c) => c.name === "Storage & Cabinets")?.name || "Storage & Cabinets",
      brand: brands.find((b) => b.name === "IKEA")?.name || "IKEA",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Modern TV stand with multiple storage compartments and cable management. Accommodates TVs up to 65 inches.",
      tags: ["tv-stand", "storage", "cable-management", "modern"],
    },
  ];

  try {
    const insertedProducts = await productModel.insertMany(products);
    console.log(`✅ Inserted ${insertedProducts.length} products`);
    return insertedProducts;
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
};

// Main seeding function
const seedDatabase = async () => {
  console.log("🚀 Starting seed script...\n");
  
  try {
    // Check if MONGO_URI is set
    if (!process.env.MONGO_URI) {
      console.error("❌ Error: MONGO_URI is not set in your .env file");
      console.error("   Please make sure you have a .env file with MONGO_URI configured");
      console.error("   Example: MONGO_URI=mongodb://localhost:27017/your-database");
      process.exit(1);
    }

    console.log("🔌 Connecting to MongoDB...");
    const mongoUri = process.env.MONGO_URI;
    if (mongoUri) {
      // Hide password in log
      const safeUri = mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
      console.log(`   URI: ${safeUri}`);
    }
    
    // Connect to database with longer timeout for seed script
    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000,
      });
      console.log(`✅ Connected to MongoDB: ${conn.connection.host}\n`);
    } catch (error) {
      console.error(`❌ MongoDB connection error: ${error.message}`);
      if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
        console.error("   Check your internet connection and MongoDB URI");
      } else if (error.message.includes('authentication')) {
        console.error("   Check your MongoDB username and password");
      } else if (error.message.includes('timeout')) {
        console.error("   Connection timed out. Check if MongoDB is running and accessible");
      }
      throw error;
    }

    console.log("🌱 Starting database seeding...\n");

    // Clear existing data
    await clearData();

    // Seed categories
    const categories = await seedCategories();

    // Seed brands
    const brands = await seedBrands();

    // Seed products
    await seedProducts(categories, brands);

    await createAdminFromEnv();

    console.log("\n✅ Database seeding completed successfully!");
    console.log("\nSummary:");
    console.log(`- Categories: ${categories.length}`);
    console.log(`- Brands: ${brands.length}`);
    console.log(`- Products: 24 (including New Arrivals, Best Sellers, and Special Offers)`);
  } catch (error) {
    console.error("\n❌ Error seeding database:");
    console.error(error.message);
    if (error.stack) {
      console.error("\nStack trace:");
      console.error(error.stack);
    }
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("\n🔌 Database connection closed");
    }
    process.exit(0);
  }
};

// Run the seeding
seedDatabase().catch((error) => {
  console.error("❌ Unhandled error:", error);
  process.exit(1);
});