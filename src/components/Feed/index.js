import React from 'react';
import './feed.css';
import QuestionCard from '../QuestionCard';
import Sidebar from '../Sidebar';
import CreateQuestionButton from '../CreateQuestionButton';

function Feed() {
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
                    <QuestionCard/>
                </div>
            </div>
            <div className="right-menu">
                <CreateQuestionButton/>
            </div>
        </div>
    );
}

export default Feed;