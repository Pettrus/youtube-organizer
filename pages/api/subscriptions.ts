import { NextApiRequest, NextApiResponse } from "next";
import { Subscription, Credentials } from "../../types";
import { getOAuthClient } from "../../services/auth";
import { OAuth2Client } from "google-auth-library";
import { google } from 'googleapis';

const getSubscriptions = (auth: OAuth2Client): Promise<Subscription[]> => {
  const service = google.youtube('v3');
  return new Promise((resolve, reject) => {
    service.subscriptions.list({
        auth: auth,
        mine: true,
        order: 'alphabetical',
        part: ['snippet'],
        maxResults: 50
    }, (err, response) => {
        if (err) {
            reject(err);
        }

        resolve(response.data.items as Subscription[]);
    });
  });
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const oauth2Client = await getOAuthClient();
        const subscriptions: Subscription[] = await getSubscriptions(oauth2Client);

        res.status(200).json(subscriptions)
    } catch (e) {
        res.status(500).json(e);
    }
}