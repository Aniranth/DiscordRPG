#SpriteHandler.py
#Functions to get sprite by name or ID of of sprite sheet and tile sheet.
#Author: Onionchi
#tabs not spaces
from PIL import Image
class ImageHandler(object):
    def __init__(self, sprite_xres=16, sprite_yres=16, img_xres=2048, img_yres=2048, filename):
        self.s_xres = sprite_xres
        self.s_yres = sprite_yres
        self.i_xres = img_xres%self.s_xres
        self.i_yres = img_yres%self.s_yres
        self.s_per_row = self.i_xres//self.s_xres
        self.s_per_col = self.i_yres//self.s_yres
        self.f_name = filename
