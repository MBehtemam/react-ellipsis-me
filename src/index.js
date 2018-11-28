import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ellipsis-me-tooltip.css";

const ellipsisDefault = {
  len: 0,
  ellipsis: "...",
  ellipsisStyle: {},
  ellipsisClass: null,
  expandable: false,
  expandableCursor: "hand"
};
export default class ReactEllipsisMe extends Component {
  constructor(props) {
    super(props);
    this.truncateText.bind(this);
    this.generate.bind(this);
    this.generateEllipsisShape.bind(this);
    this.generateToolTip.bind(this);
    this.state = {
      tooltip: null,
      isExpanded: false
    };
  }
  truncateText(text, len) {
    if (+len === 0) return text;
    if (+len >= text.length) return text;
    const f = text.substr(0, +len);
    return f;
  }
  componentDidMount() {
    this.generateToolTip();
  }
  static getDerivedStateFromProps(props, state) {
    return {
      expandable: props.expandable || ellipsisDefault.expandable
    };
  }
  generateToolTip() {
    const { tooltip, text } = this.props;
    if (tooltip == true) {
      this.setState({ tooltip: text });
    } else if (typeof tooltip === "string") {
      this.setState({ tooltip });
    } else {
      this.setState({ tooltip: null });
    }
  }
  generateEllipsisShape() {
    const ellipsis = this.props.ellipsis || ellipsisDefault.ellipsis;
    let { ellipsisStyle, ellipsisClass } = this.props;
    ellipsisStyle = ellipsisStyle || ellipsisDefault.ellipsisStyle;
    return (
      <span
        onClick={() =>
          this.props.expandable
            ? this.setState({ isExpanded: !this.state.isExpanded })
            : null
        }
        className={`
          ${ellipsisClass ? ellipsisClass : ellipsisDefault.ellipsisClass}
        `}
        style={{
          ...ellipsisStyle
        }}
      >
        {ellipsis}
      </span>
    );
  }
  generate(text, len) {
    return (
      <span
        tooltip={this.state.tooltip}
        tooltip-position="bottom"
        style={{
          ":after": this.state.tooltip ? { "background-color": "red" } : null
        }}
        className={this.state.tooltip && "ellipsis-me-tooltip"}
      >
        {this.truncateText(text, len)}
        {this.generateEllipsisShape()}
      </span>
    );
  }
  render() {
    const { text } = this.props;
    const len = this.state.isExpanded
      ? 0
      : this.props.len || ellipsisDefault.len;
    return <span>{this.generate(text, len)}</span>;
  }
}
