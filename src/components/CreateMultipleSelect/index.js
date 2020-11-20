import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';

function CreateMultipleSelect({closeOnSubmit}) {
    /**
     * 
     * should metadata have user id field?
     * what is type?
     * 
     * Still Need:
     *      tags
     *      hints
     */

    var questionMetaData = {
        avg_score: 0,
        course_ID: 1,
        creation_time: 0,
        department_ID: 1,
        tags: null,
        text: "",
        times_answered: 0,
        type: 1,
    }

    var multipleSelectData = {
        author_ID: 1,
        correct_answers: [],
        hints: null,
        text: "",
        possible_answers: {
            A: "",
            B: "",
            C: "",
            D: "",
        },
    }


    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [correct, setCorrect] = useState([]);
    const [text, setText] = useState("");
    const [answers, setAnswers] = useState(multipleSelectData.possible_answers);
    

    function handleCheck(e){
        var temp = correct;
        if(temp.includes(e)){
            var index = temp.indexOf(e);
            if(index > -1){
                temp.splice(index, 1);
            }
        }
        else{
            temp.push(e);
        }
        if(temp.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true)
        }
        setCorrect(temp);
    }
    function setAnswer(e,i){

        multipleSelectData.possible_answers = answers;
        for(const property in multipleSelectData.possible_answers){
            //console.log('${property}: ${object[property]}');
            //console.log({property})
            if(i === {property}.property){
                multipleSelectData.possible_answers[i] = e;
                setAnswers(multipleSelectData.possible_answers);
            }
            //console.log(multipleChoiceData.possible_answers[{property}]);
        }
       // console.log(answers);
    }

    function handleSubmit(){
        console.log("testing pushing...")
        console.log(text);
        multipleSelectData.correct_answers = correct;
        multipleSelectData.text = text;
        multipleSelectData.author_ID = firebase.auth().W;
        multipleSelectData.possible_answers = answers;
        questionMetaData.text = text;
        questionMetaData.creation_time = Date.now();
        console.log(answers);
        
        var key = firebase.database().ref('question_metadata/').push().key;
        console.log(key);
        var updates = {};
        updates["question_metadata/" + key] = questionMetaData;
        updates["multiple_select/" + key] = multipleSelectData;
        firebase.database().ref().update(updates);
        closeOnSubmit();
    }

    function createAnswer(i){
        return(
            <React.Fragment>
                <input type="checkbox" id={"answer" + i} name = "answer" value={i} onChange={(e1)=>{handleCheck(e1.target.value)}}/>
                <span>{i + " "}</span>
                <input type="text" id={"answer-text" + i} placeholder="Answer Text" onChange={(e2)=>{setAnswer(e2.target.value, i)}} />
                <br></br>
            </React.Fragment>
        );
    }

    return(
        <React.Fragment>
            <h1>Multiple Select</h1>
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

export default CreateMultipleSelect;