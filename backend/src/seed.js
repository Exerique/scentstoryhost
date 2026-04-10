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
      { name: "Maison Margiela – Sailing Day", 
        description: "This vibrant, aquatic fragrance is a pure summer escape, capturing the crisp, salty air of a coastal morning. Initial notes of aldehyde and sea salt accord create an instant fresh sensation, like clear water. A heart of iris and coriander adds depth, while a dry-down of red seaweed and amberwood provides a lasting, grounded, and clean finish.", 
        archetype: "The Pure Voyager", 
        category: "Aquatic", 
        tags: { A: 10, B: 0, C: 0, D: 0 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702694/Maison_Margiela-Sailing_Day_lxry5a.png" },
      { name: "Bleu de Chanel", 
        description: "An iconic and sophisticated woody-aromatic scent for men. The fragrance opens with a dynamic burst of fresh citrus and ginger, leading into a refined heart of aromatic mint and elegant cedar. Finally, a rich base of New Caledonian sandalwood and labdanum gives it a powerful, timeless, and seductive character that lingers all day.", 
        archetype: "The Coastal Trail", 
        category: "Aquatic", 
        tags: { A: 7.5, B: 2.5, C: 0, D: 0 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702706/Bleu_de_Chanel_oyu0vj.png" },
      { name: "Byredo – Blanche", 
        description: "Blanche is the ultimate clean scent, inspired by the texture of white cotton sheets and the purity of fresh laundry. A delicate interplay of aldehydes and white rose dominates the opening, creating a soft, almost powdery freshness. Peony and violet add a gentle floral heart, while the base is rounded out with musk and blonde woods for a comforting, subtle elegance.", 
        archetype: "The Morning Mist", 
        category: "Aquatic", 
        tags: { A: 7.5, B: 0, C: 2.5, D: 0 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702778/Byredo_Blanche_tvxbeb.png" },
      { name: "Dior – Sauvage", 
        description: "Bold, raw, and unmistakably masculine. Sauvage starts with a strong, spicy pepper and bergamot kick, offering an instant, powerful energy. The heart unfolds with Sichuan pepper and geranium, adding a sophisticated spiciness. A massive dose of Ambroxan in the base provides a distinctive, long-lasting, and modern ambery-woody trail.", 
        archetype: "The Electric Storm", 
        category: "Aquatic", 
        tags: { A: 7.5, B: 0, C: 0, D: 2.5 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702777/Dior_Sauvage_v1zdnm.png" },
      { name: "Aesop – Hwyl", 
        description: "Aesop Hwyl is an evocative, smoky, and woody fragrance that transports you to a quiet, ancient Japanese forest. It opens with an intense burst of aromatic spices and thyme, followed by a dark heart of cypress. The base of vetiver, frankincense, and moss creates a grounding, meditative, and deeply atmospheric scent with a unique, earthy sensuality.", 
        archetype: "The Ancient Forest", 
        category: "Earthy", tags: { A: 0, B: 10, C: 0, D: 0 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702877/Aesop_Hwyl_acf8of.png" },
      { name: "Terre d'Hermès", 
        description: "This is an elemental and grounded masterpiece. It opens with an unexpected combination of flint and grapefruit, creating a unique, earthy, and citrusy start. The fragrance evolves with a heart of geranium and pepper, leading into a deep, comforting base of cedar, vetiver, and patchouli. It is rugged, natural, and timelessly masculine.", 
        archetype: "The Grounded Explorer", 
        category: "Earthy", 
        tags: { A: 2.5, B: 7.5, C: 0, D: 0 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702909/Hermes_Terre-d-Hermes_z9gdta.png" },
      { name: "Byredo – Mojave Ghost", 
        description: " Inspired by the resilient xeric flowers of the Mojave Desert. This is an ethereal, slightly paradoxical floral-woody fragrance. It opens with sweet and musky ambrette and fresh sapodilla fruit. The heart reveals delicate notes of magnolia and violet. The base is an airy blend of musk, cedar, and sandalwood, creating a subtle, lingering, and beautiful aura.", 
        archetype: "The Desert Ghost", 
        category: "Earthy", 
        tags: { A: 0, B: 7.5, C: 2.5, D: 0 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702905/Byredo_Mojave-Ghost_wexyt6.png" },
      { name: "Tom Ford – Oud Wood", 
        description: "A sophisticated and deeply warm oud fragrance, perfect for cooler weather. This rich scent opens with a smoky blend of rosewood and cardamom. The heart is dominated by the complex, woody notes of agarwood (oud) and sandalwood. Base notes of vetiver, amber, and vanilla provide a smooth, luxurious, and highly comforting finish.", 
        archetype: "The Smoldering Library", 
        category: "Earthy", 
        tags: { A: 0, B: 7.5, C: 0, D: 2.5 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775702923/Tom_Ford_Oud-Wood_rdj26p.png" },
      { name: "Parfums de Marly – Delina", 
        description: "This powerful and feminine fruity-floral is centered on the Turkish rose. It opens with a vibrant, tart litchi and rhubarb note, mixed with bergamot. The heart is a bouquet of rose and peony, softened by vanilla. The dry-down of cashmere wood, vetiver, and musk creates a complex, long-lasting, and unforgettable signature.", 
        archetype: "The Velvet Petal", 
        category: "Ethereal", 
        tags: { A: 0, B: 0, C: 10, D: 0 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703302/Parfums_de_Marly_Delina_gu9cvc.png" },
      { name: "Diptyque – Do Son", 
        description: "For lovers of pure wood. Do Son is an authentic sandalwood fragrance, capturing the dry, comforting essence of sacred trees. It opens with a simple, clean combination of Italian cypress and cedar. The central note is a high-quality sandalwood from Goa, providing a warm, smooth, and meditative heart that feels close to the skin.", 
        archetype: "The Dewy Garden", 
        category: "Ethereal", 
        tags: { A: 2.5, B: 0, C: 7.5, D: 0 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703303/Diptyque_Do-Son_t6vnmu.png" },
      { name: "Diptyque – Philosykos", 
        description: "A masterful hyper-realistic interpretation of the fig tree in all its parts. The scent is green, woody, and subtly sweet. It opens with the fresh, green snap of fig leaves. A milky-sap accord adds a creamy, lactonic quality, leading to a heart of fig fruit. The base of white cedar provides a clean, woody foundation.", 
        archetype: "The Bohemian Fig", 
        category: "Ethereal", 
        tags: { A: 0, B: 2.5, C: 7.5, D: 0 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703302/Diptyque_Philosykos_oe7uh7.png" },
      { name: "Kilian – Love, Don't Be Shy", 
        description: "This is a famous, ultra-sweet gourmand powerhouse. The scent is an intoxicating blend of neroli and orange blossom, wrapped in a cloud of cotton candy and vanilla. Marshmallow and sugar notes dominate the heart and base, making it a rich, decadent, and addictive fragrance that is impossible to ignore.", 
        archetype: "The Forbidden Fruit", 
        category: "Ethereal", 
        tags: { A: 0, B: 0, C: 7.5, D: 2.5 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703303/Kilian_Love-Dont-Be-Shy_qeears.png" },
      { name: "Tom Ford – Tobacco Vanille", 
        description: "Opulent and warm, a perfect comforting winter scent. This fragrance is a rich, indulgent mix of smoky tobacco leaf and creamy vanilla. Notes of aromatic spices, cacao, and dried fruit add complexity, while a wood sap and tonka bean base gives it a lasting, velvety, and luxurious depth.", 
        archetype: "The Midnight Alchemist", 
        category: "Noir", tags: { A: 0, B: 0, C: 0, D: 10 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703414/Tom_Ford_Tobacco-Vanille_ntxzmu.png" },
      { name: "YSL – L'Homme", 
        description: "An effortless and timelessly sophisticated fresh-woody scent for men. The opening is a crisp and clean blend of ginger and ozonic accords. A heart of bergamot and violet leaf leads into a refined and versatile base of cedar and white musk. It is clean, approachable, and classic.", 
        archetype: "The Ginger Spark", 
        category: "Noir", tags: { A: 2.5, B: 0, C: 0, D: 7.5 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703415/YSL_L-Homme_vrxubq.png" },
      { name: "Maison Margiela – By the Fireplace", 
        description: "A highly evocative fragrance that smells exactly like a crackling winter fire. The scent profile is smoky and sweet, with key notes of roasted chestnuts, pink pepper, and cloves. Vanilla and guaiac wood provide a warm, enveloping base, creating a highly comforting, nostalgic, and unique atmosphere.", 
        archetype: "The Fireside Scholar", 
        category: "Noir", 
        tags: { A: 0, B: 2.5, C: 0, D: 7.5 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703415/Maison_Margiela_By-the-Fireplace_ub14z4.png" },
      { name: "Frederic Malle – Portrait of a Lady", 
        description: "A grand and dramatic masterclass in rose and patchouli. This is a complex, almost dark fragrance centered on a powerful, sophisticated Turkish rose. It is balanced by significant notes of patchouli and incense, with touches of blackcurrant and clove. The result is a bold, elegant, and unforgettable feminine signature.", 
        archetype: "The Dark Rose", 
        category: "Noir", 
        tags: { A: 0, B: 0, C: 2.5, D: 7.5 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703413/Frederic_Malle_Portrait-of-a-Lady_vzjud8.png" },
      // Rare Blends
      { name: "Jo Malone – Wood Sage & Sea Salt", 
        description: "A uniquely mineral and textured fresh fragrance. This scent avoids typical citrus and aquatic notes, focusing instead on ambrette seed for a subtle musky quality and a prominent, salty sea salt accord. A touch of sage adds a gentle, green, herbal edge. It is unconventional, airy, and textural.", 
        archetype: "Coastal Driftwood", 
        category: "Rare Blend", 
        tags: { A: 5, B: 5, C: 0, D: 0 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703507/Jo_Malone_Wood-Sage-and-Sea-Salt_zqy1jo.png" },
      { name: "Armani – Acqua di Gioia", 
        description: "The quintessential, enduring fresh masculine fragrance. This aquatic-ozonic classic captures the essence of sea spray and warm rocks. The opening features prominent notes of marine accord and bergamot. A heart of rosemary and persimmon leads to a clean, light base of musk and wood. It is always refreshing and reliable.", 
        archetype: "Rainy Garden", 
        category: "Rare Blend", 
        tags: { A: 5, B: 0, C: 5, D: 0 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703508/Armani_Acqua-di-Gioia_ss8hvn.png" },
      { name: "Prada – Luna Rossa Ocean", 
        description: "A modern and sophisticated interpretation of freshness. This fragrance bridges fresh aquatic notes with a slightly powdery elegance. It opens with bright bergamot and red apple. A heart of iris adds a refined touch, while a base of vetiver and a specific patchouli molecule provides depth and a clean, contemporary finish.", 
        archetype: "Cold Spice", 
        category: "Rare Blend", 
        tags: { A: 5, B: 0, C: 0, D: 5 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703507/Prada_Luna-Rossa-Ocean_yhpfqp.png" },
      { name: "Le Labo – Rose 31", 
        description: "A complex and unique unisex rose. This is not a typical sweet floral. It is built around a Grasse rose, but the rose is quickly balanced and transformed by substantial doses of warm cumin and cedar. Other notes like vetiver and guaiac wood provide an intricate, woody-spicy framework, making it deeply genderless and intriguing.", 
        archetype: "Dark Florals", 
        category: "Rare Blend", 
        tags: { A: 0, B: 5, C: 5, D: 0 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703509/Le_Labo_Rose-31_c7wbjf.png"},
      { name: "Maison Margiela – Jazz Club", 
        description: "A wonderfully nostalgic and atmospheric fragrance, capturing the scent of a smoky jazz bar. This is a warm, cozy scent with notes of rum, leather, and vanilla. Pink pepper and tobacco leaf add a sweet spiciness, while a base of styrax resin provides depth. It feels intimate, smooth, and full of character.", 
        archetype: "Smoky Library", 
        category: "Rare Blend", 
        tags: { A: 0, B: 5, C: 0, D: 5} , 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703513/Maison_Margiela_Jazz-Club_eusyuq.png" },
      { name: "YSL – Libre Intense", 
        description: "A modern and liberating interpretation of the floral fougère style, bridging masculine and feminine. This elegant fragrance centers on a powerful juxtaposition of Moroccan orange blossom and lavender, typically a masculine note. Vanilla, amber, and musk provide a sensual, warm, and sophisticated base, creating a confident and bold signature.", 
        archetype: "Dangerous Romance", 
        category: "Rare Blend", 
        tags: { A: 0, B: 0, C: 5, D: 5 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703511/YSL_Libre-Intense_mzppa9.png" },
      { name: "Maison Francis Kurkdjian - 724", 
        description: "724 is a luminous, urban fragrance designed to capture the vibrant energy of big-city life. It opens with a sparkling burst of aldehydes and Italian bergamot, delivering a sensation of clean, crisp morning air. A heart of white flowers and Egyptian jasmine adds a delicate softness, while a base of sandalwood and white musk provides a sophisticated, long-lasting laundry-fresh elegance.", 
        archetype: "The Alchemist", 
        category: "Rare Blend", 
        tags: { A: 2.5, B: 2.5, C: 2.5, D: 2.5 }, 
        photoUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775703513/Maison_Francis_Kurkdjian_724_gand4g.png" }
    ];

    const fragrances = fragranceData.map(f => ({ ...f, createdBy: admin._id }));
    await Fragrance.insertMany(fragrances);
    console.log('23 Fragrances seeded.');

    // 5. Seed 4 Dynamic Questions
    const questions = [
      {
        order: 1,
        storyTitle: "The Awakening",
        storyText: "You step out of the shadows and into a clearing. What is the first thing that hits your senses?",
        options: [
          { text: "The sharp, cold spray of a crashing wave against salt-crusted rocks.", vibeImpact: "A", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701675/a_zlowdr.png" },
          { text: "The scent of crushed pine needles under your boots and damp earth after a thunderstorm.", vibeImpact: "B", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701674/b_tdbpu4.png"  },
          { text: "The golden warmth of sun-baked jasmine vines climbing an old stone wall.", vibeImpact: "C", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701674/c_guh97f.png"  },
          { text: "The rich, intoxicating aroma of roasted coffee and old library books bound in leather.", vibeImpact: "D", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701675/d_qj4dsm.png"  }
        ]
      },
      {
        order: 2,
        storyTitle: "The Artifact",
        storyText: "On a pedestal in the center of the clearing sits an object. You feel compelled to pick it up. What is it?",
        options: [
          { text: "A polished piece of sea glass, cold and smooth to the touch.", vibeImpact: "A", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701715/a_udvw8i.png"  },
          { text: "A heavy, hand-forged iron key that smells faintly of metallic rain.", vibeImpact: "B", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701715/b_nin2jm.png"  },
          { text: "A delicate silk scarf that carries the faint, powdery sweetness of a lost era.", vibeImpact: "C", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701715/c_ccsx0h.png"  },
          { text: "A wooden box carved from sandalwood, humming with the scent of incense and spice.", vibeImpact: "D", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701715/d_max02z.png"  }
        ]
      },
      {
        order: 3,
        storyTitle: "The Atmosphere",
        storyText: "The sky begins to change color. Which \"vibe\" makes you feel most at home?",
        options: [
          { text: "The \"Blue Hour\"—crisp, minimalist, and full of infinite possibility.", vibeImpact: "A", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701771/a_vww7aw.png"  },
          { text: "The \"Golden Hour\"—dappled sunlight, grounded, and quiet.", vibeImpact: "B", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701770/b_io0ny2.png" },
          { text: "The \"Velvet Hour\"—mysterious, romantic, and deeply soft.", vibeImpact: "C", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701771/c_wclm36.png"  },
          { text: "The \"Midnight Hour\"—bold, smoky, and sophisticated.", vibeImpact: "D", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701771/d_pxzvef.png"  }
        ]
      },
      {
        order: 4,
        storyTitle: "The Exit",
        storyText: "To leave the dream, you must drink from one of four vials. Which one do you choose?",
        options: [
          { text: "A sparkling tonic of iced lime and mint.", vibeImpact: "A", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775750912/a_kelvxs.png"  },
          { text: "A cedar-infused tea brewed over a campfire.", vibeImpact: "B", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701817/b_rj0lte.png"  },
          { text: "A thick nectar of honeyed peaches and rose petals.", vibeImpact: "C", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775750564/c_wkwus8.png"  },
          { text: "A dark, spiced elixir of vanilla bean and black pepper.", vibeImpact: "D", imageUrl: "https://res.cloudinary.com/dfmyykbay/image/upload/q_auto/f_auto/v1775701819/d_k4ed1a.png"  }
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