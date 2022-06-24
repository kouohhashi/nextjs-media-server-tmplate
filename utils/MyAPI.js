import {
  API_URL,
  API_KEY,
} from './Settings'

const headers = {
  'Accept': 'application/json',
  'Authorization': API_KEY,
}

// get creation list
export const getVideoList = (params) =>
  fetch(`${API_URL}/api/seo/media_get_list`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())

// getVideoDetail
export const getVideoDetail = (params) =>
  fetch(`${API_URL}/api/seo/media_get_detail_of_one`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())

// get podcast rss and audio urls
export const getPodcastRssAndAudioUrls = (params) =>
  fetch(`${API_URL}/api/seo/get_podcast_rss_and_audio_urls`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())
