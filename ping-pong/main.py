import turtle
import math
import random
import sys

ball_speed = int(input('what do you want the speed of ball?(numbers only)(according to processor) - '))

#set up screen
wn = turtle.Screen()
wn.bgcolor('black')
wn.title('Ping Pong')


#Draw border
border_pen = turtle.Turtle()
border_pen.speed(0)
border_pen.color('white')
border_pen.penup()
border_pen.setposition(-300,-300)
border_pen.pendown()
border_pen.pensize(3)
for side in range(4):
    border_pen.fd(600)
    border_pen.lt(90)

border_pen.hideturtle()

#set level
level = 1

level_pen = turtle.Turtle()
level_pen.speed(0)
level_pen.color('white')
level_pen.penup()
level_pen.setposition(-290,310)
levelstring = 'Level: %s' %level
level_pen.write(levelstring, False, align='left', font=('Arial', 14, 'normal'))
level_pen.hideturtle()

#set score
score = 0

#draw score
score_pen = turtle.Turtle()
score_pen.speed(0)
score_pen.color('white')
score_pen.penup()
score_pen.setposition(-200,310)
scorestring = 'Score: %s' %score
score_pen.write(scorestring, False, align='left', font=('Arial', 14, 'normal'))
score_pen.hideturtle()

#create player
player = turtle.Turtle()
player.color('white')
player.shape('square')
player.shapesize(stretch_wid =5 , stretch_len = 1 )
player.penup()
player.speed(0)
player.goto(-280,0)

playerspeed = ball_speed + 15

#create ball
ball = turtle.Turtle()
ball.color('white')
ball.shape('circle')
ball.penup()
ball.speed(0)
ball.goto(0,0)

#ball speed and movement setup



ball.dx = ball_speed
ball.dy = ball_speed


#create enemy

enemy = turtle.Turtle()
enemy.color('white')
enemy.shape('square')
enemy.shapesize(stretch_wid = 5 , stretch_len = 1 )
enemy.penup()
enemy.speed(0)
enemy.goto(270,0)


def player_up():
    y = player.ycor()
    y += playerspeed
    player.sety(y)
    

def player_down():
    x = player.ycor()
    x -= playerspeed
    player.sety(x)
    

    
#enemy movement
ball_y = ball.ycor()
enemy.sety(ball_y)
    


#keyboard
turtle.listen()
turtle.onkey(player_up, 'w')
turtle.onkey(player_down, 's')


while True:
    
    #bounding player
    if player.ycor() >= 280 :
        player.sety(280)
    
    #ball movement
    ball.setx(ball.xcor() + ball.dx)
    ball.sety(ball.ycor() + ball.dy)
    
    #enemy movement
    ball_y = ball.ycor()
    enemy.sety(ball_y)
    
    
    if ball.ycor() >= 280 :
        ball.sety(280)
        ball.dy *= -1

    if ball.ycor() <= -280 :
        ball.sety(-280)
        ball.dy *= -1
        
        
    if ball.xcor() <= -250 and ball.ycor() >= player.ycor() -30 and ball.ycor() <= player.ycor() +30 :
        ball.setx(-249)
        ball.dx *= -1
        score_pen.clear()
        score += 10
        scorestring = 'Score: %s' % score
        score_pen.write(scorestring, False, align='left', font=('Arial', 14, 'normal'))

    if ball.xcor() >= 275 :
        ball.setx(270)
        ball.dx *= -1

        
    if score == (level * 100) :
        level += 1
        levelstring = 'Level: %s' % level
        level_pen.clear()
        level_pen.write(levelstring, False, align='left', font=('Arial', 14, 'normal'))
        ball_speed += level

    if ball.xcor() <= -290 :
        player.hideturtle()
        enemy.hideturtle()
        ball.hideturtle()
        print('game over')
        print('Your Score = %s' %score )