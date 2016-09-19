const       _ = require('../lib/functions');
const request = require('request');

module.exports = (req, res) => {

    let { accessToken, mediaId, to="to" } = req.body.args;

    let r = {
        callback        : "",
        contextWrites   : {}
    };

    if(!accessToken || !mediaId) {
        _.echoBadEnd(r, to, res);
        return;
    }

    return request(`https://api.instagram.com/v1/media/${mediaId}/?access_token=${accessToken}`, (err, response, body) => {
    	if(!err && response.statusCode == 200) {
    		r.contextWrites[to] = body;
            r.callback = 'success'; 
        } else {
            r.contextWrites[to] = err || body;
            r.callback = 'error';
        }

        res.status(200).send(r);
    });
};
