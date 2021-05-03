import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import Popover from '@material-ui/core/Popover';

const StyledPopover = withStyles({
  paper: {
    background: 'transparent'
  }
})(Popover);

const PopoverWrapper = (props) => {

	const {customOpen, customClose, style, customSelector, children, font,
		anchorVertical, anchorHorizontal, transformVertical, transformHorizontal, 
		validate, success, error} = props

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		if (customClose) customClose()
		setAnchorEl(null);
	};

	const open = customOpen != undefined ? customOpen : Boolean(anchorEl);

	return (
		<div>
			{customSelector ? customSelector(e => handleClick(e)) :
				<button 
					onMouseDown={e => handleClick(e)}
				>
					<i style={{fontSize: 15}} className={font}></i>
				</button>
			}
			<StyledPopover
				open={open}
				anchorEl={anchorEl}
				onClose={() => {
					if (validate && !validate()) {
						error()
					} else {
						if (success) {
							success()
						}
						handleClose()
					}
				}}
				anchorOrigin={{
					vertical: anchorVertical ? anchorVertical : 'bottom',
					horizontal: anchorHorizontal ? anchorHorizontal : 'left',
				}}
				transformOrigin={{
					vertical: transformVertical ? transformVertical : 'top',
					horizontal: transformHorizontal ? transformHorizontal : 'left',
				}}
			>				
				{children}								
			</StyledPopover>
		</div>
	);
}


export default PopoverWrapper;