const SupervisorsService = require('../microservices/supervisors_service');

module.exports = (app) => {
	const service = new SupervisorsService();
	app.get('/api/supervisors', async(req, res) => {
		try {
			await service.GetSupervisors(req, res)
			.then(resp => {
				res.send(resp);
			})
		} catch (err) {
			console.log(`Request to get supervisors failed: ${err}`);
		}
	});

	app.post('/api/submit', async(req, res) => {
		console.log("Calling api.submit");
		const resp = await service.PostNotificationData(req.body);
		if (resp.err) {
			console.error(resp.err);
		} else {
			console.log('Post request successful:', resp);
			res.send(resp);
		}
	})
}
