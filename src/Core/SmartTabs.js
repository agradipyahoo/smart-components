import React from 'react';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  tabsRoot: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {}
});




class SmartTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.tabChange(value);
  };


  render() {
    const { classes, tabItems } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}>
          {
            tabItems.map((data)=><Tab
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label={data.label}
            />)
          }
        </Tabs>
        {this.props.render({selectedTab:value})}
      </div>
    );
  }
}
SmartTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  tabItems:PropTypes.array.isRequired,
  render:PropTypes.func.isRequired,
  tabChange:PropTypes.func.isRequired
};

export default withStyles(styles)(SmartTabs);
