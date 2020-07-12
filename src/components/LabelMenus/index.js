import React, { Component } from "react"
import { connect } from "react-redux"
import { sendBaseInfo } from "../../store/bases"
import PropTypes from "prop-types"
import styles from "./styles.module.css"
import classNames from "classnames"

const menus = [
  {
    title: "OVERVIEW",
  },
  {
    title: "USE CASES/ALERTS",
  },
  {
    title: "DATASET INFO",
  },
]

class LabelMenus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHighlight: this.props.highlightValue,
    }
    this.selectItem = this.selectItem.bind(this)
  }

  selectItem = item => {
    this.setState({
      selectedItem: item,
      showHighlight: false,
    })
    this.props.sendBaseInfo(item)
  }

  render() {
    return (
      <div
        className={styles.labelMenu}
        style={{ display: this.state.titleList }}
      >
        {menus.map((menu, id) => {
          return (
            <div
              id="selectButton"
              onClick={() => this.selectItem(menu.title)}
              className={classNames(styles.labelMenus, {
                [styles.highlightLabel]: this.state.selectedItem === menu.title,
              })}
              key={id}
            >
              <div
                className={classNames(styles.hiddenDiv, {
                  [styles.blockDiv]: this.state.showHighlight === true,
                })}
              ></div>
              <span className={styles.menuTitle}>{menu.title}</span>
              <div className={styles.flexbox}></div>
            </div>
          )
        })}
      </div>
    )
  }
}

LabelMenus.propTypes = {
  sendBaseInfo: PropTypes.func.isRequired,
}

const mapDispatch = dispatch => {
  return {
    sendBaseInfo: status => dispatch(sendBaseInfo(status)),
  }
}
export default connect(null, mapDispatch)(LabelMenus)
