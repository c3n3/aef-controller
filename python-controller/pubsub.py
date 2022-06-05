import zmq
import sys

port = "7778"
context = zmq.Context()
pubsock = context.socket(zmq.PUB)
pubsock.bind("tcp://*:%s" % port)
pubsock.connect ("tcp://localhost:%s" % port)

port = "7777"
subsock = context.socket(zmq.SUB)
topicfilter = "aef-command"
subsock.setsockopt_string(zmq.SUBSCRIBE, topicfilter)
subsock.connect("tcp://localhost:%s" % port)

def send(string):
    pubsock.send_string("%s %s" % ("aef-info", string))

def get():
    topic = subsock.recv_string()
    value = subsock.recv_string()
    print("GOT", value)
    return value

def close():
    subsock.close()
    pubsock.close()


if (__name__ == "__main__"):
    while (True):
        res = get()
        send(res)
        print(res)
