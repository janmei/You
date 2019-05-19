// import 'dotenv/config';
import { IgApiClient } from 'instagram-private-api';
import { DirectThreadBroadcastOptions } from 'instagram-private-api/dist/types/direct-thread.broadcast.options';

import express = require('express');

const {
    getStories,
    getMediaByCode,
    getUserByUsername
} = require('instagram-stories')

const USERNAME = ""
const PASSWORD = ""

// Create a new express application instance
const app: express.Application = express();

// define options for the direct message with 
// params for type of message, userId and message itself


function fakeSave(cookies: string) {
    return cookies;
}


(async () => {
    const ig = new IgApiClient();

    ig.state.generateDevice(USERNAME);
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
    await ig.account.login(USERNAME, PASSWORD);
    const inboxFeed = ig.feed.directInbox();
    const threads = await inboxFeed.items();

    // UNCOMMENT BELOW TO PUSH MESSAGE 
    app.get('/:userId', function (req, res) {
        const username = req.params.userId;

        getUserByUsername(username).then((
            user
        ) => {
            // console.log(user);

            const options: DirectThreadBroadcastOptions = {
                form: {
                    text: "test"
                },
                item: "text",
                userIds: user.graphql.user.id,
            }
            console.log(options);

            const thread = ig.directThread.broadcast(options)
            res.send(thread);
        })
    });

    // Prepare for getting other data
    // app.get('/:userId', function (req, res) {
    //     (async () => {
    //         let userId = req.params.userId

    //         const feed = await ig.feed.user(userId).items()
    //         console.log(feed);

    //         res.send(feed)
    //     })();
    // })

    // await thread.broadcastText("Sorry wenn ich spamme.");
})();


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});