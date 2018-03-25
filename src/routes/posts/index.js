const create = require('./create');
const list = require('./list');
const view = require('./view');

module.exports = {
    create: create.router,
    list: list.router,
    view: view.router
};
