
import sys,json

while (True):
    data = input()
    try:
        data = json.loads(data)
        print(data)
        sys.stdout.flush()
    except json.JSONDecodeError:
        pass
    except Exception as e:
        raise e
