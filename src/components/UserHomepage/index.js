import React, {useEffect} from 'react';
import firebase from 'firebase';
import './userhomepage.css';
import QuestionCard from '../QuestionCard';
import { useList } from 'react-firebase-hooks/database';


function UserHomepage() {

    const [snapshots, loading, error] = useList(firebase.database().ref("question_metadata").orderByChild("creation_time").limitToLast(25));

    return (
        <div className="feed-container">
            <div id= "middle-feed" className="center-feed">
                <h1>Course Title</h1>
                <div className="feed-options">
                    sort menu and tag selector goes here
                </div>
                <div className="question-stream">
                    {snapshots && snapshots.reverse().map(question => <QuestionCard key={question.key} id={question.key} data={question.val()}/>)}
                </div>
            </div>
        </div>
    );
}

export default UserHomepage;