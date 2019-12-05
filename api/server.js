const { createWriteStream, unlink } = require('fs');
const mkdirp = require('mkdirp');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const db = require('./models');

const documentUpload = (document, agentId) => {
  const { createReadStream, filename, mimetype } = document;

  const stream = createReadStream();
  const UPLOAD_DIR = `${__dirname}/uploads/${agentId}`;

  mkdirp.sync(UPLOAD_DIR);

  const path = `${UPLOAD_DIR}/${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        unlink(path, () => {
          reject(error)
        })
      })
      .pipe(createWriteStream(path))
      .on('error', reject)
      .on('finish', resolve)
  );
}

const app = new express();

const server = new ApolloServer({
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  },
  typeDefs,
  resolvers,
  context: { db, documentUpload }
});

// app.use(fileUpload());
server.applyMiddleware({ app });

app.listen(5000, error => {
  if (error) throw error

  console.info(
    `Serving http://localhost:5000.`
  )
})
