// Tutorial - Hunting Malware on Twitter with VirusTotal -  Part 1: Combining APIs
// Malware Propagation and Social Networks

const Twit = require('twit')
const axios = require('axios');
const config = require('./config');
const whiteList = require('./whiteList').whiteList;

const virusTotalApiKey = config.credentials.VIRUSTOTAL_API_KEY;

const twitterApiKeys = {
    consumer_key: config.credentials.TWITTER_CONSUMER_KEY,
    consumer_secret: config.credentials.TWITTER_CONSUMER_SECRET,
    access_token: config.credentials.TWITTER_ACCESS_TOKEN,
    access_token_secret: config.credentials.TWITTER_ACCESS_TOKEN_SECRET
}

var T = new Twit(twitterApiKeys)
let linksAnalized = [];

var stream = T.stream('statuses/filter', { track: ["Bitcoin"] })
stream.on('tweet', function (tweet) {
      if(tweet.entities.urls.length > 0) {
        // Send tweets!
        tweet.entities.urls.map((link) => {
          // Check if is repeat link
          if(!linksAnalized.includes(link.expanded_url)) {
            // White List 
              if(whiteList.filter(wl => link.expanded_url.includes(wl)).length === 0) {
                linksAnalized.push(link.expanded_url)
                getVTReport(link.expanded_url, tweet)          
              }
          }
        });
      }
});

getVTReport = (link, tweet) => {
// Analize with VirusTotal
let linkEncoded = Buffer.from(link).toString('base64');

axios.get(`https://www.virustotal.com/api/v3/urls/${linkEncoded.replace(/=/g, '')}`,{
  headers: {
    'x-apikey': virusTotalApiKey
  }
  })
  .then(function (response) {
    console.log(`
    - Tweet: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}
    - Domain: ${link}
    - Report: https://www.virustotal.com/gui/url/${response.data.data.id}`)
    console.log('\x1b[32m%s\x1b[0m', `harmless: ${response.data.data.attributes.last_analysis_stats.harmless}`);
    console.log('\x1b[31m%s\x1b[0m', `malicious: ${response.data.data.attributes.last_analysis_stats.malicious}`);
    console.log('\x1b[33m%s\x1b[0m', `suspicious: ${response.data.data.attributes.last_analysis_stats.suspicious}`);
    console.log('\x1b[36m%s\x1b[0m', `undetected: ${response.data.data.attributes.last_analysis_stats.undetected}
    `);

  })
  .catch(function (error) {
    //   404 Error - Dont exist VT Report!
    //   https://developers.virustotal.com/reference/errors
    console.log(error.response.data.error.code === 'NotFoundError' ? `
    - There is no report for this domain: ${link}
    ` : '');
  }); 
}