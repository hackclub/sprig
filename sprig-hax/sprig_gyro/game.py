from ST7735 import TFTColor
import machine
import time
import MPU6050
import math
i2c = machine.I2C(0, sda=machine.Pin(0), scl=machine.Pin(1))
mean = [0]
# Set up the MPU6050 class 
mpu = MPU6050.MPU6050(i2c)
# wake up the MPU6050 from sleep
mpu.wake()
mpu.write_lpf_range(0)

def run(spryg):
    while True:
        gyro = mpu.read_gyro_data()
        if abs(gyro[1]-mean[len(mean)-1]) > 3:
            mean.append(gyro[1])
        if len(mean) > 10:
            mean.pop(0)
        final = sum(mean) / len(mean) 
        
        #accel = mpu.read_accel_data()
        print("Gyro: " + str(final))
        spryg.screen.fill(0)
        spryg.screen.text(str(final), 0, 0, 0xFFFF)
        spryg.flip()
        time.sleep(0.1)
    pass
