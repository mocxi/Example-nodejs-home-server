#!/usr/bin/env python
import os, json
FileList = []
FileListJson = {}
FileListJson['video'] = []
with open("config/vidStreamer-sample.json") as jsonFile:
	data = json.load(jsonFile)
print(data)

print(json.dumps(FileListJson))
oldpath = path = os.getcwd()
path = data["rootFolder"]
print(path)

os.chdir(path)

import glob
extList = ['.mp4','.avi']
# FileList = glob.glob('./*.js')
for root, dirs, files in os.walk('./'):
	for file in files:
		for ext in extList:
			if file.endswith(ext):
				print(root)
				print(dirs)
				jsonObj = {}
				jsonObj['name'] = file
				jsonObj['path'] = os.path.join(root, file).replace('\\','/').replace('./', '/')
				FileListJson['video'].append(jsonObj)
				FileList.append(os.path.join(root, file).replace('\\','/'))
		
if len(FileList) < 1:
	print('no file found!')
else:
	for f in FileList:
		print(f)
os.chdir(oldpath)
print(json.dumps(FileListJson))
with open('./config/VidList.json','w+') as outFile:
	outFile.write(json.dumps(FileListJson))
