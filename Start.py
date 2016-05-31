import subprocess

#Update video list
subprocess.call(["python", "GetVideoPath.py"])

#run server
subprocess.call(["node", "server.js"])