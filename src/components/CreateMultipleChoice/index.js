import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';


function CreateMultipleChoice() {
     /**
     * 
     * should metadata have user id field?
     * what is type?
     * 
     * Still Need:
     *      tags
     *      hints
     */


    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [correct, setCorrect] = useState("");
    const [text, setText] = useState("");

    var questionMetaData = {
        avg_score: 0,
        course_ID: 1,
        creation_time: 0,
        department_ID: 1,
        tags: null,
        text: "",
        times_answered: 0,
        type: 0,
    }

    var multipleChoiceData = {
        author_ID: 1,
        correct_answer: "",
        hints: null,
        text: "",
        possible_answers: {
            A: "",
            B: "",
            C: "",
            D: "",
        },
    }

    function handleRadio(e){
        setButtonDisabled(false);
        setCorrect(e);
    }
    function setAnswer(e,i){
        console.log(e);
        console.log(i)
        for(const property in multipleChoiceData.possible_answers){
            //console.log('${property}: ${object[property]}');
            console.log({property})
            if(i === {property}.property){
                multipleChoiceData.possible_answers[i] = e;
            }
            //console.log(multipleChoiceData.possible_answers[{property}]);
        }
    }

    function handleSubmit(){
        console.log("testing pushing...")
        console.log(text);
        multipleChoiceData.correct_answer = correct;
        multipleChoiceData.text = text;
        multipleChoiceData.author_ID = firebase.auth().W;
        questionMetaData.text = text;
        questionMetaData.creation_time = Date.now();
        console.log(multipleChoiceData.possible_answers);
        
        var key = firebase.database().ref('question_metadata/').push().key;
        // console.log(key);
        var updates = {};
        updates["question_metadata/" + key] = questionMetaData;
        updates["multiple_choice/" + key] = multipleChoiceData;
        firebase.database().ref().update(updates);
    }

    function createAnswer(i){
        return(
            <React.Fragment>
                <input type="radio" id={"answer" + i} name = "answer" value={i} onChange={(e)=>{handleRadio(e.target.value)}}/>
                <span>{i + " "}</span>
                <input type="text" id={"answer-text + i"} placeholder="Answer Text" onChange={(e)=>{setAnswer(e.target.value, i)}} />
                <br></br>
            </React.Fragment>
        );
    }

    return(
        <React.Fragment>
            <h1>True False</h1>
            <h2>Enter Question:</h2>
            <input type="text" placeholder="Question Text" onChange={(e)=>{setText(e.target.value)}} />
            <br></br>
            <h2>Select Correct Answer:</h2>
            {createAnswer("A")}
            {createAnswer("B")}
            {createAnswer("C")}
            {createAnswer("D")}
            {/* <input type="radio" id="true" name = "answer" value="true" onChange={(e)=>{handleRadio(e.target.value)}}/>
            <label for="true">True</label><br/>
            <input type="text" placeholder="Question Text" onChange={(e)=>{setText(e.target.value)}} />

            <input type="radio" id="false" name = "answer" value="false" onChange={(e)=>{handleRadio(e.target.value)}}/>
            <label for="false">False</label><br/> */}

            <Button id = "submit button" variant="contained" disabled = {buttonDisabled} onClick={()=> {handleSubmit()}}>Submit</Button>
        </React.Fragment>

    )
}

export default CreateMultipleChoice;