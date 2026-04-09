require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Fragrance = require('./models/Fragrance');
const Question = require('./models/Question');
const Combination = require('./models/Combination');

const seedDatabase = async () => {
  try {
    // 1. Connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB... 🌱');

    // 2. Clear Existing Data
    await User.deleteMany({});
    await Fragrance.deleteMany({});
    await Question.deleteMany({});
    await Combination.deleteMany({});
    console.log('Database cleared.');

    // 3. Create Singleton Admin
    const admin = await User.create({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin'
    });
    console.log('Admin created.');

    // 4. Seed 22 Fragrances (Weighted Tags)
    const fragranceData = [
      { name: "Maison Margiela – Sailing Day", archetype: "The Pure Voyager", category: "Aquatic", tags: { A: 10, B: 0, C: 0, D: 0 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702694/Maison_Margiela-Sailing_Day_lxry5a.png" },
      { name: "Bleu de Chanel", archetype: "The Coastal Trail", category: "Aquatic", tags: { A: 7.5, B: 2.5, C: 0, D: 0 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702706/Bleu_de_Chanel_oyu0vj.png" },
      { name: "Byredo – Blanche", archetype: "The Morning Mist", category: "Aquatic", tags: { A: 7.5, B: 0, C: 2.5, D: 0 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702778/Byredo_Blanche_tvxbeb.png" },
      { name: "Dior – Sauvage", archetype: "The Electric Storm", category: "Aquatic", tags: { A: 7.5, B: 0, C: 0, D: 2.5 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702777/Dior_Sauvage_v1zdnm.png" },
      { name: "Aesop – Hwyl", archetype: "The Ancient Forest", category: "Earthy", tags: { A: 0, B: 10, C: 0, D: 0 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702877/Aesop_Hwyl_acf8of.png" },
      { name: "Terre d'Hermès", archetype: "The Grounded Explorer", category: "Earthy", tags: { A: 2.5, B: 7.5, C: 0, D: 0 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702909/Hermes_Terre-d-Hermes_z9gdta.png" },
      { name: "Byredo – Mojave Ghost", archetype: "The Desert Ghost", category: "Earthy", tags: { A: 0, B: 7.5, C: 2.5, D: 0 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702905/Byredo_Mojave-Ghost_wexyt6.png" },
      { name: "Tom Ford – Oud Wood", archetype: "The Smoldering Library", category: "Earthy", tags: { A: 0, B: 7.5, C: 0, D: 2.5 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702923/Tom_Ford_Oud-Wood_rdj26p.png" },
      { name: "Parfums de Marly – Delina", archetype: "The Velvet Petal", category: "Ethereal", tags: { A: 0, B: 0, C: 10, D: 0 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703302/Parfums_de_Marly_Delina_gu9cvc.png" },
      { name: "Diptyque – Do Son", archetype: "The Dewy Garden", category: "Ethereal", tags: { A: 2.5, B: 0, C: 7.5, D: 0 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703303/Diptyque_Do-Son_t6vnmu.png" },
      { name: "Diptyque – Philosykos", archetype: "The Bohemian Fig", category: "Ethereal", tags: { A: 0, B: 2.5, C: 7.5, D: 0 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703302/Diptyque_Philosykos_oe7uh7.png" },
      { name: "Kilian – Love, Don't Be Shy", archetype: "The Forbidden Fruit", category: "Ethereal", tags: { A: 0, B: 0, C: 7.5, D: 2.5 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703303/Kilian_Love-Dont-Be-Shy_qeears.png" },
      { name: "Tom Ford – Tobacco Vanille", archetype: "The Midnight Alchemist", category: "Noir", tags: { A: 0, B: 0, C: 0, D: 10 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703414/Tom_Ford_Tobacco-Vanille_ntxzmu.png" },
      { name: "YSL – L'Homme", archetype: "The Ginger Spark", category: "Noir", tags: { A: 2.5, B: 0, C: 0, D: 7.5 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703415/YSL_L-Homme_vrxubq.png" },
      { name: "Maison Margiela – By the Fireplace", archetype: "The Fireside Scholar", category: "Noir", tags: { A: 0, B: 2.5, C: 0, D: 7.5 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703415/Maison_Margiela_By-the-Fireplace_ub14z4.png" },
      { name: "Frederic Malle – Portrait of a Lady", archetype: "The Dark Rose", category: "Noir", tags: { A: 0, B: 0, C: 2.5, D: 7.5 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703413/Frederic_Malle_Portrait-of-a-Lady_vzjud8.png" },
      // Rare Blends
      { name: "Jo Malone – Wood Sage & Sea Salt", archetype: "Coastal Driftwood", category: "Rare Blend", tags: { A: 5, B: 5, C: 0, D: 0 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703507/Jo_Malone_Wood-Sage-and-Sea-Salt_zqy1jo.png" },
      { name: "Armani – Acqua di Gioia", archetype: "Rainy Garden", category: "Rare Blend", tags: { A: 5, B: 0, C: 5, D: 0 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703508/Armani_Acqua-di-Gioia_ss8hvn.png" },
      { name: "Prada – Luna Rossa Ocean", archetype: "Cold Spice", category: "Rare Blend", tags: { A: 5, B: 0, C: 0, D: 5 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703507/Prada_Luna-Rossa-Ocean_yhpfqp.png" },
      { name: "Le Labo – Rose 31", archetype: "Dark Florals", category: "Rare Blend", tags: { A: 0, B: 5, C: 5, D: 0 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703509/Le_Labo_Rose-31_c7wbjf.png"},
      { name: "Maison Margiela – Jazz Club", archetype: "Smoky Library", category: "Rare Blend", tags: { A: 0, B: 5, C: 0, D: 5} , photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703513/Maison_Margiela_Jazz-Club_eusyuq.png" },
      { name: "YSL – Libre Intense", archetype: "Dangerous Romance", category: "Rare Blend", tags: { A: 0, B: 0, C: 5, D: 5 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703511/YSL_Libre-Intense_mzppa9.png" },
      { name: "Maison Francis Kurkdjian - 724", archetype: "The Alchemist", category: "Rare Blend", tags: { A: 2.5, B: 2.5, C: 2.5, D: 2.5 }, photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703513/Maison_Francis_Kurkdjian_724_gand4g.png" }
    ];

    const fragrances = fragranceData.map(f => ({ ...f, createdBy: admin._id, description: "Seeded fragrance profile." }));
    await Fragrance.insertMany(fragrances);
    console.log('23 Fragrances seeded.');

    // 5. Seed 4 Dynamic Questions
    const questions = [
      {
        order: 1,
        storyTitle: "The Awakening",
        storyText: "You wake up in a place between dreams. What is the first thing you sense?",
        options: [
          { text: "The salty mist of an endless ocean.", vibeImpact: "A", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701675/a_zlowdr.png" },
          { text: "The scent of rain on dry, cedar earth.", vibeImpact: "B", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701674/b_tdbpu4.png"  },
          { text: "A floating garden of white jasmine.", vibeImpact: "C", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701674/c_guh97f.png"  },
          { text: "The smoke of a distant, mysterious fire.", vibeImpact: "D", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701675/d_qj4dsm.png"  }
        ]
      },
      {
        order: 2,
        storyTitle: "The Journey",
        storyText: "A path opens before you. Where does it lead?",
        options: [
          { text: "Down to a hidden turquoise cove.", vibeImpact: "A", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701715/a_udvw8i.png"  },
          { text: "Into a dense, ancient pine forest.", vibeImpact: "B", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701715/b_nin2jm.png"  },
          { text: "Toward a sun-drenched silk palace.", vibeImpact: "C", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701715/c_ccsx0h.png"  },
          { text: "Through a dark alley of neon and jazz.", vibeImpact: "D", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701715/d_max02z.png"  }
        ]
      },
      {
        order: 3,
        storyTitle: "The Encounter",
        storyText: "You meet a stranger who offers you a gift. You choose...",
        options: [
          { text: "A jar of sea glass and frozen spray.", vibeImpact: "A", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701771/a_vww7aw.png"  },
          { text: "A rough-hewn iron key to the earth.", vibeImpact: "B", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701770/b_io0ny2.png" },
          { text: "A single peach nectar flower.", vibeImpact: "C", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701771/c_wclm36.png"  },
          { text: "A leather-bound book of secrets.", vibeImpact: "D", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701771/d_pxzvef.png"  }
        ]
      },
      {
        order: 4,
        storyTitle: "The Destination",
        storyText: "The sun is setting. What color is the sky?",
        options: [
          { text: "The Blue Hour: Deep and refreshing.", vibeImpact: "A", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701817/a_sgswtb.png"  },
          { text: "The Golden Hour: Warm and grounded.", vibeImpact: "B", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701817/b_rj0lte.png"  },
          { text: "The Velvet Hour: Soft and ethereal.", vibeImpact: "C", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701818/c_wer3bd.png"  },
          { text: "Midnight: Dark and intoxicating.", vibeImpact: "D", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701819/d_k4ed1a.png"  }
        ]
      }
    ];
    await Question.insertMany(questions);
    console.log('4 Questions seeded.');

    // 6. Seed Combinations (Result Profiles)
    const combinations = fragranceData.map(f => ({
      archetypeName: f.archetype || f.vibe,
      realFragranceMatch: f.name,
      vibe: f.category,
      description: `You are a match for ${f.name}. Your profile leans toward ${f.category} elements.`
    }));
    await Combination.insertMany(combinations);
    console.log('Archetype profiles seeded.');

    console.log('Database Seeding Complete! 🌱');
    process.exit();
  } catch (err) {
    console.error('Seeding Error:', err);
    process.exit(1);
  }
};

seedDatabase();