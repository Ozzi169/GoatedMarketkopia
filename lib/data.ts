// Goated Buy - Real seller data from Weidian

export interface Seller {
  id: string
  name: string
  avatar: string
  rating: number
  reviewCount: number
  verified: boolean
  categories: string[]
  platforms: {
    yupoo?: string
    taobao?: string
    weidian?: string
    whatsapp?: string
  }
  description: string
  responseTime: string
  salesCount: number
  joinedDate: string
  location?: string
}

export interface Product {
  id: string
  name: string
  brand: string
  category: string
  price: string
  images: string[]
  seller: {
    id: string
    name: string
  }
  link: string
  platform: "taobao" | "weidian" | "yupoo"
  upvotes: number
  comments: number
  createdAt: string
  tags: string[]
}

export interface QCPost {
  id: string
  productName: string
  brand: string
  images: string[]
  seller: {
    id: string
    name: string
  }
  price: string
  weight: string
  rating: number
  review: string
  upvotes: number
  comments: number
  createdAt: string
  author: string
}

// Real Weidian sellers
export const sellers: Seller[] = [
  {
    id: "1836811195",
    name: "JOJOJersey",
    avatar: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop",
    rating: 4.8,
    reviewCount: 1523,
    verified: true,
    categories: ["Jerseys", "Sportswear", "Football"],
    platforms: {
      weidian: "https://weidian.com/?userid=1836811195",
    },
    description: "Jersey specialist. Wide selection of sports jerseys and athletic wear.",
    responseTime: "< 24 hours",
    salesCount: 28000,
    joinedDate: "2020",
  },
  {
    id: "1731179625",
    name: "GTAL",
    avatar: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop",
    rating: 4.7,
    reviewCount: 892,
    verified: true,
    categories: ["Designer", "Luxury", "Footwear"],
    platforms: {
      weidian: "https://weidian.com/?userid=1731179625&spider_token=b9dc",
      yupoo: "https://lulux.x.yupoo.com/",
      whatsapp: "+86 18954893534",
    },
    description: "Premium designer pieces. Yupoo album available. 31% return customer rate. Based in Foshan.",
    responseTime: "< 12 hours",
    salesCount: 15000,
    joinedDate: "2021",
    location: "Foshan",
  },
  {
    id: "1764540219",
    name: "GZX ZEROTOX",
    avatar: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    rating: 4.6,
    reviewCount: 456,
    verified: true,
    categories: ["Sneakers", "Streetwear", "Sportswear"],
    platforms: {
      weidian: "https://weidian.com/?userid=1764540219&spider_token=5742",
    },
    description: "Go from Zero to X (eXtreme). Quality streetwear and sneakers.",
    responseTime: "< 24 hours",
    salesCount: 8500,
    joinedDate: "2022",
  },
  {
    id: "1699427843",
    name: "CL Louboutin",
    avatar: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop",
    rating: 4.9,
    reviewCount: 734,
    verified: true,
    categories: ["Luxury Footwear", "Designer Shoes", "Heels"],
    platforms: {
      weidian: "https://weidian.com/?userid=1699427843&spider_token=9f63",
    },
    description: "Specialist in luxury footwear. Premium quality designer shoes. Based in Xiamen.",
    responseTime: "< 48 hours",
    salesCount: 12000,
    joinedDate: "2019",
    location: "Xiamen",
  },
]

export const products: Product[] = [
  // JOJOJersey products
  {
    id: "1",
    name: "Manchester United Home Jersey 24/25",
    brand: "Nike",
    category: "Jerseys",
    price: "¥89",
    images: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop",
    ],
    seller: { id: "1836811195", name: "JOJOJersey" },
    link: "https://weidian.com/?userid=1836811195",
    platform: "weidian",
    upvotes: 847,
    comments: 124,
    createdAt: "2024-01-15",
    tags: ["Football", "Premier League", "Jersey"],
  },
  {
    id: "2",
    name: "Real Madrid Away Jersey 24/25",
    brand: "Adidas",
    category: "Jerseys",
    price: "¥85",
    images: [
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop",
    ],
    seller: { id: "1836811195", name: "JOJOJersey" },
    link: "https://weidian.com/?userid=1836811195",
    platform: "weidian",
    upvotes: 632,
    comments: 98,
    createdAt: "2024-01-14",
    tags: ["Football", "La Liga", "Jersey"],
  },
  // GTAL products
  {
    id: "3",
    name: "Designer Loafers",
    brand: "Gucci",
    category: "Footwear",
    price: "¥580",
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=400&fit=crop",
    ],
    seller: { id: "1731179625", name: "GTAL" },
    link: "https://weidian.com/?userid=1731179625&spider_token=b9dc",
    platform: "weidian",
    upvotes: 523,
    comments: 87,
    createdAt: "2024-01-13",
    tags: ["Designer", "Loafers", "Luxury"],
  },
  {
    id: "4",
    name: "Leather Belt GG Buckle",
    brand: "Gucci",
    category: "Accessories",
    price: "¥280",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    ],
    seller: { id: "1731179625", name: "GTAL" },
    link: "https://weidian.com/?userid=1731179625&spider_token=b9dc",
    platform: "weidian",
    upvotes: 445,
    comments: 67,
    createdAt: "2024-01-12",
    tags: ["Belt", "Gucci", "Luxury"],
  },
  // GZX ZEROTOX products
  {
    id: "5",
    name: "Air Jordan 4 Retro",
    brand: "Nike",
    category: "Footwear",
    price: "¥450",
    images: [
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
    ],
    seller: { id: "1764540219", name: "GZX ZEROTOX" },
    link: "https://weidian.com/?userid=1764540219&spider_token=5742",
    platform: "weidian",
    upvotes: 1247,
    comments: 234,
    createdAt: "2024-01-11",
    tags: ["Jordan", "AJ4", "Sneakers"],
  },
  {
    id: "6",
    name: "Dunk Low Panda",
    brand: "Nike",
    category: "Footwear",
    price: "¥320",
    images: [
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400&h=400&fit=crop",
    ],
    seller: { id: "1764540219", name: "GZX ZEROTOX" },
    link: "https://weidian.com/?userid=1764540219&spider_token=5742",
    platform: "weidian",
    upvotes: 1893,
    comments: 312,
    createdAt: "2024-01-10",
    tags: ["Nike", "Dunk", "Sneakers"],
  },
  // CL Louboutin products
  {
    id: "7",
    name: "So Kate 120mm Red Sole",
    brand: "Christian Louboutin",
    category: "Footwear",
    price: "¥680",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
    ],
    seller: { id: "1699427843", name: "CL Louboutin" },
    link: "https://weidian.com/?userid=1699427843&spider_token=9f63",
    platform: "weidian",
    upvotes: 756,
    comments: 143,
    createdAt: "2024-01-09",
    tags: ["Louboutin", "Heels", "Luxury"],
  },
  {
    id: "8",
    name: "Pigalle Follies 100mm",
    brand: "Christian Louboutin",
    category: "Footwear",
    price: "¥620",
    images: [
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&h=400&fit=crop",
    ],
    seller: { id: "1699427843", name: "CL Louboutin" },
    link: "https://weidian.com/?userid=1699427843&spider_token=9f63",
    platform: "weidian",
    upvotes: 289,
    comments: 41,
    createdAt: "2024-01-08",
    tags: ["Louboutin", "Heels", "Classic"],
  },
]

export const qcPosts: QCPost[] = [
  {
    id: "1",
    productName: "Barcelona Home Jersey 24/25",
    brand: "Nike",
    images: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop",
    ],
    seller: { id: "1836811195", name: "JOJOJersey" },
    price: "¥89",
    weight: "280g",
    rating: 5,
    review: "Excellent quality from JOJOJersey. Stitching is clean, badges look great. Fast shipping too!",
    upvotes: 234,
    comments: 45,
    createdAt: "2024-01-16",
    author: "footballfan99",
  },
  {
    id: "2",
    productName: "Ace Leather Sneakers",
    brand: "Gucci",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop",
    ],
    seller: { id: "1731179625", name: "GTAL" },
    price: "¥650",
    weight: "1100g",
    rating: 5,
    review: "GTAL is my go-to for designer pieces. Leather quality is excellent, details are spot on. Yupoo album makes ordering easy.",
    upvotes: 187,
    comments: 32,
    createdAt: "2024-01-15",
    author: "luxurylover",
  },
  {
    id: "3",
    productName: "Air Jordan 1 High OG",
    brand: "Nike",
    images: [
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    ],
    seller: { id: "1764540219", name: "GZX ZEROTOX" },
    price: "¥480",
    weight: "1200g",
    rating: 5,
    review: "GZX ZEROTOX delivers again! Shape is perfect, leather quality is solid. These are my go-to Jordans now.",
    upvotes: 521,
    comments: 89,
    createdAt: "2024-01-14",
    author: "kickscollector",
  },
  {
    id: "4",
    productName: "So Kate 120mm Black Patent",
    brand: "Christian Louboutin",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&h=400&fit=crop",
    ],
    seller: { id: "1699427843", name: "CL Louboutin" },
    price: "¥680",
    weight: "650g",
    rating: 5,
    review: "The red sole is perfect, leather is buttery soft. CL Louboutin in Xiamen is the best for luxury footwear. Packaging was amazing.",
    upvotes: 312,
    comments: 54,
    createdAt: "2024-01-13",
    author: "fashionista",
  },
]

export const categories = [
  "All",
  "Footwear",
  "Jerseys",
  "Accessories",
  "Bags",
  "Clothing",
]

export const brands = [
  "All",
  "Nike",
  "Adidas",
  "Christian Louboutin",
  "Gucci",
  "Louis Vuitton",
  "Balenciaga",
]

export const platforms = ["All", "Weidian", "Taobao", "Yupoo"]

export const stats = {
  totalSellers: 4,
  totalProducts: 8,
  totalQCPosts: 4,
  activeUsers: 12500,
}
