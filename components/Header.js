import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { BG_COLOR } from '../utils/Settings'
import Link from 'next/link';
import Image from 'next/image';

// Header
const Header = (props) => {

  return (
    <div className="shadow2dp" style={{
      backgroundColor: BG_COLOR,
      paddingTop: 10,
      // paddingBottom: 20,
    }}>
      <Container>

        <Row style={{
          paddingTop: 20,
          paddingBottom: 20,
          // fontSize: 18,
          fontSize: 16,
        }}>

          <Col md="4" xs="12" style={{
            textAlign: 'left',
          }}>

            <a href="https://editor.shabelab.com" style={{
              textDecoration: 'none',
            }}>
              <Image
                src="/images/shabelabo_editor_logo.png" // Route of the image file
                width={129} // Desired size with correct aspect ratio
                height={40} // Desired size with correct aspect ratio
                alt="shabelab" />
            </a>

          </Col>

          <Col md="8" xs="12" style={{
            textAlign: 'right',
          }}>

            <Link href={"/"}>
              <a style={{
                textDecoration: 'none',
                color: '#ffffff',
                // fontSize: 14,
                // fontWeight: 'bold',
                lineHeight: '50px',
                marginRight: 8,
                marginLeft: 8,
              }}>
                NEWS
              </a>
            </Link>

            <span style={{
              color: '#cccccc'
            }}>
              |
            </span>


            {props.isMobile === false && window.location.hostname === "localhost" && (
              <>
                <a href="https://editor.shabelab.com/create_account" style={{
                  textDecoration: 'none',
                  color: '#ffffff',
                  // fontSize: 14,
                  // fontWeight: 'bold',
                  lineHeight: '50px',
                  marginRight: 8,
                  marginLeft: 8,
                }}>
                  アカウントの作成
                </a>

                <span style={{
                  color: '#cccccc'
                }}>
                  |
              </span>
              </>
            )}


            <a href="https://editor.shabelab.com/login" style={{
              textDecoration: 'none',
              color: '#ffffff',
              // fontSize: 14,
              // fontWeight: 'bold',
              lineHeight: '50px',
              marginRight: 8,
              marginLeft: 8,
            }}>
              ログイン
            </a>


          </Col>
        </Row>

      </Container>
    </div>
  )
}

export default Header
