const Twit = require('twit')
const axios = require('axios');
const config = require('./config');
const whiteList = require('./whiteList').whiteList;

const virusTotalApiKey = config.credentials.VIRUSTOTAL_API_KEY;
let twitterApiKeys = {
    consumer_key: config.credentials.TWITTER_CONSUMER_KEY,
    consumer_secret: config.credentials.TWITTER_CONSUMER_SECRET,
    access_token: config.credentials.TWITTER_ACCESS_TOKEN,
    access_token_secret: config.credentials.TWITTER_ACCESS_TOKEN_SECRET
  }
module.exports = io => {
 
    io.on('connection', socket => {
      socket.on('ASK_USER_ID', function() {
        socket.emit('USER_ID', socket.id);
      });

      let linksAnalized = [];

      socket.on('GET_TWEETS', function(hastag, userInfo) {

        if(userInfo.active) {
            twitterApiKeys = {
            consumer_key: userInfo.consumer_key,
            consumer_secret: userInfo.consumer_secret,
            access_token: userInfo.access_token,
            access_token_secret: userInfo.access_token_secret
          }
          var T = new Twit(twitterApiKeys)
          T.get('account/verify_credentials', { skip_status: true })
          .catch(function (err) {
            twitterApiKeys = {
                consumer_key: config.credentials.TWITTER_CONSUMER_KEY,
                consumer_secret: config.credentials.TWITTER_CONSUMER_SECRET,
                access_token: config.credentials.TWITTER_ACCESS_TOKEN,
                access_token_secret: config.credentials.TWITTER_ACCESS_TOKEN_SECRET
            }

            var T = new Twit(twitterApiKeys)
    
            var stream = T.stream('statuses/filter', { track: [hastag] })
            stream.on('tweet', function (tweet) {
                console.log(tweet)
                  if(tweet.entities.urls.length > 0) {
                    // Send tweets!
                    tweet.entities.urls.map((link) => {
                      // Check if is repeat link
                      if(!linksAnalized.includes(link.expanded_url)) {
                        // White List 
                          if(whiteList.filter(wl => link.expanded_url.includes(wl)).length === 0) {
                            linksAnalized.push(link.expanded_url)
                            console.log(linksAnalized)
                            io.sockets.to(userInfo.userId).emit('TWEETS', {
                              tweet: tweet,
                            });
                          }
                      }
                    });
    
                  }
    
            })
    
            socket.on('STOP_TWEETS', function() {
              stream.on('disconnect', function (disconnectMessage) {
                console.log(disconnectMessage)
              })
              stream.stop();
              socket.disconnect();
            });
          })
          .then(function () {
            var T = new Twit(twitterApiKeys)
    
            var stream = T.stream('statuses/filter', { track: [hastag] })
            stream.on('tweet', function (tweet) {
                  if(tweet.entities.urls.length > 0) {
                    // Send tweets!
                    tweet.entities.urls.map((link) => {
                      // Check if is repeat link
                      if(!linksAnalized.includes(link.expanded_url)) {
                        // White List   
                          if(whiteList.filter(wl => link.expanded_url.includes(wl)).length === 0) {
                            linksAnalized.push(link.expanded_url)
                            console.log(linksAnalized)
                            io.sockets.to(userInfo.userId).emit('TWEETS', {
                              tweet: tweet,
                            });
                          } 
                      }
                    });
    
                  }
    
            })
    
            socket.on('STOP_TWEETS', function() {
              stream.on('disconnect', function (disconnectMessage) {
                console.log(disconnectMessage)
              })
              stream.stop();
              socket.disconnect();
            });
          })
        } else {
          var T = new Twit(twitterApiKeys)
          var stream = T.stream('statuses/filter', { track: [hastag] })
          stream.on('tweet', function (tweet) {
                if(tweet.entities.urls.length > 0) {
                  // Send tweets!
                  tweet.entities.urls.map((link) => {
                    // Check if is repeat link
                    if(!linksAnalized.includes(link.expanded_url)) {
                      // White List
                        if(whiteList.filter(wl => link.expanded_url.includes(wl)).length === 0) {
                          linksAnalized.push(link.expanded_url)
                          io.sockets.to(userInfo.userId).emit('TWEETS', {
                            tweet: tweet,
                          });
                        }  
                    }
                  });
  
                }
  
          })
  
          socket.on('STOP_TWEETS', function() {
            stream.on('disconnect', function (disconnectMessage) {
              console.log(disconnectMessage)
            })
            stream.stop();
            socket.disconnect();
          });
        }

        })

        socket.on('GET_TWEETS_REPORT', function(link, userId) {
          // Analize with VirusTotal
              let linkEncoded = Buffer.from(link).toString('base64');
              axios.get(`https://www.virustotal.com/api/v3/urls/${linkEncoded.replace(/=/g, '')}`,{
                headers: {
                  'x-apikey': virusTotalApiKey
                }
                })
                .then(function (response) {
                  io.sockets.to(userId).emit('REPORT', {
                    report: response.data,
                  });
                })
                .catch(function (error) {
                  console.log(error);
                });     
        })
      });   
  }
