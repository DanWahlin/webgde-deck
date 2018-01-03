/* VERSION: 0.0.91 */
import { handler as root } from './scripts/routes/root.js';
import { handler as proxy } from './scripts/routes/proxy.js';
import { handler as all } from './scripts/routes/all.js';

import { getCompiledTemplate, paths } from './scripts/platform/common.js';
import { WorkboxSW } from './scripts/workbox-sw.js';
import { router } from './scripts/router.js';


const workbox = new WorkboxSW({precacheChannelName: 'install-cache-channel'});
// This should pre-cache all of the required assets determined at buildtime.
workbox.precache([]);

getCompiledTemplate(`${paths.assetPath}templates/head.html`);

/*
  Router logic.
*/

// The proxy server '/proxy'
router.get(`${self.location.origin}/proxy`, (e) => {
  e.respondWith(proxy(e.request));
}, {urlMatchProperty: 'href'});

// The proxy server '/all'
router.get(`${self.location.origin}/all$`, (e) => {
  e.respondWith(all());
}, {urlMatchProperty: 'href'});

// The root '/'
router.get(`${self.location.origin}/$`, (e) => {
  e.respondWith(root());
}, {urlMatchProperty: 'href'});