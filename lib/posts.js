import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark';
import html from 'remark-html';
import * as MyAPI from '../utils/MyAPI'
import draftToHtml from 'draftjs-to-html';
import {
  API_URL,
  API_KEY,
} from '../utils/Settings'
import axios from 'axios'

const postsDirectory = path.join(process.cwd(), 'posts')

export const getSortedPostsData = async () => {

  // get rss and audio urls
  // i am not sure if this is the right place...
  let results_0 = await MyAPI.getPodcastRssAndAudioUrls()
  // console.log("getPodcastRssAndAudioUrls.results_0: ", results_0)

  let rss_xml = results_0.rss_xml
  let audio_urls = results_0.audio_urls
  for (let i=0; i<audio_urls.length; i++) {
    let audio_url = audio_urls[i]

    let arr0 = audio_url.split("/")
    let filename = arr0[arr0.length-1]

    let file_path = './public/audios/'+filename
    if (fs.existsSync(file_path) === false) {

      let download_url = API_URL+"/api/seo/get_audio?filename="+filename

      let res = await axios.get(download_url, {
        responseType: 'arraybuffer',
        headers: {
          'Authorization': API_KEY,
        },
      });
      fs.writeFileSync('./public/audios/'+filename, new Buffer.from(res.data), 'binary');
    }
  }

  // save rss
  console.log("")
  fs.writeFileSync("./public/rss.xml", rss_xml)

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
    list1[i].dispDate = yy+"."+mm+"."+dd

    if (list1[i].thumbnails && list1[i].thumbnails.standard) {
      list1[i].imageUrl = list1[i].thumbnails.standard.url
    } else {
      list1[i].imageUrl = ""
    }

  }

  return list1
}

export const getAllPostIds = async () => {

  // get voice to check
  let results_1 = null
  try {
    results_1 = await MyAPI.getVideoList()
  } catch (err) {
    console.log("err: ", err)
  }

  let list1 = []
  if (results_1.list) {
    for ( let i=0; i<results_1.list.length; i++ ) {

      list1.push({
        params: {
          id: results_1.list[i]._id,
          // foo: 'bar',
        },
      })
    }
  }

  return list1
}


export const getPostData = async(id) => {

  // get voice to check
  let results_1 = await MyAPI.getVideoDetail({
    video_id: id,
  })
  // console.log("results_1: ", results_1)

  if (!results_1.item) {
    throw Error("no such data...")
  }

  if (results_1.item.blocks_str_fixed) {

    let draftjs_list = JSON.parse(results_1.item.blocks_str_fixed)

    // let hashConfig = {
    //   trigger: '#',
    //   separator: ' ',
    // }

    let markups = []

    for (let i=0; i<draftjs_list.length; i++) {
      let _draftjs = draftjs_list[i]

      delete _draftjs.startTimes;

      // let draft_text = ""
      let start_time = ""
      let item_id = ""

      if (_draftjs.blocks && _draftjs.blocks.length > 0) {

        let blocks_2 = []
        for (let j=0; j<_draftjs.blocks.length; j++) {

          if ( !_draftjs.blocks[j].text ) {

            let _texts = ""
            for ( let k=0; k<blocks_2.length; k++ ) {
              _texts = _texts + blocks_2[k].text

              if (blocks_2[k].entityRanges && blocks_2[k].entityRanges[0]) {
                let entity_key = blocks_2[k].entityRanges[0].key
                let entity_item = _draftjs.entityMap[entity_key]

                if (entity_item && entity_item.data) {
                  if (entity_item.data.start2) {
                    start_time = entity_item.data.start2
                  } else if (entity_item.data.start2 === 0) {
                    start_time = 0.01
                  }
                }
              }

              blocks_2[k].entityRanges = []
            }

            if (_texts) {

              let item_id = blocks_2[0].key

              let _draftjs_2 = {
                blocks: blocks_2,
                entityMap: {},
              }

              let markup = draftToHtml(
                _draftjs_2,
              );

              markups.push({
                _id: item_id,
                start_time: start_time,
                html: markup,
              })
            }

            blocks_2 = []
            start_time = ""

          } else {
            blocks_2.push(_draftjs.blocks[j])
          }
        }

        if (blocks_2.length !== 0) {

          let _texts = ""
          for ( let k=0; k<blocks_2.length; k++ ) {
            _texts = _texts + blocks_2[k].text

            if (blocks_2[k].entityRanges && blocks_2[k].entityRanges[0]) {
              let entity_key = blocks_2[k].entityRanges[0].key
              let entity_item = _draftjs.entityMap[entity_key]

              if (entity_item && entity_item.data) {
                if (entity_item.data.start2) {
                  start_time = entity_item.data.start2
                } else if (entity_item.data.start2 === 0) {
                  start_time = 0.01
                }
              }
            }

            blocks_2[k].entityRanges = []
          }

          if (_texts) {

            let item_id = blocks_2[0].key

            let _draftjs_2 = {
              blocks: blocks_2,
              entityMap: {},
            }

            let markup = draftToHtml(
              _draftjs_2,
            );

            markups.push({
              _id: item_id,
              start_time: start_time,
              html: markup,
            })
          }

          blocks_2 = []
          start_time = ""

        }
      }
    }

    results_1.item.draftjs_list = draftjs_list
    results_1.item.markups = markups

  }

  return results_1.item
}
