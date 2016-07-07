#!/usr/local/bin/python
import sys, os; sys.path.append(os.path.dirname(os.path.dirname(__file__)))
#import site, os; site.addsitedir(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'MC5Scripts'))

if __name__ == "__main__":
	parser = argparse.ArgumentParser(description='Create database.')
	parser.add_argument('anonymous')
	parser.add_argument('task')
	parser.add_argument('isGold')
	args = parser.parse_args(sys.argv[1:])

	gameSave, inventory = GetLocalSave(gameSavePath, inventoryPath)

	if gameSave == '{}':
		print 'Game Save null'
	if inventory == '{}':
		print 'Inventory null'

	#is GOLD version
	isGOLD = False
	if args.isGold:
		if args.isGold == "True":
			isGOLD = True
		else:
			isGOLD = False
	#cred = 'anonymous:androidTestprofile='
	#cred = 'anonymous:mc5_save_full'
	access_tokken = ''
	crt_etag = 0
	device = ''
	profile = []
	
	#Parse param
	if args.anonymous and args.task:
		desAnonymous = args.anonymous
		
		if(args.task == '1'):
			print('Game_save and _inventory have been pushed!!!')
		elif(args.task == '2'):
			print('Save inventory successful!')
		#remove activities
		elif(args.task == '3'):
			print('task 3')
		elif(args.task == '4'):
			print('Clear profile: done!')
		elif(args.task == '5'):
			print('GetProfile OK!')
	else:
		print('else............')
	
