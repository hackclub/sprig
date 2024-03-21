#include "lights.h"
#include "hardware/gpio.h"
#include "hardware/pwm.h"

// Turn on the power lights and dim them with PWM.
void power_lights()
{
	// left white light
	const int pin_num_0 = 28;
	gpio_set_function(pin_num_0, GPIO_FUNC_PWM);
	uint slice_num_0 = pwm_gpio_to_slice_num(pin_num_0);
	pwm_set_enabled(slice_num_0, true);
	pwm_set_gpio_level(pin_num_0, 65535 / 8);

	// right blue light
	// const pin_num_1 = 4;
	// gpio_set_function(pin_num_1, GPIO_FUNC_PWM);
	// uint slice_num_1 = pwm_gpio_to_slice_num(pin_num_1);
	// pwm_set_enabled(slice_num_1, true);
	// pwm_set_gpio_level(pin_num_1, 65535/4);
}
