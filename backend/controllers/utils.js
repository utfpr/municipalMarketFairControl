const moment = require('moment');

const amanha = () => moment()
  .utc()
  .add(1, 'day');

const proximaSexta = () => moment()
  .utc()
  .startOf('isoWeek')
  .add(4, 'day')
  .hour(18)
  .toISOString();

const proximoDomingo = () => moment()
  .utc()
  .startOf('isoWeek')
  .add(6, 'day')
  .hour(18)
  .toISOString();

module.exports = {
  amanha,
  proximaSexta,
  proximoDomingo,
};
