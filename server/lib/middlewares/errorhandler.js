module.exports.SendError = function (req, res, error) {
	if(!error)
		return res.status(500).json('oops! something broke');

	var err = { 
		error: {
			message: '', error: error
			}
		};

	return res.status(500).json(err);
};

