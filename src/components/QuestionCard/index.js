import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';

function QuestionCard(props) {

    const { avg_score, course_ID, creation_time, department_ID, text, times_answered, type} = props;

    // const [text,setText] = useState([]);
    const [options, setOptions] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState("Incorrect");
    const [correctAnswer, setCorrectAnswer] = useState([]);

    //  useEffect( () => {
    //     // console.log(firebase.auth().W)
    //     firebase.database().ref("multiple_choice/1").once('value').then(function(snapshot){
    //         setText(snapshot.val().text);
    //         setOptions(snapshot.val().possible_answers);
    //         setCorrectAnswer(snapshot.val().correct_answer)
    //         //console.log(snapshot.val().possible_answers)
    //     })
    // }, [])

    // firebase.database().ref("multiple_choice/1").once('value').then(function(snapshot){
    //     setText(snapshot.val().text)
    //     setOptions(snapshot.val().possible_answers)
    //     //console.log(snapshot.val().possible_answers)
    // })


    function handleRadio(e){
        console.log(e)
        setButtonDisabled(false);
        if(e === correctAnswer){
            setResult("Correct");
        }
        else{
            setResult("Incorrect");
        }
    }

    const renderOptions = Object.entries(options).map(([key, value]) =>{
        //console.log(value)
        return(
            <React.Fragment> 
                {/* {key} */}
                <input type="radio" id={key} name = "question" value={key} onChange={(e)=>{handleRadio(e.target.value)}}/>
                <label for={key}>{value.toString()}</label><br/>
            </React.Fragment>
        );
    })

    function handleSubmit() {
        setShowResult(true);
    }

    return (
        <div className="question-card-container">
            {text}
            <form>
                {renderOptions}
                <Button id = "submit button" variant="contained" disabled = {buttonDisabled} onClick={()=> {handleSubmit()}}>Submit</Button>
                {showResult ?
                    <h1>{result}</h1> :
                    null
                }
            </form>
        </div>
    );
}

export default QuestionCard;
