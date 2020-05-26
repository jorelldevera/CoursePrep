const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();



exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("wassup world ! !");
});

exports.getUsers = functions.https.onRequest((request, response) => {
  admin.firestore()
    .collection('user_test')
    .get()
    .then(data => {
      let users = [];
      data.forEach(doc => {
        users.push(doc.data());
      });
      return response.json(users);
    })
    .catch(error => console.error(error));
});

exports.createUser = functions.https.onRequest((request, response) => {
	if(request.method !== 'POST'){
		return response.status(400).json({ error: 'Method not allowed'});
	}
  const newUser = {
    body: request.body.body,
    userHandle: request.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  };

  admin.firestore()
    .collection('user_test')
	.add(newUser)
	.then((doc) => {
		response.json({ message: `document ${doc.id} created succesfully`});
		return null;
	})
	.catch(error => {
		response.status(500).json({error: 'something went wrong'});
		console.error(error);
	});
});

