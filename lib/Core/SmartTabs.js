var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1
    },
    tabsRoot: {
      backgroundColor: theme.palette.background.paper,
      borderBottom: '1px solid #e8e8e8'
    },
    tabsIndicator: {
      backgroundColor: '#1890ff'
    },
    tabRoot: {
      textTransform: 'initial',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing.unit * 4,
      '&:hover': {
        color: '#40a9ff',
        opacity: 1
      },
      '&$tabSelected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium
      },
      '&:focus': {
        color: '#40a9ff'
      }
    },
    tabSelected: {}
  };
};

var SmartTabs = function (_React$Component) {
  _inherits(SmartTabs, _React$Component);

  function SmartTabs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SmartTabs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SmartTabs.__proto__ || Object.getPrototypeOf(SmartTabs)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: 0
    }, _this.handleChange = function (event, value) {
      _this.setState({ value: value });
      _this.props.tabChange(value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SmartTabs, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          tabItems = _props.tabItems;
      var value = this.state.value;

      return React.createElement(
        'div',
        { className: classes.root },
        React.createElement(
          Tabs,
          {
            value: value,
            onChange: this.handleChange,
            classes: { root: classes.tabsRoot, indicator: classes.tabsIndicator } },
          tabItems.map(function (data) {
            return React.createElement(Tab, {
              classes: { root: classes.tabRoot, selected: classes.tabSelected },
              label: data.label
            });
          })
        ),
        this.props.render({ selectedTab: value })
      );
    }
  }]);

  return SmartTabs;
}(React.Component);

SmartTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  tabItems: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
  tabChange: PropTypes.func.isRequired
};

export default withStyles(styles)(SmartTabs);