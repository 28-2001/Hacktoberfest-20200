import time 
from tkinter import *

def start_chrono():
    global start, flag
    flag=1
    start = time.time()
    top_horloge()

def stoper_chrono():
    global flag
    flag=0

def top_horloge():
    global start,flag
    y=time.time()-start    
    seconds = time.localtime(y)[5]
    if flag:
        message.configure(text = "%i sec " %seconds)
    fenetre.after(1000,top_horloge)


flag=0
start = 0
fenetre=Tk()
fenetre.title("Chronometer")
message = Label(fenetre,font=("sans", 20, "bold"),text="Chrono ready!")
message.grid(row=1)
Button(fenetre,text="GO !",command=start_chrono).grid(row=2)
Button(fenetre,text="STOP !",command=stoper_chrono).grid(row=3)
fenetre.mainloop()
