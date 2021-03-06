import {existsSync, readFileSync, writeFileSync, mkdirSync} from 'fs';
import {join} from 'path';
import {homedir} from 'os';
import fetch from 'node-fetch';
import mkdirp from 'mkdirp';

const etagFileName = 'etag';
const cachedContentFileName = 'cached-content';

export default async function fetchWithCache(cacheKey, url, ...args) {
  const basePath = join(homedir(), '.kle', cacheKey);
  mkdirp.sync(basePath);
  const etagFilePath = join(basePath, etagFileName);
  const cachedContentFilePath = join(basePath, cachedContentFileName);

  async function cachedResponse(response) {
    const etag = response.headers.get('etag');
    const content = await response.json();
    writeFileSync(etagFilePath, etag);
    writeFileSync(cachedContentFilePath, JSON.stringify(content), {encoding: 'utf-8'});
    return content;
  }

  if (existsSync(etagFilePath)) {
    const etag = readFileSync(etagFilePath, {encoding: 'utf-8'});
    return fetch(
      url,
      { headers:
        { 'If-None-Match': etag
        }
      })
      .then(response => {
        if (response.status === 304) {
          const content = readFileSync(cachedContentFilePath, {encoding: 'utf-8'});
          return JSON.parse(content);
        }

        return cachedResponse(response);
      }
    );
  }

  return fetch(url)
           .then(response => {
             return cachedResponse(response);
           })
};
