import fs from 'fs';
import readline from 'readline';
import { google } from 'googleapis';
import { OAuth2Client } from "google-auth-library";
import { Credentials } from '../types';

const OAuth2 = google.auth.OAuth2;

const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'youtube-organizer.json';

const getClientSecret = async () => {
    const credentials: any = await fs.readFileSync('client_secret.json');

    return JSON.parse(credentials).web;
}

const getStoredToken = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(TOKEN_PATH, (err, token: any) => {
            if (err) resolve(null);

            resolve(token);
        });
    });
};

function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
  });
}

export function getNewToken(oauth2Client: OAuth2Client): Promise<string> {
    return new Promise((resolve, reject) => {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });

        console.log('Authorize this app by visiting this url: ', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Enter the code from that page here: ', function(code) {
            rl.close();
            oauth2Client.getToken(code, function(err, token) {
                if (err) {
                    console.log('Error while trying to retrieve access token', err);
                    reject('Error on google auth');
                    return;
                }

                storeToken(token);

                resolve(token as string);
            });
        });
    });
}

export const getOAuthClient = async () => {
    const credentials: Credentials = await getClientSecret();
    console.log('CREDENTIALS', credentials);

    const clientSecret = credentials.client_secret;
    const clientId = credentials.client_id;
    const redirectUrl = 'https://google.com';// credentials.web.redirect_uris[0];
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    let token = await getStoredToken();

    if (token == null) {
        token = await getNewToken(oauth2Client);
    }

    oauth2Client.credentials = JSON.parse(token);

    return oauth2Client;
}