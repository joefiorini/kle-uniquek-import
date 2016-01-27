import fetch from 'node-fetch';

export default async function downloadData(gistId) {
  const gistInfo = await fetch(`https://api.github.com/gists/${gistId}`).then(response => response.json());
  const fileName = Object.keys(gistInfo.files);
  const {raw_url: rawUrl} = gistInfo.files[fileName[0]];
  console.log(rawUrl);
  return await fetch(rawUrl).then(response => response.json())
};
