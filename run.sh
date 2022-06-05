
python3 ./python-controller/zmq_runner.py & > py.log
PY_PID=$!

cd aef-controller
npm run electron:serve &
APP_PID=$!

# While copy is running...
while kill -0 $APP_PID 2> /dev/null; do
    sleep 1
done

kill -2 $PY_PID

echo "Done!"
