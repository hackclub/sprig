"""
Minecraft clone using Ursina Game-Engine for Python (3.9)
Original version: https://github.com/pokepetter/ursina/blob/master/samples/minecraft_clone.py
ISSUES:
1. Grass texture needs to have its own voxel faces so that the top and bottom texture aren't be the same (line 57)
TO-DO (not in order):
1. 3rd person view
2. Crafting recipes
3. Inventory character view
4. Flying
5. Exit menu
6. Start menu
7. Health and hunger Bar
8. Improved hand animations -- DOING
9. Optimize performance
10. Expand block collection - Have 8 in total
11. Add items - Have 8 in total
12. Terrain generation using Mesh
13. Maximum reach of 4 blocks
14. Chat
HELPFUL RESOURCES:
1. https://www.datacamp.com/community/tutorials/inner-classes-pythonhttps://www.datacamp.com/community/tutorials/inner-classes-python
2. https://www.ursinaengine.org/cheat_sheet_dark.html#build
"""
#By Yogesh Kushwaha

import ursina.application
from ursina import *


# Import separate files
from player import *
from hand import *


# 1. Create basic instance of the game
app = Ursina()


# 7. resources

# Textures
grass_texture = load_texture('resources/grass_texture.png')
dirt_texture = load_texture('resources/dirt_texture.png')
stone_texture = load_texture('resources/stone_texture.png')
cobblestone_texture = load_texture('resources/cobblestone_texture.png')

inventory_slot_texture = load_texture('resources/inventory_slot.png')
boots_slot_texture = load_texture('resources/boots_slot.png')
leggings_slot_texture = load_texture('resources/leggings_slot.png')
chestplate_slot_texture = load_texture('resources/chestplate_slot.png')
helmet_slot_texture = load_texture('resources/helmet_slot.png')
shield_slot_texture = load_texture('resources/shield_slot.png')

# Sounds
punch_sound = Audio('resources/punch_sound', loop=False, autoplay=False)

# Items
grass_block = load_texture('resources/grass_block.png')  # Item not created yet, will be used for inventories
dirt_block = load_texture('resources/dirt_block.png')    # Item not created yet, will be used for inventories
stone_block = load_texture('resources/stone_block.png')  # Item not created yet, will be used for inventories
cobblestone_block = load_texture('resources/cobblestone_block.png')  # Item not created yet, will be used for inventories

iron_boots = load_texture('resources/iron_boots_texture.png') # Item not created yet, will be used for inventories
iron_leggings = load_texture('resources/iron_leggings_texture.png') # Item not created yet, will be used for inventories
iron_chestplate = load_texture('resources/iron_chestplate_texture.png') # Item not created yet, will be used for inventories
iron_helmet = load_texture('resources/iron_helmet_texture.png')     # Item not created yet, will be used for inventories
shield = load_texture('resources/shield_texture.png')         # Item not created yet, will be used for inventories


# 13. Window settings
window.title = 'Voxelcraft'
window.borderless = False
window.fullscreen = False
window.exit_button.visible = False
window.fps_counter.enabled = False


# 15. Inventory
class Inventory(Entity):
    # 15. a. Lower Inventory
    class Lower_Inventory(Entity):
        def __init__(self, **kwargs):
            super().__init__(
                parent=camera.ui,
                model=Quad(radius=0),
                texture=inventory_slot_texture,
                texture_scale=(9, 3),
                scale=(0.72, 0.24),
                origin=(-0.32, 0.62),
                position=(-0.23, -0.03),
                color=color.rgb(255, 255, 255)
            )

            for key, value in kwargs.items():
                setattr(self, key, value)

        def find_free_spot(self):
            for y in range(3):
                for x in range(9):
                    grid_positions = [(int(e.x * self.texture_scale[0]), int(e.y * self.texture_scale[1])) for e in
                                    self.children]
                    print(grid_positions)

                    if not (x, -y) in grid_positions:
                        print('found free spot:', x, y)
                        return x, y

        # Add items
        def append(self, item, x=0, y=0):
            if len(self.children) >= 9 * 3:
                return

            x, y = self.find_free_spot()

            icon = Draggable(
                parent=self,
                model='quad',
                texture=item,
                color=color.white,
                scale_x=1 / self.texture_scale[0],
                scale_y=1 / self.texture_scale[1],
                origin=(-.5, .5),
                x=x * 1 / self.texture_scale[0],
                y=-y * 1 / self.texture_scale[1],
                z=-.5,
            )

            def drag():
                icon.org_pos = (icon.x, icon.y)
                icon.z -= .01  # Ensure the dragged item overlaps the rest

            def drop():
                icon.x = int((icon.x + (icon.scale_x / 2)) * 9) / 9
                icon.y = int((icon.y - (icon.scale_y / 2)) * 3) / 3
                icon.z += .01

                # If outside, return to original position
                if icon.x < 0 or icon.x >= 1 or icon.y > 0 or icon.y <= -1:
                    icon.position = (icon.org_pos)
                    return

                # If the spot is taken, swap positions
                for c in self.children:
                    if c == icon:
                        continue
                    if c.x == icon.x and c.y == icon.y:
                        c.position = icon.org_pos

            icon.drag = drag
            icon.drop = drop
#By Yogesh Kushwaha

    # 16. Hotbar
    class Hotbar(Entity):
        def __init__(self, **kwargs):
            super().__init__(
                parent=camera.ui,
                model=Quad(radius=0),
                texture=inventory_slot_texture,
                texture_scale=(9, 1),
                scale=(0.72, 0.08),
                origin=(-0.32, 0.62),
                position=(-0.23, -0.315),
                color=color.rgb(255, 255, 255)
            )

            for key, value in kwargs.items():
                setattr(self, key, value)

        def find_free_spot(self):
            for y in range(1):
                for x in range(9):
                    grid_positions = [(int(e.x * self.texture_scale[0]), int(e.y * self.texture_scale[1])) for e in
                                    self.children]
                    print(grid_positions)

                    if not (x, -y) in grid_positions:
                        print('found free spot:', x, y)
                        return x, y

        # Add items
        def append(self, item, x=0, y=0):
            if len(self.children) >= 9 * 1:
                return

            x, y = self.find_free_spot()

            icon = Draggable(
                parent=self,
                model='quad',
                texture=item,
                color=color.white,
                scale_x=1 / self.texture_scale[0],
                scale_y=1 / self.texture_scale[1],
                origin=(-.5, .5),
                x=x * 1 / self.texture_scale[0],
                y=-y * 1 / self.texture_scale[1],
                z=-.5,
            )

            def drag():
                icon.org_pos = (icon.x, icon.y)
                icon.z -= .01  # Ensure the dragged item overlaps the rest

            def drop():
                icon.x = int((icon.x + (icon.scale_x / 2)) * 9) / 9
                icon.y = int((icon.y - (icon.scale_y / 2)) * 1) / 1
                icon.z += .01

                # If outside, return to original position
                if icon.x < 0 or icon.x >= 1 or icon.y > 0 or icon.y <= -1:
                    icon.position = (icon.org_pos)
                    return

                # If the spot is taken, swap positions
                for c in self.children:
                    if c == icon:
                        continue
                    if c.x == icon.x and c.y == icon.y:
                        c.position = icon.org_pos

            icon.drag = drag
            icon.drop = drop


    # 15. b. Armor slot: Boots
    class Boots_Slot(Entity):
        def __init__(self, **kwargs):
            super().__init__(
                parent=camera.ui,
                model=Quad(radius=0),
                texture=boots_slot_texture,
                texture_scale=(1, 1),
                scale=(0.08, 0.08),
                origin=(1.12, -2.27),
                position=(-0.23, -0.18),
                color=color.rgb(255, 255, 255)
            )

            for key, value in kwargs.items():
                setattr(self, key, value)

        def find_free_spot(self):
            for y in range(1):
                for x in range(1):
                    grid_positions = [(int(e.x * self.texture_scale[0]), int(e.y * self.texture_scale[1])) for e in
                                    self.children]
                    print(grid_positions)

                    if not (x, -y) in grid_positions:
                        print('found free spot:', x, y)
                        return x, y

        # Add items
        def append(self, item, x=0, y=0):
            if len(self.children) >= 1 * 1:
                return

            x, y = self.find_free_spot()

            icon = Draggable(
                parent=self,
                model='quad',
                texture=item,
                color=color.white,
                scale_x=1 / self.texture_scale[0],
                scale_y=1 / self.texture_scale[1],
                origin=(-.5, .5),
                x=x * 1 / self.texture_scale[0],
                y=-y * 1 / self.texture_scale[1],
                z=-.5,
            )

            def drag():
                icon.org_pos = (icon.x, icon.y)
                icon.z -= .01  # Ensure the dragged item overlaps the rest

            def drop():
                icon.x = int((icon.x + (icon.scale_x / 2)) * 1) / 1
                icon.y = int((icon.y - (icon.scale_y / 2)) * 1) / 1
                icon.z += .01

                # If outside, return to original position
                if icon.x < 0 or icon.x >= 1 or icon.y > 0 or icon.y <= -1:
                    icon.position = (icon.org_pos)
                    return

                # If the spot is taken, swap positions
                for c in self.children:
                    if c == icon:
                        continue
                    if c.x == icon.x and c.y == icon.y:
                        c.position = icon.org_pos

            icon.drag = drag
            icon.drop = drops

            # def add_item(): # Can only add boots
            # global iron_boots
            # inventory.append(iron_boots)


    # 15. c. Armor slot: Leggings
    class Leggings_Slot(Entity):
        def __init__(self, **kwargs):
            super().__init__(
                parent=camera.ui,
                model=Quad(radius=0),
                texture=leggings_slot_texture,
                texture_scale=(1, 1),
                scale=(0.08, 0.08),
                origin=(1.12, -2.27),
                position=(-0.23, -0.1),
                color=color.rgb(255, 255, 255)
            )

            for key, value in kwargs.items():
                setattr(self, key, value)

        def find_free_spot(self):
            for y in range(1):
                for x in range(1):
                    grid_positions = [(int(e.x * self.texture_scale[0]), int(e.y * self.texture_scale[1])) for e in
                                    self.children]
                    print(grid_positions)

                    if not (x, -y) in grid_positions:
                        print('found free spot:', x, y)
                        return x, y

        # Add items
        def append(self, item, x=0, y=0):
            if len(self.children) >= 1 * 1:
                return

            x, y = self.find_free_spot()

            icon = Draggable(
                parent=self,
                model='quad',
                texture=item,
                color=color.white,
                scale_x=1 / self.texture_scale[0],
                scale_y=1 / self.texture_scale[1],
                origin=(-.5, .5),
                x=x * 1 / self.texture_scale[0],
                y=-y * 1 / self.texture_scale[1],
                z=-.5,
            )

            def drag():
                icon.org_pos = (icon.x, icon.y)
                icon.z -= .01  # Ensure the dragged item overlaps the rest

            def drop():
                icon.x = int((icon.x + (icon.scale_x / 2)) * 1) / 1
                icon.y = int((icon.y - (icon.scale_y / 2)) * 1) / 1
                icon.z += .01

                # If outside, return to original position
                if icon.x < 0 or icon.x >= 1 or icon.y > 0 or icon.y <= -1:
                    icon.position = (icon.org_pos)
                    return

                # If the spot is taken, swap positions
                for c in self.children:
                    if c == icon:
                        continue
                    if c.x == icon.x and c.y == icon.y:
                        c.position = icon.org_pos

            icon.drag = drag
            icon.drop = drops

            # def add_item(): # Can only add leggings
            # global iron_leggings
            # inventory.append(iron_leggings)


    # 15. d. Armor slot: Chestplate
    class Chestplate_Slot(Entity):
        def __init__(self, **kwargs):
            super().__init__(
                parent=camera.ui,
                model=Quad(radius=0),
                texture=chestplate_slot_texture,
                texture_scale=(1, 1),
                scale=(0.08, 0.08),
                origin=(1.12, -2.27),
                position=(-0.23, -0.02),
                color=color.rgb(255, 255, 255)
            )

            for key, value in kwargs.items():
                setattr(self, key, value)

        def find_free_spot(self):
            for y in range(1):
                for x in range(1):
                    grid_positions = [(int(e.x * self.texture_scale[0]), int(e.y * self.texture_scale[1])) for e in
                                    self.children]
                    print(grid_positions)

                    if not (x, -y) in grid_positions:
                        print('found free spot:', x, y)
                        return x, y

        # Add items
        def append(self, item, x=0, y=0):
            if len(self.children) >= 1 * 1:
                return

            x, y = self.find_free_spot()

            icon = Draggable(
                parent=self,
                model='quad',
                texture=item,
                color=color.white,
                scale_x=1 / self.texture_scale[0],
                scale_y=1 / self.texture_scale[1],
                origin=(-.5, .5),
                x=x * 1 / self.texture_scale[0],
                y=-y * 1 / self.texture_scale[1],
                z=-.5,
            )

            def drag():
                icon.org_pos = (icon.x, icon.y)
                icon.z -= .01  # Ensure the dragged item overlaps the rest

            def drop():
                icon.x = int((icon.x + (icon.scale_x / 2)) * 1) / 1
                icon.y = int((icon.y - (icon.scale_y / 2)) * 1) / 1
                icon.z += .01

                # If outside, return to original position
                if icon.x < 0 or icon.x >= 1 or icon.y > 0 or icon.y <= -1:
                    icon.position = (icon.org_pos)
                    return

                # If the spot is taken, swap positions
                for c in self.children:
                    if c == icon:
                        continue
                    if c.x == icon.x and c.y == icon.y:
                        c.position = icon.org_pos

            icon.drag = drag
            icon.drop = drops

            # def add_item(): # Can only add chestplates
            # global iron_chestplate
            # inventory.append(iron_chestplate)


    # 15. e. Armor slot: Helmet
    class Helmet_Slot(Entity):
        def __init__(self, **kwargs):
            super().__init__(
                parent=camera.ui,
                model=Quad(radius=0),
                texture=helmet_slot_texture,
                texture_scale=(1, 1),
                scale=(0.08, 0.08),
                origin=(1.12, -2.27),
                position=(-0.23, 0.06),
                color=color.rgb(255, 255, 255)
            )

            for key, value in kwargs.items():
                setattr(self, key, value)

        def find_free_spot(self):
            for y in range(1):
                for x in range(1):
                    grid_positions = [(int(e.x * self.texture_scale[0]), int(e.y * self.texture_scale[1])) for e in
                                    self.children]
                    print(grid_positions)

                    if not (x, -y) in grid_positions:
                        print('found free spot:', x, y)
                        return x, y

        # Add items
        def append(self, item, x=0, y=0):
            if len(self.children) >= 1 * 1:
                return

            x, y = self.find_free_spot()

            icon = Draggable(
                parent=self,
                model='quad',
                texture=item,
                color=color.white,
                scale_x=1 / self.texture_scale[0],
                scale_y=1 / self.texture_scale[1],
                origin=(-.5, .5),
                x=x * 1 / self.texture_scale[0],
                y=-y * 1 / self.texture_scale[1],
                z=-.5,
            )

            def drag():
                icon.org_pos = (icon.x, icon.y)
                icon.z -= .01  # Ensure the dragged item overlaps the rest

            def drop():
                icon.x = int((icon.x + (icon.scale_x / 2)) * 1) / 1
                icon.y = int((icon.y - (icon.scale_y / 2)) * 1) / 1
                icon.z += .01

                # If outside, return to original position
                if icon.x < 0 or icon.x >= 1 or icon.y > 0 or icon.y <= -1:
                    icon.position = (icon.org_pos)
                    return

                # If the spot is taken, swap positions
                for c in self.children:
                    if c == icon:
                        continue
                    if c.x == icon.x and c.y == icon.y:
                        c.position = icon.org_pos

            icon.drag = drag
            icon.drop = drops

            # def add_item(): # Can only add helmets
            # global iron_helmet
            # inventory.append(iron_helmet)


    # 15. f. Shield slot
    class Shield_Slot(Entity):
        def __init__(self, **kwargs):
            super().__init__(
                parent=camera.ui,
                model=Quad(radius=0),
                texture=shield_slot_texture,
                texture_scale=(1, 1),
                scale=(0.08, 0.08),
                origin=(1.12, -2.27),
                position=(0.08, -0.18),
                color=color.rgb(255, 255, 255)
            )

            for key, value in kwargs.items():
                setattr(self, key, value)

        def find_free_spot(self):
            for y in range(1):
                for x in range(1):
                    grid_positions = [(int(e.x * self.texture_scale[0]), int(e.y * self.texture_scale[1])) for e in
                                    self.children]
                    print(grid_positions)

                    if not (x, -y) in grid_positions:
                        print('found free spot:', x, y)
                        return x, y

        # Add items
        def append(self, item, x=0, y=0):
            if len(self.children) >= 1 * 1:
                return

            x, y = self.find_free_spot()

            icon = Draggable(
                parent=self,
                model='quad',
                texture=item,
                color=color.white,
                scale_x=1 / self.texture_scale[0],
                scale_y=1 / self.texture_scale[1],
                origin=(-.5, .5),
                x=x * 1 / self.texture_scale[0],
                y=-y * 1 / self.texture_scale[1],
                z=-.5,
            )

            def drag():
                icon.org_pos = (icon.x, icon.y)
                icon.z -= .01  # Ensure the dragged item overlaps the rest

            def drop():
                icon.x = int((icon.x + (icon.scale_x / 2)) * 1) / 1
                icon.y = int((icon.y - (icon.scale_y / 2)) * 1) / 1
                icon.z += .01

                # If outside, return to original position
                if icon.x < 0 or icon.x >= 1 or icon.y > 0 or icon.y <= -1:
                    icon.position = (icon.org_pos)
                    return

                # If the spot is taken, swap positions
                for c in self.children:
                    if c == icon:
                        continue
                    if c.x == icon.x and c.y == icon.y:
                        c.position = icon.org_pos

            icon.drag = drag
            icon.drop = drops

            # def add_item(): # Can only add shields
            # global shield
            # inventory.append(shield)


    # 15. g. Inventory Crafting
    class Inventory_Crafting_Grid(Entity):
        def __init__(self, **kwargs):
            super().__init__(
                parent=camera.ui,
                model=Quad(radius=0),
                texture=inventory_slot_texture,
                texture_scale=(2, 2),
                scale=(0.16, 0.16),
                origin=(1.12, -2.27),
                position=(0.3, -0.2),
                color=color.rgb(255, 255, 255)
            )

            for key, value in kwargs.items():
                setattr(self, key, value)

        def find_free_spot(self):
            for y in range(2):
                for x in range(2):
                    grid_positions = [(int(e.x * self.texture_scale[0]), int(e.y * self.texture_scale[1])) for e in
                                    self.children]
                    print(grid_positions)

                    if not (x, -y) in grid_positions:
                        print('found free spot:', x, y)
                        return x, y

        # Add items
        def append(self, item, x=0, y=0):
            if len(self.children) >= 2 * 2:
                return

            x, y = self.find_free_spot()

            icon = Draggable(
                parent=self,
                model='quad',
                texture=item,
                color=color.white,
                scale_x=1 / self.texture_scale[0],
                scale_y=1 / self.texture_scale[1],
                origin=(-.5, .5),
                x=x * 1 / self.texture_scale[0],
                y=-y * 1 / self.texture_scale[1],
                z=-.5,
            )

            def drag():
                icon.org_pos = (icon.x, icon.y)
                icon.z -= .01  # Ensure the dragged item overlaps the rest

            def drop():
                icon.x = int((icon.x + (icon.scale_x / 2)) * 2) / 2
                icon.y = int((icon.y - (icon.scale_y / 2)) * 2) / 2
                icon.z += .01

                # If outside, return to original position
                if icon.x < 0 or icon.x >= 1 or icon.y > 0 or icon.y <= -1:
                    icon.position = (icon.org_pos)
                    return

                # If the spot is taken, swap positions
                for c in self.children:
                    if c == icon:
                        continue
                    if c.x == icon.x and c.y == icon.y:
                        c.position = icon.org_pos

            icon.drag = drag
            icon.drop = drops

            # def add_item(): # Can only add helmets
            # global iron_helmet
            # inventory.append(iron_helmet)


    # 15. h. Inventory Crafting
    class Inventory_Crafting_Output(Entity):
        def __init__(self, **kwargs):
            super().__init__(
                parent=camera.ui,
                model=Quad(radius=0),
                texture=inventory_slot_texture,
                texture_scale=(1, 1),
                scale=(0.08, 0.08),
                origin=(1.12, -2.27),
                position=(0.42, -0.02),
                color=color.rgb(255, 255, 255)
            )

            for key, value in kwargs.items():
                setattr(self, key, value)


# 8. Picking blocks
block_pick = 1  # Default block is grass block


def update():
    global block_pick, menu, current_time
    
    # Show the hotbar at all times
    Inventory().Hotbar()

    # If a block is destroyed, active hand animation is played
    if held_keys['left mouse']:
        hand.active()
    else:
        hand.passive()

    if held_keys['1']:
        block_pick = 1  # Grass block
    if held_keys['2']:
        block_pick = 2  # Dirt block
    if held_keys['3']:
        block_pick = 3  # Stone block
    if held_keys['4']:
        block_pick = 4  # Cobblestone block


    # 14. Sprinting
    if held_keys['control'] and player.crouching is False:
        player.sprinting = True
        base_speed = 8 # Default speed
        sprint_speed = base_speed * base_speed * base_speed
        player.speed = lerp(base_speed, sprint_speed, 2)  # Smoother speed acceleration
        base_fov = 95
        sprint_fov = 105
        player.camera.fov = lerp(base_fov, sprint_fov, 1) # Smoother FOV acceleration

    else:
        player.sprinting = False
        base_speed = 8 # Default speed
        sprint_speed = base_speed * 2.5
        player.speed = lerp(sprint_speed, base_speed, 4)  # Smoother sprint FOV to walk FOV delay
        base_fov = 95
        sprint_fov = 105
        player.camera.fov = lerp(sprint_fov, base_fov, 2) # Smoother sprint FOV to walk FOV delay


    # 17. Crouching
    if held_keys['shift']:
        player.crouching = True
        base_speed = 8 # Default speed
        crouch_speed = base_speed / 6
        player.speed = lerp(base_speed, crouch_speed, 0.5)  # Smoother crouching
        player.camera.position = (0, -1, 0)    # 1.5 block height
    else:
        player.crouching = False
        player.speed = 8 # Default speed
        player.camera.position = (0, -0.66, 0) # 2 block height


    # 18. Zoom
    if held_keys['c']:
        player.camera.fov = player.camera.fov / 1.3
        player.camera.x = player.camera.x / 1.3
    else:
        player.camera.fov = player.camera.fov
        player.camera.x = player.camera.x


    # 20. Inventory toggle
    if held_keys['e']:
        # Move and show the mouse
        player.mouse.locked = False

        # Open the whole inventory
        Inventory().Lower_Inventory()
        Inventory().Hotbar()
        Inventory().Boots_Slot()
        Inventory().Leggings_Slot()
        Inventory().Chestplate_Slot()
        Inventory().Helmet_Slot()
        Inventory().Shield_Slot()
        Inventory().Inventory_Crafting_Grid()
        Inventory().Inventory_Crafting_Output()


# 2. Blocks
class Voxel(Entity):
    def __init__(self, position=(0, 0, 0), texture=grass_texture):
        # Ends up with default position if no information is being passed
        # and the grass texture is being selected as default
        super().__init__(
            parent=scene,
            position=position,  # Right in the middle
            model='cube',
            origin_y=0.66,
            texture=texture,
            color=color.color(0, 0, random.uniform(0.9, 1)),  # Each block has a random grayscale shade
            scale=1
        )
        self.collider = self.model

    # 6. Place and destroy blocks
    def input(self, key):
        global inventory

        if self.hovered:
            if key == 'right mouse down': # If right mouse button is pressed, place new block
                punch_sound.play()
                # Be able to place different blocks depending on the number pressed
                if block_pick == 1: voxel = Voxel(position=self.position + mouse.normal,
                                                  texture=grass_texture)        # Place grass block
                if block_pick == 2: voxel = Voxel(position=self.position + mouse.normal,
                                                  texture=dirt_texture)         # Place dirt block
                if block_pick == 3: voxel = Voxel(position=self.position + mouse.normal,
                                                  texture=stone_texture)        # Place stone block
                if block_pick == 4: voxel = Voxel(position=self.position + mouse.normal,
                                                  texture=cobblestone_texture)  # Place cobblestone block
            if key == 'left mouse down':  # If left mouse button is pressed, destroy block
                punch_sound.play()
                while destroy(self) is True:
                    destroy(voxel)

            # 19. Jump
            if key == 'space down':            # If space is pressed, jump one block
                player.y += 1
                invoke(setattr, player, 'y', player.y - 1)
                

# 4. Generate default platform
for z in range(24):        # Generates 24 blocks on the z axis
    for x in range(24):    # Generates 24 blocks on the x axis
        voxel = Voxel(position=(x, 0, z))


import sky
sky = sky.Sky()    # Maps the sky to the scene
hand = Hand()      # Maps the hand to the player
player = Player()  # Maps the player to the 1st person view


# 3. Run program
app.run()
#By Yogesh Kushwaha