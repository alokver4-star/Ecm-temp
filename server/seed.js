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

// Seed Categories - E-commerce categories like Flipkart/Amazon
const seedCategories = async () => {
  const categories = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&h=600&fit=crop",
      description: "Latest smartphones, laptops, tablets, and electronic gadgets",
      isActive: true,
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
      description: "Trendy clothing, shoes, accessories, and fashion essentials",
      isActive: true,
    },
    {
      name: "Home & Kitchen",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&h=600&fit=crop",
      description: "Furniture, kitchen appliances, home decor, and household items",
      isActive: true,
    },
    {
      name: "Sports & Outdoors",
      image: "https://plus.unsplash.com/premium_vector-1718167295743-db54a78e8c63?w=800&h=600&fit=crop",
      description: "Sports equipment, fitness gear, outdoor activities, and adventure",
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

// Seed Brands - Popular e-commerce brands
const seedBrands = async () => {
  const brands = [
    {
      name: "Samsung",
      image: "https://images.unsplash.com/photo-1597762470488-3877b1f538c6?w=400&h=300&fit=crop",
      description: "Innovative electronics and smartphones",
      website: "https://www.samsung.com",
      isActive: true,
    },
    {
      name: "Apple",
      image: "https://images.unsplash.com/vector-1739890611115-d3d9dc8c3269?w=400&h=300&fit=crop",
      description: "Premium technology products and devices",
      website: "https://www.apple.com",
      isActive: true,
    },
    {
      name: "Nike",
      image: "https://images.unsplash.com/vector-1764006664802-5a3e06e99115?w=400&h=300&fit=crop",
      description: "Athletic footwear and sportswear",
      website: "https://www.nike.com",
      isActive: true,
    },
    {
      name: "Adidas",
      image: "https://images.unsplash.com/photo-1555274175-75f4056dfd05?w=400&h=300&fit=crop",
      description: "Sports apparel and footwear",
      website: "https://www.adidas.com",
      isActive: true,
    },
    {
      name: "Sony",
      image: "https://images.unsplash.com/photo-1573405122783-4f0387d37733?w=400&h=300&fit=crop",
      description: "Audio, video, and gaming electronics",
      website: "https://www.sony.com",
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
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const products = [
    // New Arrivals (recently created with _type: "new_arrivals")
    {
      _type: "new_arrivals",
      name: "Samsung Galaxy S24 Ultra",
      images: [
        "https://images.samsung.com/sg/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-color-titanium-yellow-back-mo.jpg?w=800&h=800&fit=crop",
        "https://i.ytimg.com/vi/5PFp7c8lc6o/maxresdefault.jpg?w=800&h=800&fit=crop",
        "https://media.assettype.com/deccanherald%2F2024-01%2F7af3077d-841b-4a30-b1ec-37ea9906fb1a%2FSamsung_Galaxy_S24_Ultra_Cover_Photo_selected_1A.jpg?w=800&h=800&fit=crop",
      ],
      price: 1199.99,
      discountedPercentage: 12,
      stock: 50,
      soldQuantity: 25,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Samsung")?.name || "Samsung",
      badge: true,
      isAvailable: true,
      offer: false,
      description: "Latest flagship smartphone with advanced AI features, 200MP camera, and S Pen support. Premium design with titanium frame.",
      tags: ["smartphone", "android", "flagship", "camera"],
      createdAt: oneWeekAgo,
    },
    {
      _type: "new_arrivals",
      name: "Sony WH-1000XM5 Headphones",
      images: [
        "https://m.media-amazon.com/images/I/61ULAZmt9NL.jpg?w=800&h=800&fit=crop",
        "https://gameone.ph/media/catalog/product/mpiowebpcache/d378a0f20f83637cdb1392af8dc032a2/s/o/sony-wh-1000xm5-headset.webp?w=800&h=800&fit=crop",
        "https://down-my.img.susercontent.com/file/my-11134207-7rasb-mdegizikbjch75?w=800&h=800&fit=crop",
      ],
      price: 399.99,
      discountedPercentage: 10,
      stock: 30,
      soldQuantity: 15,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Sony")?.name || "Sony",
      badge: true,
      isAvailable: true,
      offer: false,
      description: "Industry-leading noise canceling with two processors and eight microphones. Exceptional sound quality.",
      tags: ["headphones", "wireless", "noise-canceling", "audio"],
      createdAt: oneWeekAgo,
    },

    // Best Sellers (high soldQuantity with _type: "best_sellers")
    {
      _type: "best_sellers",
      name: "iPhone 15 Pro Max",
      images: [
        "https://512pixels.net/wp-content/uploads/2023/12/iphone-15-pro-max-natural.jpg?w=800&h=800&fit=crop",
        "https://static0.pocketlintimages.com/wordpress/wp-content/uploads/wm/2023/09/iphone-15-pro-max-review-4-1.jpg?w=800&h=800&fit=crop",
        "https://images.macrumors.com/t/OGS-wMpuHXbX6VkpJd6urJH1rEg=/1600x0/article-new/2023/09/iphone-15-pro-gray.jpg?w=800&h=800&fit=crop",
      ],
      price: 1199.99,
      discountedPercentage: 5,
      stock: 60,
      soldQuantity: 523,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Apple")?.name || "Apple",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Premium smartphone with A17 Pro chip, titanium design, and ProRes video recording. The ultimate iPhone experience.",
      tags: ["iphone", "smartphone", "premium", "camera"],
    },
    {
      _type: "best_sellers",
      name: "Nike Air Force 1 '07",
      images: [
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-jBrhbr.png?w=800&h=800&fit=crop",
        "https://m.media-amazon.com/images/I/61Nl-t0+e5L._AC_UY900_.jpg?w=800&h=800&fit=crop",
        "https://cdn.shopify.com/s/files/1/0013/8377/6326/products/CW2288-111_1_2048x2048.jpg?v=1605307373&w=800&h=800&fit=crop",
      ],
      price: 110.00,
      discountedPercentage: 0,
      stock: 100,
      soldQuantity: 450,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Nike")?.name || "Nike",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "The radiance lives on in the Nike Air Force 1 '07, the basketball icon that puts a fresh spin on what you know best.",
      tags: ["shoes", "nike", "classic", "streetwear"],
    },

    // Special Offers (offer: true)
    {
      _type: "electronics",
      name: "Samsung 55-inch The Frame QLED TV",
      images: [
        "https://images.samsung.com/is/image/samsung/p6pim/in/qa55ls03baklxl/gallery/in-the-frame-ls03b-qa55ls03baklxl-532962306?$684_547_PNG$?w=800&h=800&fit=crop",
        "https://m.media-amazon.com/images/I/91tO0N2J7AL._AC_SL1500_.jpg?w=800&h=800&fit=crop",
        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6502/6502220_sd.jpg?w=800&h=800&fit=crop",
      ],
      price: 1499.99,
      discountedPercentage: 25,
      stock: 20,
      soldQuantity: 89,
      category: categories.find((c) => c.name === "Home & Kitchen")?.name || "Home & Kitchen",
      brand: brands.find((b) => b.name === "Samsung")?.name || "Samsung",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Artwork, television, movies, and memories - The Frame showcases it all on a beautiful QLED screen.",
      tags: ["tv", "qled", "samsung", "4k"],
    },
    {
      _type: "fashion",
      name: "Adidas Ultraboost Light",
      images: [
        "https://assets.adidas.com/images/w_600,f_auto,q_auto/4f49557451454556b693af7500d027e8_9366/Ultraboost_Light_Running_Shoes_White_HQ6351_01_standard.jpg?w=800&h=800&fit=crop",
        "https://m.media-amazon.com/images/I/718t8-wQ3+L._AC_UY1000_.jpg?w=800&h=800&fit=crop",
        "https://hips.hearstapps.com/hmg-prod/images/adidas-ultraboost-light-review-1678204680.jpg?w=800&h=800&fit=crop",
      ],
      price: 190.00,
      discountedPercentage: 20,
      stock: 45,
      soldQuantity: 110,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Adidas")?.name || "Adidas",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Experience epic energy with the lightness of the new Ultraboost Light, our lightest Ultraboost ever.",
      tags: ["shoes", "running", "adidas", "sport"],
    },

    // Regular Products
    {
      _type: "electronics",
      name: "Apple MacBook Air 15-inch M2",
      images: [
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-15-midnight-select-202306?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1684518479433?w=800&h=800&fit=crop",
        "https://m.media-amazon.com/images/I/71S4sIPFvBL._AC_SL1500_.jpg?w=800&h=800&fit=crop",
        "https://i.pcmag.com/imagery/reviews/07y3b03tT80s04a27549704-1.fit_lim.size_1050x591.v1686776518.jpg?w=800&h=800&fit=crop",
      ],
      price: 1299.00,
      discountedPercentage: 0,
      stock: 40,
      soldQuantity: 123,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Apple")?.name || "Apple",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Impossibly thin and incredibly fast. The 15-inch MacBook Air with M2 chip gives you more room for what you love.",
      tags: ["laptop", "apple", "macbook", "m2"],
      createdAt: oneMonthAgo,
    },
    {
      _type: "electronics",
      name: "Sony PlayStation 5",
      images: [
        "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$?w=800&h=800&fit=crop",
        "https://m.media-amazon.com/images/I/51051FiD9UL._SX522_.jpg?w=800&h=800&fit=crop",
        "https://cdn.vox-cdn.com/thumbor/9j-s_d067c2957b45-4299446d-9781-4295-b_d7-5.jpg?w=800&h=800&fit=crop",
      ],
      price: 499.99,
      discountedPercentage: 0,
      stock: 15,
      soldQuantity: 800,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Sony")?.name || "Sony",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with haptic feedback, and 3D Audio.",
      tags: ["gaming", "console", "sony", "ps5"],
      createdAt: oneMonthAgo,
    }
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

    // Create admin from .env
    await createAdminFromEnv();

    console.log("\n✅ Database seeding completed successfully!");
    console.log("\nSummary:");
    console.log(`- Categories: ${categories.length}`);
    console.log(`- Brands: ${brands.length}`);
    console.log(`- Products: 8 (Diverse mix across categories)`);
    console.log("\n📝 Product Structure:");
    console.log("   - New Arrivals: 2");
    console.log("   - Best Sellers: 2");
    console.log("   - Special Offers: 2");
    console.log("   - Regular: 2");
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