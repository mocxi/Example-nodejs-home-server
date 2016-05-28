#!/usr/bin/env python
import os, json
FileList = []
FileListJson = {}
FileListJson['video'] = []
print(json.dumps(FileListJson))
oldpath = path = os.getcwd()
print(path)

import glob
extList = ['.mp4','.avi']
# FileList = glob.glob('./*.js')
for root, dirs, files in os.walk('./'):
	for file in files:
		for ext in extList:
			if file.endswith(ext):
				jsonObj = {}
				jsonObj['name'] = file
				jsonObj['path'] = os.path.join(root, file).replace('\\','/')
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
