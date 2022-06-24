//pages/sitemap.xml.js
import * as MyAPI from '../utils/MyAPI'

const EXTERNAL_DATA_URL = 'https://news.shabelab.com/posts';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://news.shabelab.com</loc>
     </url>
     ${posts
       .map(({ _id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${_id}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // // We make an API call to gather the URLs for our site
  // const request = await fetch(EXTERNAL_DATA_URL);
  // const posts = await request.json();

  // get voice to check
  let results_1 = await MyAPI.getVideoList()

  let list1 = []
  if (results_1.list) {
    list1 = results_1.list
  }

  for ( let i=0; i<list1.length; i++ ) {
    let _publishedAt = new Date(list1[i].videoPublishedAt)
    let yy = _publishedAt.getFullYear()
    let mm = _publishedAt.getMonth() + 1
    let dd = _publishedAt.getDate()
    console.log("_publishedAt: ", _publishedAt, yy)
    list1[i].dispDate = yy+"/"+mm+"/"+dd
  }

  let list2 = []
  for ( let i=0; i<list1.length; i++ ) {

    if (i % 2 === 0) {
      list2.push({
        _id: list1[i]._id,
        list: [
          list1[i]
        ]
      })
    } else {
      list2[list2.length-1].list.push(list1[i])
    }
  }

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(list2);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
