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

@app.route('/darkmode.css', methods=["GET"])
def darkmode():
     return send_file(
         "darkmode.css", 
         as_attachment=True, 
         attachment_filename="darkmode.css")

@app.route('/manifest.webmanifest', methods=["GET"])
def manifest():
    return send_file(
        "manifest.webmanifest",
        as_attachment=True,
        attachment_filename="manifest.webmanifest"
    )

@app.route('/sw.js', methods=["GET"])
def worker():
    return send_file(
        "sw.js",
        as_attachment=True,
        attachment_filename="sw.js"
    )

@app.route('/icons/512', methods=["GET"])
def icon512():
    return send_file(
        "icons/cryptochat 512.jpg",
        as_attachment=True,
        attachment_filename="cryptochat 512.jpg"
    )

@app.route('/icons/192', methods=["GET"])
def icon192():
    return send_file(
        "icons/cryptochat 192.png",
        as_attachment=True,
        attachment_filename="cryptochat 512.png"
    )

@socketio.on('chat event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    socketio.emit('my response', json)

if __name__ == '__main__':
    print("[info] Booting")
    socketio.run(app, debug=False, host=settings.configdata["endpoint"],port=settings.configdata["port"])
    print("[info] Booted.")