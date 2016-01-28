import fetchWithCache from './fetchWithCache';
import fetch from 'node-fetch';

export default async function downloadData(gistId) {
  const gistInfo = await fetchWithCache(gistId, `https://api.github.com/gists/${gistId}`);
  const fileName = Object.keys(gistInfo.files);
  const {raw_url: rawUrl} = gistInfo.files[fileName[0]];
  return await fetch(rawUrl).then(response => response.json())
};
