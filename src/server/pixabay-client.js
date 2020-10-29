const https = require('follow-redirects').https;

const pixabayApiKey = process.env.PIXABAY_API_KEY;
const pixabayBaseURL = process.env.PIXABAY_URL;

const getPicByLocation = async (city) => {
  return new Promise((resolve, reject) => {
    const options = {
      'method': 'GET',
      'hostname': pixabayBaseURL,
      'path': `/api?q=${encodeURI(city)}&key=${pixabayApiKey}&image_type=photo&orientation=horizontal`,
      'headers': {
      },
      'maxRedirects': 20
    };
    const request = https.request(options, function (response) {
      const chunks = [];

      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
      response.on("end", function (chunk) {
        const body = Buffer.concat(chunks);
        const obj = JSON.parse(body.toString());

        const hits = obj.hits;
        let locationPic = 'https://via.placeholder.com/150x100png?text=No+image+found';
        if (Array.isArray(hits) && hits.length > 0) {
          locationPic = hits[0].previewURL;
        }

        resolve({locationPic});
      });

      response.on("error", function (error) {
        console.error(error);
        reject(error);
      });
    });

    request.end();
  })
}

module.exports = {getPicByLocation};
