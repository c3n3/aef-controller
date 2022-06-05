#!/usr/bin/python3
import json
import aef
import aitpi
import sys
import pubsub
import signal
from local_interface import LocalInterface

interface = LocalInterface()

interface.init()
shouldStop = False

def kill(t, t2):
    interface.close()
    pubsub.close()
    exit()

signal.signal(signal.SIGINT, kill)
signal.signal(signal.SIGTERM, kill)

class Updator():
    @staticmethod
    def consume(msg):
        cmd = json.dumps({"command": 'getcommands', 'value': interface.getCommnds()})
        print("Sending cmd", cmd)
        pubsub.send(cmd)

# Update whenever ther is a new command incoming
aitpi.PostalService.addConsumer([aitpi.FolderMessage.msgId], aitpi.PostalService.GLOBAL_SUBSCRIPTION, Updator)

try:
    while (not shouldStop):
        data = pubsub.get()
        try:
            data = json.loads(data)
        except json.JSONDecodeError:
            print("Invalid json")
            continue
        if (data['command'] == 'getinputs'):
            inp = json.dumps({"command": 'getinputs', 'value': interface.getInputs()})
            print("sending inputs", inp)
            pubsub.send(inp)
        elif (data['command'] == 'getcommands'):
            cmd = json.dumps({"command": 'getcommands', 'value': interface.getCommnds()})
            print("Sending cmd", cmd)
            pubsub.send(cmd)
        elif (data['command'] == 'change'):
            aef.changeLink(data['name'], data['value'])
        elif (data['command'] == 'shutdown'):
            break
        elif (data['command'] == 'ping'):
            pubsub.send("ping")

except KeyboardInterrupt as e:
    print("Shutting down", e)


interface.close()

pubsub.close()
