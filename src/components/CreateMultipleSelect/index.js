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

    var questionData = {
        author_ID: 1,
        correct_answers: [],
        hints: [],
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
    const [answers, setAnswers] = useState(questionData.possible_answers);
    const [hint1, setHint1] = useState("")
    const [hint2, setHint2] = useState("")
    const [hint3, setHint3] = useState("")
    const [hint4, setHint4] = useState("")
    const [hint5, setHint5] = useState("")
    

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

        questionData.possible_answers = answers;
        for(const property in questionData.possible_answers){
            //console.log('${property}: ${object[property]}');
            //console.log({property})
            if(i === {property}.property){
                questionData.possible_answers[i] = e;
                setAnswers(questionData.possible_answers);
            }
            //console.log(multipleChoiceData.possible_answers[{property}]);
        }
       // console.log(answers);
    }

    function handleSubmit(){
        console.log("testing pushing...")
        console.log(text);
        questionData.correct_answers = correct;
        questionData.text = text;
        questionData.author_ID = firebase.auth().W;
        questionData.possible_answers = answers;
        questionMetaData.text = text;
        questionMetaData.creation_time = Date.now();
        console.log(answers);
        if (hint1 != "") {questionData.hints.push(hint1)}
        if (hint2 != "") {questionData.hints.push(hint2)}
        if (hint3 != "") {questionData.hints.push(hint3)}
        if (hint4 != "") {questionData.hints.push(hint4)}
        if (hint5 != "") {questionData.hints.push(hint5)}
        
        var key = firebase.database().ref('question_metadata/').push().key;
        console.log(key);
        var updates = {};
        updates["question_metadata/" + key] = questionMetaData;
        updates["multiple_select/" + key] = questionData;
        firebase.database().ref().update(updates);
        closeOnSubmit();
    }

    function createAnswer(i){
        return(
            <React.Fragment>
                <div className="selectanswertext">
                    <label for={"answer-text" + i}>
                        <input type="checkbox" id={"answer" + i} name = "answer" value={i} onChange={(e1)=>{handleCheck(e1.target.value)}}/>
                    </label>
                    <input type="text" id={"answer-text" + i} placeholder={"Answer " + i} onChange={(e2)=>{setAnswer(e2.target.value, i)}} />
                </div>
                <br></br>
            </React.Fragment>
        );
    }

    return(
        <React.Fragment>
            <h1>Multiple Select</h1>
            <h2>Enter Question:</h2>
            <div className="questiontext">
                <input type="text" placeholder="Question Text" onChange={(e)=>{setText(e.target.value)}} />
            </div>
            <br></br>
            <h2>Select Correct Answers:</h2>
            {createAnswer("A")}
            {createAnswer("B")}
            {createAnswer("C")}
            {createAnswer("D")}
            {/* <input type="radio" id="true" name = "answer" value="true" onChange={(e)=>{handleRadio(e.target.value)}}/>
            <label for="true">True</label><br/>
            <input type="text" placeholder="Question Text" onChange={(e)=>{setText(e.target.value)}} />

            <input type="radio" id="false" name = "answer" value="false" onChange={(e)=>{handleRadio(e.target.value)}}/>
            <label for="false">False</label><br/> */}

            <h2>Enter hints (optional):</h2>

            <div className="hinttext">
                <label for="hint1">1: </label>
                <input type="text" id="hint1" placeholder="" onChange={(e)=>{setHint1(e.target.value)}}/><br/>

                <label for="hint2">2: </label>
                <input type="text" id="hint2" placeholder="" onChange={(e)=>{setHint2(e.target.value)}}/><br/>

                <label for="hint3">3: </label>
                <input type="text" id="hint3" placeholder="" onChange={(e)=>{setHint3(e.target.value)}}/><br/>

                <label for="hint4">4: </label>
                <input type="text" id="hint4" placeholder="" onChange={(e)=>{setHint4(e.target.value)}}/><br/>

                <label for="hint5">5: </label>
                <input type="text" id="hint5" placeholder="" onChange={(e)=>{setHint5(e.target.value)}}/><br/>
            </div>

            <Button id = "submit button" variant="contained" disabled = {buttonDisabled} onClick={()=> {handleSubmit()}}>Submit</Button>
        </React.Fragment>

    )
}

export default CreateMultipleSelect;