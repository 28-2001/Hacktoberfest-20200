from tkinter import *
import googletrans
from googletrans import Translator,constants

def get_key(d1):
    for key,value in constants.LANGUAGES.items():
        if d1.lower()==value:
            return key


def Translated():
    s=e1.get()
    d1=e3.get()
    translator=Translator()
    translation = translator.translate(s,dest=get_key(d1))
    e2.delete(0,END)
    e2.insert(0,translation.text)





root=Tk()

root.title('Python Translator')
# defining labels
l1=Label(root,text="Enter text to be translated")
l3=Label(root,text="Enter language to be translated in")
l2=Label(root,text="Translated text is:")

# defining textbox
e1=Entry(root,text="string",borderwidth=5)
e2=Entry(root,borderwidth=5)
e3=Entry(root,text="lang",borderwidth=5)

#defining button
b1=Button(root,text="Translate",command=Translated)
b1.grid(row=3,columnspan=2)

# positioning textbox
e1.grid(row='0',column='1')
e3.grid(row='1',column='1')
e2.grid(row='2',column='1')

# positioning labels
l1.grid(row='0',column='0')
l2.grid(row='2',column='0')
l3.grid(row='1',column='0')
root.mainloop()
