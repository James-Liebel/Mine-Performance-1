const https = require('https');
const fs = require('fs');
https.get('https://mine-performance.statstak.io/memberships/mine-performance-academy', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const match = data.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
        if (match) {
            fs.writeFileSync('next_data.json', match[1]);
            console.log('Saved next_data.json');
        } else {
            console.log('No NEXT_DATA found. Saved full HTML to scraped.html');
            fs.writeFileSync('scraped.html', data);
        }
    });
}).on('error', err => console.error(err));
