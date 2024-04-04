const { db } = require('@vercel/postgres');
const {
  snps,
  genomes,
  projects, 
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedSNPs(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "snps" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS snps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    genome_id UUID NOT NULL,
    project_id UUID NOT NULL,
    chrom VARCHAR(255) NOT NULL,
    pos INT NOT NULL,
    ref VARCHAR(255) NOT NULL,
    alt VARCHAR(255) NOT NULL,
    gene_name VARCHAR(255) NOT NULL,
    af FLOAT NOT NULL,
    transcript VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    gene_image VARCHAR(255) NOT NULL,
    protein_image VARCHAR(255) NOT NULL,
    notes VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "snps" table`);

    // Insert data into the "snps" table
    const insertedSNPs = await Promise.all(
      snps.map(
        (snp) => client.sql`
        INSERT INTO snps (id, genome_id, project_id, chrom, pos, ref, alt, gene_name, af, transcript, type, gene_image, protein_image, notes, date)
        VALUES (${snp.id}, ${snp.genome_id}, ${snp.project_id}, ${snp.chrom}, ${snp.pos}, ${snp.ref}, ${snp.alt}, ${snp.gene_name}, ${snp.af}, ${snp.transcript}, ${snp.type}, ${snp.gene_image}, ${snp.protein_image}, ${snp.notes}, ${snp.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedSNPs.length} SNPs`);

    return {
      createTable,
      snps: insertedSNPs,
    };
  } catch (error) {
    console.error('Error seeding snps:', error);
    throw error;
  }
}

async function seedGenomes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "Genomes" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS genomes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        species VARCHAR(255) NOT NULL,
        release VARCHAR(255) NOT NULL,
        build VARCHAR(255) NOT NULL,
        file VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "genomes" table`);

    // Insert data into the "genomes" table
    const insertedGenomes = await Promise.all(
      genomes.map(
        (genome) => {
          const query = `
            INSERT INTO genomes (id, species, release, build, file, image_url)
            VALUES ('${genome.id}', '${genome.species}', '${genome.release}', '${genome.build}', '${genome.file}', '${genome.image_url}')
            ON CONFLICT (id) DO NOTHING;
          `;
          console.log("SQL Query:", query); // Log the SQL query
          return client.sql`${query}`;
        }
      ),
    );

    console.log(`Seeded ${insertedGenomes.length} genomes`);

    return {
      createTable,
      genomes: insertedGenomes,
    };
  } catch (error) {
    console.error('Error seeding genomes:', error);
    throw error;
  }
}


async function seedProjects(client) {
  try {
    // Create the "Projects" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS projects (
        project_id INT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        genome_id INT NOT NULL,
        sample_names TEXT NOT NULL,
        type VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "projects" table`);

    // Insert data into the "Projects" table
    const insertedProjects = await Promise.all(
      projects.map(
        (project) => client.sql`
        INSERT INTO projects (project_id, title, genome_id, sample_names, type)
        VALUES (${project.project_id}, ${project.title}, ${project.genome_id}, ${project.sample_names}, ${project.type})
        ON CONFLICT (project_id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedProjects.length} projects`);

    return {
      createTable,
      projects: insertedProjects,
    };
  } catch (error) {
    console.error('Error seeding projects:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedGenomes(client);
  await seedSNPs(client);
  await seedProjects(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
