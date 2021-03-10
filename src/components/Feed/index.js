import React, {useEffect} from 'react';
import firebase from 'firebase';
import './feed.css';
import QuestionCard from '../QuestionCard';
import Sidebar from '../Sidebar';
import CreateQuestionButton from '../CreateQuestionButton';
import { useList } from 'react-firebase-hooks/database';


function Feed() {

    const [snapshots, loading, error] = useList(firebase.database().ref("question_metadata").orderByChild("creation_time").limitToLast(25));

    if (snapshots[8]) {
        console.log(snapshots)
    }
    

    return (
        <div className="feed-ctnr">
            <Sidebar/>
            <div id= "middle-feed" className="center-feed">
                <h1 className = "h1-white">CSCI 241 - Data Structures</h1>
                <div className="feed-options">
                    {/* todo */}
                </div>
                <div className="question-stream">
                    {snapshots && snapshots.reverse().map(question => <QuestionCard key={question.key} id={question.key} data={question.val()}/>)}
                    <div className="question-stream-end"></div>
                </div>
            </div>
            <div className = "rightside-buttons">
                <CreateQuestionButton/>
            </div>
            
        </div>
    );
}

export default Feed;