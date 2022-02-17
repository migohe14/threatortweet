const dotenv = require('dotenv');
dotenv.config({ path: './api_keys.env' });
exports.credentials = {
    VIRUSTOTAL_API_KEY: process.env.VIRUSTOTAL_API_KEY,
    TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET
};