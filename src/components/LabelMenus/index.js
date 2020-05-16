import MenuItem from "../MenuItem"
import styles from "./styles.module.css"
import React, { Component } from "react"
import { connect } from "react-redux"
import { toggleHighlight } from "../../store/labelMenu"
//TURN INTO A CLASS COMPONENT
//what does the menu item

class LabelMenus extends Component {
  constructor() {
    super()
    this.state = {
      titleList: ["Use Cases and Alerts", "Overview", "Maintenance"],
    }
    this.highlightLabel = this.highlightLabel.bind(this)
  }

  highlightLabel(event) {
    console.log(event.target)
    event.target.element.class = ".highlightLabel"
  }

  //   //create a function that changes the header text to the
  //   //create id from the props to change the text to the correct name
  // onClickFunction=this.props.dispatch(item.key)
  render() {
    return (
      <div>
        <div className={styles.sectionName}>
          {this.state.titleList.map(title => {
            return (
              <div
                // style={{ background: color }}
                key={title.key}
                // onClick={() => {
                // setColor("black")
                // }}
                className={styles.menuDiv}
                // onClick={this.highlightLabel}
              >
                <MenuItem name={title.name} key={title.key} />

                <span className={styles.weightedLine}>
                  <p className={styles.lorem}>Lorem </p>
                </span>
                {/* <button onClick={this.highlightLabel}>HI THEREEEE</button> */}
                <p className={styles.menuParagraph}>
                  Qui ut occaecat exercitation amet mollit excepteur do aliquip
                  et sunt sit aliqua consectetur. Sit minim voluptate aliqua id
                  do velit deserunt. Voluptate irure proident esse sint duis
                  mollit culpa eiusmod officia ullamco aliqua in magna dolore.
                </p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    title: state.title,
  }
}
export default connect(mapState)(LabelMenus)
