require('./nav.less');
const React = require('react');
const createClass = require('create-react-class');
const _ = require('lodash');
const cx = require('classnames');

const NaturalCritIcon = require('naturalcrit/svg/naturalcrit.svg.jsx');

const Nav = {
	base : createClass({
		displayName : 'Nav.base',
		render      : function(){
			return <nav>
				<div className='navContent'>
					{this.props.children}
				</div>
			</nav>;
		}
	}),
	logo : function(){
		return <a className='navLogo' href='https://www.naturalcrit.com'>
			<NaturalCritIcon />
			<span className='name'>
				Natural<span className='crit'>Crit</span>
			</span>
		</a>;
	},

	section : createClass({
		displayName : 'Nav.section',
		render      : function(){
			return <div className='navSection'>
				{this.props.children}
			</div>;
		}
	}),

	item : createClass({
		displayName     : 'Nav.item',
		getDefaultProps : function() {
			return {
				icon    : null,
				href    : null,
				newTab  : false,
				onClick : function(){},
				color   : null
			};
		},
		handleClick : function(){
			this.props.onClick();
		},
		render : function(){
			const classes = cx('navItem', this.props.color, this.props.className);

			let icon;
			if(this.props.icon) icon = <i className={this.props.icon} />;

			const props = _.omit(this.props, ['newTab']);

			if(this.props.href){
				return <a {...props} className={classes} target={this.props.newTab ? '_blank' : '_self'} >
					{this.props.children}
					{icon}
				</a>;
			} else {
				return <div {...props} className={classes} onClick={this.handleClick} >
					{this.props.children}
					{icon}
				</div>;
			}
		}
	}),

	dropdown : createClass({
		displayName     : 'Nav.dropdown',
		getInitialState : function() {
			return {
				showDropdown : false
			};
		},

		handleDropdown : function(show){
			this.setState({
				showDropdown : show
			});
		},

		renderDropdown : function(dropdownChildren){
			if(!this.state.showDropdown) return null;

			return (
				<div className='navDropdown'>
					{dropdownChildren}
				</div>
			);
		},

		render : function () {
			const dropdownChildren = React.Children.map(this.props.children, (child, i)=>{
				// Ignore the first child
				if(i < 1) return;
				return child;
			});
			return (
				<div className='navDropdownContainer'
					onMouseEnter={()=>this.handleDropdown(true)}
					onMouseLeave={()=>this.handleDropdown(false)}>
					{this.props.children[0]}
					{this.renderDropdown(dropdownChildren)}
				</div>
			);
		}
	})

};


module.exports = Nav;
