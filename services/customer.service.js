// const getConnection = require('../libs/postgres');
// const pool = require('../libs/postgres.pool');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    // Esta es la forma manual de hacer las creaciones, tanto de user como del customer
    // const newUser = await models.User.create(data.user);
    // const newCustomer = await models.Customer.create({
    //   ...data, // Sequelize ignora los campos que no se pasan en el modelo para la creacion de un Customer en este caso estara ignorando la data.user
    //   userId: newUser.id,
    // });

    // Con sequelize nos ahorramos esa creacion manual del user, pero debemos decirle expliciatamente que le va a llegar un user y que debe crearlo
    const newCustomer = await models.Customer.create(data, {
      include: ['user'], // incluimos el modelo de usuario para que se cree automaticamente
    });
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user'],
    });
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();

    return { id };
  }
}

module.exports = CustomerService;
