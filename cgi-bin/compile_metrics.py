#! /usr/bin/python

import cgi
import cgitb
import time
import sys
import subprocess
import re
import math
import json
import string
import psutil

cgitb.enable()
bad_chars = "t|e|m|p|=|'|C|n|b|f|r|q|u|n|c|y|(|)"

# Set class for string-emptying support
class Del:
  def __init__(self, keep=string.digits):
    self.comp = dict((ord(c),c) for c in keep)
  def __getitem__(self, k):
    return self.comp.get(k)

# Set definition for finding network transmission rate (RX/TX)
def trans_rate(dev, direction, timestep):
    path = "/sys/class/net/{}/statistics/{}_bytes".format(dev, direction)
    f = open(path, "r")
    bytes_before = int(f.read())
    f.close()
    time.sleep(timestep)
    f = open(path, "r")
    bytes_after = int(f.read())
    f.close()
    return (bytes_after-bytes_before)/timestep

# Prepare the HTML request
print("Content-type: text/html\n")

# Get the CPU temperature
cpu_temp = subprocess.run(['vcgencmd', 'measure_temp'], stdout=subprocess.PIPE)
cpu_temp_decoded = cpu_temp.stdout.decode('utf-8')
# Remove uneccessary bits of text
cpu_temp_finalC = re.sub(bad_chars, "", cpu_temp_decoded)
# Convert temperature to Fahrenheit from Celsius
cpu_temp_finalF = (float(cpu_temp_finalC) * 1.8 + 32.0)


# Get the CPU frequency
cpu_freq = psutil.cpu_percent()


# Get memory information
system_memory = psutil.virtual_memory()[2]


# Get network transmission information (RX/TX)
network_rx = trans_rate("eth0", "rx", 2)
network_tx = trans_rate("eth0", "tx", 2)
# Convert values from bytes to kilobytes
network_rx_final = (float(network_rx) / 1024.0)
network_tx_final = (float(network_tx) / 1024.0)


# Put values into a JSON file for later parsing
data = '{"metrics": [{"cpu_temp": "' + str(cpu_temp_finalF) + '", "cpu_freq": "' + str(cpu_freq) + '", "system_memory": "' + str(system_memory) + '", "network_rx": "' + str(network_rx_final) + '", "network_tx": "' + str(network_tx_final) + '"}]}'


print(data)