#!/usr/bin/env python -B
# Instructions for running and debugging this python file in VSCode
# The program assumes that you have python3 and pip3 installed on your machine.
# In the VSCode terminal window type the following:
#    pip3 install -r requirements.txt
# In VSCode, press Cmd-Shift-P (on Mac) or Ctrl-Shift-P (on Windows).
#   In the command selection text box, type "Python Create"
#   From the options dropdown select "Python Create Environment"
#   From the next options dropdown select "venv"
# Google Mail:  Use your current Google mail account or create a new one:
#   Use this link to create an "App Password" that will allow this program to use the 
#   Gmail acccount to send the email to the email address to the account specified
#   in the contact form.
#
# After the above and setting up the database, you should be able to run and debug this program
import sys 
sys.dont_write_bytecode = True
from intro_to_flask import app

app.run(debug=True)
