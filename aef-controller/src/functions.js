
import {PythonShell} from 'python-shell';
// let pyshell = new PythonShell('../python-controller/zmq_runner.py');
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
const sleep = ms => new Promise(res => setTimeout(res, ms));


// // Get your libraries
// var zmq = require('zeromq')

// // Connect to your ZeroMQ Socket
// sock = zmq.socket('sub')
// sock.connect('tcp://127.0.0.1:4001');
// sock.subscribe('rand');
// console.log('ZMQ sub connected to port 4000');

// //Create a function that will get triggered by ZeroMQ. Data is the binary stream that is recieved by ZeroMQ.
// function trigger(data) {
//   //Throw away the Topic of your recieved String by cutting off the first 4 bytes ("rand") 
//   data = data.toString().slice(4)
//   //Parse the remaining string and send the object to your WebUi via SocketIO
//   data = JSON.parse(data)
// }

//Connect your triggerfunction and zeromq.


let functions = {
    zmq: null,
    self: null,
    io: null,
    sock: null,
    subsock: null,
    pingRes: null,
    update: null,
    inputs: [],
    forceUpdate: null,
    commands: {},

    /**
     * @param {String} value The date
     */
    prettyName(value)
    {
        if (value == null || value == undefined || !value) {
            return value
        }
        value = value.replace(/_/g, " ");
        let arr = value.split(" ");
        let newArr = []
        arr.forEach(element => {
            if (element)
                newArr.push(element[0].toUpperCase() + element.slice(1))
        });
        return newArr.join(" ");
    },

    /**
     * @param {String} value The date
     */
    send(string)
    {
        if (functions.zmq !== null) {
            console.log("Sending " + string)
            functions.sock.send(["aef-command", string]);
        }
    },

    change(name, value)
    {
        console.log(name + value)
        functions.send(JSON.stringify({"command": "change", "name": name, "value": value}))
    },

    ping()
    {
        functions.send(JSON.stringify({"command": "ping"}))
    },
    
    getInputs()
    {
        functions.send(JSON.stringify({"command": "getinputs"}))
    },
    
    getValues()
    {
        functions.send(JSON.stringify({"command": "getcommands"}))
    },

    init(self)
    {
        // pubber.js
        functions.zmq = require("zeromq"),
        functions.sock = functions.zmq.socket("pub");

        try {
            functions.sock.bindSync("tcp://127.0.0.1:7777");
        } catch (error) {
        }
        functions.subsock = functions.zmq.socket("sub");

        try {
            functions.subsock.connect("tcp://127.0.0.1:7778");
            functions.subsock.subscribe("aef-info");
        } catch (error) {
            
        }
        console.log("Subscriber connected to port 7778");

        functions.subsock.on("message", function(topic, message) {
            var str = new TextDecoder().decode(topic).slice("aef-info".length+1)
            var result = JSON.parse(str)
            self.zmq.update = !self.zmq.update;

            if (result["command"] == "getcommands") {
                self.zmq.commands = result['value']
                console.log("---------------------------------------------")
                console.log(functions.commands)
                self.$forceUpdate()
                console.log("---------------------------------------------")
            } else if (result["command"] == "getinputs") {
                self.zmq.inputs = result['value']
                console.log("---------------------------------------------")
                console.log(self.zmq.inputs)
                self.$forceUpdate()
                console.log("---------------------------------------------")
            } else if (result["command"] == "ping") {
                functions.pingRes = true;
                console.log("---------------------------------------------")
                console.log(functions.inputs)
            }
        });
        // var lim = 100
        // while (!functions.pingRes)
        // {
        //     functions.ping()
        // }
        setTimeout(() => {
            functions.getInputs()
            functions.getValues()
        }, 300)

    },
    end()
    {

        functions.send('{"command": "shutdown"}')
        // end the input stream and allow the process to exit
        // pyshell.end(function (err,code,signal) {
        //     if (err) throw err;
        //     console.log('The exit code was: ' + code);
        //     console.log('The exit signal was: ' + signal);
        //     console.log('finished');
        // });
  
    }
}

// pyshell.stdout.on('data', function(data) {
//     console.log(data);
//  });

export default functions