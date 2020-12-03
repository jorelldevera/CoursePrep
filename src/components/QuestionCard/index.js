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

function QuestionCard(props) {
    const { avg_score, course_ID, creation_time, department_ID, text, times_answered, type } = props.data;

    
    // first figure out which question to create and then pass the info to that question
    function buildQuestionType(type) {
        switch (type) {
            case 0:
                // multiple choice
                return(<>
                    <MultipleChoice key={props.key} id={props.id} data={props.data}/>
                </>
                );
                break;
                case 1:
                // multiple select
                return(<>
                    <MultipleSelect key={props.key} id={props.id} data={props.data}/>
                </>
                );
                break;
                case 2:
                    // short answer
                    return(<>
                    <WrittenAnswer key={props.key} id={props.id} data={props.data}/>
                </>
                );
                break;
                case 3:
                    // true false
                    return(<>
                    <TrueFalse key={props.key} id={props.id} data={props.data}/>
                </>
                );
                break;
                case 4:
                    // written answer
                    return(<>
                    <WrittenAnswer key={props.key} id={props.id} data={props.data}/>
                </>
                );
                break;
                default:
                    // error
                    break;
        }
    }
            
            // then query the database for more information from inside the question
            // then set up the question
            // return the question to the question card
            // return the completed question card

    
    
    
    // function handleSubmit() {
    //     setShowResult(true);
    // }
    
    return (
        <div className="question-card-container">
        {buildQuestionType(type)}
        {console.log(props)}
            {text}
            {/* <form> */}
                {/* {renderOptions} */}
                {/* <Button id = "submit button" variant="contained" disabled = {buttonDisabled} onClick={()=> {handleSubmit()}}>Submit</Button>
                {showResult ?
                    <h1>{result}</h1> :
                    null
                } */}
            {/* </form> */}
        </div>
    );
}

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
    const [helperText, setHelperText] = React.useState('Choose wisely');
    
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
        <div className={classes.questionContainer}>
			<header className={classes.questionHeader}>
				<h2 className={classes.questionHeaderText}>{text}</h2>
				
			</header>

			<form onSubmit={handleSubmit}>
				<FormControl component="fieldset" error={error} className={classes.formControl}>
					{/* <FormLabel component="legend">Pop quiz: Material-UI is...</FormLabel> */}
					<RadioGroup aria-label="quiz" name="quiz" value={selection} onChange={handleRadioChange}>
                        {renderOptions}
					</RadioGroup>
					<FormHelperText>{helperText}</FormHelperText>
					<Button type="submit" variant="contained" color="secondary" className={classes.button}>
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
    const [helperText, setHelperText] = useState('Choose wisely');

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
        <div className={classes.questionContainer}>
			<header className={classes.questionHeader}>
				<h2 className={classes.questionHeaderText}>{text}</h2>
			</header>

			<form onSubmit={handleSubmit}>
				<FormControl component="fieldset" error={error} className={classes.formControl}>
					{/* <FormLabel component="legend">Pop quiz: Material-UI is...</FormLabel> */}
					<FormGroup aria-label="quiz" name="quiz" value={selections} onChange={handleRadioChange}>
                        {renderOptions}
					</FormGroup>
					<FormHelperText>{helperText}</FormHelperText>
					<Button type="submit" variant="contained" color="secondary" className={classes.button}>
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
    return(<>

    </>
    );
}

function WrittenAnswer(props) {
    const { avg_score, course_ID, creation_time, department_ID, text, times_answered, type } = props.data;
    return(<>

    </>
    );
}

export default QuestionCard;
