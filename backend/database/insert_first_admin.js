const supervisorController = require('../controllers/supervisor')

supervisorController.addSupervisor('56662192007', 'Admin', '123456', true).then(() => {
    process.exit(0)
});
