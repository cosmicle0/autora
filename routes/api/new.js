const express = require('express');
const shortid = require('shortid');
const validUrl = require('valid-url');
const { baseUrl } = require('../../config');
const db = require('../../db');

const router = express.Router();

router.get('/', async (req, res) => {
    const lurl = req.query.url;
    const slug = req.query.slug;

    if (!lurl) {
        res.status(400).json({
            status: 400,
            message: 'Please provid a valid URL to shorten!'
        });
    } else {
        if (validUrl.isUri(lurl)) {
            if (Object.values(await db.checkIfUrlExists(lurl))[0] === 1) {
                res.status(200).json({
                    status: 200,
                    longUrl: lurl,
                    shortUrl: `http://${baseUrl}/${Object.values(await db.selectByLongUrl(lurl))[0]}`
                });
            } else {
                if (slug) {
                    if (Object.values(await db.checkIfSlugExists(slug))[0] === 1) {
                        res.status(400).json({
                            status: 400,
                            message: 'This Slug has already been taken!'
                        });
                    } else {
                        try {
                            await db.insert(lurl, slug);
                            res.status(200).json({
                                status: 200,
                                longUrl: lurl,
                                shortUrl: `http://${baseUrl}/${slug}`
                            })
                        } catch (err) {
                            console.log(err);
                        }
                    };
                } else {
                    const generatedSlug = shortid.generate();
                    await db.insert(lurl, generatedSlug);
                    res.status(200).json({
                        status: 200,
                        longUrl: lurl,
                        shortUrl: `http://${baseUrl}/${generatedSlug}`
                    });
                };
            };
        } else {
            res.status(400).json({
                status: 400,
                message: 'Please provid a valid URL to shorten!'
            });
        }
    }
});

module.exports = router;