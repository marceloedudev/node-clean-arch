/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import server from './app';

server
    .start()
    .then(() => console.log(`Express server has started on port 3000`))
    .catch((err: any) => console.log(err));
