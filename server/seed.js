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
    {
      name: "Books",
      image: "https://plus.unsplash.com/premium_vector-1720841883083-319d9983e554?w=800&h=600&fit=crop",
      description: "Fiction, non-fiction, textbooks, and digital books",
      isActive: true,
    },
    {
      name: "Beauty & Personal Care",
      image: "https://plus.unsplash.com/premium_vector-1721454406418-093e3b66d184?w=800&h=600&fit=crop",
      description: "Skincare, makeup, fragrances, and personal grooming products",
      isActive: true,
    },
    {
      name: "Toys & Games",
      image: "https://plus.unsplash.com/premium_vector-1739889344336-53124a008e53?w=800&h=600&fit=crop",
      description: "Toys, board games, video games, and entertainment for all ages",
      isActive: true,
    },
    {
      name: "Automotive",
      image: "https://plus.unsplash.com/premium_photo-1677009541707-c805a3ddf197?w=800&h=600&fit=crop",
      description: "Car accessories, parts, tools, and automotive essentials",
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
    {
      name: "LG",
      image: "https://images.unsplash.com/photo-1575387873837-4f25ee816453?w=400&h=300&fit=crop",
      description: "Home appliances and electronics",
      website: "https://www.lg.com",
      isActive: true,
    },
    {
      name: "HP",
      image: "https://images.unsplash.com/photo-1658312226966-29bd4e77c62c?w=400&h=300&fit=crop",
      description: "Computers, printers, and accessories",
      website: "https://www.hp.com",
      isActive: true,
    },
    {
      name: "Dell",
      image: "https://images.unsplash.com/photo-1554246247-6993b606e8b9?w=400&h=300&fit=crop",
      description: "Laptops, desktops, and IT solutions",
      website: "https://www.dell.com",
      isActive: true,
    },
    {
      name: "Canon",
      image: "https://images.unsplash.com/photo-1563353357-8acca64ce1fd?w=400&h=300&fit=crop",
      description: "Cameras and imaging equipment",
      website: "https://www.canon.com",
      isActive: true,
    },
    {
      name: "Philips",
      image: "https://plus.unsplash.com/premium_vector-1765964246333-61d80357b00f?w=400&h=300&fit=crop",
      description: "Home appliances and healthcare products",
      website: "https://www.philips.com",
      isActive: true,
    },
    {
      name: "Zara",
      image: "https://images.unsplash.com/photo-1662275170993-1214097b947f?w=400&h=300&fit=crop",
      description: "Fast fashion and trendy clothing",
      website: "https://www.zara.com",
      isActive: true,
    },
    {
      name: "H&M",
      image: "https://images.unsplash.com/photo-1569484221992-2a453658fff3?w=400&h=300&fit=crop",
      description: "Affordable fashion and accessories",
      website: "https://www.hm.com",
      isActive: true,
    },
    {
      name: "Puma",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop",
      description: "Athletic wear and sportswear",
      website: "https://www.puma.com",
      isActive: true,
    },
    {
      name: "Levi's",
      image: "https://images.unsplash.com/photo-1644338911891-5c49468eab89?w=400&h=300&fit=crop",
      description: "Classic denim and casual wear",
      website: "https://www.levi.com",
      isActive: true,
    },
    {
      name: "Uniqlo",
      image: "https://images.unsplash.com/photo-1623701226917-b8e6272193b7?w=400&h=300&fit=crop",
      description: "Quality basics and everyday essentials",
      website: "https://www.uniqlo.com",
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
      name: "Apple MacBook Pro 16-inch M3",
      images: [
        "https://sm.pcmag.com/pcmag_me/review/a/apple-macb/apple-macbook-pro-16-inch-2023-m3-max_cah1.jpg?w=800&h=800&fit=crop",
        "https://imageio.forbes.com/specials-images/imageserve/5ddc07232c886a0007ed0722/0x0.jpg?format=jpg&w=800&h=800&fit=crop",
        "https://www.macworld.com/wp-content/uploads/2025/06/16in-macbook-pro-angle-100818635-orig.jpg?w=800&h=800&fit=crop",
      ],
      price: 2499.99,
      discountedPercentage: 8,
      stock: 30,
      soldQuantity: 18,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Apple")?.name || "Apple",
      badge: true,
      isAvailable: true,
      offer: false,
      description: "Powerful laptop with M3 chip, 16-inch Liquid Retina XDR display, and up to 22 hours of battery life. Perfect for professionals.",
      tags: ["laptop", "macbook", "m3", "professional"],
      createdAt: oneWeekAgo,
    },
    {
      _type: "new_arrivals",
      name: "Nike Air Max 270 Premium",
      images: [
        "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2018%2F06%2Fnike-air-max-270-premium-string-black-tw.jpg?w=800&h=800&fit=crop",
        "https://www.sneakers-actus.fr/wp-content/uploads/2018/07/nike-air-max-270-lux-cuir-premium-beige-et-marron-AO8283-200-1.jpg?w=800&h=800&fit=crop",
        "https://slamdunk.shop/wp-content/uploads/2018/09/Air-Max-270-String-Desert-Ochre-6.jpg?w=800&h=800&fit=crop",
      ],
      price: 149.99,
      discountedPercentage: 15,
      stock: 75,
      soldQuantity: 42,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Nike")?.name || "Nike",
      badge: true,
      isAvailable: true,
      offer: false,
      description: "Comfortable running shoes with Air Max cushioning. Stylish design perfect for daily wear and workouts.",
      tags: ["shoes", "sneakers", "running", "athletic"],
      createdAt: twoWeeksAgo,
    },
    {
      _type: "new_arrivals",
      name: "Sony WH-1000XM5 Wireless Headphones",
      images: [
        "https://m.media-amazon.com/images/I/61ULAZmt9NL.jpg?w=800&h=800&fit=crop",
        "https://gameone.ph/media/catalog/product/mpiowebpcache/d378a0f20f83637cdb1392af8dc032a2/s/o/sony-wh-1000xm5-headset.webp?w=800&h=800&fit=crop",
        "https://down-my.img.susercontent.com/file/my-11134207-7rasb-mdegizikbjch75?w=800&h=800&fit=crop",
      ],
      price: 399.99,
      discountedPercentage: 10,
      stock: 40,
      soldQuantity: 28,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Sony")?.name || "Sony",
      badge: true,
      isAvailable: true,
      offer: false,
      description: "Premium noise-canceling headphones with exceptional sound quality and 30-hour battery life.",
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
      name: "Adidas Ultraboost 23 Running Shoes",
      images: [
        "https://assets.ajio.com/medias/sys_master/root/20230426/NAxT/644939c642f9e729d7517a0b/-473Wx593H-469329217-black-MODEL.jpg?w=800&h=800&fit=crop",
        "https://assets.ajio.com/medias/sys_master/root/20230213/zZsC/63ea5182f997dde6f4a218bf/-1117Wx1400H-469322447-black-MODEL.jpg?w=800&h=800&fit=crop",
        "https://media.6media.me/media/catalog/product/g/x/gx6640_1.jpg?w=800&h=800&fit=crop",
      ],
      price: 179.99,
      discountedPercentage: 20,
      stock: 85,
      soldQuantity: 412,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Adidas")?.name || "Adidas",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Top-rated running shoes with Boost cushioning technology. Comfortable and durable for long runs.",
      tags: ["shoes", "running", "athletic", "comfortable"],
    },
    {
      _type: "best_sellers",
      name: "Dell XPS 15 Laptop",
      images: [
        "https://m.media-amazon.com/images/I/719CAihgtTL.jpg?w=800&h=800&fit=crop",
        "https://images-cdn.ubuy.co.in/6353fce9881412611642c564-dell-xps-15-9510-laptop-2021-15-6-4k.jpg?w=800&h=800&fit=crop",
        "https://docconcepts.com/wp-content/uploads/2021/12/Dell-XPS-15-9510-.jpg?w=800&h=800&fit=crop",
      ],
      price: 1899.99,
      discountedPercentage: 15,
      stock: 35,
      soldQuantity: 387,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Dell")?.name || "Dell",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Powerful 15-inch laptop with Intel Core i9, 32GB RAM, and 4K OLED display. Perfect for creators and professionals.",
      tags: ["laptop", "windows", "professional", "4k"],
    },
    {
      _type: "best_sellers",
      name: "LG 55-inch 4K Smart TV",
      images: [
        "https://www.lg.com/content/dam/channel/wcms/in/images/tvs/55uq7500psf_atr_eail_in_c/gallery/55UQ7500PSF-D-01-v001.jpg?w=800&h=800&fit=crop",
        "https://m.media-amazon.com/images/I/71-eG9IswbS.jpg?w=800&h=800&fit=crop",
        "https://www.lg.com/content/dam/channel/wcms/au/images/tvs/55up8000ptb_aau_ehap_au_c/gallery/MZ-1.jpg?w=800&h=800&fit=crop",
      ],
      price: 699.99,
      discountedPercentage: 25,
      stock: 45,
      soldQuantity: 298,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "LG")?.name || "LG",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Crystal-clear 4K UHD display with webOS smart platform. HDR10 and Dolby Vision support for stunning visuals.",
      tags: ["tv", "4k", "smart", "entertainment"],
    },
    {
      _type: "best_sellers",
      name: "Canon EOS R6 Mark II Camera",
      images: [
        "https://static0.pocketlintimages.com/wordpress/wp-content/uploads/wm/2023/04/canon-eos-r6-mark-ii-2.jpg?w=800&h=800&fit=crop",
        "https://static0.pocketlintimages.com/wordpress/wp-content/uploads/163241-homepage-news-canon-eos-r6-mark-ii-image1-cchym1gqpr.jpg?w=800&h=800&fit=crop",
        "https://thephotographyenthusiast.b-cdn.net/wp-content/uploads/2020/12/Canon-R6-Front.jpg?w=800&h=800&fit=crop",
      ],
      price: 2499.99,
      discountedPercentage: 12,
      stock: 20,
      soldQuantity: 156,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Canon")?.name || "Canon",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Professional mirrorless camera with 24MP sensor, 4K video, and advanced autofocus system.",
      tags: ["camera", "mirrorless", "professional", "photography"],
    },

    // Special Offers (offer: true)
    {
      _type: "electronics",
      name: "HP Pavilion 15 Laptop",
      images: [
        "https://m.media-amazon.com/images/I/31m3pDPz6nL.jpg?w=800&h=800&fit=crop",
        "https://www.jiomart.com/images/product/original/492849793/hp-15-eh2018au-pavilion-laptop-amd-ryzen-5-5625u-8-gb-512-gb-ssd-amd-radeon-graphics-windows-11-mso-fhd-39-62-cm-15-6-inch-digital-o492849793-p591984547-1-202206072209.jpeg?w=800&h=800&fit=crop",
        "https://rukmini1.flixcart.com/image/1500/1500/klgx0280/computer/x/t/l/pavilion-laptop-15-eg0103tx-laptop-hp-original-imagyhfqa8tbhx9j.jpeg?q=70&w=800&h=800&fit=crop",
      ],
      price: 799.99,
      discountedPercentage: 30,
      stock: 50,
      soldQuantity: 89,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "HP")?.name || "HP",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Affordable laptop with AMD Ryzen 7, 16GB RAM, and Full HD display. Great for students and professionals.",
      tags: ["laptop", "budget", "student", "windows"],
    },
    {
      _type: "home_kitchen",
      name: "Philips Air Fryer XXL",
      images: [
        "https://images.philips.com/is/image/philipsconsumer/vrs_0fefee4baf65cc953f4b112b6bcaced8259d7c8b?$pnglarge$&wid=960&w=800&h=800&fit=crop",
        "https://m.media-amazon.com/images/I/61hYe+ipM6L._AC_SL1080_.jpg?w=800&h=800&fit=crop",
        "https://us.home-appliances.philips/cdn/shop/files/NA340_3000x3000_07_1946x.jpg?v=1753812335&w=800&h=800&fit=crop",
      ],
      price: 199.99,
      discountedPercentage: 35,
      stock: 60,
      soldQuantity: 234,
      category: categories.find((c) => c.name === "Home & Kitchen")?.name || "Home & Kitchen",
      brand: brands.find((b) => b.name === "Philips")?.name || "Philips",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Large capacity air fryer with Rapid Air technology. Cook healthier meals with 75% less fat.",
      tags: ["kitchen", "appliance", "healthy", "cooking"],
    },
    {
      _type: "fashion",
      name: "Nike Dri-FIT Training T-Shirt",
      images: [
        "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/aade315f-2e63-4482-b781-5c2de36af69f/AS+M+NK+DF+TEE+RLGD+RESET.png?w=800&h=800&fit=crop",
        "https://i5.walmartimages.com/seo/Nike-BLACK-Men-s-Dri-FIT-Short-Sleeve-Training-T-Shirt-Large_460146ff-28db-46f0-9f22-c9a77239651a.53318a0b6244f8c3ee476ed8365b964d.jpeg?w=800&h=800&fit=crop",
        "https://static.ticimax.cloud/3402/uploads/urunresimleri/buyuk/nike-dri-fit-mens-training-erkek-tisor-81f8-8.jpg?w=800&h=800&fit=crop",
      ],
      price: 39.99,
      discountedPercentage: 40,
      stock: 120,
      soldQuantity: 456,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Nike")?.name || "Nike",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Moisture-wicking training shirt with breathable fabric. Perfect for workouts and active lifestyle.",
      tags: ["clothing", "sportswear", "athletic", "comfortable"],
    },
    {
      _type: "electronics",
      name: "Sony PlayStation 5 Console",
      images: [
        "https://rukminim2.flixcart.com/image/480/640/xif0q/gamingconsole/r/1/p/-original-imaghyyk5zct4duf.jpeg?q=90&w=800&h=800&fit=crop",
        "https://www.designinfo.in/wp-content/uploads/nc/p/5/1/9/2/3/51923-485x485.jpg?w=800&h=800&fit=crop",
        "https://bankofelectronics.com/3100-large_default/sony-playstation5-pro-gaming-console-.jpg?w=800&h=800&fit=crop",
      ],
      price: 499.99,
      discountedPercentage: 0,
      stock: 25,
      soldQuantity: 678,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Sony")?.name || "Sony",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Next-generation gaming console with ray tracing, 4K gaming, and ultra-fast SSD. Includes DualSense wireless controller.",
      tags: ["gaming", "console", "playstation", "entertainment"],
    },
    {
      _type: "electronics",
      name: "Apple AirPods Pro (2nd Gen)",
      images: [
        "https://i.insider.com/66ba292c5da406397bf4ff5f?width=700&w=800&h=800&fit=crop",
        "https://recommerce.gumlet.io/almajuice.reshop.kz/catalog/148/144454839165277fd90429a_original.jpg?w=800&h=800&fit=crop",
        "https://img.drz.lazcdn.com/static/pk/p/f874a8ee95318b3574f7148c7f1f65f6.jpg_720x720q80.jpg?w=800&h=800&fit=crop",
      ],
      price: 249.99,
      discountedPercentage: 20,
      stock: 80,
      soldQuantity: 567,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Apple")?.name || "Apple",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Premium wireless earbuds with active noise cancellation, spatial audio, and MagSafe charging case.",
      tags: ["earbuds", "wireless", "audio", "apple"],
    },
    {
      _type: "fashion",
      name: "Adidas Originals Superstar Sneakers",
      images: [
        "https://assets.adidas.com/images/w_600,f_auto,q_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_00_standard.jpg?w=800&h=800&fit=crop",
        "https://www.blockstore.cl/cdn/shop/files/Zapatillas-Adidas-Superstar-II-Unisex-Blanco-Adidas-Originals-2369143_1800x.jpg?v=1763754783&w=800&h=800&fit=crop",
        "https://assets.myntassets.com/w_412,q_auto:best,dpr_3,fl_progressive,f_webp/assets/images/11353384/2020/2/28/6095c446-1137-498a-ae08-0f890214579a1582867395531-ADIDAS-Originals-Men-Casual-Shoes-9541582867394602-1.jpg?w=800&h=800&fit=crop",
      ],
      price: 89.99,
      discountedPercentage: 25,
      stock: 95,
      soldQuantity: 389,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Adidas")?.name || "Adidas",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Classic shell-toe design with leather upper and rubber outsole. Timeless style for everyday wear.",
      tags: ["shoes", "sneakers", "classic", "casual"],
    },

    // Regular Products
    {
      _type: "electronics",
      name: "Samsung 32-inch 4K Monitor",
      images: [
        "https://m.media-amazon.com/images/I/91XfEXGz9UL.jpg?w=800&h=800&fit=crop",
        "https://m.media-amazon.com/images/I/51bWx+mts9L._AC_UF350,350_QL80_.jpg?w=800&h=800&fit=crop",
        "https://m.media-amazon.com/images/I/41P9lEKHp3L._AC_UF1000,1000_QL80_.jpg?w=800&h=800&fit=crop",
      ],
      price: 449.99,
      discountedPercentage: 15,
      stock: 40,
      soldQuantity: 123,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Samsung")?.name || "Samsung",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Ultra HD 4K monitor with HDR10 support. Perfect for gaming, design work, and multimedia.",
      tags: ["monitor", "4k", "gaming", "professional"],
    },
    {
      _type: "fashion",
      name: "Nike Sportswear Tech Fleece Hoodie",
      images: [
        "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/b7b26b55-85c6-463a-8372-a10b9dba734f/AS+M+NSW+TCH+FLC+HOODIE+FZ+WR.png?w=800&h=800&fit=crop",
        "https://cdn.shopify.com/s/files/1/0603/3031/1875/products/main-square_5ba7031c-2833-419e-8370-cc1b3f940225.jpg?v=1694780536&w=800&h=800&fit=crop",
        "https://img.joomcdn.net/849fd876f1ff87ba7dfab06017f367d0a911fdc9_original.jpeg?w=800&h=800&fit=crop",
      ],
      price: 99.99,
      discountedPercentage: 18,
      stock: 65,
      soldQuantity: 234,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Nike")?.name || "Nike",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Warm and comfortable hoodie with Tech Fleece fabric. Perfect for cool weather workouts.",
      tags: ["hoodie", "sportswear", "warm", "comfortable"],
    },
    {
      _type: "home_kitchen",
      name: "LG Washing Machine 9kg",
      images: [
        "https://www.lg.com/content/dam/channel/wcms/in/images/washing-machines/fhp1209z9b_ablqeil_eail_in_c/gallery/FHP1209Z9B-Washing-Machines-Front-View-D-01.jpg?w=800&h=800&fit=crop",
        "https://www.lg.com/content/dam/channel/wcms/in/images/washing-machines/fhb1209z4b_apbqeil_eail_in_c/gallery/FHB1209Z4B-Basic-450.jpg?w=800&h=800&fit=crop",
        "https://www.lg.com/content/dam/channel/wcms/in/images/washing-machines/fhb1209z4b_apbqeil_eail_in_c/gallery/FHB1209Z4B-MZ-3.jpg?w=800&h=800&fit=crop",
      ],
      price: 599.99,
      discountedPercentage: 22,
      stock: 30,
      soldQuantity: 145,
      category: categories.find((c) => c.name === "Home & Kitchen")?.name || "Home & Kitchen",
      brand: brands.find((b) => b.name === "LG")?.name || "LG",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Front-loading washing machine with TurboWash technology and energy-efficient operation.",
      tags: ["appliance", "washing-machine", "home", "efficient"],
    },
    {
      _type: "electronics",
      name: "Canon EF 50mm f/1.8 Lens",
      images: [
        "https://m.media-amazon.com/images/I/6100ENTYlGL._AC_UF1000,1000_QL80_.jpg?w=800&h=800&fit=crop",
        "https://www.justcanon.in/cdn/shop/products/EF50f1.8stm_3_f6de9dc3-020e-49d1-9e78-70e40af8ac72.jpg?v=1659089185&w=800&h=800&fit=crop",
        "https://pixelsperfect.in/wp-content/uploads/2023/02/CANON-LENS-RF-50mm-F1.8-STM-SV-GP002447-3.jpg?w=800&h=800&fit=crop",
      ],
      price: 129.99,
      discountedPercentage: 10,
      stock: 55,
      soldQuantity: 267,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Canon")?.name || "Canon",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Affordable prime lens with wide f/1.8 aperture. Perfect for portraits and low-light photography.",
      tags: ["lens", "camera", "photography", "portrait"],
    },
    {
      _type: "electronics",
      name: "HP LaserJet Pro Printer",
      images: [
        "https://m.media-amazon.com/images/I/61oeZRV1ZTL.jpg?w=800&h=800&fit=crop",
        "https://m.media-amazon.com/images/I/71+jJW152jL.jpg?w=800&h=800&fit=crop",
        "https://5.imimg.com/data5/SELLER/Default/2023/5/308878229/SI/FA/QH/88677595/amc-maintenance-500x500.jpg?w=800&h=800&fit=crop",
      ],
      price: 299.99,
      discountedPercentage: 12,
      stock: 45,
      soldQuantity: 178,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "HP")?.name || "HP",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Fast and reliable laser printer with wireless connectivity. Perfect for home and small office use.",
      tags: ["printer", "office", "wireless", "laser"],
    },
    {
      _type: "electronics",
      name: "Dell UltraSharp 27-inch Monitor",
      images: [
        "https://m.media-amazon.com/images/I/81fCUAajF9L.jpg?w=800&h=800&fit=crop",
        "https://snpi.dell.com/snp/images/products/large/en-in~210-BMJK/210-BMJK.jpg?w=800&h=800&fit=crop",
        "https://youget.pt/179599-large_default/dell-p2725he-27-full-hd-ips-100hz-black-monitor.jpg?w=800&h=800&fit=crop",
      ],
      price: 549.99,
      discountedPercentage: 18,
      stock: 35,
      soldQuantity: 201,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Dell")?.name || "Dell",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Professional 4K monitor with USB-C connectivity and color-accurate display. Ideal for designers.",
      tags: ["monitor", "4k", "professional", "design"],
    },
    {
      _type: "home_kitchen",
      name: "Philips Hue Smart Light Bulbs (3-Pack)",
      images: [
        "https://m.media-amazon.com/images/I/61SHNW1cMdL._AC_UF894,1000_QL80_.jpg?w=800&h=800&fit=crop",
        "https://m.media-amazon.com/images/I/51K0GjFVpwL.jpg?w=800&h=800&fit=crop",
        "https://www.assets.signify.com/is/image/Signify/046677563271-929002468305-Philips-Hue_WA-10_5W-A19-E26-4set-US-APP?wid=500&qlt=82&w=800&h=800&fit=crop",
      ],
      price: 79.99,
      discountedPercentage: 20,
      stock: 70,
      soldQuantity: 312,
      category: categories.find((c) => c.name === "Home & Kitchen")?.name || "Home & Kitchen",
      brand: brands.find((b) => b.name === "Philips")?.name || "Philips",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Color-changing smart LED bulbs with app control. Works with Alexa and Google Assistant.",
      tags: ["smart-home", "lighting", "led", "automation"],
    },
    {
      _type: "electronics",
      name: "Sony WF-1000XM4 Earbuds",
      images: [
        "https://m.media-amazon.com/images/I/511Iyl1Eg0L._AC_UF350,350_QL80_.jpg?w=800&h=800&fit=crop",
        "https://sony.scene7.com/is/image/sonyglobalsolutions/Product%20primary%20image-1?%24primaryshotPreset%24&fmt=pjpeg&resMode=bisharp&wid=360&w=800&h=800&fit=crop",
        "https://cdn.hk01.com/di/media/images/dw/20210622/484071492741500928692140.jpeg/?w=800&h=800&fit=crop",
      ],
      price: 279.99,
      discountedPercentage: 15,
      stock: 50,
      soldQuantity: 445,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Sony")?.name || "Sony",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Premium true wireless earbuds with industry-leading noise cancellation and LDAC audio codec.",
      tags: ["earbuds", "wireless", "noise-canceling", "audio"],
    },
    {
      _type: "electronics",
      name: "Apple iPad Air (5th Gen)",
      images: [
        "https://rukminim2.flixcart.com/image/480/640/l0jwbrk0/tablet/z/q/k/-original-imagcbjgy7jxjxtz.jpeg?w=800&h=800&fit=crop",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR2heWEWO9WMKOenhYadU2rFSrMCs1iQBVlQ&s&w=800&h=800&fit=crop",
        "https://datavision.com/cdn/shop/products/4c8570c9-2830-4668-9f26-dc4a33e84077_grande.jpg?w=800&h=800&fit=crop",
      ],
      price: 599.99,
      discountedPercentage: 8,
      stock: 55,
      soldQuantity: 389,
      category: categories.find((c) => c.name === "Electronics")?.name || "Electronics",
      brand: brands.find((b) => b.name === "Apple")?.name || "Apple",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Powerful tablet with M1 chip, 10.9-inch Liquid Retina display, and all-day battery life.",
      tags: ["tablet", "ipad", "apple", "portable"],
    },
    {
      _type: "fashion",
      name: "Adidas Classic Backpack",
      images: [
        "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/AUGUST/27/ScrJrBoF_a61274f1978d4f26bd6b7d956b1eba87.jpg?w=800&h=800&fit=crop",
        "https://assets.adidas.com/images/w_600,f_auto,q_auto/f2385bf1e8c44bc8bcd1e2bdad75df02_faec/Classic_3_Bar_Logo_Backpack_Blue_IS7049_db01_00_standard.tiff.jpg?w=800&h=800&fit=crop",
        "https://www.sportspower.com.au/cdn/shop/files/IS7055-adidas-Classic-3-Bar-Logo-Backpack_20_281_29.jpg?v=1753115694&w=800&h=800&fit=crop",
      ],
      price: 49.99,
      discountedPercentage: 15,
      stock: 90,
      soldQuantity: 278,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Adidas")?.name || "Adidas",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Durable backpack with multiple compartments and padded laptop sleeve. Perfect for school and travel.",
      tags: ["backpack", "bag", "travel", "school"],
    },
    {
      _type: "fashion",
      name: "Zara Classic Denim Jacket",
      images: [
        "https://static.zara.net/assets/public/7a1f/28c2/0fa840ff9a64/9274a9673f6e/04806608400-e1/04806608400-e1.jpg?ts=1740038515675&w=800&h=800&fit=crop",
        "https://static.zara.net/assets/public/68ba/070c/cd254c0785b8/9224f0b2277b/04806608400-a1/04806608400-a1.jpg?ts=1750320456875&w=800&h=800&fit=crop",
        "https://static.zara.net/assets/public/1b13/dd23/7fe342aeb70d/30b0761ad8cd/02005726427-e2/02005726427-e2.jpg?ts=1741191127580&w=800&h=800&fit=crop",
      ],
      price: 79.99,
      discountedPercentage: 20,
      stock: 60,
      soldQuantity: 234,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Zara")?.name || "Zara",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Timeless denim jacket with classic fit. Perfect for layering and casual wear.",
      tags: ["jacket", "denim", "casual", "classic"],
    },
    {
      _type: "fashion",
      name: "H&M Cotton T-Shirt Pack (3-Pack)",
      images: [
        "https://image.hm.com/assets/hm/52/03/5203ba838ccd789052aeeec170f011d8817c2769.jpg?imwidth=2160&w=800&h=800&fit=crop",
        "https://cdn.mall.adeptmind.ai/https%253A%252F%252Fimage.hm.com%252Fassets%252Fhm%252F27%252Fe1%252F27e15677ac402097ad268a20e60f26e6be2ffafe.jpg%253Fimwidth%253D2160_640x.webp?w=800&h=800&fit=crop",
        "https://assets.ajio.com/medias/sys_master/root/20250505/AQlV/6818c9b455340d4b4f14c43f/-286Wx359H-700331258-blue-MODEL.jpg?w=800&h=800&fit=crop",
      ],
      price: 24.99,
      discountedPercentage: 30,
      stock: 150,
      soldQuantity: 567,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "H&M")?.name || "H&M",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Soft cotton t-shirts in basic colors. Essential wardrobe staples for everyday wear.",
      tags: ["t-shirt", "basics", "cotton", "pack"],
    },
    {
      _type: "fashion",
      name: "Puma RS-X Sneakers",
      images: [
        "https://rukminim2.flixcart.com/image/480/640/xif0q/shoe/g/m/b/-original-imahfhjup39qfhrd.jpeg?q=90&w=800&h=800&fit=crop",
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/369666/02/sv01/fnd/IND/fmt/png/RS-X-Shoes?w=800&h=800&fit=crop",
        "https://img01.ztat.net/article/spp-media-p1/fba6a1edae7f4db0bbffe84bb8ae9c14/ad8d6b1d216c4de684dd9a95bc974726.jpg?imwidth=762&w=800&h=800&fit=crop",
      ],
      price: 99.99,
      discountedPercentage: 25,
      stock: 75,
      soldQuantity: 312,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Puma")?.name || "Puma",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Retro-inspired sneakers with bold design and comfortable cushioning. Perfect for street style.",
      tags: ["sneakers", "retro", "comfortable", "streetwear"],
    },
    {
      _type: "fashion",
      name: "Levi's 501 Original Jeans",
      images: [
        "https://www.fashiola.in/product-list/119702638.webp?w=800&h=800&fit=crop",
        "https://images-cdn.ubuy.co.in/64d12d6390d733594a491388-levi-s-men-s-501-original-fit-jeans.jpg?w=800&h=800&fit=crop",
        "https://i5.walmartimages.com/seo/Levi-s-Men-s-501-Original-Fit-Stonewashed-Regular-Straight-Leg-Jeans-00501-0134-38W-x-29L-US_0f9b0e59-5a45-47db-88f4-481300aa4bda.fdd3c1b7ee410dfb06434f0417388d71.jpeg?w=800&h=800&fit=crop",
      ],
      price: 89.99,
      discountedPercentage: 15,
      stock: 85,
      soldQuantity: 445,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Levi's")?.name || "Levi's",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Iconic straight-leg jeans with button fly. The original 501 fit that never goes out of style.",
      tags: ["jeans", "denim", "classic", "501"],
    },
    {
      _type: "fashion",
      name: "Uniqlo Ultra Light Down Jacket",
      images: [
        "https://images-cdn.ubuy.co.in/6938a0c968cef62ad3078adf-uniqlo-mens-ultra-light-down-jacket.jpg?w=800&h=800&fit=crop",
        "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/470067/item/vngoods_09_470067_3x4.jpg?w=800&h=800&fit=crop",
        "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/469869/sub/goods_469869_sub14_3x4.jpg?width=750&w=800&h=800&fit=crop",
      ],
      price: 69.99,
      discountedPercentage: 22,
      stock: 70,
      soldQuantity: 289,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Uniqlo")?.name || "Uniqlo",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Lightweight and packable down jacket. Perfect for travel and layering in cool weather.",
      tags: ["jacket", "down", "lightweight", "travel"],
    },
    {
      _type: "fashion",
      name: "Zara High-Waisted Wide Leg Pants",
      images: [
        "https://static.zara.net/assets/public/f8cd/779e/dbef499dab53/544ef96060ac/00340244407-p/00340244407-p.jpg?ts=1756291953735&w=800&h=800&fit=crop",
        "https://static.zara.net/assets/public/f366/be98/3e2d479db577/ea5d6ded39cf/09863241406-a3/09863241406-a3.jpg?ts=1754649847680&w=800&h=800&fit=crop",
        "https://static.zara.net/assets/public/f271/a173/fc4b4bfd9c54/70dc8787b30f/09170883710-a5/09170883710-a5.jpg?ts=1760626416162&w=800&h=800&fit=crop",
      ],
      price: 59.99,
      discountedPercentage: 18,
      stock: 55,
      soldQuantity: 178,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Zara")?.name || "Zara",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Trendy high-waisted wide leg pants in premium fabric. Perfect for office and casual wear.",
      tags: ["pants", "wide-leg", "trendy", "office"],
    },
    {
      _type: "fashion",
      name: "H&M Linen Blazer",
      images: [
        "https://image.hm.com/assets/hm/87/fb/87fb94a35e39638c5bfc4370106e7c0216bd07c1.jpg?imwidth=2160&w=800&h=800&fit=crop",
        "https://image.hm.com/assets/hm/bf/88/bf88942513beb13310e9e2497e864d3f9de13e52.jpg?imwidth=2160&w=800&h=800&fit=crop",
        "https://image.hm.com/assets/hm/5a/fe/5afe483adb3ee2619b93d2dbe6657e705a6a6830.jpg?imwidth=786&w=800&h=800&fit=crop",
      ],
      price: 49.99,
      discountedPercentage: 35,
      stock: 45,
      soldQuantity: 156,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "H&M")?.name || "H&M",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Lightweight linen blazer perfect for summer. Versatile piece that works for office and events.",
      tags: ["blazer", "linen", "summer", "office"],
    },
    {
      _type: "fashion",
      name: "Puma Classic Suede Sneakers",
      images: [
        "https://m.media-amazon.com/images/I/71HjpwKecFL._AC_UY1000_.jpg?w=800&h=800&fit=crop",
        "https://8f08a8-ss.akinoncloudcdn.com/products/2024/05/30/28899116/1c9ea21d-a479-4e70-9ebf-0bc74bf9f08f_size3840_cropCenter.jpg?w=800&h=800&fit=crop",
        "https://m.media-amazon.com/images/I/61urxeaRRcL._AC_SX535_.jpg?w=800&h=800&fit=crop",
      ],
      price: 79.99,
      discountedPercentage: 20,
      stock: 80,
      soldQuantity: 267,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Puma")?.name || "Puma",
      badge: false,
      isAvailable: true,
      offer: false,
      description: "Classic suede sneakers with retro design. Comfortable and stylish for everyday wear.",
      tags: ["sneakers", "suede", "classic", "casual"],
    },
    {
      _type: "fashion",
      name: "Uniqlo Cotton Crew Neck Sweater",
      images: [
        "https://image.uniqlo.com/UQ/ST3/in/imagesgoods/460940/item/ingoods_44_460940_3x4.jpg?width=494&w=800&h=800&fit=crop",
        "https://image.uniqlo.com/UQ/ST3/in/imagesgoods/475053/sub/ingoods_475053_sub3_3x4.jpg?width=494&w=800&h=800&fit=crop",
        "https://image.uniqlo.com/UQ/ST3/in/imagesgoods/475053/sub/ingoods_475053_sub6_3x4.jpg?width=494&w=800&h=800&fit=crop",
      ],
      price: 29.99,
      discountedPercentage: 25,
      stock: 100,
      soldQuantity: 423,
      category: categories.find((c) => c.name === "Fashion")?.name || "Fashion",
      brand: brands.find((b) => b.name === "Uniqlo")?.name || "Uniqlo",
      badge: false,
      isAvailable: true,
      offer: true,
      description: "Soft cotton sweater in multiple colors. Essential layering piece for cool weather.",
      tags: ["sweater", "cotton", "warm", "basics"],
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

    // Create admin from .env
    await createAdminFromEnv();

    console.log("\n✅ Database seeding completed successfully!");
    console.log("\nSummary:");
    console.log(`- Categories: ${categories.length}`);
    console.log(`- Brands: ${brands.length}`);
    console.log(`- Products: 33 (including New Arrivals, Best Sellers, and Special Offers)`);
    console.log("\n📝 Product Distribution:");
    console.log("   - New Arrivals: 4 products");
    console.log("   - Best Sellers: 5 products");
    console.log("   - Special Offers: 6 products");
    console.log("   - Regular Products: 18 products");
    console.log("\n🏷️ Product Types:");
    console.log("   - Electronics: Products with _type: 'electronics'");
    console.log("   - Fashion: Products with _type: 'fashion'");
    console.log("   - Home & Kitchen: Products with _type: 'home_kitchen'");
    console.log("   - Best Sellers: Products with _type: 'best_sellers'");
    console.log("   - New Arrivals: Products with _type: 'new_arrivals'");
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