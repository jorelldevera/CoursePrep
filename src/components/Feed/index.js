import React from 'react';
import './feed.css';
import QuestionCard from '../QuestionCard';

function Feed() {
    return (
        <div className="feed-container">
            <div className="left-menu">
            this is the left menu
                <div className="my-quizzes">

                </div>
                <div className="course-quizzes">

                </div>
            </div>
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
                spacing
            </div>
        </div>
    );
}

export default Feed;