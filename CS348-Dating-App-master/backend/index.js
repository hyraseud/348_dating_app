const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyparser= require('body-parser')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
<<<<<<< HEAD
    password: "stacy101", /*Must change to your password */
=======
    password: "", /*Must change to your password */
>>>>>>> 6d79c26a5797107b027efe08d9e58f7e9b357d03
    database: "binder_base"
})
db.connect((err)=> {
    if (err) throw err;
    console.log("connected");
});
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json())
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM people";
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
})
app.post('/api/getPreferences', (req, res) => {
    db.query('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;', (err) => {
        if (err) {
            console.error('Error setting isolation level:', err);
        } else {
            const email = req.body.email;
            const sqlSelect = "CALL getPreferences(?)";
            db.beginTransaction((err) => {
                if(err) {
                    console.error('Error starting transaction:', err);
                } else {
                    db.query(sqlSelect, [email], (err, result) => {
                        console.log("attempt")
                        if (err) throw err;
                        console.log(result);
                        var json = JSON.parse(JSON.stringify(result))
                        console.log(json)
                        res.send(result)
                    })
                    db.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                        } else {
                            console.log('Transaction committed successfully.');
                        }
                    })
                }
            })
        }
    })                
})

app.post('/api/createPreferences', (req, res) => {
    const gender = req.body.gender;
    const min_age = req.body.min_age;
    const max_age = req.body.max_age;
    const max_distance = req.body.max_distance;
    const user_id = req.body.user_id;

    const sqlInsert = "INSERT INTO preferences (gender, min_age, max_age, max_distance, user_id) VALUES (?,?,?,?,?);"

    db.query(sqlInsert, [gender, min_age, max_age, max_distance, user_id], (err, result) => {
        console.log(err)
        console.log(result)
        res.send(result);
    })
})

app.post('/api/updatePreferences', (req, res) => {
    const gender = req.body.gender;
    const min_age = req.body.min_age;
    const max_age = req.body.max_age;
    const max_distance = req.body.max_distance;
    const user_id = req.body.user_id;

    const sqlUpdate = "UPDATE preferences p JOIN user u on p.user_id = u.id SET gender = ?, min_age = ?, max_age = ?, max_distance = ? WHERE email = ?;"
    db.query(sqlUpdate, [gender, min_age, max_age, max_distance, user_id], (err, result) => {
        console.log(err)
        console.log(result)
        res.send(result);
    })
})

app.post('/api/signUp', (req, res) => {
    db.query('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;', (err) => {
    if (err) {
        console.error('Error setting isolation level:', err);
    } else {
        const email = req.body.email;
        const password = req.body.password;
        

        const sqlInsert = "INSERT INTO user (password, email) VALUES (?,?);"
        db.beginTransaction((err) => {
            if(err) {
                console.error('Error starting transaction:', err);
            } else {
                db.query(sqlInsert, [password, email], (err, result) => {
                    console.log(err)
                    res.send(result);
                })

                db.commit((err) => {
                    if (err) {
                        console.error('Error committing transaction:', err);
                    } else {
                        console.log('Transaction committed successfully.');
                    }
                })
            }


        })
        
    }
})})


app.post('/api/addUser', (req, res) => {

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const gender = req.body.gender;
    const age = req.body.age;
    const ethnicity = req.body.ethnicity
    const about = req.body.about;
    const user_id = req.body.user_id
    
    const sqlInsert = "INSERT INTO people (first_name, last_name, gender, age, ethnicity, about, user_id) VALUES (?,?,?,?,?,?,?);"

    db.query(sqlInsert, [first_name, last_name, gender, age, ethnicity, about, user_id], (err,result) => {
        /*console.log(err)*/
        res.send(result);

    })
})

app.post('/api/login', (req, res) => {
    db.query('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;', (err) => {
    if (err) {
        console.error('Error setting isolation level:', err);
    } else {
        const email = req.body.email;
        const password = req.body.password;

        const sqlSelect = "SELECT id, email, password, first_name FROM user JOIN people ON id=user_id WHERE email = ? AND password = ?"
        db.beginTransaction((err) => {
            if(err) {
                console.error('Error starting transaction:', err);
            } else {
                db.query(sqlSelect, [email, password], (err,result) => {
                    console.log(err)
                    var json = JSON.parse(JSON.stringify(result))
                    console.log(result)
                    if (json.length == 0) {
                        res.send(json)
                    }
                    else {
                        res.send(json)
                    }
                })
                db.commit((err) => {
                    if (err) {
                        console.error('Error committing transaction:', err);
                    } else {
                        console.log('Transaction committed successfully.');
                    }
                })
            }
        })
    }
})
})

app.post('/api/conversations', (req, res) => {
    db.query('SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;', (err) => {
        if (err) {
            console.error('Error setting isolation level:', err);
        } else {
            const userId = req.body.userId;

            const sqlSelect = "CALL findConversations(?)"

            if (!userId) {
                return;
            }

            db.beginTransaction((err) => {
                if(err) {
                    console.error('Error starting transaction:', err);
                } else {

                    db.query(sqlSelect, [userId], (err, result) => {
                        console.log(err);
                        res.send(result);
                    })
                    db.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                        } else {
                            console.log('Transaction committed successfully.');
                        }
                    })
                }
            })
        }
    })
})

app.post('/api/getMatchData', (req,res) => {
    db.query('SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;', (err) => {
        if (err) {
            console.error('Error setting isolation level:', err);
        } else {
            const userId = req.body.userId;

            const sqlSelect = "CALL findMatches(?);"

            if (!userId) {
                return;
            }
            db.beginTransaction((err) => {
                if(err) {
                    console.error('Error starting transaction:', err);
                } else {

                    db.query(sqlSelect, [userId], (err, result) => {
                        console.log(err);
                        res.send(result);
                    })
                    db.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                        } else {
                            console.log('Transaction committed successfully.');
                        }
                    })
                }
            })
        }
    })
})

app.post('/api/getAvgAge', (req,res) => {
    db.query('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;', (err) => {
        if (err) {
            console.error('Error setting isolation level:', err);
        } else {
            const userId = req.body.userId;

            const sqlSelect = "CALL find_avg_age(?);"

            if (!userId) {
                return;
            }

            db.beginTransaction((err) => {
                if(err) {
                    console.error('Error starting transaction:', err);
                } else {

                    db.query(sqlSelect, [userId], (err, result) => {
                        console.log(err);
                        res.send(result);
                    })

                    db.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                        } else {
                            console.log('Transaction committed successfully.');
                        }
                    })
                }
            })
        }
    })
})

app.post('/api/getEthnicity', (req,res) => {
    db.query('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;', (err) => {
        if (err) {
            console.error('Error setting isolation level:', err);
        } else {
            const userId = req.body.userId;

            const sqlSelect = "CALL findEthnicity(?);"

            if (!userId) {
                return;
            }
            db.beginTransaction((err) => {
                if(err) {
                    console.error('Error starting transaction:', err);
                } else {
                    db.query(sqlSelect, [userId], (err, result) => {
                        console.log(err);
                        res.send(result);
                    })
                    db.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                        } else {
                            console.log('Transaction committed successfully.');
                        }
                    })
                }
            })
        }
    })
})



app.post('/api/findUpDates', (req, res) => {
    const userId = req.body.userId;

    const sqlSelect = "CALL findUpDates(?)"

    if (!userId) {
        return;
    }

    db.query(sqlSelect, [userId], (err, result) => {
        console.log(err);
        res.send(result);
    })
})


app.post('/api/findPastDates', (req, res) => {
    const userId = req.body.userId;

    const sqlSelect = "CALL findPastDates(?)"

    if (!userId) {
        return;
    }

    db.query(sqlSelect, [userId], (err, result) => {
        console.log(err);
        res.send(result);
    })
})


app.post('/api/userData', (req,res) => {
    const userId = req.body.userId;

    const sqlSelect = "CALL getUserData(?)";

    if (!userId) {
        return;
    }

    db.query(sqlSelect, [userId], (err, result) => {
        console.log(err);
        res.send(result);
    })
})

app.post('/api/filterName', (req, res) => {
    db.query('SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;', (err) => {
        if (err) {
            console.error('Error setting isolation level:', err);
        } else {
            const userid = req.body.userid;
            const name = req.body.name


            if (!userid) {
                return;
            }
            if (!name) {
                return;
            }

            const sqlSelect = "CALL filter_name(?, ?)";
            db.beginTransaction((err) => {
                if(err) {
                    console.error('Error starting transaction:', err);
                } else {
                    db.query(sqlSelect, [userid, name], (err, result) => {
                        console.log(err);
                        res.send(result);
                    })
                    db.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                        } else {
                            console.log('Transaction committed successfully.');
                        }
                    })
                }
            })
        }
    })          
})

app.post('/api/filterEthnicity', (req, res) => {
    db.query('SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;', (err) => {
        if (err) {
            console.error('Error setting isolation level:', err);
        } else {
            const userid = req.body.userid;
            const ethnicity = req.body.ethnicity;


            if (!userid) {
                return;
            }
            if (!ethnicity) {
                return;
            }

            const sqlSelect = "CALL filterEthnicity(?, ?)";
            db.beginTransaction((err) => {
                if(err) {
                    console.error('Error starting transaction:', err);
                } else {
                    db.query(sqlSelect, [userid, ethnicity], (err, result) => {
                        console.log(err);
                        res.send(result);
                    })
                    db.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                        } else {
                            console.log('Transaction committed successfully.');
                        }
                    })
                }
            })
        }
    })          
})

app.post('/api/filterAge', (req, res) => {
    db.query('SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;', (err) => {
        if (err) {
            console.error('Error setting isolation level:', err);
        } else {
            const userid = req.body.userid;
            const min_age = req.body.min_age;
            const max_age = req.body.max_age;

            if (!userid) {
                return;
            }
            if (!max_age) {
                return;
            }
            if (!min_age) {
                return;
            }

            const sqlSelect = "CALL filter_age(?, ?, ?)";
            db.beginTransaction((err) => {
                if(err) {
                    console.error('Error starting transaction:', err);
                } else {
                    db.query(sqlSelect, [userid, min_age, max_age], (err, result) => {
                        console.log(err);
                        res.send(result);
                    })
                    db.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                        } else {
                            console.log('Transaction committed successfully.');
                        }
                    })
                }
            })
        }
    })          
})

app.post('/api/getMessages', (req, res) => {
    db.query('SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;', (err) => {
        if (err) {
            console.error('Error setting isolation level:', err);
        } else {
            const conversationId = req.body.conversationId;

            if (!conversationId) {
                return;
            }

            const sqlSelect = "CALL getMessages(?)";
            db.beginTransaction((err) => {
                if(err) {
                    console.error('Error starting transaction:', err);
                } else {
                    db.query(sqlSelect, [conversationId], (err, result) => {
                        console.log(err);
                        res.send(result);
                    })
                    db.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                        } else {
                            console.log('Transaction committed successfully.');
                        }
                    })
                }
            })
        }
    })          
})

app.post('/api/sendMessage', (req, res) => {
    const conversationId = req.body.conversationId;
    const sent_by = req.body.userid;
    const message = req.body.message;

    const sqlInsert = "INSERT INTO binder_base.messages (conversation_id, sent_by, message) VALUES (?, ?, ?);"

    db.query(sqlInsert, [conversationId, sent_by, message], (err, result) => {
        console.log(err)
        res.send(result)
    })

})

/* dating and dating history */
app.post('/api/addDate', (req, res) => {
    const first_name = req.body.first_name;
    const date_name = req.body.date_name;
    const date_time = req.body.dateTime;
    const date_day = req.body.date;
    const date_location = req.body.dateLoc;
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const sqlInsert = "INSERT INTO dates (date_location, date_time, date_day, first_name, date_name, user1, user2) VALUES (?,?,?,?,?,?,?);"

    db.query(sqlInsert, [date_location, date_time, date_day, first_name, date_name, user1, user2], (err,result) => {
        console.log(err)
        res.send(result);
    })
})





app.listen(3001, () => {
    console.log("running on port 3001")
});
