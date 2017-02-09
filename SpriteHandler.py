#SpriteHandler.py
#Functions to get sprite by name or ID of of sprite sheet and tile sheet.
#Author: Onionchi
#tabs not spaces
from PIL import Image
class SpriteHandler(object):
    def __init__(self, filename, sprite_xres=16, sprite_yres=16, img_xres=2048, img_yres=2048):
        self.s_xres = sprite_xres
        self.s_yres = sprite_yres
        self.i_xres = img_xres%self.s_xres
        self.i_yres = img_yres%self.s_yres
        self.s_per_row = self.i_xres//self.s_xres
        self.s_per_col = self.i_yres//self.s_yres
        self.f_name = filename
        self.img = Image.open(filename)
    def getImg(self,x,y):
        s_area = (self.s_xres*x,self.s_yres*y,self.s_xres*(1+x),self.s_yres*(1+y))
        sprite = self.img.crop(s_area)
        return sprite
    #TODO: getImg by sprite name table
    #TODO: getImg by sprite ID table
handler = SpriteHandler('/home/onionchi/image.jpg',16,16,32,32)
im = handler.getImg(0,0)
im.show()
