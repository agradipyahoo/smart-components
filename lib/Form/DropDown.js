var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  padding:10px;\n'], ['\n  padding:10px;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n   \n  .drop-down-widgets{\n    width: 100%;\n  \n  }\n  .smart-select-control{\n    display:flex;\n    width: 100%;\n    position: relative;\n    padding: 6px 0 7px;\n    background: none;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.42);\n    box-sizing:border-box;\n    cursor:pointer;\n  }\n  .smart-selection-summary{\n  \n  }\n  .smart-selection-placeholder{\n    color:#aaa;\n  }\n  .smart-selection-indicator{\n    position: absolute;\n    right: 0px;\n    top:0px;\n  }\n  \n  \n'], ['\n   \n  .drop-down-widgets{\n    width: 100%;\n  \n  }\n  .smart-select-control{\n    display:flex;\n    width: 100%;\n    position: relative;\n    padding: 6px 0 7px;\n    background: none;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.42);\n    box-sizing:border-box;\n    cursor:pointer;\n  }\n  .smart-selection-summary{\n  \n  }\n  .smart-selection-placeholder{\n    color:#aaa;\n  }\n  .smart-selection-indicator{\n    position: absolute;\n    right: 0px;\n    top:0px;\n  }\n  \n  \n']),
    _templateObject3 = _taggedTemplateLiteral(['\n   ul.list {\n    overflow: auto;\n    margin: 0px;\n    padding: 0px;\n  }\n  \n  .list-item {\n    color:#353535;\n    background-color: #fff;\n    list-style: none;\n    padding: 11px 15px;\n  }\n  .list-item.active {\n    background: rgba(0,0,0,0.06);\n    position:relative;\n    color: #353535;\n  }\n  .single-select .list-item.active:before{\n    height: 30px;\n    content: \'\';\n    position: absolute;\n    background: #FFC220;\n    width: 4px;\n    left: 0px;\n    top:6px;\n    }\n  \n  .list-item:hover {\n    background-color: rgba(0,0,0,0.06);\n    color: #353535;\n    cursor: pointer;\n  }\n  .multi-select .list-item{\n    display:flex;\n    align-items:center;\n  }\n  .multi-select .list-item  span {\n    margin-left:5px;\n  }\n'], ['\n   ul.list {\n    overflow: auto;\n    margin: 0px;\n    padding: 0px;\n  }\n  \n  .list-item {\n    color:#353535;\n    background-color: #fff;\n    list-style: none;\n    padding: 11px 15px;\n  }\n  .list-item.active {\n    background: rgba(0,0,0,0.06);\n    position:relative;\n    color: #353535;\n  }\n  .single-select .list-item.active:before{\n    height: 30px;\n    content: \'\';\n    position: absolute;\n    background: #FFC220;\n    width: 4px;\n    left: 0px;\n    top:6px;\n    }\n  \n  .list-item:hover {\n    background-color: rgba(0,0,0,0.06);\n    color: #353535;\n    cursor: pointer;\n  }\n  .multi-select .list-item{\n    display:flex;\n    align-items:center;\n  }\n  .multi-select .list-item  span {\n    margin-left:5px;\n  }\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  position:absolute;\n  top: 10px;\n  right: 10px;\n'], ['\n  position:absolute;\n  top: 10px;\n  right: 10px;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * Building Flexible drop down using material UI
 * author:Agradip Sarkar
 */
import Popover from 'material-ui/Popover';
import React, { Component } from 'react';
import { FormControl, FormLabel } from 'material-ui/Form';
import Input from 'material-ui/Input';
import PropTypes from 'prop-types';
import FormElement from './FormElement';
import { RenderInlineError, ShowIfPropTrue } from '../Core/common';
import SmartList from '../Core/SmartList';
import SelectionFormElement from './SelectionFormElement';
import styled from 'styled-components';
import SingleSelectItem from './../Core/SingleSelectItem';
import MultiSelectItem from './../Core/MultiSelectItem';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from 'material-ui/Button';

var DropDownSearchContainer = styled.div(_templateObject);
var OuterGrid = styled.div(_templateObject2);
var DropDownList = styled.div(_templateObject3);
var SearchIconContainer = styled.div(_templateObject4);

var Dropdown = function (_SelectionFormElement) {
  _inherits(Dropdown, _SelectionFormElement);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this._handlePopoverClose = function () {
      _this.setState({ anchorEl: null });
    };

    _this.handleClick = function (event) {
      _this.setState({
        anchorEl: event.currentTarget
      });
    };

    _this.handleClose = function () {
      _this.setState({
        anchorEl: null
      });
    };

    _this._onKeyPressHandler = function () {
      var target = _this.ref_searchBox;
      var value = target.value;
      _this.setState({
        query: value
      });
    };

    _this.selectAll = function () {
      var selectionManager = _this.selectionManager;

      var options = _this.props.options;
      selectionManager.selectAll(options);
    };

    _this.selectNone = function () {
      var selectionManager = _this.selectionManager;

      selectionManager.clearAll();
    };

    _this.state.query = '';
    _this.state.anchorEl = null;
    //override selection manager instance.
    if (_this.props.selectionManager) {
      _this.selectionManager = _this.props.selectionManager;
      _this.changeSubscription = _this.selectionManager.on('change', _this.onChange.bind(_this));
    }
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'onChangeUpdates',
    value: function onChangeUpdates(value) {
      if (!this.multiSelect) {
        this._handlePopoverClose();
      }
    }
  }, {
    key: 'getPlaceHolderContent',
    value: function getPlaceHolderContent() {
      return React.createElement(
        'div',
        { className: 'smart-selection-placeholder' },
        ' ',
        this.props.noSelectionLabel
      );
    }
  }, {
    key: 'getSummaryText',
    value: function getSummaryText() {
      var selectionManager = this.selectionManager,
          multiSelect = this.multiSelect;
      var options = this.props.options;

      if (options === undefined || options.length === 0) {
        return this.props.noOptionsLabel;
      }

      var selected = selectionManager.getSelected();
      if (!selected) {
        return this.getPlaceHolderContent();
      }
      if (!multiSelect) {
        return selected.name;
      } else {
        if (selected.length === options.length) {
          return this.props.allSelectedLabel;
        } else {
          if (selected.length === 0) {
            return this.getPlaceHolderContent();
          }
          return selected.length + ' ' + this.props.optionsSelectedLabel;
        }
      }
    }
  }, {
    key: 'togglerIcon',
    value: function togglerIcon() {
      return React.createElement(ExpandMore, null);
    }
  }, {
    key: 'popUpPosition',
    value: function popUpPosition() {
      return {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left'
        }
      };
    }
  }, {
    key: 'filter',
    value: function filter(options, query) {
      return options.filter(function (item) {
        return item.name && item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
    }
  }, {
    key: 'renderButton',
    value: function renderButton() {
      var getSummaryText = this.getSummaryText;
      var _props = this.props,
          placeholder = _props.placeholder,
          _props$dropDownSummar = _props.dropDownSummary,
          dropDownSummary = _props$dropDownSummar === undefined ? getSummaryText : _props$dropDownSummar,
          _props$setTogglerIcon = _props.setTogglerIcon,
          setTogglerIcon = _props$setTogglerIcon === undefined ? this.togglerIcon : _props$setTogglerIcon;

      dropDownSummary = dropDownSummary.bind(this);
      var selectionSummary = dropDownSummary(placeholder);
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          'div',
          { className: 'smart-selection-summary' },
          selectionSummary
        ),
        React.createElement(
          'div',
          { className: 'smart-selection-indicator' },
          setTogglerIcon()
        )
      );
    }
  }, {
    key: 'renderDropDown',
    value: function renderDropDown() {
      var _this2 = this;

      var errors = this.getErrors();
      var anchorEl = this.state.anchorEl;

      var ListMenuItem = this.multiSelect ? MultiSelectItem : SingleSelectItem;
      var _props2 = this.props,
          showSearch = _props2.showSearch,
          options = _props2.options,
          _props2$showSelectAll = _props2.showSelectAllNone,
          showSelectAllNone = _props2$showSelectAll === undefined ? false : _props2$showSelectAll,
          _props2$ListItem = _props2.ListItem,
          ListItem = _props2$ListItem === undefined ? ListMenuItem : _props2$ListItem,
          placeholder = _props2.placeholder,
          _props2$setPopUpPosit = _props2.setPopUpPositon,
          setPopUpPositon = _props2$setPopUpPosit === undefined ? this.popUpPosition : _props2$setPopUpPosit,
          _props2$filterFunc = _props2.filterFunc,
          filterFunc = _props2$filterFunc === undefined ? this.filter : _props2$filterFunc,
          _props2$listMaxHeight = _props2.listMaxHeight,
          listMaxHeight = _props2$listMaxHeight === undefined ? '300px' : _props2$listMaxHeight;
      var _props$selectAllNoneC = this.props.selectAllNoneContainer,
          selectAllNoneContainer = _props$selectAllNoneC === undefined ? this.getSelectAllNone : _props$selectAllNoneC;

      selectAllNoneContainer = selectAllNoneContainer.bind(this);

      var filteredOptions = filterFunc(options, this.state.query);
      if (filteredOptions.length > 500 && this.state.query === '') {
        filteredOptions = [];
      }
      return React.createElement(
        OuterGrid,
        { className: 'drop-down-widgets' },
        React.createElement(
          'div',
          { className: 'smart-select-control', onClick: this.handleClick },
          this.renderButton()
        ),
        React.createElement(
          Popover,
          {
            open: Boolean(anchorEl),
            anchorEl: anchorEl,
            onClose: this.handleClose,
            anchorOrigin: setPopUpPositon().anchorOrigin,
            transformOrigin: setPopUpPositon().transformOrigin
          },
          React.createElement(
            DropDownList,
            { className: 'drop-down-body', style: { maxHeight: listMaxHeight } },
            React.createElement(
              ShowIfPropTrue,
              { prop: showSearch },
              React.createElement(
                'div',
                { className: 'drop-down-search-container' },
                React.createElement(Input, { autoFocus: true, defaultValue: this.state.query, fullWidth: true,
                  inputRef: function inputRef(el) {
                    return _this2.ref_searchBox = el;
                  }, onChange: this._onKeyPressHandler,
                  className: 'drop-down-input', placeholder: placeholder }),
                React.createElement(
                  SearchIconContainer,
                  null,
                  React.createElement(SearchIcon, null)
                )
              )
            ),
            React.createElement(
              ShowIfPropTrue,
              { prop: showSelectAllNone },
              selectAllNoneContainer()
            ),
            React.createElement(
              'div',
              { onClick: this.clickHandler.bind(this) },
              React.createElement(SmartList, { ListItem: ListItem,
                className: this.multiSelect ? 'multi-select ' + this.props.dropDownListClassName : 'single-select ' + this.props.dropDownListClassName,
                items: filteredOptions,
                noDataMessage: this.props.noDataMessage,
                hideNoItems: this.props.hideNoItems,
                selectionManager: this.selectionManager })
            )
          )
        ),
        React.createElement(RenderInlineError, { errors: errors })
      );
    }
  }, {
    key: 'getSelectAllNone',
    value: function getSelectAllNone() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          Button,
          { type: 'button', variant: 'flat', color: 'primary', onClick: this.selectAll },
          'Select All'
        ),
        React.createElement(
          Button,
          { type: 'button', variant: 'flat', color: 'primary', onClick: this.selectNone },
          'None'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var formClasses = this.getFormClasses();
      var errors = this.getErrors();
      var _props$showLabel = this.props.showLabel,
          showLabel = _props$showLabel === undefined ? false : _props$showLabel;


      if (showLabel) {
        return React.createElement(
          FormControl,
          { component: 'fieldset', error: errors.length > 0, className: formClasses },
          React.createElement(
            FormLabel,
            { component: 'legend' },
            this.props.label
          ),
          this.renderDropDown()
        );
      } else {
        return this.renderDropDown();
      }
    }
  }]);

  return Dropdown;
}(SelectionFormElement);

Dropdown.defaultProps = _extends({}, FormElement.defaultProps, {
  type: 'drop-down',
  showSearch: false,
  dropDownListClassName: 'list',
  noDataMessage: 'Not Found',
  noOptionsLabel: 'No Options',
  multiSelect: false,
  noSelectionLabel: 'Select',
  allSelectedLabel: 'All Selected',
  optionsSelectedLabel: 'Options Selected'
});

Dropdown.propTypes = _extends({}, FormElement.propTypes, {
  /** List of dropdown options will display. */
  options: PropTypes.array.isRequired,
  /** Single Select or Multiselect , default is single select. */
  multiSelect: PropTypes.bool,
  /** Display search option in drop down, Default is false**/
  showSearch: PropTypes.bool,
  /** Text to be displayed when search string is not found**/
  noDataMessage: PropTypes.string,
  /** add custom class for dropdown menu */
  dropDownListClassName: PropTypes.string,
  /** Custom search function , if you want custome logic**/
  filterFunc: PropTypes.func,
  /** set custom Drop Down Togger Icon **/
  setTogglerIcon: PropTypes.func,
  /** set custom position for dropdown overlay,default is top left **/
  setPopUpPositon: PropTypes.func,
  /** display drop down summary text when no item is passed**/
  noOptionsLabel: PropTypes.string,
  /** display drop down  summary text when no option is selected **/
  noSelectionLabel: PropTypes.string,
  /**display drop down summary text when all options is selected **/
  allSelectedLabel: PropTypes.string,
  /** display drop down summary text when an options is selected**/
  optionsSelectedLabel: PropTypes.string,
  /** Custom Drop Down Summary Function **/
  dropDownSummary: PropTypes.func,
  hideNoItems: PropTypes.bool,
  /** Show Select All and None if Multi Select dropdown, Default is false**/
  showSelectAllNone: PropTypes.bool,
  /** Custom function to generate Select all and none **/
  selectAllNoneContainer: PropTypes.func,
  type: PropTypes.string
});
export default Dropdown;