const       _ = require('../lib/functions');
const request = require('../request');

module.exports = (req, res) => {

    let { accessToken, mediaId, to="to" } = req.body.args;

    let r = {
        callback        : "",
        contextWrites   : {}
    };

    if(!accessToken || !mediaId) {
        _.echoBadEnd(r, to, res, 'accessToken, mediaId');
        return;
    }

    let uri = `https://api.instagram.com/v1/media/${mediaId}/comments?access_token=${accessToken}`;

    return request(uri, (err, response, body) => {
        if(!err && response.statusCode == 200) {
            console.log(body);
            r.contextWrites[to] = JSON.stringify(body);
            r.callback = 'success'; 
        } else {
            r.contextWrites[to] = err || JSON.stringify(body);
            r.callback = 'error';
        }

        res.status(200).send(r);
    });
};
