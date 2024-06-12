from serial import Serial
import time

def calculate_average_heart_rate(bluetooth_port):
    # Open the serial port
    ser = Serial(bluetooth_port, 115200)

    # Wait for the serial port to initialize
    time.sleep(5)  # Waiting for 5 seconds to stabilize the connection

    # Initialize variables for calculating average heart rate
    total_heart_rate = 0
    num_readings = 0

    try:
        start_time = time.time() + 5  # Start recording after 5 seconds
        end_time = start_time + 10  # Record for 10 seconds

        print("Recording heart rate data for 10 seconds...")

        while time.time() < end_time:
            # Read a line from the serial port
            line = ser.readline().decode().strip()

            # Check if the line contains heart rate data
            if line.startswith("Heart rate:"):
                # Extract heart rate value from the line
                heart_rate_str = line.split(":")[1].split("bpm")[0].strip()
                heart_rate = float(heart_rate_str)  # Convert to floating-point number

                # Check if heart rate is above 50 bpm
                if heart_rate > 50:
                    # Increment total heart rate and number of readings
                    total_heart_rate += heart_rate
                    num_readings += 1

                # Print the heart rate
                print("Heart rate:", heart_rate, "bpm")

        # Calculate average heart rate
        if num_readings > 0:
            average_heart_rate = total_heart_rate / num_readings
            rounded_average_heart_rate = round(average_heart_rate, 2)  
            print("Average heart rate:", rounded_average_heart_rate, "bpm")
            return rounded_average_heart_rate
        else:
            print("No valid heart rate readings above 50 bpm.")
            return None
    except KeyboardInterrupt:
        print("Exiting...")
        ser.close()
        return None

# # Example usage:
# bluetooth_port = "/dev/rfcomm0"  # Adjust this according to your system
# average_bpm = calculate_average_heart_rate(bluetooth_port)
