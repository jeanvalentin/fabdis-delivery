const { readdirSync, createReadStream } = require('fs');

const rootPath = 'files';

const categoryPaths = {
  technicalsheet: 'FICHES_PRODUITS',
}

// interesting: https://github.com/fastify/fastify-static
module.exports = async (fastify, opts, next) => {
  fastify.route({
    method: 'GET',
    url: '/media/:language/:category/:reference.:extension',
    handler: function (req, res) {
      const { language, category, reference, extension } = req.params;
      const categoryPath = categoryPaths[category];
      if (!categoryPath) {
        res.status(404);
        res.send();
        return;
      }
      const directory = `${rootPath}/${categoryPath}`
      const filename = readdirSync(directory).find(v => v.replace(/_/g, '').startsWith(reference) && v.endsWith(`.${extension}`));
      if (filename) {
        res.header('content-type', 'application/pdf');
        res.send(createReadStream(`${directory}/${filename}`));
        return;
      }

      res.status(404);
      res.send();
      // res.send(`${language} ${category} ${reference} ${directory}`);
    }
  });
}
