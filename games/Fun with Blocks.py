#By Yogesh Kushwaha
from ursina import *
from ursina.prefabs.first_person_controller import FirstPersonController

app = Ursina()
grass_texture = load_texture('assets/grass_block.png')
stone_texture = load_texture('assets/stone_block.png')
brick_texture = load_texture('assets/brick_block.png')
dirt_texture  = load_texture('assets/dirt_block.png')
sky_texture   = load_texture('assets/skybox.png')
arm_texture   = load_texture('assets/arm_texture.png')
sand_texture = load_texture('assets/sand.png')
leaves_texture = load_texture('assets/leaves.png')
wood_texture = load_texture('assets/wood.png')
red_brick_texture = load_texture('assets/red brick.png')
lava_texture = load_texture('assets/block.png')
pink_texture = load_texture('assets/pink.png')
punch_sound   = Audio('assets/punch_sound',loop = False, autoplay = False)
block_pick = 1

window.fps_counter.enabled = False
window.exit_button.visible = False


def update():
	global block_pick

	if held_keys['left mouse'] or held_keys['right mouse']:
		hand.active()
	else:
		hand.passive()

	if held_keys['1']: block_pick = 1
	if held_keys['2']: block_pick = 2
	if held_keys['3']: block_pick = 3
	if held_keys['4']: block_pick = 4
	if held_keys['5']: block_pick = 5
	if held_keys['0']: block_pick = 0
	if held_keys['9']: block_pick = 9
	if held_keys['8']: block_pick = 8
	if held_keys['7']: block_pick = 7
	if held_keys['6']: block_pick = 6

class Voxel(Button):
	def __init__(self,position = (0,0,0), texture = grass_texture):
		super().__init__(
			parent = scene,
			position = position,
			model = 'assets/block',
			origin_y = 15,
			texture = texture,
			color = color.color(0,0,random.uniform(0.9,1)),
			scale = 0.5)

#By Yogesh Kushwaha
	def input(self,key):
		if self.hovered:
			if key == 'left mouse down':
				punch_sound.play()
				if block_pick == 1: voxel = Voxel(position = self.position + mouse.normal, texture = grass_texture)
				if block_pick == 2: voxel = Voxel(position = self.position + mouse.normal, texture = stone_texture)
				if block_pick == 3: voxel = Voxel(position = self.position + mouse.normal, texture = brick_texture)
				if block_pick == 4: voxel = Voxel(position = self.position + mouse.normal, texture = dirt_texture)
				if block_pick == 5: voxel = Voxel(position = self.position + mouse.normal, texture = sand_texture)
				if block_pick == 0: voxel = Voxel(position = self.position + mouse.normal, texture = leaves_texture)
				if block_pick == 9: voxel = Voxel(position = self.position + mouse.normal, texture = wood_texture)
				if block_pick == 8: voxel = Voxel(position = self.position + mouse.normal, texture = red_brick_texture)
				if block_pick == 7: voxel = Voxel(position = self.position + mouse.normal, texture = lava_texture)
				if block_pick == 6: voxel = Voxel(position = self.position + mouse.normal, texture = pink_texture)

			if key == 'right mouse down':
				punch_sound.play()
				destroy(self)

class Sky(Entity):
	def __init__(self):
		super().__init__(
			parent = scene,
			model = 'sphere',
			texture = sky_texture,
			scale = 5000,
			double_sided = True)
	#By Yogesh Kushwaha

class Hand(Entity):
	def __init__(self):
		super().__init__(
			parent = camera.ui,
			model = 'assets/arm',
			texture = arm_texture,
			scale = 0.2,
			rotation = Vec3(150,-10,1),
			position = Vec2(0.4,-0.6))

	def active(self):
		self.position = Vec2(0.3,-0.5)

	def passive(self):
		self.position = Vec2(0.4,-0.6)

for z in range(1,3):
	for x in range(40):
		for b in range(40):
			voxel = Voxel(position = (x,z,b))

player = FirstPersonController()
sky = Sky()
hand = Hand()

app.run()
#By Yogesh Kushwaha