import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import {
  COPYRIGHT,
} from '../utils/Settings'

class Footer extends Component {

  render(){

    return(
      <Row style={{
        backgroundColor: '#383838',
        paddingTop: 70,
        paddingBottom: 70,
      }}>

        <Container style={{
          paddingLeft: 30,
          paddingRight: 30,
        }}>

          <Row style={{ marginTop : 0, }}>
            <Col style={{textAlign: 'right'}}>


            </Col>
          </Row>

          <Row style={{ marginTop : 30, }}>
            <Col style={{textAlign: 'center'}}>
              <span style={{
                  fontSize: 14,
                  color: '#ffffff',
                }}>
                Copyright Ⓒ	<a href="https://shabelab.com" style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                }}>{COPYRIGHT}</a> All Rights Reserved.
              </span>
            </Col>
          </Row>

        </Container>

      </Row>
    )
  }
}

export default Footer
