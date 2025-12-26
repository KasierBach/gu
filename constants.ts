import { Grade, Product, Series, ExchangePost } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'RX-78-2 Gundam Ver. 3.0',
    series: Series.UC,
    grade: Grade.MG,
    scale: '1/100',
    price: 60,
    image: '/images/rx78_gundam.png',
    description: 'The origin of the legend. This Master Grade kit features the iconic RX-78-2 with incredible articulation and detail reminiscent of the 1/1 Gundam statue.',
    difficulty: 'Intermediate',
    tags: ['Best Seller', 'Classic'],
    lore: {
      pilot: 'Amuro Ray',
      height: '18.0m',
      armaments: ['Beam Rifle', 'Beam Saber x2', 'Hyper Bazooka', 'Gundam Hammer']
    }
  },
  {
    id: '2',
    name: 'GAT-X105 Strike Gundam',
    series: Series.SEED,
    grade: Grade.HG,
    scale: '1/144',
    price: 25,
    salePrice: 22.50,
    image: '/images/strike_gundam.png',
    description: 'A versatile mobile suit from the Cosmic Era. Features the Aile Striker pack and excellent color separation for a High Grade kit.',
    difficulty: 'Beginner',
    lore: {
      pilot: 'Kira Yamato',
      height: '17.72m',
      armaments: ['Armor Schneider x2', '57mm Beam Rifle', 'Shield']
    }
  },
  {
    id: '3',
    name: 'RX-0 Unicorn Gundam',
    series: Series.UC,
    grade: Grade.RG,
    scale: '1/144',
    price: 45,
    image: '/images/unicorn_gundam.png',
    description: 'The beast of possibility. This Real Grade kit transforms between Unicorn and Destroy mode despite its small scale.',
    difficulty: 'Advanced',
    tags: ['Transformation'],
    lore: {
      pilot: 'Banagher Links',
      height: '19.7m (Unicorn Mode)',
      armaments: ['Beam Magnum', 'Hyper Bazooka', 'Shield', 'Beam Saber x4']
    }
  },
  {
    id: '4',
    name: 'ASW-G-08 Gundam Barbatos',
    series: Series.IBO,
    grade: Grade.MG,
    scale: '1/100',
    price: 55,
    salePrice: 44,
    image: '/images/barbatos_gundam.png',
    description: 'The devil of Tekkadan. Features a full inner frame showcasing the Gundam Frame distinct to the IBO series.',
    difficulty: 'Intermediate',
    tags: ['Fan Favorite'],
    lore: {
      pilot: 'Mikazuki Augus',
      height: '18.0m',
      armaments: ['Mace', 'Long Sword', 'Smoothbore Gun']
    }
  },
  {
    id: '5',
    name: 'ZGMF-X20A Strike Freedom',
    series: Series.SEED,
    grade: Grade.PG,
    scale: '1/60',
    price: 220,
    image: '/images/strike_freedom_gundam.png',
    description: 'The ultimate coordinator\'s wings. A massive Perfect Grade kit with gold-plated inner frame parts and dragoons.',
    difficulty: 'Expert',
    tags: ['Premium', 'Gold Plated'],
    lore: {
      pilot: 'Kira Yamato',
      height: '18.88m',
      armaments: ['Super DRAGOON', 'Beam Saber x2', 'Beam Rifle x2', 'Railgun x2']
    }
  },
  {
    id: '6',
    name: 'XVX-016 Gundam Aerial',
    series: Series.WITCH,
    grade: Grade.HG,
    scale: '1/144',
    price: 20,
    image: '/images/aerial_gundam.png',
    description: 'The witch from Mercury. Features translucent shell unit parts and bit staves functionality.',
    difficulty: 'Beginner',
    isNew: true,
    tags: ['New Arrival', 'Anime Trending'],
    lore: {
      pilot: 'Suletta Mercury',
      height: '18.0m',
      armaments: ['Beam Rifle', 'Beam Saber x2', 'GUND-BITS (Escutcheon)']
    }
  },
  {
    id: '7',
    name: 'GN-001 Gundam Exia',
    series: Series.OO,
    grade: Grade.RG,
    scale: '1/144',
    price: 35,
    salePrice: 28,
    image: '/images/exia_gundam.jpg',
    description: 'The Seven Swords. Features holographic GN cable parts and extreme articulation.',
    difficulty: 'Intermediate',
    lore: {
      pilot: 'Setsuna F. Seiei',
      height: '18.3m',
      armaments: ['GN Sword', 'GN Long Blade', 'GN Short Blade', 'GN Beam Saber x2', 'GN Beam Dagger x2']
    }
  },
  {
    id: '8',
    name: 'MSN-04 Sazabi Ver. Ka',
    series: Series.UC,
    grade: Grade.MG,
    scale: '1/100',
    price: 95,
    image: '/images/sazabi_gundam.jpg',
    description: 'Char Aznable\'s final mobile suit. A massive kit with intricate mechanical details designed by Katoki Hajime.',
    difficulty: 'Advanced',
    tags: ['Masterpiece', 'Large Kit'],
    lore: {
      pilot: 'Char Aznable',
      height: '25.6m',
      armaments: ['Beam Shot Rifle', 'Funnel x6', 'Beam Tomahawk', 'Shield']
    }
  }
];

export const INITIAL_EXCHANGE_POSTS: ExchangePost[] = [
  {
    id: 'ex-1',
    author: 'Amuro Ray',
    have: 'MG RX-78-2 Ver 3.0',
    want: 'RG Nu Gundam',
    condition: 'New (In Box)',
    date: '2023-10-25'
  },
  {
    id: 'ex-2',
    author: 'Char Aznable',
    have: 'HG Zaku II Red Comet',
    want: 'MG Sazabi',
    condition: 'Built (With Box)',
    date: '2023-10-26'
  }
];