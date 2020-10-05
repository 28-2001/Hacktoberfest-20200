# Tax and Tip Calculator 

subtotal = float(input("How much did you spend? "))
tax_rate = float(input("What is the rate of tax in your area? (If N/A, put 0) ")) / 100
tip_rate = float(input("What is the rate of tip you want to offer? (If N/A, put 0) ")) / 100

tax = subtotal * tax_rate
tip = subtotal * tip_rate

total = subtotal + tax + tip

print('Your total is $' + format(total, '.2f'))