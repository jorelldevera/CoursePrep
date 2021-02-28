import React, { useState, useEffect} from 'react'
import firebase from 'firebase';
import './userhomepage.css';
import QuestionCard from '../QuestionCard';
import { useList } from 'react-firebase-hooks/database';
import Sidebar from '../Sidebar';




function UserHomepage() {

    const [metaSnapshots, setMetaSnapshots] = useState([]);


    useEffect( () => {

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var userID = firebase.auth().currentUser.uid
                const query = "questions_saved/" + userID + "/";
                var qid_ref = firebase.database().ref(query)
                qid_ref.once('value').then(function(snapshot) {
            
                    snapshot.forEach(function(childSnapshot) {
                        var metadata = firebase.database().ref("question_metadata").orderByKey().equalTo(childSnapshot.key)
                        metadata.once('value').then(function(meta_snapshot) {
                            setMetaSnapshots(prevSnapshots => [...prevSnapshots, meta_snapshot.child(childSnapshot.key)])
                        })
                    })
                })
            } 
          });

    },[]);



   
    return (
        <div className="feed-ctnr">
            <Sidebar/>
            <div id= "middle-feed" className="center-feed">
                <h1>Saved Questions</h1>
                <div className="feed-options">
                    <p></p>
                </div>
                <div className="question-stream">
                    {metaSnapshots && metaSnapshots.reverse().map(question => <QuestionCard key={question.key} id={question.key} data={question.val()}/>)}
                    <div className="question-stream-end"></div>
                </div>
            </div>
        </div>
    );
}

export default UserHomepage;