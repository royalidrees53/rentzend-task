const resolvers = {
  Query: {
    agents: (parent, args, { db }, info) => db.Agent.findAll(),
  },
  Mutation: {
    createAgent: async (
      parent, {
        name,
        email,
        zipcode,
        number,
        address,
        document
      }, {
        db,
        documentUpload,
      }, info) => {
        const file = await document;
        const { mimetype } = file;

        if (mimetype === "image/png" || mimetype === "image/jpeg") {
          return db.Agent.findOne({ where: { email } })
            .then((agent) => {
              if (agent) return { success: false, message: 'Failed. Agent already exist.' };
              return db.Agent.create({
                name, email, zipcode, number, address, document: file.filename,
              })
                .then((agent) => documentUpload(file, agent.id)
                  .then(() => ({ success: true, agent }))
                  .catch((err) =>
                    db.Agent.destroy({ where: { id: id }})
                      .then(() => ({ success: false, message: 'Failed. Please try again.' }))
                  ));
            })
        }
        return { success: false, message: 'Please upload a valid document.'}
    },
  }
};

module.exports = resolvers;
