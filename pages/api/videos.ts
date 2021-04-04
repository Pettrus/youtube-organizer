import { NextApiRequest, NextApiResponse } from "next";
import { getOAuthClient } from "../../services/auth";
import { OAuth2Client } from "google-auth-library";
import { google } from 'googleapis';

const getVideosByChannel = (auth: OAuth2Client, channelId: string) => {
  const service = google.youtube('v3');
  return new Promise((resolve, reject) => {
    service.search.list({
        auth: auth,
        part: ['snippet'],
        channelId: channelId,
        type: ['video'],
        order: 'date'
    }, (err, response) => {
        if (err) {
            reject(err);
        }

        resolve(response.data.items);
    });
  });
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const oauth2Client = await getOAuthClient();

        const lista = [
            "UCYO_jab_esuFRV4b17AJtAw",
            "UCRLEADhMcb8WUdnQ5_Alk7g",
            "UCr5qeBG9g7bGtMGyHG2GzbQ",
            "UCSJbGtTlrDami-tDGPUV9-w",
            "UCjluRXNRE-qap5H3JcjHJmg",
            "UCEVelHmwuCqyje6YTAP2UIA",
            "UCwg6_F2hDHYrqbNSGjmar4w",
            "UCrv269YwJzuZL3dH5PCgxUw",
            "UCCjAcleI6O0o_gUx__B0pdQ",
            "UCihUdHCTzIpcS4WwJAUNsQw",
            "UCcavSftXHgxLBWwLDm_bNvA"
        ]

        const videos = [];

        for (let i = 0; i < lista.length; i++) {
            videos.push(await getVideosByChannel(oauth2Client, lista[i]));
        };
        
        res.status(200).json(videos)
    } catch (e) {
        res.status(500).json(e);
    }
}