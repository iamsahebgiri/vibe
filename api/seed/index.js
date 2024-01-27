import fs from 'fs';
import mongoose from 'mongoose';
import 'dotenv/config';

import Question from '../models/question.js';
import Institution from '../models/institution.js';

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const questionsData = loadJSON('./prompts.json');

async function seedDatabase() {
  await mongoose.connect(process.env.DB_URL);
  try {
    await Question.deleteMany();

    await Question.insertMany(questionsData);

    await Institution.create({
      name: 'Institute of Technical Education and Research',
      shortCode: 'ITER',
      district: 'Khorda',
      state: 'Odisha',
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
