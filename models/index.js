// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
  //! Note how the foreign key is established: here, not when we create the models (not like when we create the tables in vanilla sql)
Product.belongsTo(Category, { foreignKey: 'category_id' });

// Categories have many Products
Category.hasMany(Product, { foreignKey: 'category_id' });

  //!Note also how we create the joined table by hand, we did not create the table through a join
// Products belongToMany Tags (through ProductTag)
//! 'Through' here means that there is a join table (same thing as a junction table) already created that contains both data. We want to use this for better queries. 
Product.belongsToMany(Tag, { through: ProductTag });

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: ProductTag });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
