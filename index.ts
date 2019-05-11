// import 'dotenv/config';
import { IgApiClient } from 'instagram-private-api';
import { readFileSync } from 'fs';
import { DirectThreadBroadcastOptions } from 'instagram-private-api/dist/types/direct-thread.broadcast.options';
import * as mongoose from "mongoose";

import express = require('express');

const uri: string = "mongodb://127.0.0.1:27017/ig";


// Create a new express application instance
const app: express.Application = express();

// define options for the direct message with 
// params for type of message, userId and message itself


function fakeSave(cookies: string) {
    return cookies;
}


(async () => {
    const ig = new IgApiClient();

    ig.state.generateDevice("jan_meininghaus");
    // ig.state.proxyUrl = process.env.IG_PROXY;

    // This function executes after every request
    ig.request.end$.subscribe(async () => {
        // Here you have JSON object with cookies.
        // You could stringify it and save to any persistent storage
        // In addition you should save device data. Explore it in core/state.ts
        const cookies = await ig.state.serializeCookieJar();
        fakeSave(JSON.stringify(cookies));
        // In order to restore session cookies you need this
        await ig.state.deserializeCookieJar(JSON.stringify(cookies));
    });
    // This call will provoke request.$end stream
    await ig.account.login("jan_meininghaus", "*u0w6%2pU#%11MTtvnKVG4");
    const inboxFeed = ig.feed.directInbox();
    const threads = await inboxFeed.items();

    // UNCOMMENT BELOW TO PUSH MESSAGE 
    app.post('/:userId', function (req, res) {

        const options: DirectThreadBroadcastOptions = {
            form: {
                text: "test"
            },
            item: "text",
            userIds: req.params.userId,

        }

        const thread = ig.directThread.broadcast(options)
        res.send(options);

    });

    
    // await thread.broadcastText("Sorry wenn ich spamme.");
})();


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});