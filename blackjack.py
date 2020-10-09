# Text based version of blackjack
# Current implementation does not include ace value decision
# Created by Levi Johnson (https://github.com/levimjohn)
import sys
import random
import time

def main():
	playerTally = 0
	dealerTally = 0

	# Logic for player's turn
	print("Player's turn")
	time.sleep(1)
	playerTally = start(playerTally)
	while True:
		if playerTally > 21:
			print("Bust, you lose!")
			sys.exit()
		elif playerTally == 21:
			print("Blackjack, you win!")
			sys.exit()
		response = input("Hit or stay? ")
		if response == "hit":
			playerTally = draw(playerTally)
			continue
		elif response == "stay":
			break
		else:
			continue
	
	# Logic for dealer's turn
	print("Dealer's turn")
	time.sleep(1)
	dealerTally = start(dealerTally)
	while True:
		if dealerTally > 21:
			print("Dealer bust, you win!")
			sys.exit()
		elif dealerTally == 21:
			print("Dealer blackjack, you lose!")
			sys.exit()
		elif dealerTally >= 17:
			print("Dealer stays")
			time.sleep(1)
			break
		else:
			dealerTally = draw(dealerTally)
			continue

	# Takes the resulting tallies and compares them for a final result
	if playerTally > dealerTally:
		print("You win!")
	elif playerTally < dealerTally:
		print("You lose!")
	else:
		print("Tie.")

# Function for setting random initial tally
def start(tally):
	card1 = random.randint(1,11)
	card2 = random.randint(1,11)
	print(f"Drew a {card1} and a {card2}")
	time.sleep(1)
	total = card1 + card2
	print(f"Beginning total is {total}")
	time.sleep(1)
	return total

# Function for drawing cards
def draw(tally):
	card = random.randint(1, 11)
	print(f"Drew a {card}")
	time.sleep(1)
	total = tally + card
	print(f"Current total is {total}")
	time.sleep(1)
	return total

# Executes program
main()