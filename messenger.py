from flask import Flask, render_template
from flask_socketio import SocketIO
import settings
from flask import send_file

app = Flask(__name__)
app.config['SECRET_KEY'] = settings.configdata["secret_Key"]
socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

@app.route('/',methods=["GET","POST"], strict_slashes=False)
def sessions():
	return render_template('client_chat.html')

@app.route('/notification', methods=["GET"])
def notification():
     return send_file(
         "notification.mp3", 
         mimetype="audio/mp3", 
         as_attachment=True, 
         attachment_filename="notification.mp3")

@app.route('/lightmode.css', methods=["GET"])
def lightmode():
     return send_file(
         "lightmode.css", 
         as_attachment=True, 
         attachment_filename="lightmode.css")

@app.route('/darkmode.css', methods=["GET"])
def darkmode():
     return send_file(
         "darkmode.css", 
         as_attachment=True, 
         attachment_filename="darkmode.css")


@socketio.on('chat event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    socketio.emit('my response', json)



if __name__ == '__main__':
    print("[info] Booting")
    socketio.run(app, debug=False, host=settings.configdata["endpoint"],port=settings.configdata["port"])
    print("[info] Booted.")