import React, {useState, useEffect} from 'react';
import firebase from 'firebase';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import './questioncard.css'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
// import { white } from '@material-ui/core/colors';

// Question header imports
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const textcolor = "#ffffff";

const theme = {
    overrides: {
      MuiRadio: {
        root: {
          color: 'white',
        },
        colorSecondary: {
          '&$checked': {
            color: 'white',
          },
        },
      },

      MuiCheckbox: {
        root: {
          color: 'white',
        },
        colorSecondary: {
          '&$checked': {
            color: 'white',
          },
        },
        colorText: {
            color: 'white',
        },
      },

      MuiTextField: {
        colorText: {
            color: 'green',
        }
      }
    },
  }
  
  const muiTheme = createMuiTheme({
      palette: {
          primary: {
            light: "#448572",
            main: "#448572",
            dark: "#448572",
            contrast: "#448572",
          },
          secondary: {
            light: "#FFFFFF",
            main: "#FFFFFF",
            dark: "#FFFFFF",
            contrast: "#FFFFFF",
          },
      }
  })
  




// const textcolor = "#0A0B09";
const useStyles = makeStyles((theme) => ({

    floatingLabelFocusStyle: {
        color: '#707070',
    },

    multilineColor:{
        color:textcolor,
    },

    questionContainer: {
        background: "#1a1a1c",
        marginBottom: "6px",
        borderRadius: "13px",
        paddingLeft: "6px",
        paddingRight: '6px',
        boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    questionHeaderText: {
        color: textcolor,
    },
    questionHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    questionHeaderRight: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center,"
    },
    formControl: {
        marginBottom: "24px",
        width: "100%",
    },
    formControlLabel: {
        color: textcolor,
    },
    formGroup: {
        boxShadow: "none",
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
    helperText: {
        color: 'white',
    }
}));

function QuestionCard(props) {
    const { avg_score, course_ID, creation_time, department_ID, text, times_answered, type } = props.data;
    const classes = useStyles();

    var uid = firebase.auth().currentUser.uid;

    // for header dropdown
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [isFavorite, setIsFavorite] = React.useState(false);

    var query = 'questions_saved/' + uid + "/";
    const starredRef = firebase.database().ref(query); 
    useEffect( () => {
        starredRef.once('value').then(function(snapshot){
            snapshot.forEach(function(childSnapshot) {
                var val = childSnapshot.key;

                console.log(val + " ding");
                if (val === props.id) {
                    setIsFavorite(true);
                }
            })
        })
    }, [])

    const handleMenuToggle = () => {
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

    const handeStarBorder = () => {
        // push the id of this question to the database
        // starredRef.push(props.id);
        starredRef.update({
            [props.id]: true
        });

        setIsFavorite(true);
    }

    const handleStarFilled = () => {
        // var key = "";
        starredRef.once('value').then(function(snapshot){
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;

                if (key === props.id) {
                    // remove this snapshot
                    key = childSnapshot.key;
                    // console.log("key=" + key + " val= " + val + " props.id=" + props.id);
                    starredRef.child(key).remove();
                }
            })
        })

        // switch from filled to border
        setIsFavorite(false);
    }

    // read type to create a question
    function buildQuestionType(type) {
        switch (type) {
            case 0:
                // multiple choice
                return(<>
                    <MultipleChoice key={props.key} id={props.id} data={props.data}/>
                </>
                );
            case 1:
                // multiple select
                return(<>
                    <MultipleSelect key={props.key} id={props.id} data={props.data}/>
                </>
                );
            case 2:
                // short answer
                return(<>
                    <WrittenAnswer key={props.key} id={props.id} data={props.data}/>
                </>
                );
            case 3:
                // true false
                return(<>
                    <TrueFalse key={props.key} id={props.id} data={props.data}/>
                </>
                );
            case 4:
                // written answer
                return(<>
                    <WrittenAnswer key={props.key} id={props.id} data={props.data}/>
                </>
                );
            case 5:
                // fill in the blank
                return(<>
                    <WrittenAnswer key={props.key} id={props.id} data={props.data}/>
                </>);
            default:
                // error
            break;
        }
    }
    
    return (
        <ThemeProvider theme={muiTheme}>
        <div className={classes.questionContainer}>
            <header className={classes.questionHeader}>
                <div className={classes.questionHeaderLeft}>
				    <h2 className={classes.questionHeaderText}>{text}</h2>
                </div>

                <div className={classes.questionHeaderRight}>
                    {isFavorite === true ? (
                        <Button
                            onClick={handleStarFilled}>
                            <StarIcon color="primary"/>
                        </Button>
                    ) : isFavorite === false ? (
                        <Button
                            onClick={handeStarBorder}>
                            <StarBorderIcon style={{ color: green[500] }}/>
                        </Button>
                    ) : null}

                    <Button
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleMenuToggle}
                    >
                        <ArrowDropDownIcon />
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
                                            <MenuItem onClick={handleClose}>Quiz 1</MenuItem>
                                            <MenuItem onClick={handleClose}>{uid}</MenuItem>
                                            <MenuItem onClick={handleClose}>Quiz 2</MenuItem>
                                            <MenuItem onClick={handleClose}>New Quiz</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
			</header>
            {buildQuestionType(type)}
        </div>
        </ThemeProvider>
    );
}


function MultipleChoice(props) {
    const { avg_score, course_ID, creation_time, department_ID, text, times_answered, type } = props.data;
    
    // query
    const query = "multiple_choice/" + props.id;
    useEffect( () => {
        firebase.database().ref(query).once('value').then(function(snapshot){
            setOptions(snapshot.val().possible_answers);
            setCorrectAnswer(snapshot.val().correct_answer)
            //console.log(snapshot.val().possible_answers)
        })
    }, [])
    
    // options
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState([]);
    
    const classes = useStyles();
    const [selection, setSelection] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('');
    
    const handleRadioChange = (event) => {
        // removes helper text when a radio is selected
		setSelection(event.target.value);
		setHelperText(' ');
		setError(false);
	};
    
	const handleSubmit = (event) => {
        // tells them if they got the answer right
		event.preventDefault();
        
		if (selection === correctAnswer) {
            setHelperText('You got it!');
			setError(false);
		} else if (selection === '') {
            setHelperText('Please select an option.');
			setError(true);
        } else {
            setHelperText('Sorry, wrong answer!');
			setError(true);
		}
    };
    
    const renderOptions = Object.entries(options).map(([key, value]) =>{
        return(<>
            <FormControlLabel value={key} control={<Radio />} label={value} className={classes.formControlLabel} />
        </>);
    })
    
    return(<>
        <div>
			<form onSubmit={handleSubmit}>
				<FormControl component="fieldset" error={error} className={classes.formControl}>
					{/* <FormLabel component="legend">Pop quiz: Material-UI is...</FormLabel> */}
					<RadioGroup aria-label="quiz" name="quiz" value={selection} onChange={handleRadioChange}>
                        {renderOptions}
					</RadioGroup>
					<FormHelperText className={classes.helperText}>{helperText}</FormHelperText>
					<Button className = "check-answer-button" type="submit" variant="contained" color="secondary" >
						Check Answer
                </Button>
				</FormControl>
			</form>
		</div>
    </>
    );
}

function MultipleSelect(props) {
    const { avg_score, course_ID, creation_time, department_ID, text, times_answered, type } = props.data;

    // query
    const query = "multiple_select/" + props.id;
    useEffect( () => {
        firebase.database().ref(query).once('value').then(function(snapshot){
            setOptions(snapshot.val().possible_answers);
            setCorrectAnswers(snapshot.val().correct_answers)
            //console.log(snapshot.val().possible_answers)
        })
    }, [])

    // options
    const [options, setOptions] = useState([]); // key is the letter (corresponds to the correct answer), value is the option text
    const [correctAnswers, setCorrectAnswers] = useState([]); // value is the key of the correct answer

    const [selections, setSelections] = useState([]);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    const classes = useStyles();

    // tell them if they got the answer right
    const handleSubmit = (event) => {
		event.preventDefault();
        var comparison = selections.sort().every((val, index) => val === correctAnswers.sort()[index]) && selections.length === correctAnswers.length;
		if (comparison) {
            setHelperText('You got it!');
			setError(false);
		} else if (selections.length === 0) {
            setHelperText('Please select an option.');
			setError(true);
        } else {
            setHelperText('Sorry, wrong answer!');
			setError(true);
		}
    };

    // removes helper text, updates selection
    const handleRadioChange = (event) => {
        if (event.target.checked === true) {
            setSelections([ ...selections, event.target.value]);
        } else {
            setSelections(selections.filter(function(selection)
                {
                return selection !== event.target.value
                })
            );
        }
		setHelperText(' ');
		setError(false);
	};

    // render the select options
    const renderOptions = Object.entries(options).map(([key, value]) =>{
        return(<>
            <FormControlLabel value={key} control={<Checkbox />} label={value} className={classes.formControlLabel} />
        </>);
    })

    return(<>
        <div>
			<form onSubmit={handleSubmit}>
				<FormControl component="fieldset" error={error} className={classes.formControl}>
					{/* <FormLabel component="legend">Pop quiz: Material-UI is...</FormLabel> */}
					<FormGroup aria-label="quiz" name="quiz" value={selections} onChange={handleRadioChange}>
                        {renderOptions}
					</FormGroup>
					<FormHelperText className={classes.helperText}>{helperText}</FormHelperText>
					<Button type="submit" variant="contained" color="secondary" className="check-answer-button">
						Check Answer
                </Button>
				</FormControl>
			</form>
		</div>
    </>
    );
}

function TrueFalse(props) {
    const { avg_score, course_ID, creation_time, department_ID, text, times_answered, type } = props.data;
    
    // query
    const query = "truefalse/" + props.id;
    console.log(query)
    useEffect( () => {
        firebase.database().ref(query).once('value').then(function(snapshot){
            if (snapshot.val() === null)
            {
                console.log(query);
            }
            setCorrectAnswer(snapshot.val().correct_answer);
        })
    }, [])
    
    // options
    const [correctAnswer, setCorrectAnswer] = useState([]);
    
    const classes = useStyles();
    const [selection, setSelection] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('');
    
    const handleRadioChange = (event) => {
        // removes helper text when a radio is selected
		setSelection(event.target.value);
		setHelperText(' ');
		setError(false);
	};
    
	const handleSubmit = (event) => {
        // tells them if they got the answer right
		event.preventDefault();
        
		if (selection === correctAnswer) {
            setHelperText('You got it!');
			setError(false);
		} else if (selection === '') {
            setHelperText('Please select an option.');
			setError(true);
        } else {
            setHelperText('Sorry, wrong answer!');
			setError(true);
		}
    };
    
    return(<>
        <div>
			<form onSubmit={handleSubmit}>
				<FormControl component="fieldset" error={error} className={classes.formControl}>
					{/* <FormLabel component="legend">Pop quiz: Material-UI is...</FormLabel> */}
					<RadioGroup aria-label="quiz" name="quiz" value={selection} onChange={handleRadioChange}>
                        <FormControlLabel value="true" control={<Radio />} label="True" className={classes.formControlLabel} />
                        <FormControlLabel value="false" control={<Radio />} label="False" className={classes.formControlLabel} />
					</RadioGroup>
					<FormHelperText className={classes.helperText}>{helperText}</FormHelperText>

					<Button type="submit" variant="contained" color="secondary" className = "check-answer-button">
						Check Answer
                    </Button>
				</FormControl>
			</form>
		</div>
    </>
    );
}

function WrittenAnswer(props) {
    const { avg_score, course_ID, creation_time, department_ID, text, times_answered, type } = props.data;
    const classes = useStyles();

    const handleSubmit = (event) => {
        // tells them if they got the answer right
		event.preventDefault();
    };

    return(<>
        <div>
			<form onSubmit={handleSubmit}>
				<FormControl component="fieldset" className={classes.formControl}>
                    <TextField
                    id="standard-multiline-static"
                    label="Type your answer here"
                    multiline
                    rows={4}
                    defaultValue=""
                    InputProps={{
                        className: classes.multilineColor
                    }}
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    color="primary"
                    />

					<Button type="submit" variant="contained" color="secondary" className = "check-answer-button">
						Check Answer
                    </Button>
				</FormControl>
			</form>
		</div>
    </>
    );
}

function FillInTheBlank(props) {
    const { avg_score, course_ID, creation_time, department_ID, text, times_answered, type } = props.data;
    const classes = useStyles();

    const handleSubmit = (event) => {
        // tells them if they got the answer right
		event.preventDefault();
    };
}

export default QuestionCard;
