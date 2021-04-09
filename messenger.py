from flask import Flask, render_template
from flask_socketio import SocketIO
import settings


app = Flask(__name__)
app.config['SECRET_KEY'] = settings.configdata["secret_Key"]
socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

@app.route('/',methods=["GET","POST"])
def sessions():
	return render_template('client_chat.html')

@socketio.on('chat event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print(json)
    socketio.emit('my response', json)

if __name__ == '__main__':
    socketio.run(app, debug=True, host=settings.configdata["endpoint"],port=settings.configdata["port"])
