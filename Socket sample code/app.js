const app        = require('express')();
const http       = require('http').Server(app);
const io         = require('socket.io')(http);
const mysql      = require('mysql');
const dateFormat = require('dateformat');
const path       = require('path');
const config     = require('dotenv').config({ path : path.resolve(process.cwd(), '../.env') }).parsed;
const fs         = require('fs');
const bodyParser = require('body-parser');
const fileType   = require('file-type');
const uuidv4     = require('uuid');

const day        = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
const bucket_url = `${config.APP_URL}/uploads/`;

global.con;

app.use(bodyParser.urlencoded({ extended: true }))

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const page = 1;
const limit = 20;
const offset = limit * page;
const start = offset - limit;

function handleDisconnect() {
	// Recreate the connection, since the old one cannot be reused.
	con = mysql.createConnection({
		host: config.DB_HOST,
		user: config.DB_USERNAME,
		password: config.DB_PASSWORD,
		database: config.DB_DATABASE,
		timezone: 'utc',
	}); 

	con.connect(function (err) {
		// The server is either down
		if (err) {
		  	// or restarting (takes a while sometimes).
		  	console.log("error when connecting to db:", err);
		  	setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
		} else {
		  	console.log("db connect successfully");
		} // to avoid a hot loop, and to allow our node script to
	}); // process asynchronous requests in the meantime.
	
	// If you're also serving http, display a 503 error.
	con.on("error", function (err) {
		console.log("db error", err);
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
		  	// Connection to the MySQL server is usually lost due to either server restart, or a connnection idle timeout (the wait_timeout server variable configures this)
		  	handleDisconnect();
		} else {
		  	console.log("err", err);
		  	throw err;
		}
	});
}

handleDisconnect();

io.sockets.on('connection', function (socket) {

	function getUnreadCount(payload) {
		const { receiver_id } = payload;
		return new Promise(function (resolve, reject) {
			var sql = `SELECT count(id) as unread_count FROM messages WHERE 
						contact_id = ${receiver_id} AND 
						read_at IS NULL AND 
						id NOT IN (SELECT message_id FROM deleted_messages WHERE user_id = ${receiver_id})`;

			con.query(sql, function (err, result) {
				if (err) {
					reject(err);
					return;
				}

				resolve(result);
			});
		});
	}
	  
	socket.on('request_unread_count', async (payload, callback) => {
		try {
			const { receiver_id } = payload;
			await getUnreadCount(payload).then(function (result) {
				io.sockets.in(`room_${receiver_id}`).emit('get_unread_count', result);					
				if (typeof callback == 'function') {
					callback(result);
				}
			}).catch(function (error) {
				throw error;
			});
		} catch (error) {
			console.error('Request Unread Count', error);
		}
	});

	// send media image/video to the user
	socket.on('send_media', async (payload, callback) => {
		try {
			const { media } = payload;
			if (media) {

				const { buffer }    = payload;
				const fileInfo      = await fileType.fromBuffer(buffer);
				const filePath      = `media/${uuidv4.v4()}.${fileInfo.ext}`;
				
				const base64Content = buffer.toString('base64');
				const uploadPath    = path.join(__dirname , '..', `public/uploads/${filePath}`);

			    fs.writeFile(uploadPath, buffer, 'utf8', async (error) => {
			    	try {
			    		if (error) {
							throw error;
				  		}

				  		const { sender_id, receiver_id } = payload;
				  		const data = { sender_id, receiver_id, message: '', media_path: filePath };

				  		await message(data).then(function (message) {
							if (message) {
								if (typeof callback == 'function') {
									callback(message);
								}
							}
						}).catch(function (error) {
							throw error;
						});

			    	} catch(error) {
			    		console.error('File System Write File Caught!', error);
			    	}
			  	});
			}
		} catch (error) {
			console.error('Outer Send Media Caught!', error);
		}
	});

	function blockUser(payload) {
		var { from_user_id, to_user_id } = payload;

		return new Promise(function (resolve, reject) {
			var values = ``;
			
			to_user_id.forEach((id) => {
				values += `(${from_user_id}, ${id}, NOW(), NOW(), NOW()),`;
			});

			values = values.replace(/,\s*$/, "");

			var sql = `INSERT INTO user_block (from_user_id, to_user_id, blocked_at, created_at, updated_at) VALUES ${values}`;
			con.query(sql, function (err, result) {
				if (err) {
					reject(err);
					return;
				}

				resolve(result);
			});
		});
	}

	// block/unblock user via another users
	socket.on('block_user', async (payload, callback) => {
		try {
			await blockUser(payload).then(function (result) {
				if (typeof callback == 'function') {
					callback(result);
				}
			}).catch(function (error) {
				throw error;
			});
		} catch (error) {
			console.error('Block User Caught!', error);
		}
	});

	function unblockUser(payload) {
		var { from_user_id, to_user_id } = payload;

		return new Promise(function (resolve, reject) {
			var sql = `DELETE FROM user_block WHERE from_user_id = ${from_user_id} AND to_user_id IN (${to_user_id.join(',')})`;
			con.query(sql, function (err, result) {
				if (err) {
					reject(err);
					return;
				}

				resolve(result);
			});
		});
	}

	// block/unblock user via another users
	socket.on('unblock_user', async (payload, callback) => {
		try {
			await unblockUser(payload).then(function (result) {
				if (typeof callback == 'function') {
					callback(result);
				}
			}).catch(function (error) {
				throw error;
			});
		} catch (error) {
			console.error('Unblock User Caught!', error);
		}
	});

	function deleteConversation(payload) {
		var { deleted_by, deleted_to } = payload;

		return new Promise(function (resolve, reject) {
			var sql = `INSERT INTO deleted_messages (message_id, user_id, created_at, updated_at)
				SELECT 
					msg.id,
					${deleted_by},
					NOW(),
					NOW()
				FROM messages as msg
				WHERE 
					(user_id IN (${deleted_by}) AND contact_id IN (${deleted_to.join(',')})) OR
					(user_id IN (${deleted_to.join(',')}) AND contact_id IN (${deleted_by}))`;

			con.query(sql, function (err, result) {
				if (err) {
					reject(err);
					return;
				}

				resolve(result);
			});
		});
	}

	// delete conversation between two users
	socket.on('delete_conversation', async (payload, callback) => {
		try {
			await deleteConversation(payload).then(function (result) {
				if (typeof callback == 'function') {
					callback(result);
				}
			}).catch(function (error) {
				throw error;
			});
		} catch (error) {
			console.error('Delete Conserversation Caught!', error);
		}
	});

	function getLastMessage(user) {
		return new Promise(function (resolve, reject) {
			var sql = `SELECT *, IFNULL(CONCAT("${bucket_url}", media_path), '') as media_path FROM messages where id = ${user.last_msg_id} LIMIT 0,1`;
			con.query(sql, function (err, result) {
				if (err) {
					reject(err);
					return;
				}

				var data = JSON.parse(JSON.stringify(result));
				if (data.length > 0) {
					user['last_message'] = data[0];
				} else {
					user['last_message'] = null;
				}
				
				resolve(user);
			});
		});
	}

	function getConversationUsers(user_id) {
	    return new Promise(function (resolve, reject) {
			var sql = `SELECT u.*, CONCAT("${bucket_url}", u.profile_pic) as profile_pic,
					(
					SELECT max(id) FROM messages 
						WHERE 
							(user_id = msg.user_id OR contact_id = msg.user_id) AND
							(user_id = msg.contact_id OR contact_id = msg.contact_id)
					) as last_msg_id,
					(
						SELECT count(id) FROM messages  
							WHERE 
								contact_id = ${user_id} AND 
								user_id = u.id AND 
								read_at IS NULL
					) as unread_count
					FROM messages as msg, users as u
						WHERE CASE
						WHEN msg.user_id = ${user_id}
							THEN msg.contact_id = u.id
						WHEN msg.contact_id = ${user_id}
						THEN msg.user_id = u.id
					END
						AND 
							(msg.user_id = ${user_id} OR msg.contact_id = ${user_id}) AND 
							u.id NOT IN (SELECT to_user_id FROM user_block WHERE from_user_id = ${user_id}) AND
							msg.id NOT IN (SELECT message_id FROM deleted_messages WHERE user_id = ${user_id})
					GROUP BY u.id	
					ORDER BY last_msg_id DESC`;

			con.query(sql, function (err, result) {
				if (err) {
					reject(err);
					return;
				}

				var promises = [];

				var users = JSON.parse(JSON.stringify(result));
				users.forEach((user) => {
					promises.push(getLastMessage(user));
				})

				Promise.all(promises).then((results) => {
					resolve(results);
				});
			});
		});
	}

	//get all the messages of specified conversation between two users    
	socket.on('conversation_users', async (user_id, callback) => {
		try {
			await getConversationUsers(user_id).then(function (data) {
				if (typeof callback == 'function') {
					callback(data);
				}
			}).catch(function(error) {
				throw error;
			});
		} catch(error) {
			console.error('Get Conserversation User Caught!', error);
		}
	});

	function messages(user_id, contact_id) {
		return new Promise(function (resolve, reject) {
			var sql = `SELECT msg.*, IFNULL(CONCAT("${bucket_url}", msg.media_path), '') as media_path
				FROM 
					messages as msg
				WHERE
					msg.user_id IN (${user_id}, ${contact_id}) AND 
					msg.contact_id IN (${user_id}, ${contact_id}) AND 
					msg.id NOT IN (SELECT message_id FROM deleted_messages WHERE user_id = ${user_id})
				ORDER BY msg.id
					ASC`;
			
			con.query(sql, function (err, result) {
				if (err) {
					reject(err);
					return;
				}
				resolve(result);
			});
		});
	}

	// api to get all the messages of specified conversation between two users    
	socket.on('messages', async (user_id, contact_id, callback) => {
		try {
			await messages(user_id, contact_id).then(function(data) {
				if (typeof callback == 'function') {
					callback(data);
				}
			}).catch(function(error) {
				throw error;
			});
		} catch(error) {
			console.error('Get All Message Caught!', error);
		}
	});

	function message(data) {			
		return new Promise(function (resolve, reject) { 
			
			var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
			var sql = `INSERT INTO messages (user_id, contact_id, body, media_path, created_at, updated_at) 
			VALUES ('${data.sender_id}','${data.receiver_id}', NULLIF('${data.message}', ''), NULLIF('${data.media_path}', ''), '${date}', '${date}')`;

			con.query(sql, function (err, result) {
				if (err) {
					reject(err);
					return;
				}

				if (result) {
					var sql1 = `SELECT id, user_id, contact_id, read_at, created_at,body, IFNULL(CONCAT("${bucket_url}", media_path), '') as media_path, 
					(
						SELECT count(id) FROM messages 
							WHERE 
								contact_id = ${data.receiver_id} AND 
								read_at IS NULL AND
								id NOT IN (SELECT message_id FROM deleted_messages WHERE user_id = ${data.receiver_id})
					) as unread_count
					FROM  messages WHERE id = ${result.insertId}`;
					con.query(sql1, function (err, res) { 
						if (err) {
							reject(err);
							return;
						} else {
							io.sockets.in('room_' + data.receiver_id).emit('get_message', res);
							resolve(res);
						}
					});
				}
			});
		});
	}

	// api to send message
	socket.on('message', async (data, callback) => {
		try {
			if (!data.hasOwnProperty('media_path')) {
				data['media_path'] = '';
			}

			await message(data).then(async function (result) {
				if (result) {
					await messages(data.sender_id, data.receiver_id).then(function (data) {
						if (typeof callback == 'function') {							
							callback(data);
						}
					}).catch(function (error) {
						throw error;
					});
				}
			}).catch(function (error) {
				throw error;
			});
		} catch (error) {
			console.error('Send Message Caught!', error);
		}
	});
	
	// api to mark typing status
	socket.on('typing', function (payload, callback) {
		try {
			var { sender_id, receiver_id, typingStatus } = payload;
			io.sockets.in(`room_${receiver_id}`).emit('typing', {
				sender_id, receiver_id, typingStatus
			});

			if (typeof callback == 'function') {
				callback(payload);
			}
		} catch(error) {
			console.error('Typing Message Caught!', error);
		}
	});

	function deleteMessage(message_id) {
		return new Promise(function (resolve, reject) {
			var sql2 = "DELETE FROM messages WHERE id = " + message_id;
			con.query(sql2, function (err, result) {
				if (err) {
					reject(err);
					return;
				}
				resolve(result);
			});
		})
	}

	// mark as a delete message
	socket.on('delete_message', async (payload, callback) => {
		try {
			var { sender_id, receiver_id, message_id } = payload;
			await deleteMessage(message_id).then(function (data) {
				io.sockets.in(`room_${receiver_id}`).emit('message_deleted', payload);
				if (typeof callback == 'function') {
					callback(data);
				}
			}).catch(function (error) {
				throw error;
			});
		} catch(error) {
			console.error('Delete Message Caught!', error);
		}
	});

	//method to add method status
	function changeStatus(sender_id, receiver_id, status, message_id = null) {
		return new Promise(function (resolve, reject) {
			if (status == 'read') {

				var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
				var sql2 = "UPDATE messages SET  delivered_at='" + date + "' , read_at='" + date + "' WHERE user_id = " + sender_id + " AND contact_id=" + receiver_id;
				con.query(sql2, function (err, result) {
					if (err) {
						reject(err);
						return;
					}
					resolve(result);
				});

			} else if (status == 'delivered') {

				var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
				var sql2 = "UPDATE messages SET delivered_at='" + date + "' WHERE id =" + message_id;

				con.query(sql2, function (err, result) {
					if (err) {
						reject(err);
						return;
					}
					resolve(result);
				});
			}
		})
	}

	// mark all mesage read for specified id
	socket.on('mark_messages_read', async (sender_id, receiver_id, callback) => {
		try {
			await changeStatus(sender_id, receiver_id, 'read').then(function (data) {
				var payload = {
					sender_id: sender_id,
					receiver_id: receiver_id,
				}

				io.sockets.in(`room_${sender_id}`).emit('message_read', payload);
				if (typeof callback == 'function') {
					callback(data);
				}
			}).catch(function (error) {
				throw error;
			});
		} catch(error) {
			console.error('Mark Messages Read Caught!', error);
		}
	});

	// mark mesage delivered 
	socket.on('mark_messages_delivered', async (sender_id, receiver_id, message_id, callback) => {
		try {
			await changeStatus(sender_id, receiver_id, 'delivered').then(function (data) {
				var payload = {
					sender_id: sender_id,
					receiver_id: receiver_id,
					message_id: message_id,
				}

				io.sockets.in(`room_${sender_id}`).emit('message_delivered', payload);
				if (typeof callback == 'function') {
					callback(data);
				}
			}).catch(function (error) {
				throw error;
			});
		} catch(error) {
			console.error('Mark Messages Delivered Caught!', error);
		}
	});

	// get user details
	function getUser(user_id) {
		return new Promise(function (resolve, reject) {
			var sql = `SELECT * FROM users WHERE id = ? LIMIT 1`;
			con.query(sql, [user_id] , function (err, result) {
				if (err) {
					reject(err);
					return;
				}

				resolve(result);
			});
		});
	}

	// user online/logout status
	socket.on('login', async(user_id, callback) => {
		try {   
			var room = `room_${user_id}`;
			socket.join(room);

			//get user
			await getUser(user_id).then(function(data) {
				if (data.length > 0) {
					let user = data[0];
					if (typeof callback == 'function') {
						callback({
							data: user,
							message: `${user.first_name} ${user.last_name} has been logged in successfully`
						})
					}
					console.log(`${user.first_name} ${user.last_name} has been logged in successfully`);
				}
			}).catch(function (error) {
				throw error;
			});
		} catch(error) {
		    console.error('Login Caught!', error);
		}
	});

	// user offline/logout status
	socket.on('logout', function(user_id, callback) {
		try {
			var room = `room_${user_id}`;
			socket.leave(room);

			setTimeout(function (argument) {
				socket.emit('disconnect');
				if (typeof callback == 'function') {
					callback({
						message: 'user has been logged out successfully'
					});
				}
			}, 100);

		} catch(error) {
			console.error('Logout Caught!', error);
		}
	});

	// all events marked as closed
	socket.on('disconnect', function () {
		console.log('server is disconnected successfully');
	});
});

const port = config.APP_PORT;
http.listen(port, function(err) {
	try {
		if(err) throw err;
		console.log(`App listening on http://localhost:${http.address().port || 3000}`);
	} catch {
		console.error('Caught!', error);
	}
});