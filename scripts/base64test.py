import base64
import serial
import glob
import time
import datetime
import os
from threading import Thread

payload1 = 'AAECAwQ='
payload2 = 'rQIAAA=='
payload3 = 'LyoKRmlyc3QgdGltZT8gQ2hlY2sgb3V0IHRoZSB0dXRvcmlhbCBnYW1lOgpodHRwczovL3NwcmlnLmhhY2tjbHViLmNvbS9nYWxsZXJ5L2dldHRpbmdfc3RhcnRlZAoKQHRpdGxlOiAKQGF1dGhvcjogCkB0YWdzOiBbXQpAaW1nOiAiIgpAYWRkZWRPbjogMjAyNC0wMC0wMAoqLwoKY29uc3QgcGxheWVyID0gInAiCgpzZXRMZWdlbmQoCiAgWyBwbGF5ZXIsIGJpdG1hcGAKLi4uLi4uLi4uLi4uLi4uLgouLi4uLi4uLi4uLi4uLi4uCi4uLi4uLi4wMDAuLi4uLi4KLi4uLi4uLjAuMC4uLi4uLgouLi4uLi4wLi4wLi4uLi4uCi4uLi4uLjAuLi4wLjAuLi4KLi4uLjAwMDMuMzAuMC4uLgouLi4uMC4wLi4uMDAwLi4uCi4uLi4wLjA1NTUwLi4uLi4KLi4uLi4uMC4uLjAuLi4uLgouLi4uLjAuLi4uMC4uLi4uCi4uLi4uMC4uLjAuLi4uLi4KLi4uLi4uMDAwLi4uLi4uLgouLi4uLi4wLjAuLi4uLi4uCi4uLi4uMDAuMDAuLi4uLi4KLi4uLi4uLi4uLi4uLi4uLmAgXQopCgpzZXRTb2xpZHMoW10pCgpsZXQgbGV2ZWwgPSAwCmNvbnN0IGxldmVscyA9IFsKICBtYXBgCnAuCi4uYApdCgpzZXRNYXAobGV2ZWxzW2xldmVsXSkKCnNldFB1c2hhYmxlcyh7CiAgWyBwbGF5ZXIgXTogW10KfSkKCm9uSW5wdXQoInMiLCAoKSA9PiB7CiAgZ2V0Rmlyc3QocGxheWVyKS55ICs9IDEKfSkKCmFmdGVySW5wdXQoKCkgPT4gewogIAp9KQ=='

sprigport = max(glob.glob('/dev/ttyACM*'))


#print(payload3)
#decoded = base64.b64decode(payload3) #decode from base 64
#print(decoded) #convert from bytes to string and display


decode1 = base64.b64decode(payload1) 
ser = serial.Serial(sprigport, 115200, serial.EIGHTBITS, serial.PARITY_NONE, serial.STOPBITS_ONE)

def outputlog():
    outputFilePath = os.path.join(os.path.dirname(__file__),
                 datetime.datetime.now().strftime("%Y-%m-%dT%H.%M.%S") + ".bin")

    with ser, open(outputFilePath, mode='wb') as outputFile:
        print("Logging started. Ctrl-C to stop.") 
        try:
            while True:
                time.sleep(1)
                inwaiting = ser.inWaiting()
                outputFile.write((ser.read(inwaiting)))
                outputFile.flush()
        except KeyboardInterrupt:
            print("Logging stopped")

thread = Thread(target = outputlog, args=())

thread.start()
print('opened new thread')
ser.write(decode1)
ser.flush()
#time.sleep(5)
decode2 = base64.b64decode(payload2) 
ser.write(decode2)
ser.flush()
decode3 = base64.b64decode(payload3) 
ser.write(decode3)
#time.sleep(5)
ser.flush()
print('finished writing payloads')
thread.join()
ser.close()
