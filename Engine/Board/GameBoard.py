#GameBoard.py
#Author: Onionchi
#tabs not spaces
#Returns png of board's output
class GameBoard:
    def __init__(self, board_xsize, board_ysize):
        self.board_builder = BoardBuilder(filename, 32, 32, 32, 32)
        self.tile_mat = [[0 for x in range(board_xsize)] for y in range(board_ysize)]
        self.object_mat = [[0 for x in range(board_xsize)] for y in    range(board_ysize)]
        self.actor_mat = [[0 for x in range(board_xsize)] for y in    range(board_ysize)]
    def buildBoard(self)
        
