const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');

router.get('/', async (req, res) => {
    const lurl = req.query.url;
    const slug = req.query.slug;

    if (!lurl) {
        res.status(400).json({
            status: 400,
            error: 'Please include a URL to shorten!'
        });
    } else {
        if (validUrl.isWebUri(lurl)) {
            if (slug) {
                createUrl(lurl, slug);
                res.status(200).json({
                    status: 200,
                    longurl: `${lurl}`,
                    customSlug: slug,
                    shorturl: 'soon™'
                });
            } else {
                createUrl(lurl);
                res.status(200).json({
                    status: 200,
                    longurl: `${lurl}`,
                    shorturl: 'soon™'
                });
            };
        } else {
            res.status(400).json({
                status: 400,
                error: 'Inavlid Long URL!'
            });
        };  
    };
});

/**
 * 
 * @param {string} longUrl 
 * @param {string} slug 
 */
const createUrl = async(longUrl, slug) => {
    if (slug) {

    } else {

    }
};

module.exports = router;