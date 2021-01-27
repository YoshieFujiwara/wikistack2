const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack2', {
  logging: false,
});

const Page = db.define('Page', {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false, unique: true },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: { type: Sequelize.ENUM, values: ['open', 'closed'] },
});

Page.beforeValidate(page => {
  page.slug = page.title
    .split(' ')
    .join('_')
    .toLowerCase();
});

const User = db.define('User', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
});

Page.belongsTo(User, { as: 'author' });

module.exports = { db, Page, User };
