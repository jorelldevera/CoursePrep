import React from 'react';

// for the quiz
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

// for the dropdown
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const textcolor = "#0A0B09";

const useStyles = makeStyles((theme) => ({
	questionContainer: {
		background: "#e3e7e9",
		marginBottom: "6px",
		borderRadius: "10px",
		paddingLeft: "6px",
	},
	questionHeaderText: {
		color: textcolor,
		// marginTop: "0px",
	},
	questionHeader: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	formControl: {
		marginBottom: "24px",
		width: "80%",
	},
	formControlLabel: {
		color: textcolor,
	},
	button: {
		margin: theme.spacing(1, 1, 0, 0),
	},
}));

function Question() {
	// for question form
	const classes = useStyles();
	const [value, setValue] = React.useState('');
	const [error, setError] = React.useState(false);
	const [helperText, setHelperText] = React.useState('Choose wisely');

	// for header dropdown
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleToggle = () => {
		// opens the dropdown
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		// closes the dropdown
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		// not sure what this does
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	const handleRadioChange = (event) => {
		// removes helper text when a radio is selected
		setValue(event.target.value);
		setHelperText(' ');
		setError(false);
	};

	const handleSubmit = (event) => {
		// tells them if they got the answer right
		event.preventDefault();

		if (value === 'best') {
			setHelperText('You got it!');
			setError(false);
		} else if (value === 'worst') {
			setHelperText('Sorry, wrong answer!');
			setError(true);
		} else {
			setHelperText('Please select an option.');
			setError(true);
		}
	};

	return (
		<div className={classes.questionContainer}>
			<header className={classes.questionHeader}>
				<h2 className={classes.questionHeaderText}>Question</h2>
				<Button
					ref={anchorRef}
					aria-controls={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
				>
					menu
        </Button>
				<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
										<MenuItem onClick={handleClose}>Save</MenuItem>
										<MenuItem onClick={handleClose}>Report</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</header>

			<form onSubmit={handleSubmit}>
				<FormControl component="fieldset" error={error} className={classes.formControl}>
					{/* <FormLabel component="legend">Pop quiz: Material-UI is...</FormLabel> */}
					<RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
						<FormControlLabel value="best" control={<Radio />} label="The best!" className={classes.formControlLabel} />
						<FormControlLabel value="worst" control={<Radio />} label="The worst." className={classes.formControlLabel} />
					</RadioGroup>
					<FormHelperText>{helperText}</FormHelperText>
					<Button type="submit" variant="contained" color="secondary" className={classes.button}>
						Check Answer
                </Button>
				</FormControl>
			</form>
		</div>
	);
}

export default Question;