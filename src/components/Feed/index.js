import React, {useEffect} from 'react';
import firebase from 'firebase';
import './feed.css';
import QuestionCard from '../QuestionCard';
import Sidebar from '../Sidebar';
import { useList } from 'react-firebase-hooks/database';


function Feed() {

    const [snapshots, loading, error] = useList(firebase.database().ref("question_metadata").orderByChild("creation_time").limitToLast(25));

    return (
        <div className="feed-container">
            <Sidebar/>
            <div className="center-feed">
                <h1>Course Title</h1>
                <div className="feed-options">
                    sort menu and tag selector goes here. tag creation restricted to moderator? how many tags to list?
                </div>
                <div className="question-stream">
                    question stream
                    {snapshots && snapshots.map(question => <QuestionCard key={question.key} id={question.key} data={question.val()}/>)}
                    {/* <QuestionCard/> */}
                </div>
            </div>
            <div className="right-menu">
                spacing
            </div>
        </div>
    );
}

export default Feed;