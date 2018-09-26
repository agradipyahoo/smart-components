import SingleSelectItem from './SingleSelectItem';
import React, {Component} from 'react';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
export default class MultiSelectItem extends SingleSelectItem{
  render() {
    let itemData = this.props.itemData;
    let className = this.getClassName();
    return <li data-id={itemData.id} className={className}>
      {this.isSelected() ?  <CheckBoxIcon style={{pointerEvents:'none'}}/> : <CheckBoxOutlineBlank style={{pointerEvents:'none'}}/>}
      <span>{itemData.name}</span>
    </li>;
  }
}
