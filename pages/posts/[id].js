import Header from '../../components/Header';
import Footer from '../../components/Footer'
import { getAllPostIds, getPostData } from '../../lib/posts';
// Add this import
import Head from 'next/head';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import YouTube from 'react-youtube';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import utilStyles from '../../styles/utils.module.css';
import {
  HEADER_TITLE,
  // HEADER_DESCRIPTION,
  // INDEX_TITLE,
  // INDEX_DESCRIPTION,
} from '../../utils/Settings'

export default function Post(props) {

  let [youtubeObj, setYoutubeObj] = useState(null)
  let [scrollTop, setScrollTop] = useState(0)
  let [yutubePos, setYoutubePos] = useState("default")
  let [dispDate, setDispDate] = useState("")
  let [headerDescription, setHeaderDescription] = useState("")

  let handleScroll = (e) => {
    setScrollTop(e.target.documentElement.scrollTop)
  }

  useEffect(() => {

    // Add the event listener inside a useEffect
    if (document) {
      document.addEventListener("scroll", handleScroll);
    }

    // Remove the event listener on unmount
    return () => {
      if (document) {
        document.removeEventListener("scroll", handleScroll);
      }
    };

  }, []);


  // description
  useEffect(() => {

    if (!props.description) {
      return
    }

    // setHeaderDescription
    let _headerDescription = ""
    if (props.description.length < 200) {
      _headerDescription = props.description
    } else {
      _headerDescription = props.description.substr(0, 200) + "…"
    }
    setHeaderDescription(_headerDescription)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.description]);


  // videoPublishedAt
  useEffect(() => {

    if (!props.videoPublishedAt) {
      return
    }

    let _publishedAt = new Date(props.videoPublishedAt)
    let yy = _publishedAt.getFullYear()
    let mm = _publishedAt.getMonth() + 1
    let dd = _publishedAt.getDate()

    setDispDate(yy+"."+mm+"."+dd)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.videoPublishedAt]);



  useEffect(() => {
    // console.log("scrollTop: ", scrollTop)

    if (scrollTop > 400 && yutubePos === "default") {
      setYoutubePos("fixed")
    } else if (scrollTop === 0 && yutubePos === "fixed") {
      setYoutubePos("default")
    }
  }, [scrollTop]);


  // youtube option
  let youtube_opts = {
    // width: '320',
    // height: '195',
    width: '640',
    height: '390',
    // width: '100%',
    // height: '100%',
    // width: props.isMobile === true ? '100%' : '320',
    // height: props.isMobile === true ? 'auto' : '195',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  let _setCurrentTime = (_time) => {
    console.log("_time: ", _time)
    if (youtubeObj) {
      youtubeObj.seekTo(_time)
    }
  }

  // youtube ready
  let _youtubeOnReady = (e) => {
    setYoutubeObj(e.target)
  }

  return (
    <>

      <Head>
      {/*<title>喋ラボEditor | 機能追加 | {props.title}</title>*/}
      <title>{HEADER_TITLE} | {props.title}</title>
      <meta name="description" content={"喋ラボEditorに機能が追加されました。"+headerDescription} />
      </Head>

      {/* header */}
      <Header />

      <Container>

        <Row style={{
          marginTop: 60,
          marginBottom: 60,
        }}>
          <Col md="1" xs="12" />
          <Col md="10" xs="12">
            <h1>
              {props.title}
            </h1>
          </Col>
          <Col md="1" xs="12" />
        </Row>

        <Row style={{
          marginTop: 60,
          marginBottom: 60,
        }}>
          <Col md="1" xs="12" />
          <Col md="5" xs="12">
            {dispDate}
          </Col>
          <Col md="6" xs="12" />
        </Row>

        <Row style={{
          marginTop: 60,
          marginBottom: 60,
        }}>
          <Col md="1" xs="12" />
          <Col md="10" xs="12">

              <div style={{
                position: yutubePos === "fixed" ? 'fixed' : 'inherit',
                width: yutubePos === "fixed" ? 320 : 640,
                height: yutubePos === "fixed" ? 195 : 390,
                // width: 640,
                // height: 390,
                top: yutubePos === "fixed" ? 0 : 'inherit',
                right: yutubePos === "fixed" ? 0 : 'inherit',
              }}>
                <YouTube
                  onReady={_youtubeOnReady}
                  videoId={props.videoId}
                  opts={{
                    width: yutubePos === "fixed" ? '320' : '640',
                    height: yutubePos === "fixed" ? '195' : '390',
                    // width: '640',
                    // height: '390',
                    playerVars: {
                      autoplay: 0,
                    },
                  }}
                  containerClassName={"youtubeContainer"} />
              </div>

          </Col>
          <Col md="1" xs="12" />
        </Row>

        <Row style={{
          marginTop: 60,
          marginBottom: 60,
        }}>
          <Col md="1" xs="12" />
          <Col md="10" xs="12">
            <p>
              {props.description}
            </p>
          </Col>
          <Col md="1" xs="12" />
        </Row>

        {props.markups && props.markups.map((item, idx) => (
          <div key={"foo-"+item._id}>

            {item.start_time && (
              <Row style={{
                marginTop: 40,
                marginBottom: 0,
              }}>
                <Col md="1" xs="12" style={{
                  // backgroundColor: 'red',
                }}/>
                <Col md="10" xs="12">

                  <span onClick={() => _setCurrentTime(item.start_time)} style={{
                    fontSize: 14,
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingLeft: 8,
                    paddingRight: 8,
                    backgroundColor: '#111111',
                    color: '#ffffff',
                    borderRadius: 4,
                    cursor: 'pointer',
                  }}>

                     <FontAwesomeIcon icon={faPlayCircle} style={{
                       marginRight: 6,
                     }}/>

                    {item.disp_time}〜
                  </span>
                </Col>
                <Col md="1" xs="12" />
              </Row>
            )}

            <Row style={{
              marginTop: item.start_time ? 0 : 40,
              marginBottom: 40,
            }}>
              <Col md="1" xs="12" />
              <Col md="10" xs="12">
                <div dangerouslySetInnerHTML={{
                  __html: item.html,
                }} />
              </Col>
              <Col md="1" xs="12" />
            </Row>

          </div>
        ))}


        {/* mext amd prev */}
        <Row style={{
          marginTop: 60,
          marginBottom: 60,
        }}>
          <Col md="1" xs="12" />
          <Col md="5" xs="12">
            {props.prev_item && (

              <Link href={"/posts/"+props.prev_item._id}>
                <a style={{
                  textDecoration: 'none',
                  color: '#555555',
                  fontSize: 20,
                }}>
                  <div style={{
                    fontSize: 14,
                  }}>
                    ／ Prev
                    <br/>
                    {props.prev_item.title}
                  </div>
                </a>
              </Link>
            )}
          </Col>
          <Col md="5" xs="12">
            {props.next_item && (

              <Link href={"/posts/"+props.next_item._id}>
                <a style={{
                  textDecoration: 'none',
                  color: '#555555',
                  fontSize: 20,
                }}>
                  <div style={{
                    fontSize: 14,
                    textAlign: 'right',
                  }}>
                    Next ／
                    <br/>
                    {props.next_item.title}
                  </div>
                </a>
              </Link>
            )}
          </Col>
          <Col md="1" xs="12" />
        </Row>

      </Container>

      {/* footer  */}
      <Footer />

    </>
  );
}


export async function getStaticPaths() {
  // Return a list of possible value for id

  const paths = await getAllPostIds();

  console.log("paths: ", paths)

  return {
    paths,
    fallback: false,
  };
}


export async function getStaticProps({ params }) {

  console.log("getStaticProps: ", params)

  const postData = await getPostData(params.id);
  return {
    props: postData
  };
}
