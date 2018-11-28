import React, { Component } from "react";
import PropTypes from "prop-types";

const ellipsisDefault = {
  len: 0,
  ellipsis: "...",
  ellipsisStyle: {},
  ellipsisClass: null
};
export default class ReactEllipsisMe extends Component {
  constructor(props) {
    super(props);
    this.truncateText.bind(this);
    this.generate.bind(this);
    this.generateEllipsisShape.bind(this);
  }
  truncateText(text, len) {
    if (+len === 0) return text;
    if (+len >= text.length) return text;
    const f = text.substr(0, +len);
    return f;
  }
  generateEllipsisShape() {
    const ellipsis = this.props.ellipsis || ellipsisDefault.ellipsis;
    const { ellipsisStyle, ellipsisClass } = this.props;
    return (
      <span
        className={
          ellipsisClass ? ellipsisClass : ellipsisDefault.ellipsisClass
        }
        style={
          ellipsisStyle
            ? { ...ellipsisStyle }
            : { ...ellipsisDefault.ellipsisStyle }
        }
      >
        {ellipsis}
      </span>
    );
  }
  generate(text, len) {
    return (
      <span>
        {this.truncateText(text, len)}
        {this.generateEllipsisShape()}
      </span>
    );
  }
  render() {
    const { text } = this.props;
    return (
      <span>{this.generate(text, this.props.len || ellipsisDefault.len)}</span>
    );
  }
}
