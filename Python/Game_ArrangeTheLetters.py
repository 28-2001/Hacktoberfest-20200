import random
def choice():
    list=['about', 'above', 'across', 'act', 'active', 'activity', 'add', 'afraid', 'after', 'again', 'age', 'ago', 'agree', 'air','all', 'alone', 'along', 'already', 'always', 'am', 'amount', 'an', 'and', 'angry', 'another', 'answer', 'any', 'anyone', 'anything', 'anytime', 'appear', 'apple', 'are', 'area', 'arm', 'army', 'around', 'arrive', 'art', 'as', 'ask', 'at', 'attack', 'aunt', 'autumn', 'away']
    wd=random.choice(list)
    return wd

def jumble(wd):
    jwd=''.join(random.sample(wd,len(wd)))
    return jwd

def game():
    p1=input("Enter your name Player1:   ")
    p2=input("Enter your name Player2:   ")
    print("1.Continue playing         0.End game") 
    ch=int(input("Enter your choice:     "))
    turn =1
    pp1=0
    pp2=0
    while(ch==1):
        
        print("ROUND:  ",turn)
        print(p1,"'s TURN")
        wd=choice()
        jwd=jumble(wd)
        print("Turn ",turn)
        print(p1,"Your word is  ",jwd)
        ans=input("You can take your time! And later type your answer.")
        if(ans==wd):
            pp1=pp1+1
            print("Hurray!That's the right answer")
        else:
            print("Sorry!Better luck next time.The word was  ",wd)
        
        print(p2,"'s TURN")
        wd=choice()
        jwd=jumble(wd)
        print("Turn ",turn)
        print(p2,"Your word is  ",jwd)
        ans=input("You can take your time! And later type your answer.")
        if(ans==wd):
            pp2=pp2+1
            print("Hurray!That's the right answer")
        else:
            print("Sorry!Better luck next time.The word was  ",wd)    
        
        print("At the end of ROUND  ",turn," the points are:")
        print(p1," : ",pp1)
        print(p2," : ",pp2)
        
        print("If you want to end game enter 0 else 1  ")
        ch=int(input())
        turn=turn+1
        
game()