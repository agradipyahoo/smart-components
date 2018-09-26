Dropdown example:
```jsx static
import React from 'react';
import {FormBuilder,ElementGroup, DropDown,FormBuilder} from 'smart-components';
```

```js
const options = [{id:'1',name:'One'},{id:'2',name:'Two'},{id:'3',name:'Three'},{id:'4',name:'Four'},{id:'5',name:'Five'}];
<ElementGroup onValueChange={(changed, allData)=>{console.log(changed,allData);}} >
			<DropDown options={options} name={"number"}></DropDown>
		</ElementGroup>
```
Searchable DropDown :
```js
const options = [{id:'1',name:'One'},{id:'2',name:'Two'},{id:'3',name:'Three'},{id:'4',name:'Four'},{id:'5',name:'Five'}];

<ElementGroup onValueChange={(changed, allData)=>{console.log(changed,allData);}} >
			<DropDown showSearch="true" options={options} name={"number"}></DropDown>
		</ElementGroup>
```

Multi Select DropDown:
```js
const options = [{id:'1',name:'One'},{id:'2',name:'Two'},{id:'3',name:'Three'},{id:'4',name:'Four'},{id:'5',name:'Five'}];
<ElementGroup onValueChange={(changed, allData)=>{console.log(changed,allData);}} >
			<DropDown showSearch="true" multiSelect={true} options={options} name={"number"} ></DropDown>
		</ElementGroup>
```
Multi Select DropDown with customDropdownSummary:
```js
const filterSummary = function(){
  let {selectionManager, multiSelect} = this;
  let  {options,optionsSelectedLabel,noOptionsLabel,allSelectedLabel,noSelectionLabel} = this.props;

  if (options === undefined || options.length === 0) {
    return noOptionsLabel;
  }

  const selected = selectionManager.getSelected();
  if (!selected) {
    return this.getPlaceHolderContent();
  }
  return selected.length + ' ' + optionsSelectedLabel;
}
const options = [{id:'1',name:'One'},{id:'2',name:'Two'},{id:'3',name:'Three'},{id:'4',name:'Four'},{id:'5',name:'Five'}];
<ElementGroup onValueChange={(changed, allData)=>{console.log(changed,allData);}} >
			<DropDown showSearch="true" multiSelect={true} options={options} name={"number"} optionsSelectedLabel={'Selected'} dropDownSummary={filterSummary}></DropDown>
</ElementGroup>
```


Single DropDown with Custom ListItem for showing ActionItem and Grouping Item(treating different data and render differently):
```js

class ActionItem extends React.Component{
  render(){
    const {item} = this.props;
    return <li className={"action-item"} onClick={item.click}>{item.name}</li>;
  }
}


class GroupItem extends React.Component{
  render(){
    const {item} = this.props;
    return <li className={"group-item"}>{item.name}</li>
  }
}


class SelectionItem extends SelectableItem{
  renderContent() {
    const {itemData} = this.props;
    let tagProps = this.getTagProps();
    return (<li {...tagProps} onClick={this.selectItem.bind(this)}>
          {itemData.name}
    </li>);
  }
}


class CustomListItem extends React.Component{
    render(){
        const {itemData} = this.props;
        switch (itemData.type){
          case 'group':
            return <GroupItem item={itemData}/>;
          break;
          case 'action':
            return <ActionItem item={itemData}/>;
            break;
          case 'select':
            return <SelectionItem {...this.props}/>;
            break;
          default:
            return <SelectionItem {...this.props}/>;
            break;

        }
    }

}
const options = [{id:'create',name:'Create new item',type:'action',click:()=>{alert("Implement Create new item")}},{id:'tex',name:'Text',type:'group'},{id:'a',name:'Apple'},{id:'b',name:'Ball'},{id:'c',name:'Cat'},{id:'number',name:'Number',type:'group'},{id:'1',name:'One',type:'select'},{id:'2',name:'Two',type:'select'},{id:'3',name:'Three',type:'select'},{id:'4',name:'Four',type:'select'},{id:'5',name:'Five',type:'select'}];
<ElementGroup onValueChange={(changed, allData)=>{console.log(changed,allData);}} >
			<DropDown showSearch="true" multiSelect={true} options={options}
			ListItem={CustomListItem}
			 name={"number"}></DropDown>
		</ElementGroup>
```

```Drop Down with All as first options```
```js
const options = [{id:'1',name:'One'},{id:'2',name:'Two'},{id:'3',name:'Three'},{id:'4',name:'Four'},{id:'5',name:'Five'}];
options.unshift({id:'all',name:'All'});
<ElementGroup onValueChange={(changed, allData)=>{console.log(changed,allData);}} >
			<DropDown showSearch="true" multiSelect={false} options={options} name={"number"}></DropDown>
		</ElementGroup>
```

```Drop Down with Select All and none```
```js
const options = [{id:'1',name:'One'},{id:'2',name:'Two'},{id:'3',name:'Three'},{id:'4',name:'Four'},{id:'5',name:'Five'}];

<ElementGroup onValueChange={(changed, allData)=>{console.log(changed,allData);}} >
			<DropDown showSearch="true" multiSelect={true} showSelectAllNone={true} options={options} name={"number"}></DropDown>
		</ElementGroup>
```


```DropDown with custom position(end of container ) and get name and id of selected item```
```js
const options = [{id:'1',name:'One'},{id:'2',name:'Two'},{id:'3',name:'Three'},{id:'4',name:'Four'},{id:'5',name:'Five'}];
const popUpPosition =()=>{
    return {
      anchorOrigin:{
        vertical: 'bottom',
        horizontal: 'right',
      },
      transformOrigin:{
        vertical: 'top',
        horizontal: 'right',
      }
    }
  }
<ElementGroup onValueChange={(changed, allData)=>{console.log(changed,allData);}} >
			<DropDown showSearch="true" multiSelect={true} options={options} name={"number"} exposeName={true} setPopUpPositon={popUpPosition}></DropDown>
		</ElementGroup>
```

