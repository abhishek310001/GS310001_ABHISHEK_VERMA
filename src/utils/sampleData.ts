import { SKU, Store } from '../types';

// Sample Stores
export const sampleStores: Store[] = [
  {
    id: 'ST035',
    seqNo: 1,
    label: 'San Francisco Bay Trends',
    city: 'San Francisco',
    state: 'CA'
  },
  {
    id: 'ST046',
    seqNo: 2,
    label: 'Phoenix Sunwear',
    city: 'Phoenix',
    state: 'AZ'
  },
  {
    id: 'ST064',
    seqNo: 3,
    label: 'Dallas Ranch Supply',
    city: 'Dallas',
    state: 'TX'
  },
  {
    id: 'ST066',
    seqNo: 4,
    label: 'Atlanta Outfitters',
    city: 'Atlanta',
    state: 'GA'
  },
  {
    id: 'ST073',
    seqNo: 5,
    label: 'Nashville Melody Music Store',
    city: 'Nashville',
    state: 'TN'
  },
  {
    id: 'ST074',
    seqNo: 6,
    label: 'New York Empire Eats',
    city: 'New York',
    state: 'NY'
  },
  {
    id: 'ST091',
    seqNo: 7,
    label: 'Denver Peaks Outdoor',
    city: 'Denver',
    state: 'CO'
  },
  {
    id: 'ST094',
    seqNo: 8,
    label: 'Philadelphia Liberty Market',
    city: 'Philadelphia',
    state: 'PA'
  },
  {
    id: 'ST097',
    seqNo: 9,
    label: 'Boston Harbor Books',
    city: 'Boston',
    state: 'MA'
  },
  {
    id: 'ST101',
    seqNo: 10,
    label: 'Austin Vibe Co.',
    city: 'Austin',
    state: 'TX'
  },
  {
    id: 'ST131',
    seqNo: 11,
    label: 'Los Angeles Luxe',
    city: 'Los Angeles',
    state: 'CA'
  },
  {
    id: 'ST150',
    seqNo: 12,
    label: 'Houston Harvest Market',
    city: 'Houston',
    state: 'TX'
  },
  {
    id: 'ST151',
    seqNo: 13,
    label: 'Portland Evergreen Goods',
    city: 'Portland',
    state: 'OR'
  },
  {
    id: 'ST156',
    seqNo: 14,
    label: 'Chicago Charm Boutique',
    city: 'Chicago',
    state: 'IL'
  },
  {
    id: 'ST163',
    seqNo: 15,
    label: 'Las Vegas Neon Treasures',
    city: 'Las Vegas',
    state: 'NV'
  },
  {
    id: 'ST175',
    seqNo: 16,
    label: 'Seattle Skyline Goods',
    city: 'Seattle',
    state: 'WA'
  },
  {
    id: 'ST176',
    seqNo: 17,
    label: 'Miami Breeze Apparel',
    city: 'Miami',
    state: 'FL'
  },
  {
    id: 'ST177',
    seqNo: 18,
    label: 'San Diego Wave Surf Shop',
    city: 'San Diego',
    state: 'CA'
  },
  {
    id: 'ST193',
    seqNo: 19,
    label: 'Charlotte Queen\'s Closet',
    city: 'Charlotte',
    state: 'NC'
  },
  {
    id: 'ST208',
    seqNo: 20,
    label: 'Detroit Motor Gear',
    city: 'Detroit',
    state: 'MI'
  }
];

// Sample SKUs
export const sampleSKUs: SKU[] = [
    {
      id: 'SK00158',
      label: 'Crew Neck Merino Wool Sweater',
      class: 'Tops',
      department: 'Men\'s Apparel',
      price: 114.99,
      cost: 18.28
    },
    {
      id: 'SK00269',
      label: 'Faux Leather Leggings',
      class: 'Jewelry',
      department: 'Footwear',
      price: 9.99,
      cost: 8.45
    },
    {
      id: 'SK00300',
      label: 'Fleece-Lined Parka',
      class: 'Jewelry',
      department: 'Unisex Accessories',
      price: 199.99,
      cost: 17.80
    },
    {
      id: 'SK00304',
      label: 'Cotton Polo Shirt',
      class: 'Tops',
      department: 'Women\'s Apparel',
      price: 139.99,
      cost: 10.78
    },
    {
      id: 'SK00766',
      label: 'Foldable Travel Hat',
      class: 'Tops',
      department: 'Footwear',
      price: 44.99,
      cost: 27.08
    },
    {
      id: 'SK00786',
      label: 'Chic Quilted Wallet',
      class: 'Bottoms',
      department: 'Footwear',
      price: 14.99,
      cost: 4.02
    },
    {
      id: 'SK00960',
      label: 'High-Slit Maxi Dress',
      class: 'Outerwear',
      department: 'Sportswear',
      price: 74.99,
      cost: 47.47
    },
    {
      id: 'SK01183',
      label: 'Turtleneck Cable Knit Sweater',
      class: 'Footwear',
      department: 'Footwear',
      price: 49.99,
      cost: 22.60
    },
    {
      id: 'SK01189',
      label: 'Retro-Inspired Sunglasses',
      class: 'Bottoms',
      department: 'Women\'s Apparel',
      price: 194.99,
      cost: 115.63
    },
    {
      id: 'SK01193',
      label: 'Stretch Denim Overalls',
      class: 'Bottoms',
      department: 'Unisex Accessories',
      price: 129.99,
      cost: 47.06
    },
    {
      id: 'SK01249',
      label: 'Adjustable Elastic Headband',
      class: 'Footwear',
      department: 'Women\'s Apparel',
      price: 19.99,
      cost: 1.34
    },
    {
      id: 'SK01319',
      label: 'Adjustable Baseball Cap',
      class: 'Jewelry',
      department: 'Men\'s Apparel',
      price: 4.99,
      cost: 2.29
    },
    {
      id: 'SK01349',
      label: 'Cotton Polo Shirt',
      class: 'Bottoms',
      department: 'Unisex Accessories',
      price: 114.99,
      cost: 60.94
    },
    {
      id: 'SK01549',
      label: 'Faux Suede Ankle Boots',
      class: 'Tops',
      department: 'Sportswear',
      price: 94.99,
      cost: 71.53
    },
    {
      id: 'SK01566',
      label: 'Striped Cotton Socks',
      class: 'Accessories',
      department: 'Sportswear',
      price: 9.99,
      cost: 6.91
    },
    {
      id: 'SK01642',
      label: 'Performance Compression Tights',
      class: 'Outerwear',
      department: 'Sportswear',
      price: 54.99,
      cost: 59.61
    },
    {
      id: 'SK01733',
      label: 'Vintage Logo Hoodie',
      class: 'Accessories',
      department: 'Men\'s Apparel',
      price: 94.99,
      cost: 84.45
    },
    {
      id: 'SK01896',
      label: 'Floral Chiffon Wrap Dress',
      class: 'Accessories',
      department: 'Unisex Accessories',
      price: 149.99,
      cost: 68.55
    },
    {
      id: 'SK01927',
      label: 'Asymmetrical Hem Skirt',
      class: 'Jewelry',
      department: 'Sportswear',
      price: 99.99,
      cost: 66.89
    },
    {
      id: 'SK01950',
      label: 'Slim Fit Pinstripe Suit',
      class: 'Bottoms',
      department: 'Women\'s Apparel',
      price: 99.99,
      cost: 13.30
    },
    {
      id: 'SK02029',
      label: 'Chunky Heel Sandals',
      class: 'Jewelry',
      department: 'Unisex Accessories',
      price: 89.99,
      cost: 46.70
    },
    {
      id: 'SK02429',
      label: 'Suede Fringe Vest',
      class: 'Bottoms',
      department: 'Footwear',
      price: 184.99,
      cost: 159.65
    }
  ];
