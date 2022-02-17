<img src="images/threat-or-tweet.png" alt="threar or tweet logo" width="200px"/>

Threat or Tweet: Hunting Threats on Twitter.
=======================================

## About 

> Threat or Tweet is a tool to detect malware in real time on Twitter. 
> This application is developed with **Node js and Socket.io** for the server 
> and **Angular** for the dashboard where you can view the alerts.

## Prerequisites

To start the project you must get the API keys from VirusTotal and Twitter.

### VirusTotal API

In order to use the API you must sign up to [VirusTotal Community](https://www.virustotal.com/gui/join-us).

### Twitter API

To get the Twitter API key you need to sign up for a developer account and create an app and save your App's key and tokens and keep them secure. You can follow the steps in the [official documentation](https://developer.twitter.com/en/docs/twitter-api/getting-started/getting-access-to-the-twitter-api).


## Configuration

### Server

Create `sockets-api/api_keys.env` file with your API keys:

```
VIRUSTOTAL_API_KEY = ""

TWITTER_CONSUMER_KEY: "",
TWITTER_CONSUMER_SECRET: "",
TWITTER_ACCESS_TOKEN: "",
TWITTER_ACCESS_TOKEN_SECRET: ""

```
Got to `/sockets-api` and run `npm install` to install dependencies and `npm start`. 



### Angular app

Got to `/dashboard` and run `npm install` to install dependencies and `npm start`. Navigate to `http://localhost:4200/`.


## Usage

Once the app is launched, you can search for terms or hashtags and track tweets that contain these words. If these tweets have links, they will be sent to VirusTotal for analysis. You can see this example video where I detect an account tweeting a malicious link.

[![Threat or Tweet example video](http://img.youtube.com/vi/zj9iKZNhe9c/0.jpg)](https://www.youtube.com/watch?v=zj9iKZNhe9c "Detecting malicious url in real time about 'coronavirus map'")

:warning: **If you want to test, make sure you don't endanger other users. Don't share malware on Twitter!**

### URL of the project
[https://virustotal-tweets-analyzer.netlify.app/](https://virustotal-tweets-analyzer.netlify.app).
