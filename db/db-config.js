const path = require('path');
const knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: 'hackdin'
  }
});

const db = require('bookshelf')(knex);

db.knex.schema.hasTable('projects').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('projects', project => {
      project.increments('id').primary();
      project.string('title').unique();
      project.string('description');
      project.string('image');
      project.string('projectUrl');
      project.integer('school_id').unsigned().references('id').inTable('schools');
      // project.integer('visits');
      project.timestamps();
    }).then(table => {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('engineers').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('engineers', engineer => {
      engineer.increments('id').primary();
      engineer.string('gitHandle').unique();
      engineer.string('name');
      engineer.string('email');
      engineer.string('bio');
      engineer.string('githubUrl');
      engineer.string('linkedinUrl');
      engineer.string('image');
      engineer.integer('project_id').unsigned().references('id').inTable('projects');
      engineer.integer('school_id').unsigned().references('id').inTable('schools');
      // engineer.integer('visits');
      engineer.timestamps();
    }).then(table => {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('schools').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('schools', school => {
      school.increments('id').primary();
      school.string('name').unique();
      school.string('url');
      // school.timestamps();
    }).then(table => {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('technologies').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('technologies', technology => {
      technology.increments('id').primary();
      technology.string('name').unique();
    }).then(table => {
      console.log('Created Table', table);
    });
  }
});

// Join table
db.knex.schema.hasTable('projects_technologies').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('projects_technologies', projTech => {
      projTech.increments('id').primary();
      projTech.integer('project_id').unsigned().references('id').inTable('projects');
      projTech.integer('technology_id').unsigned().references('id').inTable('technologies');
    }).then(table => {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
