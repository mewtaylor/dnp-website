import React, { useState } from "react"

import Accordion from "react-bootstrap/Accordion"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

import Card from "react-bootstrap/Card"
import classNames from "classnames"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons"

import styles from "./styles.module.css"

const AlertCard = props => {
  const severityMap = {
    0: "Severity: Fyi",
    1: "Severity: Low",
    2: "Severity: Moderate",
    3: "Severity: High",
  }

  const [toggle, setToggle] = useState(false)
  const toggleCaret = () => setToggle(!toggle)
  const sevClassName = severityMap[props.severity].split(": ")[1]
  return (
    <Accordion>
      <Card className={styles.card}>
        <Card.Header className={styles.columns}>
          <div
            className={classNames(styles.alertColumn, styles[sevClassName])}
          ></div>

          <div className={styles.flexGrow}>
            <p className={toggle ? styles.titleBold : styles.titleText}>
              {props.title}
            </p>
            <Accordion.Toggle
              onClick={toggleCaret}
              className={styles.caret}
              eventKey="0"
            >
              <span className={styles.moreButton}>
                {toggle ? (
                  <FontAwesomeIcon icon={faAngleDown} size="1.9x" />
                ) : (
                  <FontAwesomeIcon icon={faAngleRight} size="1.9x" />
                )}
              </span>
            </Accordion.Toggle>
          </div>
        </Card.Header>

        <Accordion.Collapse eventKey="0">
          <div className={styles.flexCollapse}>
            <span className={classNames(styles.content)}></span>

            <div className={styles.childCollapse}>
              <Container>
                <Row>
                  <Col>
                    <p className={classNames(styles.subtitleText)}>
                      Severity:{" "}
                      <b className={styles.propertyValue}>{sevClassName}</b>
                    </p>
                    <p className={styles.subtitleText}>
                      Category:{" "}
                      <b className={styles.propertyValue}>{props.category}</b>
                    </p>
                    <div className={classNames(styles.subtitleText)}>
                      Potential for Harm:{" "}
                      {props.tags.map(tag => {
                        return <b className={styles.propertyValue}>{tag}</b>
                      })}
                    </div>
                  </Col>
                  <span className={styles.lineBreakOne}></span>
                </Row>
                {/* </Row> */}

                <Row>
                  <ReactMarkdown
                    className={styles.contentParagraph}
                    source={props.content}
                  />
                  <span className={styles.lineBreakTwo}></span>
                </Row>
              </Container>
            </div>
          </div>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

AlertCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  contentType: PropTypes.oneOf(["text", "markdown", "vega-lite"]).isRequired,
  severity: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
  type: PropTypes.oneOf([
    "completeness",
    "accuracy",
    "timeliness",
    "consistenty",
    "accessibility",
  ]).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
}

AlertCard.defaultProps = {
  title: "OH NOESSSS!!!!",
  content: "### Info ###\n\nAHHHHHHHHH!!!!",
  contentType: "markdown",
  severity: 0,
  type: "completeness",
  tags: ["age"],
}

export default AlertCard
