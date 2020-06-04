#!/usr/bin/python3

import cgi
import cgitb
import time
import sys
import subprocess
import math
import json
import string
import psutil

cgitb.enable()

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
print("Content-Type: text/html\n\n")

# Get the CPU temperature
cpu_temp = subprocess.run(['vcgencmd', 'measure_temp'], stdout=subprocess.PIPE)
cpu_temp_decoded = cpu_temp.stdout.decode('utf-8')
# Remove uneccessary bits of text
cpu_temp_finalC = cpu_temp_decoded.translate({ord(c): None for c in "temp='C"})
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