from flask import Flask, request, Response

app = Flask(__name__)

@app.route('/api/send-live-feed', methods=['POST'])
def receive_live_feed():
    try:
        frame = request.files['frame']

        return Response(frame, mimetype='multipart/x-mixed-replace; boundary=frame')
    except Exception as e:
        return f'Error processing live feed data: {str(e)}', 400

if __name__ == '__main__':
    app.run(debug=True) 
