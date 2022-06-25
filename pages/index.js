import Head from 'next/head'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer'
import {
  HEADER_TITLE,
  HEADER_DESCRIPTION,
  INDEX_TITLE,
  INDEX_DESCRIPTION,
} from '../utils/Settings'

export default function Home({ allPostsData }) {
  return (
    <>

      <Head>
        <title>{HEADER_TITLE} トップ</title>
        <meta name="description" content={HEADER_DESCRIPTION} />
      </Head>


      {/* header */}
      <Header />

      <div style={{
        width: '100%',
        height: 360,
        backgroundImage: 'url(/images/header2.jpg)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>

        <Row style={{
          paddingTop: 120,
        }}>
          <Col md="1" xs="12" />
          <Col md="10" xs="12" style={{
            color: '#ffffff',
          }}>
            <div style={{
              textAlign: 'center',
              width: 'fit-content',
            }}>
              <span style={{
                fontSize: 40,
              }}>
                NEWS
              </span>
              <br/>
              <span style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}>
                ニュース
              </span>
            </div>
          </Col>
          <Col md="1" xs="12" />
        </Row>

      </div>

      <Container>

        <Row style={{
          marginTop: 90,
          marginBottom: 60,
        }}>
          <Col md="2" xs="12" />
          <Col md="8" xs="12">
            <h1 style={{
              fontSize: 28,
            }}>
              {INDEX_TITLE}
            </h1>
            <p style={{
              marginTop: 0,
              marginBottom: 0,
              fontSize: 18,
            }}>
            {INDEX_DESCRIPTION}
            </p>
          </Col>
          <Col md="2" xs="12" />
        </Row>

        {allPostsData.map((item1, idx) => (
          <div key={"item2-"+item1._id}>

            <Row style={{
              marginTop: 0,
              marginBottom: 20,
            }}>
              <Col md="2" xs="12" />
              <Col key={"item2-"+item1._id} md="8" xs="12">
                <Row>
                  <Col md="3" xs="12" style={{
                    textAlign: 'left',
                  }}>
                    <span style={{
                      fontSize: 20,
                    }}>
                      {item1.dispDate}
                    </span>
                  </Col>

                  <Col md="9" xs="12" style={{
                    textAlign: 'left',
                  }}>
                    <Link href={"/posts/"+item1._id}>
                      <a style={{
                        textDecoration: 'none',
                        color: '#555555',
                        fontSize: 20,
                      }}>
                        <span>
                          {item1.title}
                        </span>
                      </a>
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Col md="2" xs="12" />
            </Row>

            {idx !== allPostsData.length-1 && (
              <Row key={"item1-"+item1._id} style={{
                marginTop: 20,
                marginBottom: 0,
              }}>
                <Col md="2" xs="12" />
                <Col md="8" xs="12">
                  <Row>
                    <hr />
                  </Row>
                </Col>
                <Col md="2" xs="12" />
              </Row>
            )}

          </div>
        ))}

      </Container>

      <br/>

      {/* footer  */}
      <Footer />

    </>
  )
}

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData()

  return {
    props: {
      allPostsData
    }
  }
}
