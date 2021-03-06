import React, { Component } from "react"
import PropTypes from "prop-types"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import ReactMarkdown from "react-markdown"
import { VegaLite } from "react-vega"

import styles from "./styles.module.css"
import colors from "../../layout.css"

const SEVERITY_MAP = {
  3: "HIGH",
  2: "MED",
  1: "LOW",
  0: "FYI",
}

// colors for severty in same order as above
const COLOR_MAP = [
  colors.teal,
  colors.teal,
  colors.teal,
  colors.teal,
]

class Overview extends Component {
  renderAlertsChart = () => {
    const data = []
    for (const [prediction, info] of Object.entries(
      this.props.useCasesSection.predictions
    )) {
      info.alerts.map(alert => {
        data.push({
          type: this.props.useCasesSection.alerts[alert.alert].category,
          severity: SEVERITY_MAP[alert.severity],
        })
        this.props.useCasesSection.alerts[alert.alert].tags.map(tag => {
          data.push({
            type: tag,
            severity: SEVERITY_MAP[alert.severity],
          })
        })
      })
    }

    const spec = {
      mark: "rect",
      width: "container",
      encoding: {
        x: {
          field: "severity",
          type: "nominal",
          sort: ["FYI", "LOW", "MED", "HIGH",],
        },
        y: { field: "type", type: "nominal" },
        opacity: {
          aggregate: "count",
          field: "severity",
          scale: {
            type: "threshold",
            domain: [1, 5, 15],
            range: [0.05, 0.2, 0.5, 1.0],
          },
          legend: {
            title: "Number of Alerts",
            titleFontSize: 16,
            labelFontSize: 16,
          },
        },
        color: {
          type: "nominal",
          field: "severity",
          scale: {
            domain: ["HIGH", "MED", "LOW", "FYI"],
            range: COLOR_MAP,
          },
          legend: {
            disable: true,
          },
        },
      },
      config: {
        axis: {
          grid: true,
          tickBand: "extent",
          labelFontSize: "14",
          titleFontSize: 0,
        },
        legend: {
          titleFontSize: 0,
          padding: 16,
        },
      },
      data: { name: "alerts" },
    }

    return (
      <VegaLite
        className={styles.alertGraph}
        spec={spec}
        actions={false}
        data={{
          alerts: data,
        }}
      />
    )
  }

  render() {
    return (
      <>
        <Row className={styles.row}>     
          <Col md={{ span: 6 }}>
            <h3 className={styles.sectionTitle}>About</h3>
            <span className={styles.datasetUnderline} />
            <div className={styles.qAndA}>
              <ReactMarkdown
                className={styles.answer}
                source={this.props.datasetInfoDescription[0].answer}
              />
            </div>
          </Col>
          <Col md={{ span: 5, offset: 1 }}>
            <h3 className={styles.sectionTitle}>Top Use Cases</h3>
            <span className={styles.datasetUnderline} />
            {this.props.topUseCases.map((useCaseName, i) => (
              <Row className={styles.useCaseList}>
                <Col md={1} className={styles.useCaseListNumber}>
                  {i + 1}
                </Col>
                <Col md={{ span: 10 }} className={styles.useCaseQuestion}>
                  {
                    this.props.useCasesSection["use-cases"][useCaseName]
                      .description
                  }
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h3 className={styles.sectionTitle}>Summary</h3>
            <span className={styles.datasetUnderline} />
            <div className={styles.summaryCreationSection}>
              <div className={styles.primarySummary}>
                <div className={styles.summaryRow}>
                  <Col md={6} className={styles.summaryLabel}>Created By:</Col>
                  <Col md={6}>
                    <ReactMarkdown>
                      {this.props.summary.createdBy +
                        ", " +
                        this.props.summary.creatorContactInfo}
                    </ReactMarkdown>
                  </Col>
                </div>
                <div className={styles.summaryRow}>
                  <Col md={6} className={styles.summaryLabel}>
                    Data Creation Range:
                  </Col>
                  <Col md={6}>
                    <ReactMarkdown>
                      {this.props.summary.dataCollectionRange}
                    </ReactMarkdown>
                  </Col>
                </div>
                <div className={styles.summaryRow}>
                  <Col md={6} className={styles.summaryLabel}>Publish Date:</Col>
                  <Col md={6}>
                    <ReactMarkdown>
                      {this.props.summary.datasetPublishDate}
                    </ReactMarkdown>
                  </Col>
                </div>
                <div className={styles.summaryRow}>
                  <Col md={6} className={styles.summaryLabel}>Update Frequency:</Col>
                  <Col md={6}>
                    <ReactMarkdown>
                      {this.props.summary.datasetUpdateFrequency}
                    </ReactMarkdown>
                  </Col>
                </div>
                <div className={styles.summaryRow}>
                  <Col md={6} className={styles.summaryLabel}>
                    Most Recent Label Update:
                  </Col>
                  <Col md={6}>
                    <ReactMarkdown>
                      {this.props.summary.lastLabelUpdate}
                    </ReactMarkdown>
                  </Col>
                </div>
              </div>
              <div className={styles.secondarySummary}>
                <div className={styles.summaryRow}>
                  <Col md={6} className={styles.summaryLabel}>License:</Col>
                  <Col md={6}>
                    <ReactMarkdown>{this.props.summary.licenseInfo}</ReactMarkdown>
                  </Col>
                </div>
                <div className={styles.summaryRow}>
                  <Col md={6} className={styles.summaryLabel}>Size:</Col>
                  <Col md={6}>
                    <ReactMarkdown>{this.props.summary.datasetSize}</ReactMarkdown>
                  </Col>
                </div>
                <div className={styles.summaryRow}>
                  <Col md={6} className={styles.summaryLabel}>Format:</Col>
                  <Col md={6}>
                    <ReactMarkdown>
                      {this.props.summary.datasetFormat}
                    </ReactMarkdown>
                  </Col>
                </div>
                <div className={styles.summaryRow}>
                  <Col md={6} className={styles.summaryLabel}>Source URL:</Col>
                  <Col md={6}>
                    <ReactMarkdown>{this.props.summary.sourceURL}</ReactMarkdown>
                  </Col>
                </div>
              </div>
            </div>
            <ReactMarkdown source={this.props.summary.summaryText} />
          </Col>    
          <Col md={{ span: 5, offset: 1 }}>
            <h3 className={styles.sectionTitle}>Alerts</h3>
            <span className={styles.datasetUnderline} />
            <div className={styles.alertSection}>
              {this.renderAlertsChart()} 
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

Overview.propTypes = {
  summary: PropTypes.shape({
    dataCollectionRange: PropTypes.string,
    datasetPublishDate: PropTypes.string,
    datasetUpdateFrequency: PropTypes.string,
    lastLabelUpdate: PropTypes.string,
    createdBy: PropTypes.string,
    creatorContactInfo: PropTypes.string,
    licenseInfo: PropTypes.string,
    datasetSize: PropTypes.string,
    datasetFormat: PropTypes.string,
    sourceURL: PropTypes.string,
  }).isRequired,
  // the dataset info section of the blob to pull out purpose questions
  datasetInfoDescription: PropTypes.array.isRequired,
  topUseCases: PropTypes.array.isRequired,
  // whole use cases section to do alerts data extraction
  useCasesSection: PropTypes.shape({
    alerts: PropTypes.object,
    predictions: PropTypes.object,
    "use-cases": PropTypes.object,
  }).isRequired,
}

Overview.defaultProps = {
  summary: {
    dataCollectionRange: "August 1-5th, 2020",
    datasetPublishDate: "August 5th, 2020",
    datasetUpdateFrequency: "Neverrrrr",
    lastLabelUpdate: "August 5th, 2020",
    createdBy: "MEEEEEEEE",
    creatorContactInfo: "</>",
    licenseInfo: "Creative Commons",
    datasetSize: "One yard",
    datasetFormat: "Some numbers etched into cement.",
    sourceURL: "<http://datanutrition.org/>",
  },
  datasetInfoDescription: [
    {
      question: "Tell us about this dataset.",
      help: "Please provide an overview of this dataset.",
      type: "markdown",
      answer: "If you don't already know, then you shouldn't be asking friend.",
    },
    {
      question:
        "Is there an intended purpose for the dataset? What domain was it designed for?",
      help:
        "For example, is there a service or organization that leverages this dataset? Is this dataset made available for a certain use in mind?",
      type: "markdown",
      answer: "Um, WINNING OF COURSE.",
    },
  ],
  topUseCases: ["winning-1", "winning-2", "i-win-3", "i-win-4"],
  useCasesSection: {
    alerts: {
      "alert-1": {
        category: "completeness",
        tags: ["race"],
      },
      "alert-2": {
        category: "accuracy",
        tags: ["ability"],
      },
      "alert-3": {
        category: "completeness",
        tags: ["gender"],
      },
      "alert-4": {
        category: "accessibility",
        tags: ["race"],
      },
      "alert-5": {
        category: "accuracy",
        tags: ["socioeconomic"],
      },
      "alert-6": {
        category: "completeness",
        tags: ["gender"],
      },
    },
    predictions: {
      "prediction-1": {
        alerts: [
          {
            alert: "alert-1",
            severity: 3,
          },
          {
            alert: "alert-4",
            severity: 2,
          },
          {
            alert: "alert-6",
            severity: 3,
          },
        ],
      },
      "prediction-2": {
        alerts: [
          {
            alert: "alert-1",
            severity: 2,
          },
          {
            alert: "alert-2",
            severity: 1,
          },
          {
            alert: "alert-5",
            severity: 0,
          },
        ],
      },
      "prediction-3": {
        alerts: [
          {
            alert: "alert-3",
            severity: 0,
          },
          {
            alert: "alert-6",
            severity: 3,
          },
        ],
      },
    },
    "use-cases": {
      "winning-1": {
        description: "Did we win?",
      },
      "winning-2": {
        description: "Did we win?",
      },
      "i-win-3": {
        description: "Did we win?",
      },
      "i-win-4": {
        description: "Did we win?",
      },
    },
  },
}

export default Overview
