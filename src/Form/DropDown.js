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

const DropDownSearchContainer = styled.div`
  padding:10px;
`;
const OuterGrid = styled.div`
   
  .drop-down-widgets{
    width: 100%;
  
  }
  .smart-select-control{
    display:flex;
    width: 100%;
    position: relative;
    padding: 6px 0 7px;
    background: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    box-sizing:border-box;
    cursor:pointer;
  }
  .smart-selection-summary{
  
  }
  .smart-selection-placeholder{
    color:#aaa;
  }
  .smart-selection-indicator{
    position: absolute;
    right: 0px;
    top:0px;
  }
  
  
`;
const DropDownList = styled.div `
   ul.list {
    overflow: auto;
    margin: 0px;
    padding: 0px;
  }
  
  .list-item {
    color:#353535;
    background-color: #fff;
    list-style: none;
    padding: 11px 15px;
  }
  .list-item.active {
    background: rgba(0,0,0,0.06);
    position:relative;
    color: #353535;
  }
  .single-select .list-item.active:before{
    height: 30px;
    content: '';
    position: absolute;
    background: #FFC220;
    width: 4px;
    left: 0px;
    top:6px;
    }
  
  .list-item:hover {
    background-color: rgba(0,0,0,0.06);
    color: #353535;
    cursor: pointer;
  }
  .multi-select .list-item{
    display:flex;
    align-items:center;
  }
  .multi-select .list-item  span {
    margin-left:5px;
  }
`;
const SearchIconContainer = styled.div `
  position:absolute;
  top: 10px;
  right: 10px;
`;


class Dropdown extends SelectionFormElement {
  _handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };
  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  _onKeyPressHandler = () => {
    const target = this.ref_searchBox;
    const value = target.value;
    this.setState({
      query: value,
    });
  };

  constructor(props) {
    super(props);
    this.state.query = '';
    this.state.anchorEl = null;
  }

  onChangeUpdates(value) {
    if (!this.multiSelect) {
      this._handlePopoverClose();
    }
  }

  getPlaceHolderContent() {
    return <div className={'smart-selection-placeholder'}> {this.props.noSelectionLabel}</div>;
  }

  getSummaryText() {
    const { selectionManager, multiSelect } = this;
    const { options } = this.props;
    if (options === undefined || options.length === 0) {
      return this.props.noOptionsLabel;
    }

    const selected = selectionManager.getSelected();
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

  togglerIcon() {
    return <ExpandMore/>;
  }

  popUpPosition() {
    return {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
    };
  }

  filter(options, query) {
    return options.filter(item => item.name && item.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }

  renderButton() {
    const getSummaryText = this.getSummaryText;
    let { placeholder, dropDownSummary: dropDownSummary = getSummaryText, setTogglerIcon: setTogglerIcon = this.togglerIcon } = this.props;
    dropDownSummary = dropDownSummary.bind(this);
    const selectionSummary = dropDownSummary(placeholder);
    return <React.Fragment>
      <div className={'smart-selection-summary'}>
        {selectionSummary}
      </div>
      <div className={'smart-selection-indicator'}>
        {setTogglerIcon()}
      </div>
    </React.Fragment>;
  }

  renderDropDown() {
    const errors = this.getErrors();
    const { anchorEl } = this.state;
    const ListMenuItem = this.multiSelect ? MultiSelectItem : SingleSelectItem;
    const { showSearch,
      options,
      showSelectAllNone =false,
      ListItem: ListItem = ListMenuItem,
      placeholder,
      selectAllNoneContainer: selectAllNoneContainer =this.getSelectAllNone,
      setPopUpPositon: setPopUpPositon = this.popUpPosition,
      filterFunc: filterFunc = this.filter,
      listMaxHeight='300px'} = this.props;

    let filteredOptions = filterFunc(options, this.state.query);
    if (filteredOptions.length > 500 && this.state.query === '') {
      filteredOptions = [];
    }
    return <OuterGrid className={'drop-down-widgets'}>
      <div className={'smart-select-control'} onClick={this.handleClick}>
        {this.renderButton()}
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={this.handleClose}
        anchorOrigin={setPopUpPositon().anchorOrigin}
        transformOrigin={setPopUpPositon().transformOrigin}
      >

        <DropDownList className="drop-down-body" style={{maxHeight:listMaxHeight}}>
          <ShowIfPropTrue prop={showSearch}>
            <div className="drop-down-search-container">
              <Input autoFocus defaultValue={this.state.query} fullWidth
                     inputRef={el => this.ref_searchBox = el} onChange={this._onKeyPressHandler}
                     className="drop-down-input" placeholder={placeholder}/>
              <SearchIconContainer>
                <SearchIcon/>
              </SearchIconContainer>
            </div>
          </ShowIfPropTrue>
          <ShowIfPropTrue prop={showSelectAllNone}>
              {this.getSelectAllNone()}
          </ShowIfPropTrue>
          <div onClick={this.clickHandler.bind(this)}>
            <SmartList ListItem={ListItem}
                       className={this.multiSelect ? `multi-select ${this.props.dropDownListClassName}` : `single-select ${this.props.dropDownListClassName}`}
                       items={filteredOptions}
                       noDataMessage={this.props.noDataMessage}
                       hideNoItems={this.props.hideNoItems}
                       selectionManager={this.selectionManager}/>
          </div>
        </DropDownList>
      </Popover>
      <RenderInlineError errors={errors}/>
    </OuterGrid>;
  }

  selectAll=()=>{
	  const { selectionManager } = this;
	  const options =  this.props.options;
	  selectionManager.selectAll(options);
  }

  selectNone=()=>{
	  const { selectionManager } = this;
	  selectionManager.clearAll();
  }

  getSelectAllNone(){
    return <div>
        <Button type={'button'} variant="flat" color="primary" onClick={this.selectAll}>Select All</Button>
		<Button type={'button'} variant="flat" color="primary" onClick={this.selectNone}>None</Button>
    </div>
  }

  render() {
    const formClasses = this.getFormClasses();
    const errors = this.getErrors();
    const { showLabel = false } = this.props;

    if (showLabel) {
      return <FormControl component="fieldset" error={errors.length > 0} className={formClasses}>
        <FormLabel component="legend">{this.props.label}</FormLabel>
        {this.renderDropDown()}
      </FormControl>;
    }
    else {
      return this.renderDropDown();
    }
  }
}

Dropdown.defaultProps = {
  ...FormElement.defaultProps,
  type: 'drop-down',
  showSearch: false,
  dropDownListClassName:'list',
  noDataMessage:'Not Found',
  noOptionsLabel: 'No Options',
  multiSelect:false,
  noSelectionLabel: 'Select',
  allSelectedLabel: 'All Selected',
  optionsSelectedLabel: 'Options Selected',
};

Dropdown.propTypes = {
  ...FormElement.propTypes,
	/** List of dropdown options will display. */
  options: PropTypes.array.isRequired,
	/** Single Select or Multiselect , default is single select. */
  multiSelect:PropTypes.bool,
    /** Display search option in drop down, Default is false**/
  showSearch: PropTypes.bool,
  /** Text to be displayed when search string is not found**/
  noDataMessage: PropTypes.string,
  /** add custom class for dropdown menu */
  dropDownListClassName:PropTypes.string,
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
    dropDownSummary:PropTypes.func,
  hideNoItems: PropTypes.bool,
    /** Show Select All and None if Multi Select dropdown, Default is false**/
  showSelectAllNone:PropTypes.bool,
   /** Custom function to generate Select all and none **/
  selectAllNoneContainer:PropTypes.func,
  type: PropTypes.string
};
export default Dropdown;
